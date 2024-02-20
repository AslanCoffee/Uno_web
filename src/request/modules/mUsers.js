import mReq from "./mReq";
import router from "../../router/index";

const mUsers = {
    namespaced: true,
    state: {
        user: { nickname: "", id: ""}
    },
    getters: {},
    mutations: {},
    actions:{
        async editNickname({ dispatch }, data) {
            try {
              const response = await dispatch("mReq/sendRequest", {
                request: "PATCH",
                url: "users/update-nick",
                data: data,
              });
              if (response.ok) {
                router.push({ name: 'main' })
              } else if (response.status === 401) {
                throw Error("Ошибка авторизации: неверный email или пароль");
              } else {
                throw Error("Неизвестная ошибка");
              }
            } catch (error) {
              console.log(error);
            }
        },
          async userData({ dispatch }) {
            try {
              return await dispatch("mReq/sendRequest", {
                request: "GET",
                url: "auth",
              });
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
    },
    modules: { mReq },
};

export default mUsers;