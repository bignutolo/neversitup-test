import AccountService from "@/services/api/account.service";
import { TokenService } from "@/services/storage.service";

const user = {
  accessToken: null,
  refreshToken: null,
};

const initialState = {
  user: { ...user },
};

const actions = {
  login({ commit }, data) {
    return AccountService.login(data).then(
      (res) => {
        const user = {
          accessToken: res.data.token,
        };

        commit("loginSuccess", user);

        return Promise.resolve(res);
      },
      (error) => {
        commit("loginFailure");
        return Promise.reject(error);
      }
    );
  },
  logout({ commit }) {
    return AccountService.logout().then(
      (res) => {
        commit("logoutSuccess");
        return Promise.resolve(res);
      },
      (error) => {
        commit("logoutFailure");
        return Promise.reject(error);
      }
    );
  },
};

const mutations = {
  loginSuccess(state, user) {
    state.user = user;
  },
  loginFailure(state) {
    state.user = {};
  },
  logoutSuccess(state) {
    state.user = {};
  },
  logoutFailure(state) {
    state.user = {};
  },
  saveLocalToken(state) {
    if (state.user && state.user.accessToken) {
      TokenService.saveToken(state.user.accessToken);
    } else {
      TokenService.removeToken();
    }
  },
};

export const account = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
};
