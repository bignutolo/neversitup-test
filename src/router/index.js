import Vue from "vue";
import VueRouter from "vue-router";
import { TokenService } from "@/services/storage.service";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import ListTodo from "@/views/ListTodo.vue";
import AppLogin from "@/Layouts/AppLogin.vue";
import AppLayout from "@/Layouts/AppLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/todos",
        name: "ListTodo",
        component: ListTodo,
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: AppLogin,
    meta: {
      login: true,
    },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      auth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const haveToken = !!TokenService.getToken();
  if (to.matched.some((record) => record.meta.auth) && !haveToken) {
    next({ name: "Login" });
  } else {
    next();
  }
  if (to.name === "Login" && haveToken) {
    next({ name: "ListTodo" });
  }
});

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err);
};

export default router;
