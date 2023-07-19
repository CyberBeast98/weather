<template>
  <header class="header">
    <h2 class="header__title">Weather App</h2>
    <router-link to="/" class="header__link link">Current Weather</router-link>
    <router-link to="/week" class="header__link link">5 Days Weather</router-link>
    <router-link v-show="isGeolocateAllow" to="/location" class="header__link link">Your Weather</router-link>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState({
      isGeolocateAllow(state) {
        return state.isGeolocateAllow;
      }
    })
  }
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: column;
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
