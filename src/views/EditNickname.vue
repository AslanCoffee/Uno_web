<template>
    <div class="main-menu">
      <div class="main-menu__container">
        <div class="main-menu-block__title">Изменение никнейма</div>
        <div class="main-menu-block__main">
          <form-input
            class="registration-block__input"
            v-model.trim="dataNick.nickname"
            placeholderInput="Имя пользователя"
          />
          <button-element
            class="main-menu-block__button"
            classButton="button_white"
            @click="EditNick"
            label="Поменять ник"
          />
        </div>
      </div>
    </div>
  </template>
  
<script>
import FormInput from "@/components/FormInput.vue";
import ButtonElement from "@/components/ButtonElement.vue";

export default {
  components: { ButtonElement, FormInput },
  data() {
    return {
      dataNick: {
        nickname: "",
      },
      error: null
    };
  },
  methods: {
    async EditNick() {
      try {
        console.log("nick");
        await this.$store.dispatch('mEdit/editNickname', this.dataNick);
      } catch (error) {
        console.log(error);
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

.registration-block__input {
  flex: 1 1 100px;
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
