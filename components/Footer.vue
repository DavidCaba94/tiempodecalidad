<template>
  <div class="footer">
    {{ 'Copyright © ' + getYear() + ' Tiempo de Calidad' }}
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    getYear() {
      return this.currentYear;
    }
  }
}
</script>

<style scoped>
  .footer {
    width: 100%;
    text-align: center;
    padding: 30px 0;
    color: #7a7e82;
  }
</style>