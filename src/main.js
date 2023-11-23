import { createApp }  from 'vue';
import App            from './App.vue';
import router         from './router';
import store          from './store';
import VueDatePicker  from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { createI18n } from 'vue-i18n'
import {languages, defaultLocale} from "./i18n";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.lang || defaultLocale,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: Object.assign(languages)
})

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .component('VueDatePicker', VueDatePicker)
  .mount('#app');
