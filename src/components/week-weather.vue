<template>
  <div v-for="list in weatherList" :key="list.dt">
    <Card
        :countryName="countryName"
        :cityName="cityName"
        :dateString="list.dt_txt"
        :main="list.main"
        :weather="list.weather[0]"
        :icon="list.weather[0].icon"
        :wind="list.wind"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card         from './card/index';

export default {
  name: 'WeekWeather',
  components: { Card },
  computed: {
    ...mapState({
      countryName(state) {
        return state.name.country;
      },
      cityName(state) {
        return state.name.city;
      },
      weatherList(state) {
        return state.weatherList;
      }
    })
  }
}
</script>
