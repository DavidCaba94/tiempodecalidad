<template>
  <div class="index-container">
    <h2>Novedades</h2>
    <div class="card-container">
      <div v-for="post in news" :key="post.id" class="news-card"></div>
    </div>
    <h2>Relojes</h2>
    <div class="card-container">
      <div v-for="watch in watches" :key="watch.id" class="news-card"></div>
    </div>
    <h2>Relojes</h2>
    <div class="card-container">
      <div v-for="watch in watches" :key="watch.id" class="news-card"></div>
    </div>
    <h2>Relojes</h2>
    <div class="card-container">
      <div v-for="watch in watches" :key="watch.id" class="news-card"></div>
    </div>
  </div>
</template>

<script>
import watchesList from '~/assets/json/watches.json';
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
      watches: [],
      news: []
    }
  },
  mounted() {
    this.setLastNews();
    this.setRandomWatches();
  },
  methods: {
    setLastNews() {
      this.news = watchesList.slice(0, 3);
    },
    setRandomWatches() {
      const randomWatches = [];
      const randomIndexes = new Set();
      while (randomIndexes.size < 3) {
        const randomIndex = Math.floor(Math.random() * watchesList.length);
        if (!randomIndexes.has(randomIndex)) {
          randomIndexes.add(randomIndex);
          randomWatches.push(watchesList[randomIndex]);
        }
      }
      this.watches = randomWatches;
    }
  }
}
</script>

<style>
.index-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.news-card {
  width: 300px;
  height: 200px;
  background-color: #f0f0f0;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>