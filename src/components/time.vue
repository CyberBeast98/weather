<template>
  <p class="time__block full-width">{{ formattedDate }}</p>
</template>

<script>
export default {
  name: 'Time',
  props: {
    timeUNIX: { type: Number }
  },
  computed: {
    setDate() {
      return new Date(this.timeUNIX * 1000);
    },
    formattedDate() {
      const date =  this.setDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })

      const time = this.setDate.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
      })

      return `${date}, ${time}`;
    }
  }
}
</script>
<style scoped>
.time__block {
  margin-top: 5px;
}
</style>