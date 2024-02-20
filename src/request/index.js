import Vue from "vue";
import Vuex from "vuex";
import mUsers from "./modules/mUsers";
import mReq from "./modules/mReq";
import mLobby from "./modules/mLobby";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { mUsers, mReq, mLobby },
});
