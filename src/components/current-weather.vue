<template>
  <div class="search__block flex-center">
    <input v-model="inputValue" type="text" placeholder="Enter city name">
    <button @click="clickHandler">Search</button>
  </div>
  <span v-if="isError">Wrong city name</span>
  <Card v-if="isSuccess === 200">
    <Name />
    <Description />
    <Temperature />
    <Wind />
  </Card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Card                       from './card';
import Wind                       from './wind';
import Description                from './description';
import Temperature                from './temperature';
import Name                       from './name';
import store                      from '../store';

export default {
  name: 'CurrentWeather',
  components: {
    Card,
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
      },
      isSuccess(state) {
        return state.isSuccess;
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

<style scoped>
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
