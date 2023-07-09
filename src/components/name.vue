<template>
  <p class="name__block">{{ cityName }}, {{ countryName }}</p>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Name',
  computed: {
    ...mapState({
      countryName(state) {
        return state.name.country;
      },
      cityName(state) {
        return state.name.city;
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