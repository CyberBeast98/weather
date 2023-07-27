<template>
  <div class="flex--column-center">
    <Search />
    <Card
        v-if="isSuccess === 200 && !isError"
        :countryName="name.country"
        :cityName="name.city"
        :stateName="name.stateName"
        :dateUNIX="date"
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
      name(state) {
        return state.name;
      },
      date(state) {
        return state.date;
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
