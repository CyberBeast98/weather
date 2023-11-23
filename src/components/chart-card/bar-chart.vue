<template>
  <ChartCard :isDarkTheme="isDarkTheme">
    <h3>{{ $t('charts.temperatureToday') }}</h3>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
  </ChartCard>
</template>

<script>
import { Bar }    from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ChartCard  from './chart-card';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { ChartCard, Bar },
  data() {
    return {
      chartData: {
        labels: null,
        datasets: [ { data: null, label: '' } ]
      },
      chartOptions: {
        responsive: true,
        backgroundColor: '#6f4875'
      },
      dateOptions: {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    }
  },
  props: {
    weatherList: { type: Array },
    isDarkTheme: { type: Boolean }
  },
  created() {
    this.init();
  },
  computed: {
    currentDate() {
      return this.weatherList.filter(i => new Date(i.dt_txt).toLocaleDateString('en-US', this.dateOptions).includes(new Date().toLocaleDateString('en-US', this.dateOptions)));
    }
  },
  methods: {
    temperature() {
      this.chartData.datasets[0].data = this.currentDate.map(i => (Number(i.main.feels_like) - 273).toFixed(0));
    },
    date() {
      this.chartData.labels = this.currentDate.map(i => new Date(i.dt_txt).toLocaleTimeString('en-US'));
    },
    init() {
      this.temperature();
      this.date();
    }
  }
}
</script>
