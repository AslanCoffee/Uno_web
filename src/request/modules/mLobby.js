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
        async joinLobby({ dispatch }, lobbyCode) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "POST",
                url: "lobby/join-lobby",
                data: { code: lobbyCode },
              });
              if (response.ok) {
                router.push({ name: 'lobby' });
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
        async infoPlayers({ dispatch }) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "GET",
                url: "lobby/players",
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
        async exitLobby({ dispatch }) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "POST",
                url: "lobby/exit",
              });
              if (response.ok) {
                router.push({ name: 'main' });
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
        async getHostId({ dispatch }) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "GET",
                url: "lobby/hostId",
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
        async kickPlayer({ dispatch }, playerId) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "POST",
                url: "lobby/kick/" + playerId,
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