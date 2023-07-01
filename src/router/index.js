import { createRouter, createWebHashHistory } from "vue-router";
const home = () => import("../views/Home.vue");
const cart = () => import("../views/Cart.vue");
const order = () => import("../views/Order.vue");
const my = () => import("../views/My.vue");
const login = () => import("../views/Login.vue");
const register = () => import("../views/Register.vue");
const shop = () => import("../views/Shop.vue");
const createorder = () => import("../views/CreateOrder.vue");
const address = () => import("../views/address/Address.vue");
const newaddress = () => import("../views/address/NewAddress.vue");
const editaddress = () => import("../views/address/EditAddress.vue");
const changeuserinfo = () => import("../views/user/ChangeUserInfo.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    meta: {
      index: 1,
    },
  },

  {
    path: "/cart",
    name: "cart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: cart,
    // import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/order",
    name: "order",
    component: order,
    meta: {
      index: 1,
    },
  },
  {
    path: "/my",
    name: "my",
    component: my,
    meta: {
      index: 1,
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    beforeEnter(to, from, next) {
      let isLogin = localStorage.getItem("isLogin");
      isLogin ? next({ name: "home" }) : next();
    },
    meta: {
      index: 10,
    },
  },
  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      index: 20,
    },
  },
  {
    path: "/address",
    name: "address",
    props: true,
    component: address,
    meta: {
      index: 3,
    },
  },
  {
    path: "/newaddress",
    name: "newaddress",
    component: newaddress,
    meta: {
      index: 4,
    },
  },
  {
    path: "/editaddress",
    name: "editaddress",
    props: true,
    component: editaddress,
    meta: {
      index: 4,
    },
  },
  {
    path: "/shop/:id",
    name: "shop",
    props: true,
    component: shop,
    meta: {
      index: 2,
    },
  },
  {
    path: "/createorder",
    name: "createorder",
    props: true,
    component: createorder,
    meta: {
      index: 2,
    },
  },
  {
    path: "/changeuserinfo",
    name: "changeuserinfo",
    props: true,
    component: changeuserinfo,
    meta: {
      index: 2,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("isLogin");
  isLogin || to.name === "login" || to.name === "register"
    ? next()
    : next({ name: "login" });
});

export default router;
