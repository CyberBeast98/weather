<template>
  <div class="switcher">
    <button :class="{'text-light border-light': isDarkTheme}" @click="switchLang('ua')">укр</button>
    <button :class="{'text-light border-light': isDarkTheme}" @click="switchLang('en')">en</button>
  </div>
</template>

<script setup>
import {useI18n} from 'vue-i18n';

const {locale} = useI18n({useScope: 'global'});
import { defineProps, toRefs } from "vue";

const props = defineProps({
  isDarkTheme: Boolean
});

const { isDarkTheme } = toRefs(props)

function switchLang(lang) {
  locale.value = lang
  localStorage.lang = lang
}
</script>

<style lang="scss" scoped>
.switcher button {
  background-color: transparent;
  border: none;
  padding: 3px 10px;
  font-size: 18px;
  cursor: pointer;

  &:first-child {
    border-right: 1px solid $text-color;
    padding-left: 0;
  }
}

.border-light.border-light {
  &:first-child {
    border-right: 1px solid $white;
  }
}

@media only screen and (max-width: 991px) {
  .switcher {
    width: 90%;
    margin: 0 auto 15px;
    z-index: 20;
  }
}
</style>