import Vue from "vue";
import Vuex from "vuex";
import { account } from "./account.module.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    account,
  },
});
