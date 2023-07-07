<template>
  <div class="container">
    <div class="search__block">
      <input type="text" v-model="inputValue" placeholder="Enter city name">
      <button @click="clickHandler" :disabled="inputValue === null">Search</button>
    </div>
    <span v-if="isError">Wrong city name</span>
    <div v-else class="weather__block">
      <img v-if="icon !== null" :src="icon" alt="weather">
      <p>{{ lat }}</p>
    </div>
    <current-location />
  </div>
</template>

<script>
import CurrentLocation            from './components/currentLocation';
import store                      from './store';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: { CurrentLocation },
  data() {
    return {
      inputValue: null,
      apiKey: '',
      icon: null,
      description: null,
      country: null,
      city: null
    }
  },
  computed: {
    ...mapState({
      lat(state) {
        return state.lat
      },
      isError(state) {
        return state.isError
      }
    }),
    geocording() {
      return `http://api.openweathermap.org/geo/1.0/direct?q=${this.inputValue}&limit=1&appid=${this.apiKey}`;
    },
    currentWeather() {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    }
  },
  methods: {
    ...mapMutations({
      setError: 'setError'
    }),
    async clickHandler() {
      await store.dispatch('getGeocording', { geocording: this.geocording })
          .then(() => {
            this.inputValue = null;
            setTimeout(() => this.setError(false), 5000);
          });
    },
    getCurrentWeather() {
      fetch(this.currentWeather)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            this.country = response.sys.country;
            this.city = response.name;
            this.icon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
            this.description = response.weather[0].description;
          })
          .catch(() => this.showErrorMessage());
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search__block {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather__block {
  max-width: 200px;
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 49px -17px rgba(0, 0, 0, 0.75);
}
</style>
