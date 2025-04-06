<template>
  <div :class="darkMode ? 'dark-mode' : 'light-mode'">
    <Menu :darkMode="darkMode" @onChangeDarkMode="onChangeDarkMode"></Menu>
    <NuxtPage />
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'Index',
  head: {
    title: 'Tiempo de Calidad',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Relojería, precisión y calidad en cada review'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      darkMode: true
    }
  },
  mounted() {
    if (localStorage.getItem('darkMode') === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.darkMode = false;
      document.body.classList.add('light-mode');
    }
  },
  methods: {
    onChangeDarkMode() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    }
  },
}
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}

body.dark-mode {
  background-color: #111421;
  color: #ffffff;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
}

body.light-mode {
  background-color: #ffffff;
  color: #000000;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
}
</style>
