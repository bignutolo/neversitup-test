import authHeader from "../auth-header";

export const interceptorRequest = (request) => {
  // set header token
  const auth = authHeader();
  if (auth && auth.Authorization) {
    request.headers["Authorization"] = auth.Authorization;
  }

  // console.log("req", request);
  return request;
};

export const interceptorRequestError = (error) => {
  console.log("req-err", error);
  return Promise.reject(error);
};
