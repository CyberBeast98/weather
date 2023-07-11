<template>
  <div class="container">
    <div class="search__block flex-center">
      <input v-model="inputValue" type="text" placeholder="Enter city name">
      <button @click="clickHandler">Search</button>
    </div>
    <span v-if="isError">Wrong city name</span>
    <div class="weather__block">
      <name />
      <description />
      <temperature />
      <wind />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import store                      from './store';
import Name                       from './components/name';
import Temperature                from './components/temperature';
import Description                from './components/description';
import Wind from "./components/wind";

export default {
  name: 'App',
  components: {
    Wind,
    Description,
    Temperature,
    Name
  },
  data() {
    return {
      inputValue: null,
      apiKey: ''
    }
  },
  computed: {
    ...mapState({
      isError(state) {
        return state.isError;
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
          })
    }
  }
}
</script>

<style>
@import "styles/main.css";
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #74e6f7;
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


.weather__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 0 49px -17px rgba(0, 0, 0, 0.75);
}

@media only screen and (max-width: 600px) {
  .weather__block {
    width: 100%;
  }

  .search__block, .search__block input {
    width: 100%;
  }
}
</style>
