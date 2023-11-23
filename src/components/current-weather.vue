<template>
  <div class="flex--column-center">
    <Search />
    <Card
        v-if="isSuccess === 200 && !isError"
        :countryName="city.name.country"
        :cityName="city.name.city"
        :stateName="city.name.stateName"
        :dateUNIX="city.date"
        :weather="weather"
        :icon="weatherIcon"
        :main="main"
        :wind="wind"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Search       from './search';
import Card         from './card/index';

export default {
  name: 'CurrentWeather',
  components: { Search, Card },
  computed: {
    ...mapState({
      isError(state) {
        return state.isError;
      },
      isSuccess(state) {
        return state.isSuccess;
      },
      city(state) {
        return state.city;
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
