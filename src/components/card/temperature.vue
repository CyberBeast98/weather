<template>
  <div class="temperature__block">
    <p class="description">Temperature</p>
    <div class="temperature__block-inner">
      <p class="temperature__text">Min: {{ convertationToCelsius(main.temp_min) }}<sup>o</sup>C</p>
      <p class="temperature__text">Max: {{ convertationToCelsius(main.temp_max) }}<sup>o</sup>C</p>
    </div>
    <div class="temperature__block-inner">
      <p class="temperature__text">Min: {{ convertationToFahrenheit(main.temp_min) }}<sup>o</sup>F</p>
      <p class="temperature__text">Max: {{ convertationToFahrenheit(main.temp_max) }}<sup>o</sup>F</p>
    </div>
    <div class="temperature__block-inner">
      <p class="temperature__text">Min: {{ main.temp_min }}K</p>
      <p class="temperature__text">Max: {{ main.temp_max }}K</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Temperature',
  props: { main: { type: Object } },
  methods: {
    convertationToCelsius(temperature) {
      return (Number(temperature) - 273).toFixed(0);
    },
    convertationToFahrenheit(temperature) {
      return (1.8 * (Number(temperature) - 273) + 32).toFixed(1);
    }
  }
}
</script>
<style scoped>
.temperature__block {
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #edf0f0;
}

.temperature__block-inner {
  display: flex;
  justify-content: space-between;
}

.temperature__text {
  width: 110px;
  margin-bottom: 5px;
  text-align: start;
}
</style>
