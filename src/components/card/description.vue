<template>
  <div class="description__block full-width flex--column-center">
    <img :src="setIcon" class="description__image" alt="weather">
    <span>{{ weather.main }}</span>
  </div>
</template>

<script>

import cloud from '../../assets/cloud.png'
import clear from '../../assets/clear.png'

export default {
  name: 'Description',
  props: {
    weather: { type: Object },
    icon: { type: String }
  },
  computed: {
    setIcon() {
      switch (this.weather.main) {
        case 'Clouds':
          return cloud;
        case 'Clear':
          return clear;
        default:
          console.log('Something wrong');
          break;
      }
      return false;
    }
  }
}
</script>
<style lang="scss" scoped>
.description__block {
  padding: 0 0 10px 0;
  border-bottom: 1px solid $border-color;
  text-transform: uppercase;
}

.description__image {
  width: 130px;
  margin-bottom: 20px;
}
</style>
