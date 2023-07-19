<template>
  <div class="current-weather__block">
    <div class="search__block flex-center">
      <input
          v-model="inputValue"
          type="text"
          placeholder="Enter city name"
          @keyup.enter="clickHandler">
      <button @click="clickHandler">Search</button>
    </div>
    <span v-if="isError">Wrong city name</span>
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
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Card                       from './card/index';
import store                      from '../store';

export default {
  name: 'CurrentWeather',
  components: { Card },
  data() {
    return { inputValue: null }
  },
  computed: {
    ...mapState({
      apiKey(state) {
        return state.apiKey;
      },
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
    }),
    geocording() {
      return `http://api.openweathermap.org/geo/1.0/direct?q=${this.inputValue}&limit=1&appid=${this.apiKey}`;
    }
  },
  methods: {
    ...mapMutations({ setError: 'setError' }),
    async clickHandler() {
      await store.dispatch('getGeocording', { geocording: this.geocording })
          .then(() => {
            this.inputValue = null;
            setTimeout(() => this.setError(false), 5000);
          });
    }
  }
}
</script>

<style scoped>
.current-weather__block {
  display: flex;
  flex-direction: column;
}

.search__block input {
  padding: 10px 5px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 20px;
}

.search__block input:focus {
  outline: none;
}

.search__block button {
  border: none;
  border-left: 1px solid #edf0f0;
  border-radius: 0 4px 4px 0;
  padding: 10px 5px;
  background-color: #ffffff;
  color: #C0C0C0;
  font-size: 20px;
}

@media only screen and (max-width: 600px) {
  .search__block, .search__block input {
    width: 100%;
  }
}
</style>
