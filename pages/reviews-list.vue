<template>
  <div class="reviews-container">
    <Head>
      <Title>Reseñas - Tiempo de Calidad</Title>
      <Meta name="description" content="Aquí tienes un listado con todas las reseñas de Tiempo de Calidad, ya sean reseñas completas de relojes o recomendaciones de diferentes modelos de todo tipo de marcas. En todas ellas encontrarás información útil y relevante para ayudarte a elegir el reloj que mejor se adapte a tus necesidades, además del enlace de compra." />
      <link rel="icon" type="image/x-icon" href="/icon.ico" />
    </Head>
    <div class='filter-container'>
      <div class='filter-button'>
        <h1>RESEÑAS</h1>
      </div>
      <div class='filter-button'>
        <input v-model="searchText" type="text" placeholder="Buscar" class="input-search" @keyup="filterBySearch()"/>
        <Icon name="mi:search" class="next-icon"/>
      </div>
    </div>
    <div v-if="reviews.length === 0" class="no-data">
      <p>No hay datos para mostrar</p>
    </div>
    <div class='card-container' v-if="reviews.length > 0">
      <NuxtLink v-for="review in reviews" :key="review.id" :to="review.url" class="card-width">
        <ReviewCard :reviewObject="review"></ReviewCard>
      </NuxtLink>
    </div>
    <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" @pageChanged="pageChanged"></Pagination>
  </div>
</template>

<script>
import reviewsList from '~/assets/json/reviews.json';

export default {
  name: 'Reseñas',
  head: {
    title: 'Reseñas - Tiempo de Calidad',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Aquí tienes un listado con todas las reseñas de Tiempo de Calidad, ya sean reseñas completas de relojes o recomendaciones de diferentes modelos de todo tipo de marcas. En todas ellas encontrarás información útil y relevante para ayudarte a elegir el reloj que mejor se adapte a tus necesidades, además del enlace de compra.',
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
  },
  data() {
    return {
      reviews: [],
      currentPage: 1,
      itemsPerPage: 9,
      searchText: ''
    }
  },
  computed: {
    totalItems() {
      return this.searchText === '' ? reviewsList?.length : this.reviews?.length;
    }
  },
  mounted() {
    this.getReviews();
  },
  methods: {
    getReviews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.reviews = [...reviewsList].reverse().slice(start, end);
    },
    filterBySearch() {
      if (this.searchText.length > 2) {
        this.reviews = reviewsList.filter(review => {
          return review.title.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.getReviews();
      }
    },
    pageChanged(page) {
      this.currentPage = page;
      this.getReviews();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
.reviews-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
  text-align: center;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 20px;
}

.filter-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font-size: 16px;
}

.filter-button:hover {
  color: #00a182;
}

.filter-button h1 {
  font-size: 28px;
}

.filter-button p {
  margin-left: 10px;
}

input {
  border-radius: 0px;
}

.input-search {
  width: 150px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #7b7b7b;
  background-color: #00000000;
  font-size: 14px;
  outline: none;
}

.dark-mode .input-search {
  color: #ffffff;
  border-bottom: 1px solid #ccc;
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 20px;
  color: #7b7b7b;
}

.card-width {
  text-decoration: none;
}

@media (max-width: 768px) {
  .reviews-container {
    margin-top: 50px;
  }

  .filter-button h1 {
    font-size: 22px;
  }
}
</style>