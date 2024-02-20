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
            <player-element
              class="player__item"
              v-for="player in players"
              :key="player.id"
              :player="player"
            />
          </div>
        </div>
        <div class="lobby__bottom">
          <button-element
            class="lobby__button"
            classButton="button_white"
            @click="$router.push({ name: 'game' })"
            label="Начать игру"
          />
        </div>
      </div>
      <div class="kick__player">
        <button-element
          class="lobby-creator-block__button"
          classButton="button_white"
          @click="kickPlayer"
          label="Удалить игрока"
        />
        <player-element
          class="player__item"
          v-for="player in players"
          :key="player.id"
          :player="player"
        />
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
  </div>
</template>

<script>
import PlayerElement from "@/components/PlayerElement";
import ButtonElement from "@/components/ButtonElement";
export default {
  components: {
    PlayerElement,
    ButtonElement,
  },
  data() {
    return {
      players: [],
      code: "",
    };
  },
  async mounted() {
    this.loadPlayers(); // Загрузка игроков при монтировании компонента
    setInterval(this.loadPlayers, 5000); // Периодическое обновление списка игроков каждые 5 секунд
    this.code = localStorage.getItem('code'); // Установка кода игры из localStorage
  },
  methods: {
    async loadPlayers() {
      try {
        const response = await this.$store.dispatch('mLobby/infoPlayers');
        const infoPlayers = await response.json();
        this.players = infoPlayers.map(player => ({ name: player.nickname }));
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
  },
};
</script>

<style scoped>
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
font-size: 80px;
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
</style>
