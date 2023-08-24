<template>
  <header class="header flex--column-start">
    <div class="header__block">
      <h2 class="header__title">Weather App</h2>
      <button
          class="header__button"
          :class="{ 'header__button--close': isOpen }"
          @click="toggleMenu">
        <img
            src="../assets/icons/down.svg"
            class="header__icon"
            alt="toggle-icon">
      </button>
    </div>
    <div class="flex--column-start full-width header__links" :class="{ 'header__links--show': isOpen }">
      <router-link
          to="/"
          class="header__link full-width link"
          @click="isOpen = false">
          Current Weather
      </router-link>
      <router-link
          to="/week"
          class="header__link full-width link"
          @click="isOpen = false">
          5 Days Weather
      </router-link>
      <router-link
          to="/charts"
          class="header__link full-width link"
          @click="isOpen = false">
        Charts
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import store from "../store";

export default {
  name: 'Header',
  created() {
    console.log('123')
    if (!localStorage.inputValue) {
      this.getLocation();
    }
  },
  data() {
    return { isOpen: false }
  },
  mounted() {
    if (localStorage.inputValue) {
      this.inputValue = localStorage.inputValue;

      store.dispatch('getGeocording', { geocording: this.geocording })
    }
  },
  computed: {
    ...mapState({
      isGeolocateAllow(state) {
        return state.isGeolocateAllow;
      },
      apiKey(state) {
        return state.apiKey;
      },
    }),
    geocording() {
      return `http://api.openweathermap.org/geo/1.0/direct?q=${localStorage.inputValue}&limit=1&appid=${this.apiKey}`;
    },
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
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 190px;
  padding: 20px;
  background-color: $white;
}

.header__block {
  position: relative;
}

.header__button {
  display: none;
}

.header__title {
  margin-bottom: 20px;
}

.header__link {
  margin-bottom: 20px;
  font-size: 18px;
  transition: 0.3s;
}

@media only screen and (max-width: 991px) {
  .header {
    width: 100%;
    padding: 0;
  }

  .header__block {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $white;
    width: 100%;
    padding: 20px 0;
    z-index: 30;
  }

  .header__button {
    position: absolute;
    right: 20px;
    display: block;
    width: 25px;
    height: 25px;
    background-color: transparent;
    border: none;
    transition: 0.5s;

    .header__icon {
      width: 25px;
      height: 25px;
    }
  }


  .header__button--close {
    transform: rotate(180deg);
    transition: 0.5s;
  }

  .header__title {
    margin-bottom: 0;
  }

  .header__links {
    position: absolute;
    top: -100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: $white;
    transition: 0.5s;
    z-index: 20;
  }

  .header__links--show {
    top: 67px;
    transition: 0.5s;
  }

  .header__link {
    margin: 10px 0;
    text-align: center;
  }
}
</style>
