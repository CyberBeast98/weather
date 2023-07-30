<template>
  <div class="search__block flex-center">
    <input
        v-model="inputValue"
        type="text"
        class="search__input"
        :class="{ 'error-border': showError }"
        placeholder="Enter city name"
        @keyup.enter="clickHandler">
    <button @click="clickHandler" :disabled="isDisabled">
      <img
          v-if="isDisabled"
          src="../assets/icons/search-disabled.svg"
          alt="search-icon">
      <img
          v-else
          src="../assets/icons/search.svg"
          alt="search-icon">
    </button>
    <span v-if="showError" class="error__text">Wrong city name</span>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import store                      from '../store';

export default {
  name: 'Search',
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
      }
    }),
    geocording() {
      return `http://api.openweathermap.org/geo/1.0/direct?q=${this.inputValue}&limit=1&appid=${this.apiKey}`;
    },
    showError() {
      return this.isError && this.inputValue === null;
    },
    isDisabled() {
      return this.inputValue === null || this.inputValue.length === 0
    }
  },
  methods: {
    ...mapMutations({ setError: 'setError' }),
    async clickHandler() {
      await store.dispatch('getGeocording', { geocording: this.geocording })
          .then(() => this.inputValue = null);
    }
  }
}
</script>

<style lang="scss" scoped>
.search__block {
  position: relative;
  width: 335px;
  margin-bottom: 25px;

  .search__input {
    width: 100%;
    padding: 10px 5px;
    border: 2px solid transparent;
    border-radius: 4px;
    font-size: 20px;

    &:focus {
      outline: none;
    }
  }

  button {
    position: absolute;
    right: -9px;
    top: 9px;
    display: flex;
    border: none;
    padding: 5px;
    background-color: $white;
    cursor: pointer;
  }

  img {
    width: 20px;
  }
}

.error__text {
  position: absolute;
  left: 0;
  bottom: -22px;
  color: $error-color;
  font-size: 16px;
}

.error-border {
  border: 2px solid $error-color !important;
}

@media only screen and (max-width: 600px) {
  .search__block {
    .search__input {
      width: 96%;
    }

    button {
      right: 9px;
    }
  }
}
</style>
