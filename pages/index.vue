<template>
  <div class="index-container">
    <h2>Novedades</h2>
    <div class="card-container">
      <NuxtLink :to="post.url" v-for="post in news" :key="post.id" class="news-width">
        <ReviewCard :reviewObject="post"></ReviewCard>
      </NuxtLink>
    </div>
    <NuxtLink to="/reviews-list" class="link-button">
      <p>Ver todas las reseñas</p>
      <Icon name="uil:arrow-right" class="next-icon"/>
    </NuxtLink>
    <h2>Relojes</h2>
    <div class="card-container">
      <NuxtLink v-for="watch in watches" :key="watch.id" :to="watch.url" class="card-width">
        <WatchCard :watchObject="watch"></WatchCard>
      </NuxtLink>
    </div>
    <NuxtLink to="/watch-list" class="link-button">
      <p>Ver todos los relojes</p>
      <Icon name="uil:arrow-right" class="next-icon"/>
    </NuxtLink>
  </div>
</template>

<script>
import watchesList from '~/assets/json/watches.json';
import reviewsList from '~/assets/json/reviews.json';
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
      const invertedReviewsList = [...reviewsList].reverse();
      this.news = invertedReviewsList.slice(0, 3);
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
    },
    getCountryIcon(country) { 
      return '../assets/img/flags/' + country.toLowerCase() + '.png';
    }
  }
}
</script>

<style scoped>
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

.card-width {
  width: 30%;
  text-decoration: none;
}

.link-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  margin: 0 auto;
  color: #828282;
  text-decoration: none;
  margin-bottom: 50px;
}

.next-icon {
  margin-left: 10px;
  font-size: 25px;
}

a {
  text-decoration: none;
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

  .card-width {
    width: 100%;
    max-width: 500px;
  }
}
</style>