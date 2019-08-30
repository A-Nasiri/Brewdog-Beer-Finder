import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Beer from "./views/Beer.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/beer/:id",
      name: "Beer",
      props: true,
      component: Beer
    }
  ]
});
