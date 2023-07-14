import { createRouter, createWebHistory } from 'vue-router';
import CurrentWeather                     from  '../components/current-weather'
import WeekWeather                        from '../components/week-weather'

const routes = [
  {
    path: '/',
    name: 'Current Weather',
    component: CurrentWeather
  },
  {
    path: '/week',
    name: 'WeekWeather',
    component: WeekWeather
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  routes
})

export default router;
