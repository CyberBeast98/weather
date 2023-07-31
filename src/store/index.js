import { createStore } from 'vuex'
import axios           from 'axios';

const url = 'http://api.openweathermap.org/';

const store = createStore({
  state: {
    name: {
      city: null,
      country: null,
      stateName: null
    },
    date: null,
    weather: [],
    wind: {},
    main: {},
    icon: null,
    isError: false,
    apiKey: '',
    weatherEndpoint: null,
    forecast5DayEndpoint: null,
    isSuccess: null,
    weatherList: [],
    isGeolocateAllow: false
  },

  actions: {
    getGeocording(context, params) {
      context.commit('setError', false);
      axios.get(params.geocording)
        .then(response => response.data)
        .then(response => {
          console.log(response);
          context.commit('setCountryName', response[0].country);
          context.commit('setCityName', response[0].name);
          context.commit('setStateName', response[0].state);
          context.commit('setWeatherEndpoint', `${url}data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${context.state.apiKey}`);
          context.commit('setForecast5DayEndpoint', `${url}data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=${context.state.apiKey}`);
        })
        .then(() => {
          context.dispatch('getCurrentWeather');
          context.dispatch('get5DayWeather');
        })
        .catch(() => {
          context.commit('setError', true);
        });
    },
    getCurrentWeather(context) {
      axios.get(context.state.weatherEndpoint)
        .then(response => response.data)
        .then(response => {
          context.commit('setWeatherIcon', response.weather[0].icon);
          context.commit('setWeather', response.weather[0]);
          context.commit('setMain', response.main);
          context.commit('setWind', response.wind);
          context.commit('setDate', response.dt);
          context.commit('setSuccess', response.cod);
        });
    },
    get5DayWeather(context) {
      axios.get(context.state.forecast5DayEndpoint)
        .then(response => response.data)
        .then(response => {
          context.commit('setWeatherList', response.list)

          if (context.state.name.city === null) {
            context.commit('setCountryName', response.city.country);
            context.commit('setCityName', response.city.name);
          }
        });
    }
  },
  mutations: {
    setCountryName(state, data) {
      state.name.country = data;
    },
    setCityName(state, data) {
      state.name.city = data;
    },
    setStateName(state, data) {
      state.name.stateName = data;
    },
    setWeatherEndpoint(state, data) {
      state.weatherEndpoint = data;
    },
    setForecast5DayEndpoint(state, data) {
      state.forecast5DayEndpoint = data;
    },
    setWeatherIcon(state, data) {
      state.icon = data;
    },
    setWeather(state, data) {
      state.weather = data;
    },
    setMain(state, data) {
      state.main = data;
    },
    setWind(state, data) {
      state.wind = data;
    },
    setDate(state, data) {
      state.date = data;
    },
    setError(state, status) {
      state.isError = status;
    },
    setSuccess(state, status) {
      state.isSuccess = status;
    },
    setWeatherList(state, data) {
      state.weatherList = data;
    },
    setGeolocateAllow(state, status) {
      state.isGeolocateAllow = status;
    },
  }
});

export default store;