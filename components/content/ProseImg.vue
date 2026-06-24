<template>
  <img :src="src" :alt="alt" :title="title" loading="lazy" />
</template>

<script setup>
// Override del ProseImg por defecto de @nuxt/content (que usa NuxtImg/IPX y
// no funciona en hosting estático). Imagen simple con la ruta de /public.
defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  title: { type: String, default: undefined }
})
</script>
