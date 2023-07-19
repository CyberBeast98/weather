<template>
  <Card
      v-if="isSuccess === 200"
      :countryName="countryName"
      :cityName="cityName"
      :dateUNIX="date"
      :weather="weather"
      :icon="weatherIcon"
      :main="main"
      :wind="wind"
  />
</template>

<script>
import { mapState } from 'vuex';
import Card         from './card/index';

export default {
  name: 'CurrentLocation',
  components: { Card },
  mounted() {
    this.$store.dispatch('getCurrentWeather');
  },
  computed: {
    ...mapState({
      isError(state) {
        return state.isError;
      },
      isSuccess(state) {
        return state.isSuccess;
      },
      countryName(state) {
        return state.name.country;
      },
      cityName(state) {
        return state.name.city;
      },
      date(state) {
        return state.date
      },
      weatherIcon(state) {
        return state.icon;
      },
      weather(state) {
        return state.weather;
      },
      main(state) {
        return state.main;
      },
      wind(state) {
        return state.wind;
      }
    })
  }
}
</script>
