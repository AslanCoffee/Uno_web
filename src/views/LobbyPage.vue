<template>
  <div class="lobby">
    <div class="lobby-block">
      <div class="lobby-block__container">
        <div class="lobby__header">
          <div class="lobby__title">Лобби</div>
          <div class="lobby__game-code">
            <p>Код игры</p>
            <h3 class="lobby__id">{{ code }}</h3>
          </div>
        </div>
        <div class="lobby_body">
          <div class="lobby__list">
            <div
              class="player__item"
              v-for="player in players"
              :key="player.id"
              @click="confirmRemovePlayer(player)"
              :class="{ 'player-ready': player.ready }"
              >
              {{ player.name }}
            </div>
          </div>
        </div>
        <div class="lobby__bottom">
          <button-element
            v-if="isHost"
            class="lobby__button"
            classButton="button_white"
            @click="startGame()"
            label="Начать игру"
          />
          <button-element
            class="lobby__button"
            classButton="button_white"
            @click="readyForGame()"
            label="Готов"
          />
        </div>
      </div>
      <div class="exit__lobby">
        <button-element
          class="lobby-creator-block__button"
          classButton="button_white"
          @click="exitLobby"
          label="Выйти из лобби"
        />
      </div>
    </div>

    <div class="modal" v-if="showConfirmationModal">
      <div class="modal__content">
        <p>Вы уверены, что хотите удалить игрока из лобби?</p>
        <div class="modal__buttons">
          <button-element
            classButton="button_white"
            @click="cancelRemovePlayer"
            label="Отмена"
          />
          <button-element
            classButton="button_red"
            @click="confirmRemovePlayerAction"
            label="Удалить"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonElement from "@/components/ButtonElement";
export default {
  components: {
    ButtonElement,
  },
  data() {
    return {
      players: [],
      code: "",
      showConfirmationModal: false,
      playerToRemove: null,
      currentUser: null,
      LobbyHost: null,
      gameCode: null,
    };
  },
  async mounted() {
    this.loadPlayers();
    setInterval(this.loadPlayers, 5000);
    setInterval(this.gameInit, 2000);
    this.code = localStorage.getItem('code');
    const responseHost = await this.$store.dispatch('mLobby/getHostId');
    const HostData = await responseHost.json();
    const responseUser = await this.$store.dispatch('mUsers/userData');
    const UserData = await responseUser.json();
    this.currentUser = UserData.id;
    this.LobbyHost = HostData.hostId;
  },
  computed: {
    isHost() {
      return this.currentUser === this.LobbyHost;
    }
  },
  methods: {
    async loadPlayers() {
      try {
        const response = await this.$store.dispatch('mLobby/infoPlayers');
        const infoPlayers = await response.json();
        this.players = infoPlayers.map(player => ({ id: player.id, name: player.nickname }));
      } catch (error) {
        console.log(error);
      }
    },
    async gameInit() {
      try {
        const response = await this.$store.dispatch('mGame/gameData');
        const infoGame = await response.json();
        this.gameCode = infoGame.gameID;
        if (this.gameCode && this.$route.name !== 'game') {
          this.$router.push({ name: 'game' });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async exitLobby() {
      try {
        await this.$store.dispatch('mLobby/exitLobby');
      } catch (error) {
        console.log(error);
      }
    },
    async confirmRemovePlayer(player) {
      if (this.currentUser === this.LobbyHost && player.id != this.LobbyHost) {
      this.playerToRemove = player;
      this.showConfirmationModal = true;
      }
    },
    cancelRemovePlayer() {
      this.playerToRemove = null;
      this.showConfirmationModal = false;
    },
    async confirmRemovePlayerAction() {
      if (this.playerToRemove) {
        const index = this.players.findIndex(p => p.id === this.playerToRemove.id);
        if (index !== -1) {
          this.players.splice(index, 1);
          await this.$store.dispatch('mLobby/kickPlayer', this.playerToRemove.id);
        }
      }
      this.playerToRemove = null;
      this.showConfirmationModal = false;
    },
    async startGame() {
      try {
        await this.$store.dispatch('mGame/gameStart');
      } catch (error) {
        console.log(error);
      }
    },
    async readyForGame() {
      await this.$store.dispatch('mUsers/userReady');
    },
  },
};
//this.$set(this.players[currentUserIndex], 'ready', true);
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.modal__buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.lobby {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ddd;
}


.lobby-block__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 40px;
  background: #373334;
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.lobby__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
  cursor: default;
}
.lobby__title {
  font-size: 20px;
  font-weight: 600;
}

.lobby_header__id {
}

.lobby_body {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: default;
}

.lobby__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.player__item {
  flex: 33%;
font-size: 35px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.lobby__bottom {
  display: flex;
  justify-content: center;
}

.kick__player {
  position: absolute;
  top: 10px;
  right: 10px;
}
.exit__lobby {
  position: absolute;
  top: 10px;
  left: 10px;
}
.player-ready {
  color: green; /* Зеленый цвет текста */
}
</style>