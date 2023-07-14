import { createStore } from 'vuex'

const url = 'http://api.openweathermap.org/';

const store = createStore({
  state: {
    name: {
      city: null,
      country: null
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
    isSuccess: null
  },

  actions: {
    getGeocording(context, params) {
      context.commit('setError', false);
      fetch(params.geocording)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          context.commit('setCountryName', response[0].country);
          context.commit('setCityName', response[0].name);
          context.commit('setWeatherEndpoint', `${url}data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${context.state.apiKey}`)
          context.commit('setForecast5DayEndpoint', `${url}data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=${context.state.apiKey}`)
        })
        .then(() => {
          context.dispatch('getCurrentWeather');
          context.dispatch('get5DayWeather');
        })
        .catch(() => {
          context.commit('setError', true);
          context.commit('setCountryName', null);
        });
    },
    getCurrentWeather(context) {
      fetch(context.state.weatherEndpoint)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          context.commit('setWeatherIcon', `${url}img/w/${response.weather[0].icon}.png`);
          context.commit('setWeather', response.weather[0]);
          context.commit('setMain', response.main);
          context.commit('setWind', response.wind);
          context.commit('setDate', response.dt);
          context.commit('setSuccess', response.cod);
        });
    },
    get5DayWeather(context) {
      fetch(context.state.forecast5DayEndpoint)
        .then(response => response.json())
        .then(response => {
          console.log(response);
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
  }
});

export default store