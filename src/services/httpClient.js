import axios from "axios";
import router from "../router/index";
import store from "../store/index";

import { TokenService } from "./storage.service";
import {
  interceptorRequest,
  interceptorRequestError,
} from "./interceptors/request";
import { interceptorResponse } from "./interceptors/response";

const headers = {
  "api-version": null,
};

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: headers,
});

let resInterceptor;

function onRefreshFailed(error) {
  console.log("http-response-error", error);

  //clear token, vuex account
  TokenService.removeToken();
  store.commit("account/logoutSuccess");

  router.go({ name: "Login" });

  return Promise.reject(error);
}

const interceptorResponseError = async (error) => {
  console.log("resInterceptor:ERROR", error);

  if (error.response === undefined) {
    console.log("error.response", error.response);
    return Promise.reject(error);
  }

  // Reject promise if usual error
  if (error.response) {
    console.log("error.response.status", error.response.status);

    return Promise.reject(error);
  }

  /*
   * When response code is 401, try to refresh the token.
   * Eject the interceptor so it doesn't loop in case
   * token refresh causes the 401 response
   */
  httpClient.interceptors.response.eject(resInterceptor);

  return onRefreshFailed(error.response.config);
};

httpClient.interceptors.request.use(
  interceptorRequest,
  interceptorRequestError
);

resInterceptor = httpClient.interceptors.response.use(
  interceptorResponse,
  interceptorResponseError
);

export default httpClient;
