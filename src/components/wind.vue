<template>
  <div class="full-width">
    <p class="description">Wind</p>
    <div class="wind__block">
      <p class="wind__text">Speed: {{ wind.speed }} meter/sec</p>
      <p class="wind__text">Gust: {{ wind.gust }} meter/sec</p>
      <p class="wind__text">Degrees: {{ wind.deg }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Wind',
  computed: {
    ...mapState({
      wind(state) {
        return state.wind;
      }
    })
  }
}
</script>
<style scoped>
.wind__block {
  text-align: start;
}

.wind__text {
  margin-bottom: 5px;
}
</style>