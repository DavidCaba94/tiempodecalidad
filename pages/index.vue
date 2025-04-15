<template>
  <div class="index-container">
    <Head>
      <Title>Tiempo de Calidad</Title>
      <Meta name="description" content="Relojería, precisión y calidad en cada review. Disfruta de esta gran afición con todo el contenido que tienes disponible en Tiempo de Calidad. Aquí encontrarás reseñas de relojes y recomendaciones de todo tipo de modelos."/>
      <link rel="icon" type="image/x-icon" href="/icon.ico" />
    </Head>
    <div class="banner">
      <h1 class="title">TIEMPO DE CALIDAD</h1>
    </div>
    <p class="description">
      Relojería, precisión y calidad en cada review. Disfruta de esta gran afición con todo el contenido que tienes disponible en Tiempo de Calidad. Aquí encontrarás reseñas de relojes y recomendaciones de todo tipo de modelos.
    </p>
    <h2>Novedades</h2>
    <div class="news-container" v-if="news.length > 0">
      <div class="news-first-column">
        <NuxtLink :to="news[0]?.url" class="new-box-first">
          <div :style="{backgroundImage: 'url(../assets/img' + news[0]?.image + ')'}" class="img-news"></div>
          <h3 class="title-news">{{ news[0]?.title }}</h3>
          <p class="description-news">{{ news[0]?.description }}</p>
        </NuxtLink>
      </div>
      <div class="news-second-column">
        <NuxtLink :to="news[1]?.url" class="new-box-second">
          <div :style="{backgroundImage: 'url(../assets/img' + news[1]?.image + ')'}" class="img-news"></div>
          <div class="new-description-column">
            <h3 class="title-news">{{ news[1]?.title }}</h3>
            <p class="description-news">{{ news[1]?.description }}</p>
          </div>
        </NuxtLink>
        <NuxtLink :to="news[2]?.url" class="new-box-second">
          <div :style="{backgroundImage: 'url(../assets/img' + news[2]?.image + ')'}" class="img-news"></div>
          <div class="new-description-column">
            <h3 class="title-news">{{ news[2]?.title }}</h3>
            <p class="description-news">{{ news[2]?.description }}</p>
          </div>
        </NuxtLink>
      </div>
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
        content: 'Relojería, precisión y calidad en cada review. Disfruta de esta gran afición con todo el contenido que tienes disponible en Tiempo de Calidad. Aquí encontrarás reseñas de relojes y recomendaciones de todo tipo de modelos.',
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

.title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #ffffff;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-image: url('../assets/img/banner/banner.png');
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  border-radius: 8px;
}

.description {
  font-size: 18px;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: justify;
  font-weight: 200;
}

.news-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.news-first-column {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-height: 360px;
  margin-right: 10px;
}

.news-second-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  max-height: 360px;
}

.new-box-first {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.new-box-first:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}

.new-box-second {
  width: 100%;
  height: 175px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.new-box-second:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}

.new-box-second-column:first-child {
  margin-bottom: 10px;
}

.dark-mode .new-box-first,
.dark-mode .new-box-second {
  background-color: #1e202c;
}

.light-mode .new-box-first,
.light-mode .new-box-second {
  background-color: #ffffff;
}

.img-news {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.new-box-second .img-news {
  width: 100%;
  height: 175px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  margin-right: 10px;
}

.dark-mode .title-news {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #ffffff;
  padding: 10px;
  text-align: left;
}

.dark-mode .description-news {
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  color: #ffffff;
  text-align: justify;
  padding: 0px 20px 0px 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.light-mode .title-news {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #000000;
  padding: 10px;
  text-align: left;
}

.light-mode .description-news {
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  color: #000000;
  text-align: justify;
  padding: 0px 20px 0px 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.new-box-second .title-news {
  margin-top: -10px;
}

.new-description-column {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

.link-button:hover {
  color: #00a182;
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

  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .banner {
    height: 150px;
  }

  .description {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .new-box-second {
    flex-direction: column;
  }

  .new-box-second:first-child {
    margin-bottom: 20px;
  }

  .news-container {
    flex-direction: column;
  }

  .news-first-column {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .news-second-column {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
    max-height: none;
  }

  .new-box-second {
    height: 360px;
  }

  .new-box-second .img-news {
    margin-right: 0px;
  }

  .new-box-second .title-news {
    margin-top: 0px;
  }

  .light-mode .description-news,
  .dark-mode .description-news {
    margin-bottom: 30px;
  }

  .news-second-column .img-news {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
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