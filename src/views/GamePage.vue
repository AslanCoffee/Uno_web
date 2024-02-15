<template>
  <div class="game">
    <div class="deck" v-if="deck.length">
      <div class="card" v-for="card in deck" :key="card.id">
        <div :class="['card-content', card.color]">
          {{ card.number }}
        </div>
      </div>
    </div>

    <div
      class="player"
      v-for="player in players"
      :key="player.id"
      :class="`player-${player.position}`"
    >
      <h2>{{ player.name }}</h2>
      <div class="card" v-for="card in player.cards" :key="card.id">
        <div :class="['card-content', card.color]">
          {{ card.number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deck: [{ id: 5, color: "red", number: 2 }],
      players: [
        {
          id: 1,
          name: "Иван",
          position: "top",
          cards: [{ id: 1, color: "red", number: 7 }],
        },
        {
          id: 2,
          name: "Лариса",
          position: "right",
          cards: [{ id: 2, color: "blue", number: 3 }],
        },
        {
          id: 3,
          name: "Аслан",
          position: "bottom",
          cards: [{ id: 3, color: "green", number: 5 }],
        },
        {
          id: 4,
          name: "Кирилл",
          position: "left",
          cards: [{ id: 4, color: "yellow", number: 9 }],
        },
        // Add more players and cards as needed
      ],
    };
  },
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

.deck {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.player {
  position: absolute;
  color: black;
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

.card {
  border: 1px solid black;
  margin: 10px;
  padding: 20px;
}

.card-content {
  text-align: center;
  font-size: 20px;
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
</style>
