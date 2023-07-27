<template>
  <header class="header flex--column-start">
    <h2 class="header__title">Weather App</h2>
    <router-link to="/" class="header__link link">Current Weather</router-link>
    <router-link to="/week" class="header__link link">5 Days Weather</router-link>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  created() {
    this.getLocation();
  },
  computed: {
    ...mapState({
      isGeolocateAllow(state) {
        return state.isGeolocateAllow;
      },
      apiKey(state) {
        return state.apiKey;
      }
    })
  },
  methods: {
    getLocation() {
      const successCallback = (position) => {
        const url = 'http://api.openweathermap.org/';
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.$store.commit('setGeolocateAllow', true);
        this.$store.commit('setWeatherEndpoint', `${url}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
        this.$store.commit('setForecast5DayEndpoint', `${url}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
        this.$store.dispatch('getCurrentWeather');
        this.$store.dispatch('get5DayWeather');
      };

      navigator.geolocation.getCurrentPosition(successCallback);
    }
  }
}
</script>
<style scoped>
.header {
  width: 190px;
  padding: 20px;
}

.header__title {
  margin-bottom: 20px;
}

.header__link {
  margin-bottom: 20px;
  font-size: 18px;
  transition: 0.3s;
}
</style>
