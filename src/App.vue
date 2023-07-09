<template>
  <div class="container">
    <div class="search__block">
      <input v-model="inputValue" type="text" placeholder="Enter city name">
      <button @click="clickHandler">Search</button>
    </div>
    <span v-if="isError">Wrong city name</span>
    <div class="weather__block">
      <name />
      <description />
      <temperature />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import store                      from './store';
import Name                       from './components/name';
import Temperature                from './components/temperature';
import Description                from './components/description';

export default {
  name: 'App',
  components: {
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
  height: 100vh;
  justify-content: start;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 20px;
  background-color: #74e6f7;
}

.search__block {
  display: flex;
  justify-content: center;
  align-items: center;
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
  max-width: 250px;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 0 49px -17px rgba(0, 0, 0, 0.75);
}
</style>
