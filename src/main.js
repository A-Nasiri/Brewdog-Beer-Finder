import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import VueToasted from "vue-toasted";
import MD from "material-design-icons";

export const eventBus = new Vue();
Vue.use(MD);
Vue.use(VueToasted, {
  iconPack: "material"
});

Vue.config.productionTip = false;

new Vue({
  created() {
    AOS.init({
      duration: 1000
    });
  },
  router,
  render: h => h(App)
}).$mount("#app");
