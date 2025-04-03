<template>
  <div class="index-container">INCIO</div>
</template>

<script>
export default {
  name: 'Index',
  head: {
    title: 'Oráculo Gratis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'El oráculo gratis más fiable de internet.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  }
}
</script>

<style>
.index-container {
  margin-top: 100px;
}
</style>