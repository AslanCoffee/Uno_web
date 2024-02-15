import Vue from "vue";
import VueRouter from "vue-router";
import ErrorPage from "@/views/ErrorPage.vue";
import LobbyPage from "@/views/LobbyPage.vue";
import LobbyCreator from "@/views/LobbyCreator.vue";
import MainMenu from "@/views/MainMenu.vue";
import LobbyConnector from "@/views/LobbyConnector.vue";
import GamePage from "@/views/GamePage.vue";
import EditNickname from "@/views/EditNickname.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/lobby",
    name: "lobby",
    component: LobbyPage,
  },
  {
    path: "*",
    name: "error",
    component: ErrorPage,
  },
  {
    path: "/main",
    name: "main",
    component: MainMenu,
  },
  {
    path: "/lobbyCreator",
    name: "lobbyCreator",
    component: LobbyCreator,
  },
  {
    path: "/lobbyConnector",
    name: "lobbyConnector",
    component: LobbyConnector,
  },
  {
    path: "/game",
    name: "game",
    component: GamePage,
  },
  {
    path: "/editNickname",
    name: "editNickname",
    component: EditNickname,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
