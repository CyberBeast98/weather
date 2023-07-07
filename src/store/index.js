import { createStore } from 'vuex'

const store = createStore({
  state: {
    lat: null,
    lon: null,
    isError: false
  },

  actions: {
    getGeocording(context, params) {
      context.commit('setError', false);
      fetch(params.geocording)
        .then(response => response.json())
        .then(response => {
          context.commit('setLat', response[0].lat);
          context.commit('setLon', response[0].lon);
        })
        .catch(() => {
          context.commit('setError', true);
        });
    },
  },

  mutations: {
    setLat(state, data) {
      state.lat = data;
    },
    setLon(state, data) {
      state.lon = data;
    },
    setError(state, status) {
      state.isError = status;
    },
  }
});

export default store

