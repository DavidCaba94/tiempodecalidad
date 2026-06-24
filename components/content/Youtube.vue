<template>
  <div class="post-video-container">
    <iframe
      class="post-video"
      :src="`https://www.youtube.com/embed/${id}`"
      :title="title"
      loading="lazy"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, default: 'Vídeo de YouTube' }
})
</script>

<style scoped>
.post-video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.post-video {
  width: 600px;
  height: 335px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .post-video {
    width: 300px;
    height: 169px;
  }
}
</style>
