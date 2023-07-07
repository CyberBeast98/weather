<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'CurrentLocation',
  data() {
    return {
      lat: null,
      lon: null
    }
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      const successCallback = (position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
      };

      navigator.geolocation.getCurrentPosition(successCallback);
    }
  }
}
</script>
