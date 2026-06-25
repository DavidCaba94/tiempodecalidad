<template>
  <div class="reviews-container">
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
      <NuxtLink v-for="review in reviews" :key="review.path" :to="review.path" class="card-width">
        <ReviewCard :reviewObject="review"></ReviewCard>
      </NuxtLink>
    </div>
    <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" :currentPage="currentPage" @pageChanged="pageChanged"></Pagination>
  </div>
</template>

<script setup>
// Todas las reseñas (relojes + artículos) por fecha, cargadas en SSR.
const { data: all } = await useAsyncData('reviews:all', () =>
  queryCollection('content').order('publishedAt', 'DESC').all()
)

const itemsPerPage = 9
const currentPage = ref(1)
const searchText = ref('')

const filtered = computed(() => {
  const list = all.value || []
  if (searchText.value.length > 2) {
    const q = searchText.value.toLowerCase()
    return list.filter((r) => r.title.toLowerCase().includes(q))
  }
  return list
})

const totalItems = computed(() => filtered.value.length)
const reviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filtered.value.slice(start, start + itemsPerPage)
})

function filterBySearch() {
  currentPage.value = 1
}

function pageChanged(page) {
  currentPage.value = page
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

useSeoMeta({
  title: 'Reseñas',
  description:
    'Listado con todas las reseñas de Tiempo de Calidad: reseñas completas de relojes y recomendaciones de todo tipo de marcas, con información útil y enlaces de compra.'
})
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