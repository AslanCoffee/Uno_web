import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/fonts/Gadugi.ttf";
import mReq from './request/modules/mReq';
import store from '@/request/index';

Vue.config.productionTip = false;

new Vue({
  router,
  mReq,
  store,
  render: (h) => h(App),
}).$mount("#app");
