import mReq from "./mReq";
import router from "../../router/index";

const mLobby = {
    namespaced: true,
    state: {
        lobby: { id: "", code: "", numPlayers: "", hostId: ""}
    },
    getters: {},
    mutations: {},
    actions:{
        async createLobby({ dispatch }, data) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "POST",
                url: "lobby",
                data: { numPlayers: data },
              });
              if (response.ok) {
                router.push({ name: 'lobby' })
                return response;
              } else if (response.status === 401) {
                throw Error("Ошибка авторизации: неверный email или пароль");
              } else {
                throw Error("Неизвестная ошибка");
              }
            } catch (error) {
              console.log(error);
            }
        },
        async joinLobby({ dispatch }, data) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "POST",
                url: "lobby/join-lobby",
                data: { code: data },
              });
              if (response.ok) {
                return response;
              } else if (response.status === 401) {
                throw Error("Ошибка авторизации: неверный email или пароль");
              } else {
                throw Error("Неизвестная ошибка");
              }
            } catch (error) {
              console.log(error);
            }
        },
    },
    modules: { mReq },
};

export default mLobby;