import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AOS from 'aos';
import 'aos/dist/aos.css';

export const eventBus = new Vue();


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
