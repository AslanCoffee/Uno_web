<template>
  <div class="lobby-connector">
    <div class="lobby-connector__container">
      <div class="lobby-connector-block__title">Подключиться к лобби</div>
      <div class="lobby-connector-block__main">
        <ValidationObserver ref="observer">
          <form
            class="lobby-connector-block__form"
            @submit.prevent
            method="post"
          >
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                class="lobby-connector-block__input"
                v-model.trim="dataLobby.code"
                placeholderInput="Введите код"
              />
              <span class="validation-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </div>

      <div class="lobby-connector-block__footer">
        <button-element
          class="lobby-connector-block__button"
          classButton="button_white"
          @click="joinLobby"
          label="Подключиться"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import FormInput from "@/components/FormInput.vue";
import ButtonElement from "@/components/ButtonElement.vue";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormInput,
    ButtonElement,
  },
  data() {
    return {
      dataLobby: {
        code: "",
      },
    };
  },
  methods: {
    async joinLobby() {
      try {
        localStorage.setItem('code', this.dataLobby.code);
        await this.$store.dispatch('mLobby/joinLobby', this.dataLobby.code);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.lobby-connector {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ddd;
}

.lobby-connector__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 40px;
  background: #373334;
  color: white;
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.lobby-connector-block__title {
  margin: 0px 0px 20px 0px;
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  margin: 0px 0px 10px 0px;
  text-align: center;
}
.lobby-connector-block__description {
  color: rgba(32, 36, 48, 0.5);
  text-align: center;
}
.lobby-connector-block__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px 20px 0px;
}

.lobby-connector-block__form {
}

.lobby-connector-block__input {
  flex: 1 1 284px;
}

.lobby-connector-block__input:not(:last-child) {
}
.validation-error {
  display: flex;
  position: absolute;
  transform: translate(35px, -20px);
  justify-content: center;
}
.error-message {
}
.lobby-connector-block__footer {
  text-align: center;
}
.lobby-connector-block__button {
}
.register_text {
  display: none;
}
</style>
