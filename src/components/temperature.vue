<template>
  <div class="temperature__block">
    <p class="temperature__text--description">Temperature</p>
    <div class="temperature__block-inner">
      <p class="temperature__text temperature__text--min">Min: {{ convertationToCelsius(main.temp_min) }}<sup>o</sup>C</p>
      <p class="temperature__text">Max: {{ convertationToCelsius(main.temp_max) }}<sup>o</sup>C</p>
    </div>
    <div class="temperature__block-inner">
      <p class="temperature__text temperature__text--min">Min: {{ main.temp_min }}K</p>
      <p class="temperature__text">Max: {{ main.temp_max }}K</p>
    </div>
    <div class="temperature__block-inner">
      <p class="temperature__text temperature__text--min">Min: {{ convertationToFahrenheit(main.temp_min) }}<sup>o</sup>F</p>
      <p class="temperature__text">Max: {{ convertationToFahrenheit(main.temp_max) }}<sup>o</sup>F</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Temperature',
  computed: {
    ...mapState({
      main(state) {
        return state.main;
      }
    })
  },
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
  padding: 10px 0;
  border-bottom: 1px solid #edf0f0;
}

.temperature__text--description {
  margin-bottom: 5px;
  font-size: 20px;
  text-decoration: underline;
}

.temperature__block-inner {
  display: flex;
  justify-content: space-between;
}

.temperature__text {
  width: 110px;
  margin-top: 5px;
  text-align: start;
}

.temperature__text--min {
  margin-right: 10px;
}
</style>
