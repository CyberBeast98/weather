<template>
  <div class="weather__block flex--column-center" :class="{ 'bg--dark': isDarkTheme }">
    <Name
        :countryName="countryName"
        :cityName="cityName"
        :stateName="stateName"
        :dateUNIX="dateUNIX"
        :dateString="dateString"/>
    <Description :weather="weather" :icon="icon"/>
    <Temperature :main="main"/>
    <Wind :wind="wind"/>
  </div>
</template>

<script>
import Name         from './name';
import Description  from './description';
import Temperature  from './temperature';
import Wind         from './wind';
import {mapState} from "vuex";

export default {
  name: 'Card',
  components: {
    Wind,
    Temperature,
    Description,
    Name
  },
  props: {
    countryName: { type: String },
    cityName: { type: String },
    stateName: { type: String },
    dateUNIX: { type: Number },
    dateString: { type: String },
    weather: { type: Object },
    icon: { type: String },
    main: { type: Object },
    wind: { type: Object }
  },
  computed: {
    ...mapState({
      isDarkTheme(state) {
        return state.isDarkTheme;
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.weather__block {
  min-width: 300px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  background-color: $white;
  box-sizing: border-box;
  box-shadow: 0 0 49px -17px rgba(0, 0, 0, 0.75);
}

@media only screen and (max-width: 600px) {
  .weather__block {
    width: 100%;
    margin: 20px 0;
  }
}

@media only screen and (max-width: 400px) {
  .weather__block {
    width: 90%;
  }
}
</style>
