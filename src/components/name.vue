<template>
  <p class="name__block">{{ cityName }}, {{ countryName }}</p>
  <Time :timeUNIX="date"/>
</template>

<script>
import { mapState } from 'vuex';
import Time         from './time';

export default {
  name: 'Name',
  components: { Time },
  computed: {
    ...mapState({
      countryName(state) {
        return state.name.country;
      },
      cityName(state) {
        return state.name.city;
      },
      date(state) {
        return state.date
      }
    })
  }
}
</script>
<style scoped>
.name__block {
  font-size: 28px;
  font-weight: 600;
  text-decoration: underline;
}
</style>