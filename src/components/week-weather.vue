<template>
  <div class="flex--column-center">
    <div class="datepicker__block">
      <VueDatePicker
          v-model="date"
          format="MM.dd.yyyy"
          :enable-time-picker="false"
          @open="isOpen(true)"
          @closed="isOpen(false)"
          @cleared="isOpen(false)" />
    </div>
    <div class="flex--center flex--wrap">
      <div v-for="list in filteredList" :key="list.dt">
        <Card
            v-if="isSuccess === 200 && !isError"
            :countryName="name.country"
            :cityName="name.city"
            :stateName="name.stateName"
            :dateString="list.dt_txt"
            :main="list.main"
            :weather="list.weather[0]"
            :icon="list.weather[0].icon"
            :wind="list.wind"
        />
      </div>
    </div>
    <div
        v-if="isOpenCalendar"
        class="blur"
        @click="isOpen(false)"/>
  </div>
</template>

<script>
import { mapState }   from 'vuex';
import Card           from './card/index';
import VueDatePicker  from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'WeekWeather',
  components: { Card, VueDatePicker },
  data() {
    return {
      date: null,
      dateOptions: {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      },
      isOpenCalendar: false
    }
  },
  computed: {
    ...mapState({
      isError(state) {
        return state.isError;
      },
      isSuccess(state) {
        return state.isSuccess;
      },
      name(state) {
        return state.name;
      },
      weatherList(state) {
        return state.weatherList;
      }
    }),
    formattedDateFromDatepicker() {
      return this.date.toLocaleDateString('en-US', this.dateOptions);
    },
    filteredList() {
      if (this.date === null) return this.weatherList;

      this.isOpen(false);

      return this.weatherList.filter(i => new Date(i.dt_txt).toLocaleDateString('en-US', this.dateOptions).includes(this.formattedDateFromDatepicker));
    }
  },
  methods: {
    isOpen(status) {
      this.isOpenCalendar = status;

      if(status === true) return document.querySelector('body').style.overflow = 'hidden';

      return document.querySelector('body').style.overflow = 'visible';
    }
  }
}
</script>

<style scoped>
.test2 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.datepicker__block {
  width: 500px;
  margin-bottom: 20px;
  z-index: 9;
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  opacity: 50%;
}
</style>
