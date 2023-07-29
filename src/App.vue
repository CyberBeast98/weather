<template>
  <div class="main" :class="{'full-height': isStartPage || weatherList.length === 0 }">
    <Header />
    <div class="container" :class="{'full-height': isStartPage && pageWidth < 991 }">
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
  data() {
    return { pageWidth: window.innerWidth }
  },
  mounted() {
    this.$nextTick(() => window.addEventListener('resize', this.resizeWidth));
  },
  computed: {
    ...mapState({
      weatherList(state) {
        return state.weatherList;
      }
    }),
    isStartPage() {
      return this.$route.path === '/';
    }
  },
  methods: {
    resizeWidth() {
      this.pageWidth = window.innerWidth;
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

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  background-color: #87ceeb;
}


@media only screen and (max-width: 991px) {
  .main {
    display: unset;
  }

  .container {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px 0;
  }
}
</style>
