<template>
  <div class="main-menu">
    <div class="main-menu__container">
      <div class="main-menu-block__title">Главное меню</div>
      <div class="main-menu-block__main">
        <button-element
          class="main-menu-block__button"
          classButton="button_white"
          @click="$router.push({ name: 'lobbyCreator' })"
          label="Создать лобби"
        />
        <button-element
          class="main-menu-block__button"
          classButton="button_white"
          @click="$router.push({ name: 'lobbyConnector' })"
          label="Подключиться к лобби"
        />
        <button-element
          class="main-menu-block__button"
          classButton="button_white"
          @click="$router.push({ name: 'editNickname' })"
          label="Поменять ник"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonElement from "@/components/ButtonElement.vue";
import { mapActions } from "vuex";

export default {
  components: { ButtonElement },
  data() {
    return {
      id: "",
      nickname: "",
    };
  },
  async mounted() {
    if(this.checkIfFirstVisit() == true) await this.CreateUser();
  },
  methods: {//поменять этот шлак
    ...mapActions("mReq", ["sendRequest"]),
    checkIfFirstVisit(){
      return !document.cookie.includes("userId");
    },
    async CreateUser() {
      try {
        console.log("1ERFTGH")
        const response = await this.sendRequest({
          request: "GET",
          url: `users`
        });
        const UserData = await response.json();
        this.id = UserData.id;
        this.nickname = UserData.nickname
        console.log(this.nickname)
        document.cookie = `userId=${this.id}`;
        await this.AuthUser();
        if (!response.ok) throw new Error("Ошибка при получении задания");
      } catch (error) {
        console.log(error);
      }
    },
    async AuthUser(){
      try{
        console.log("Auth HHAHA")
        const response = await this.sendRequest({
          request: "POST",
          url: `auth/log-in/${this.id}`
        });
        const show = await this.sendRequest({
          request: "GET",
          url: `auth`
        });
        console.log(show)
        if (!response.ok) throw new Error("Ошибка при получении задания");
      }
      catch(error)
      {
        console(error);
        console.log("Жаль")
      }
    },
  },
};
</script>

<style scoped>
.main-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ddd;
}

.main-menu__container {
  display: flex;
  padding: 20px;
  flex-direction: column;
  border-radius: 40px;
  background: #373334;
  color: white;
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.main-menu__body {
}
.main-menu-block__title {
  margin: 0px 0px 20px 0px;
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  margin: 0px 0px 10px 0px;
  text-align: center;
}

.main-menu-block__main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-menu-block__button {
  margin: 0px 0px 10px 0px;
}
</style>
