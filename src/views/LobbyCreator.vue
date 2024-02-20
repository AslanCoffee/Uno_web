<template>
  <div class="lobby-creator">
    <div class="lobby-creator__container">
      <div class="lobby-creator__body">
        <div class="lobby-creator-block">
          <div class="lobby-creator-block__title">
            <p class="lobby-creator-block__subtitle">Создать лобби</p>
          </div>
          <div class="lobby-creator-block__main"></div>
          <div class="lobby-creator-block__footer">
            <button-element
              class="lobby-creator-block__button"
              classButton="button_white"
              @click="twoplayers"
              label="2 игрока"
            />
            <button-element
              class="lobby-creator-block__button"
              classButton="button_white"
              @click="threeplayers"
              label="3 игрока"
            />
            <button-element
              class="lobby-creator-block__button"
              classButton="button_white"
              @click="fourplayers"
              label="4 игрока"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/validators/validation-rules";
import ButtonElement from "@/components/ButtonElement.vue";

export default {
  components: { ButtonElement },
  data() {
    return {
      code: "",
      numPlayers: "",
    };
  },
  methods: {
    async twoplayers() {
      this.numPlayers = 2;
      await this.lobbyCreate();
    },
    async threeplayers() {
      this.numPlayers = 3;
      await this.lobbyCreate();
    },
    async fourplayers() {
      this.numPlayers = 4;
      await this.lobbyCreate();
    },
    async lobbyCreate() {
      try {
        console.log("Lobby");
        const response = await this.$store.dispatch('mLobby/createLobby', this.numPlayers);
        const lobbyCode = await response.json();
        this.code = lobbyCode.code;
        localStorage.setItem('code', lobbyCode.code);
        await this.$store.dispatch('mLobby/joinLobby', lobbyCode.code);
        console.log(this.code)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.lobby-creator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ddd;
}

.lobby-creator__container {
}

.lobby-creator__body {
  display: flex;
  padding: 20px;
  border-radius: 40px;
  background: #373334;
  color: white;
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}
.lobby-creator-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lobby-creator-block {
}
.lobby-creator-block__title {
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
}

.lobby-creator-block__main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lobby-creator-block__button {
  margin: 0px 0px 10px 0px;
}
</style>
