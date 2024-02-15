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
    };
  },
  async mounted() {
    if(this.checkIfFirstVisit() == true) this.countTasks = await this.getCountTasks();
    },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    checkIfFirstVisit(){
      
      if (document.cookie.length == 0) {
        document.cookie = 1;
        return true; // Первое посещение
    } else {
        return false; // Посещение не первое
    }
    },
    AuthUser(){
      
    },
    async getCountTasks() {
      try {
        console.log("1ERFTGH")
        const response = await this.sendRequest({
          request: "POST",
          url: `users`
        });
        if (!response.ok) throw new Error("Ошибка при получении задания");
        //return await response.json();
      } catch (error) {
        console.log(error);
      }
    }
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
