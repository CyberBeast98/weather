<template>
  <div class="main" :class="{'full-height': isStartPage || weatherList.length === 0, 'text-light': isDarkTheme }">
    <Header />
    <div class="container" :class="{'full-height': isStartPage && pageWidth < 991, 'container--dark': isDarkTheme }">
      <span v-if="loader" class="loader"></span>
      <router-view v-else></router-view>
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
      },
      loader(state) {
        return state.loader;
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

.loader {
  width: 48px;
  height: 48px;
  align-self: center;
  border: 5px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: pulse 1s linear infinite;
}
.loader:after {
  content: '';
  position: absolute;
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: scaleUp 1s linear infinite;
}

@keyframes scaleUp {
  0% { transform: translate(-50%, -50%) scale(0) }
  60% , 100% { transform: translate(-50%, -50%)  scale(1)}
}
@keyframes pulse {
  0% , 60% , 100%{ transform:  scale(1) }
  80% { transform:  scale(1.2)}
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
