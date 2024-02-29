import mReq from "./mReq";
// import router from "../../router/index";

const mGame = {
    namespaced: true,
    state: {
        gameID: "",
    },
    getters: {},
    mutations: {},
    actions:{
        async gameStart({ dispatch }) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "GET",
                url: "game/start",
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
        async gameData({ dispatch }) {
            try {
                const response = await dispatch("mReq/sendRequest", {
                request: "GET",
                url: "game/data",
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
        async moveCard({ dispatch }, data) {
            try {
                const response = await dispatch("mReq/sendRequest", {
                request: "POST",
                url: "game/motion/card",
                data: data,
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
        async motionCard({ dispatch }) {
            try {
                const response = await dispatch("mReq/sendRequest", {
                request: "POST",
                url: "game/motion/take",
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

export default mGame;