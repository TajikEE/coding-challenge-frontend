import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/call/:number",
    name: "phone-number-details",
    component: () =>
      import(/* webpackChunkName: "phone-number-details" */ "../views/phone-number-details.vue")
  },
  {
    path: "/agent/:agentId",
    name: "agent-details",
    component: () =>
      import(/* webpackChunkName: "agent-details" */ "../views/agent-details.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
