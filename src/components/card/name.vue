<template>
  <p class="name__block">{{ cityName }}, {{ setStateName }} {{ countryName }}</p>
  <Time :timeUNIX="dateUNIX" :dateString="dateString"/>
</template>

<script>
import Time from './time';

export default {
  name: 'Name',
  components: { Time },
  props: {
    countryName: { type: String },
    cityName: { type: String },
    stateName: { type: String },
    dateUNIX: { type: Number },
    dateString: { type: String }
  },
  computed: {
    setStateName() {
      return this.stateName === null || this.stateName === undefined ? '' : `${this.stateName},`;
    }
  }
}
</script>
<style scoped>
.name__block {
  max-width: 300px;
  font-size: 28px;
  font-weight: 600;
  text-decoration: underline;
}
</style>
