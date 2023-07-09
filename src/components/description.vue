<template>
  <div class="description__block">
    <img :src="weatherIcon" class="description__image" alt="weather">
    <span>{{ weather.description }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Description',
  computed: {
    ...mapState({
      weatherIcon(state) {
        return state.icon;
      },
      weather(state) {
        return state.weather;
      }
    })
  }
}
</script>
<style scoped>
.description__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #edf0f0;
  text-transform: uppercase;
}

.description__image {
  width: 100px;
}
</style>
