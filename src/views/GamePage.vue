<template>
  <div class="game">
    <div class="currentCard" v-if="currentCard.length">
      <div class="cards" v-for="card in currentCard" :key="card.id">
        <div :class="['cards-content', card.color]">
          {{ card.value }}
        </div>
      </div>
    </div>

    <div class="deck" @click="takeCard">
      <div class="cards">
        <div class="cards-content">
          Deck
        </div>
      </div>
    </div>

    <div class="player" v-for="player in players" :key="player.id+'1'" :class="`player-${player.position}`">
    <h2>{{ player.nickname }}</h2>
      <div class="cards" v-for="(card, index) in player.cards" :key="index" @click="moveCard(player.id, index)">
        <div :class="['cards-content', card.color]">
          {{ card.value }}
        </div>
      </div>
    </div>
    
    <div class="color-picker-modal" v-if="colorPickerVisible">
      <div class="color-options">
        <div class="color-square red" @click="selectColor('red')"></div>
        <div class="color-square yellow" @click="selectColor('yellow')"></div>
        <div class="color-square green" @click="selectColor('green')"></div>
        <div class="color-square blue" @click="selectColor('blue')"></div>
      </div>
    </div>

    <button class="uno-button" @click="announceUNO">UNO</button>

    <div class="player-cards-count" v-for="player in players" :key="player.id" :class="`player-${player.position}-cards-count`">
      <div class="cards-count-square" v-for="(cardCount, index) in player.cardsCount" :key="index"></div>
    </div>
  </div>
</template>

<script>

//
export default {
  components: {
  },
  data() {
    return {
      currentCard: [{ color: "", value: null }],
      selCard: null,
      colorPickerVisible: false,
      currentMove: null,
      players: [],
    };
  },
  async mounted() {
    this.usersPosition();
    this.tableCard();
    this.handleCard();
    this.otherUserCards();
    this.currentMoveUser();
    setInterval(this.tableCard, 1000);//проверка текущей карты на столе
    setInterval(this.handleCard, 1000);//проверка карт на руке
    setInterval(this.otherUserCards, 1000);
    setInterval(this.currentMoveUser, 1000);   

  },
  methods:{
    async announceUNO() {
      await this.$store.dispatch('mGame/unoMove');
      },
    async selectColor(color) {
      this.currentCard.color = color;
      console.log(this.currentCard.color)
      await this.$store.dispatch('mGame/moveCard', {color: color, value: this.selCard});
      document.querySelector('.currentCard .cards-content').classList.add(color);
      this.colorPickerVisible = false;
    },
    async tableCard() {
      try {
        const response = await this.$store.dispatch('mGame/gameData');
        const infoCard = await response.json();
        if(this.currentCard != infoCard.currentCards){
        this.currentCard = infoCard.currentCards;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleCard() {
      try {
        const response = await this.$store.dispatch('mUsers/userData');
        const userInfo = await response.json();
        const currentUserIndex = this.players.findIndex(player => player.id === userInfo.id);
        if (currentUserIndex !== -1) {
          this.players[currentUserIndex].cards = userInfo.cards.map(cards => ({
            color: cards.color,
            value: cards.value
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async moveCard(playerId, cardIndex) {
      try {
        const player = this.players.find(player => player.id === playerId);
        const selectedCard = player.cards[cardIndex];
        this.selCard = selectedCard.value;
        if (selectedCard.color === "special") {
          this.colorPickerVisible = true;
        } else {
          this.currentCard = [{ color: selectedCard.color, value: selectedCard.value }];
          await this.$store.dispatch('mGame/moveCard', selectedCard);
        }
        console.log(this.currentCard.color)
      } catch (error) {
        console.log(error);
      }
    },
    async takeCard() {
      try {
        await this.$store.dispatch('mGame/motionCard');
      } catch (error) {
        console.log(error);
      }
    },
    async otherUserCards() {
      try {
        const responseGameData = await this.$store.dispatch('mGame/gameData');
        const gameData = await responseGameData.json();
        const { userCardsField } = gameData;

        for (let i = 0; i < this.players.length; i++) {
          const currentPlayer = this.players[i];
          if (currentPlayer.position !== "bottom") {
            const playerInfo = userCardsField.find(player => player.id === currentPlayer.id);
            if (playerInfo) {
              currentPlayer.cardsCount = Array(playerInfo.countCardsards).fill('');
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async currentMoveUser() {//Прикрутить подсветку надо
      try {
        const responseGameData = await this.$store.dispatch('mGame/gameData'); // информация об игроке который сейчас будет ходить
        const gameData = await responseGameData.json();

        const responseLobbyPlayers = await this.$store.dispatch('mLobby/infoPlayers'); // информация обо всех игроках этого лобби
        const lobbyPlayers = await responseLobbyPlayers.json();

        const currentPlayerId = gameData.currentPlayerId;
        const currentPlayer = lobbyPlayers.find(player => player.id === currentPlayerId);
        this.currentMove = currentPlayer

      } catch (error) {
        console.log(error);
      }
    },
    async usersPosition() {
      try {
        const response = await this.$store.dispatch('mLobby/infoPlayers');
        const infoPlayers = await response.json();//информация об игроках в игре
        this.players = infoPlayers.map(player => ({ id: player.id, nickname: player.nickname }));//установка игроков и их имени

        const responseLobbyPlayers = await this.$store.dispatch('mUsers/userData');//информация о данном игроке
        const LobbyPlayers = await responseLobbyPlayers.json();
        const currentUserIndex = this.players.findIndex(player => player.id === LobbyPlayers.id);//ищем данного игрока
        this.players[currentUserIndex].position = "bottom";//установка его снизу экрана

        const positions = ["top", "left", "right"]; // распределение остальных игроков по сторонам экрана
        let positionIndex = 0;
        for (let i = 0; i < this.players.length; i++) {
            if (i !== currentUserIndex) {
                this.players[i].position = positions[positionIndex];
                positionIndex++;
                if (positionIndex >= positions.length) {
                    positionIndex = 0;
                }
            }
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
.game {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  height: 100vh;
  background-color: #ddd;
}

.currentCard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.deck {
  position: absolute;
  top: 50%;
  left: calc(50% + 100px);
  transform: translate(-50%, -50%);
  color: black;
}

.deck .cards {
  border: 1px solid rgb(0, 0, 0);
  margin: 10px;
  padding: 20px;
}

.deck .cards-content {
  text-align: center;
  font-size: 20px;
}

.player {
  position: absolute;
  color: black;
  display: flex;
}

.player-top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.player-right {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.player-bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.player-left {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.cards {
  border: 1px solid black;
  margin: 1px;
  padding: 20px;
}

.cards-content {
  text-align: center;
  font-size: 18px;
  color: black;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.green {
  background-color: green;
}

.yellow {
  background-color: yellow;
}

.color-options {
  display: flex;
  flex-direction: row; /* Изменяем направление на горизонтальное */
  margin-top: 150px;
}

.color-picker-modal {
  z-index: 9999;
  position: absolute;
}

.color-square {
  margin: 1px;
  border: 40px solid transparent;
}

.color-square:hover {
  border-color: black;
}

.red-text {
  color: red;
}

.yellow-text {
  color: yellow;
}

.green-text {
  color: green;
}

.blue-text {
  color: blue;
}

.uno-button {
  position: fixed;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 18px;
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.uno-button:hover {
  background-color: #ff6a36;
}

.player-cards-count {
  position: absolute;
}

.cards-count-square {
  width: 20px;
  height: 20px;
  background-color: black;
  margin: 2px; /* Добавляем небольшое расстояние между квадратами */
}

.player-top-cards-count {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
}

.player-top-cards-count .cards-count-square {
  width: 40px;
  height: 60px;
  background-color: black;
  margin-right: 1px; /* Добавляем небольшое расстояние между квадратами */
}

.player-right-cards-count {
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.player-left-cards-count {
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}


</style>
