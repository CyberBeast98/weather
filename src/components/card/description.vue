<template>
  <div class="description__block full-width flex--column-center">
    <img :src="setIcon" class="description__image" alt="weather">
    <span>{{ weather.description }}</span>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    weather: { type: Object },
    icon: { type: String }
  },
  computed: {
    setIcon() {
      return `http://api.openweathermap.org/img/w/${this.icon}.png`;
    }
  }
}
</script>
<style scoped>
.description__block {
  padding: 10px 0;
  border-bottom: 1px solid #edf0f0;
  text-transform: uppercase;
}

.description__image {
  width: 100px;
}
</style>
