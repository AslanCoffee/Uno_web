import Vue from "vue";
import Vuex from "vuex";
import mEdit from "./mEdit";
import mReq from "./mReq";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { mEdit, mReq },
});
