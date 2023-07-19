<template>
  <p class="name__block">{{ cityName }}, {{ countryName }}</p>
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
    dateUNIX: { type: Number },
    dateString: { type: String }
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
