<template>
  <BarChart :weatherList="weatherList"/>
</template>

<script>
import BarChart from "./chart-card/bar-chart";
import {mapState} from "vuex";

export default {
  name: 'Charts',
  components: { BarChart },
  computed: {
    ...mapState({
      weatherList(state) {
        return state.weatherList;
      }
    })
  }
}
</script>
