import { createStore } from 'vuex'

const url = 'http://api.openweathermap.org/';

const store = createStore({
  state: {
    name: {
      city: null,
      country: null
    },
    weather: [],
    main: {},
    icon: null,
    isError: false,
    apiKey: '',
    weatherEndpoint: null
  },

  actions: {
    getGeocording(context, params) {
      context.commit('setError', false);
      fetch(params.geocording)
        .then(response => response.json())
        .then(response => {
          context.commit('setWeatherEndpoint', `${url}data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${context.state.apiKey}`)
        })
        .then(() => context.dispatch('getCurrentWeather'))
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
          context.commit('setCountryName', response.sys.country);
          context.commit('setCityName', response.name);
          context.commit('setWeatherIcon', `${url}img/w/${response.weather[0].icon}.png`);
          context.commit('setWeather', response.weather[0]);
          context.commit('setMain', response.main);
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
    setWeatherIcon(state, data) {
      state.icon = data;
    },
    setWeather(state, data) {
      state.weather = data;
    },
    setMain(state, data) {
      state.main = data;
    },
    setError(state, status) {
      state.isError = status;
    },
  }
});

export default store