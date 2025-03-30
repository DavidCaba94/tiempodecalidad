<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script>
import '~/assets/css/main.css'

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
  }
}
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}
</style>
