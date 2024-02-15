<template>
  <div class="container">
    <div class="row">
      <div class="player-wrapper">
        <div class="player-header">
          <div class="player-title">
            <h3 class="player__name">{{ player.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
  },
};
</script>
<style scoped>
.player-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #373334;
  color: #eeeeee;
}

.player__name {
  font-size: 20px;
  font-weight: 700;
  line-height: 27px;
}
</style>
