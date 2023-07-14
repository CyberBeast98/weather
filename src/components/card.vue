<template>
  <div class="weather__block">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>
<style scoped>
.weather__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 0 49px -17px rgba(0, 0, 0, 0.75);
}

@media only screen and (max-width: 600px) {
  .weather__block {
    width: 100%;
  }
}
</style>