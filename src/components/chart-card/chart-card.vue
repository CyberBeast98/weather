<template>
  <div class="chart__block">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ChartCard'
}
</script>
<style lang="scss" scoped>
.chart__block {
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 4px;
  background-color: $white;
  box-sizing: border-box;
  box-shadow: 0 0 49px -17px rgba(0, 0, 0, 0.75);
}
</style>
