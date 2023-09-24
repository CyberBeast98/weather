<template>
  <div class="description__block full-width flex--column-center">
    <img :src="setIcon" class="description__image" alt="weather">
    <span>{{ weather.main }}</span>
  </div>
</template>

<script>

import Cloud from '../../assets/cloud.png'
import Clear from '../../assets/clear.png'
import Rain from '../../assets/rain.png'
import Snow from '../../assets/snow.png'

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
          return Cloud;
        case 'Clear':
          return Clear;
        case 'Rain':
          return Rain;
        case 'Snow':
          return Snow;
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
