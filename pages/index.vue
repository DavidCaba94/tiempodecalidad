<template>
  <div class="index-container">
    <h2>Novedades</h2>
    <div class="card-container">
      <NuxtLink :to="post.url" v-for="post in news" :key="post.id" class="news-card" v-bind:style="{ backgroundImage: 'url(../assets/img/watches' + post.image + ')' }">
        <p class="brand">{{ post.brand }}</p>
        <p class="model">{{ post.model }}</p>
      </NuxtLink>
    </div>
    <h2>Relojes</h2>
    <div class="card-container">
      <div v-for="post in news" :key="post.id" class="news-card" v-bind:style="{ backgroundImage: 'url(../assets/img/watches' + post.image + ')' }">
        <p class="brand">{{ post.brand }}</p>
        <p class="model">{{ post.model }}</p>
      </div>
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
      const invertedWatchesList = [...watchesList].reverse();
      this.news = invertedWatchesList.slice(0, 3);
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
  margin-top: 80px;
  text-align: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.news-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  cursor: pointer;
  text-decoration: none;
}

.news-card:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.brand {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
}

.model {
  font-size: 16px;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
  margin-bottom: 10px;
}

/* Mobile media query */
@media (max-width: 768px) {
  .index-container {
    margin-top: 50px;
  }

  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .news-card {
    width: 100%;
    max-width: 500px;
    height: 300px;
    margin-right: 0;
  }
}
</style>