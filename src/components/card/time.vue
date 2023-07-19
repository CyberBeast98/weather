<template>
  <p class="time__block full-width">{{ formattedDate }}</p>
</template>

<script>
export default {
  name: 'Time',
  props: {
    timeUNIX: { type: Number },
    dateString: { type: String }
  },
  computed: {
    setDate() {
      return this.timeUNIX ? new Date(this.timeUNIX * 1000) : new Date(this.dateString);
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