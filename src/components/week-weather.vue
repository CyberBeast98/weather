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
    <div class="flex--start-between full-width time">
      <div v-for="date in allDatesWithoutDuplicates" :key="date" class="time__block">
        <button
            @click="sortDate(date)"
            class="time__button"
            :class="{'bg--dark text-light': isDarkTheme}">
          {{date}}
        </button>
      </div>
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
    <ScrollButton @scrollToTop="scrollToTop"/>
  </div>
</template>

<script>
import { mapState }   from 'vuex';
import Card           from './card/index';
import ScrollButton   from "./scroll-button";
import VueDatePicker  from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'WeekWeather',
  components: { ScrollButton, Card, VueDatePicker },
  data() {
    return {
      date: null,
      time: null,
      dateOptions: {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      },
      timeOptions: {
        hour: 'numeric'
      },
      isOpenCalendar: false,
      isTime: false
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
        return state.city.name;
      },
      weatherList(state) {
        return state.weatherList;
      },
      isDarkTheme(state) {
        return state.isDarkTheme;
      }
    }),
    formattedDateFromDatepicker() {
      return this.date.toLocaleDateString('en-US', this.dateOptions);
    },
    allDates() {
      return this.weatherList.map(i => new Date(i.dt_txt).toLocaleTimeString('en-US', this.timeOptions));
    },
    allDatesWithoutDuplicates() {
      return Array.from(new Set(this.allDates))
    },
    filteredList() {
      if(this.time && this.date) {
        const test = this.weatherList.filter(i => new Date(i.dt_txt).toLocaleDateString('en-US', this.dateOptions).includes(this.formattedDateFromDatepicker));
        return test.filter(i => new Date(i.dt_txt).toLocaleTimeString('en-US', this.timeOptions).includes(this.time));
      }

      if(this.time) {
        return this.weatherList.filter(i => new Date(i.dt_txt).toLocaleTimeString('en-US', this.timeOptions).includes(this.time));
      }

      if (this.date === null) return this.weatherList;

      this.isOpen(false);

      return this.weatherList.filter(i => new Date(i.dt_txt).toLocaleDateString('en-US', this.dateOptions).includes(this.formattedDateFromDatepicker));
    }
  },
  methods: {
    isOpen(status) {
      this.time = null
      this.isOpenCalendar = status;

      if (status === true) return document.querySelector('body').style.overflow = 'hidden';

      return document.querySelector('body').style.overflow = 'visible';
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    sortDate(date) {
      this.time = date;
    }
  }
}
</script>

<style lang="scss" scoped>
.datepicker__block {
  width: 500px;
  margin-bottom: 20px;
  z-index: 9;
}

.time__block {
  width: 100%;
  margin: 0 5px;
}

.time__button {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  color: $text-color;
  background-color:  $white;
  border-radius: 4px;
  box-shadow: 0 0 49px -17px rgba(0, 0, 0, 0.75);
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $blur-color;
  opacity: 50%;
}

@media only screen and (max-width: 600px) {
  .datepicker__block {
    width: 90%;
  }

  .time {
    flex-wrap: wrap;
  }

  .time__block {
    width: 20%;
    margin: 5px;
  }
}
</style>
