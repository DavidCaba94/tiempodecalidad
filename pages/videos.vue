<template>
  <div class="video-page-container">
    <Head>
      <Title>Vídeos - Tiempo de Calidad</Title>
      <Meta name="description" content="Aquí tienes todos los vídeos de Tiempo de Calidad, un canal de YouTube dedicado a la relojería. Encontrarás reseñas y recomendaciones de todo tipo de relojes, desde los más asequibles hasta los más exclusivos." />
      <link rel="icon" type="image/x-icon" href="/icon.ico" />
    </Head>
    <h1 class="video-page-title">VÍDEOS</h1>
    <div class="video-container">
      <div v-for="(video, index) in videos" :key="index" class="video-card">
        <iframe width="300" height="169" :src="video.url" :title="video.title" class="video-borders" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3 class="video-title">{{ video.title }}</h3>
      </div>
    </div>
    <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" @pageChanged="pageChanged"></Pagination>
  </div>
</template>

<script>
import videosList from '~/assets/json/videos.json'
export default {
  name: 'Vídeos',
  head: {
    title: 'Vídeos - Tiempo de Calidad',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Aquí tienes todos los vídeos de Tiempo de Calidad, un canal de YouTube dedicado a la relojería. Encontrarás reseñas y recomendaciones de todo tipo de relojes, desde los más asequibles hasta los más exclusivos.',
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      videos: [],
      currentPage: 1,
      itemsPerPage: 9
    }
  },
  computed: {
    totalItems() {
      return videosList?.length;
    }
  },
  mounted() {
    this.getVideos()
  },
  methods: {
    getVideos() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.videos = [...videosList].reverse().slice(start, end);
    },
    pageChanged(page) {
      this.currentPage = page;
      this.getVideos();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
.video-page-container {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
}

.video-page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.video-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.video-card {
  margin: 10px;
}

.video-title {
  width: 300px;
  margin-top: 10px;
  font-size: 14px;
}

.video-borders {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .video-page-container {
    margin-top: 50px;
  }
}
</style>