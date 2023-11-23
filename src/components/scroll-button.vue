<template>
  <button @click="$emit('scrollToTop')">
    <img src="../assets/icons/down.svg" alt="down-icon">
  </button>
</template>

<script>
export default {
  name: 'ScrollButton'
}
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: transparent;
  border-radius: 50%;
  transform: rotate(180deg);
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
