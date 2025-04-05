<template>
  <div class='watches-container'>
    <div class='filter-container'>
      <div class='filter-button' @click="toggleFilters()">
        <Icon name="uil:filter" class="next-icon"/>
        <p>{{ !isFilterActive ? 'Ver filtros' : 'Ocultar filtros' }}</p>
      </div>
      <transition name="dropdown">
        <div v-if="isFilterActive" class="list-filters">
          Filtros mostrados
        </div>
      </transition>
    </div>
    <div class='card-container'>
      <NuxtLink
        v-for="watch in filteredWatches"
        :key="watch.id"
        :to="watch.url"
        class='news-card'
        :style="{ backgroundImage: 'url(../assets/img/watches' + watch.image + ')' }"
      >
        <p class='brand'>{{ watch.brand }}</p>
        <p class='model'>{{ watch.model }}</p>
        <img :src="getCountryIcon(watch.country)" :alt="watch.country" class='country-icon'/>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import watchesList from '~/assets/json/watches.json';
export default {
  name: 'Relojes',
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
      filteredWatches: [],
      isFilterActive: false
    }
  },
  mounted() {
    this.getWatches();
  },
  methods: {
    getWatches() {
      this.watches = watchesList;
      this.filteredWatches = this.watches;
    },
    toggleFilters() {
      this.isFilterActive = !this.isFilterActive;
    },
    getCountryIcon(country) { 
      return '../assets/img/flags/' + country.toLowerCase() + '.png';
    }
  }
}
</script>

<style>
.watches-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
  text-align: center;
}

.filter-container {
  margin-bottom: 20px;
}

.filter-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 150px;
  cursor: pointer;
  font-size: 16px;
}

.filter-button:hover {
  color: #00a182;
}

.filter-button p {
  margin-left: 10px;
}

/* Mobile media query */
@media (max-width: 768px) {
  .watches-container {
    margin-top: 50px;
  }
}
</style>