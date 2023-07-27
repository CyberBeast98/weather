<template>
  <div class="main" :class="{'main-vh': isStartPage || weatherList.length === 0 }">
    <Header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header       from './components/header';

export default {
  name: 'App',
  components: { Header },
  computed: {
    ...mapState({
      weatherList(state) {
        return state.weatherList;
      }
    }),
    isStartPage() {
      return this.$route.path === '/';
    }
  }
}
</script>

<style>
@import 'styles/main.css';

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;
}

.main {
  display: flex;
  height: 100%;
}

.main-vh {
  height: 100vh;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  background-color: #87ceeb;
}
</style>
