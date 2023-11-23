<template>
  <p class="full-width">{{ formattedDate }}</p>
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
    isUALang() {
      return this.$i18n.locale === 'ua' ? 'uk-UA' : 'en-US';
    },
    formattedDate() {
      const date =  this.setDate.toLocaleDateString(this.isUALang, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const time = this.setDate.toLocaleTimeString(this.isUALang, {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
      });

      return `${date}, ${time}`;
    }
  }
}
</script>
