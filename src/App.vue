<template>
  <div class="main" :class="{'full-height': isStartPage || weatherList.length === 0, 'text--light': isDarkTheme }">
    <Header />
    <div class="container" :class="{'full-height': isStartPage && pageWidth < 991, 'container--dark': isDarkTheme }">
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
      },
      isDarkTheme(state) {
        return state.isDarkTheme;
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

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;
}

.main {
  display: flex;
  height: 100%;
  color: $text-color;
}

.text--light {
  color: $white;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  background-color: $main-color;
}

.container--dark {
  background-color: #1c2128;
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
