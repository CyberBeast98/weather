<template>
  <div class="full-width">
    <p class="description">{{ $t('wind.title') }}</p>
    <div class="wind__block">
      <p class="wind__text">{{ $t('wind.speed') }}: {{ wind.speed }} meter/sec</p>
      <p class="wind__text">{{ $t('wind.gust') }}: {{ wind.gust }} meter/sec</p>
      <p class="wind__text">{{ $t('wind.degrees') }}: {{ wind.deg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wind',
  props: { wind: { type: Object } }
}
</script>
<style lang="scss" scoped>
.wind__block {
  text-align: start;
}

.wind__text {
  margin-bottom: 5px;
}
</style>