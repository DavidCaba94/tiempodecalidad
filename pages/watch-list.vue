<template>
  <div class='watches-container'>
    <h1 class="watches-title">RELOJES</h1>
    <div class='filter-container'>
      <div class='filter-button' @click="showFilters()">
        <Icon name="uil:filter" class="next-icon"/>
        <p>Filtros</p>
      </div>
      <div class='filter-button'>
        <input v-model="searchText" type="text" placeholder="Buscar" class="input-search" @keyup="filterBySearch()"/>
        <Icon name="mi:search" class="next-icon"/>
      </div>
    </div>
    <div v-if="watches.length === 0" class="no-data">
      <p>No hay datos para mostrar</p>
    </div>
    <div class='card-container' v-if="watches.length > 0">
      <NuxtLink v-for="watch in watches" :key="watch.url" :to="watch.url" class="card-width">
        <WatchCard :watchObject="watch"></WatchCard>
      </NuxtLink>
    </div>
    <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" :currentPage="currentPage" @pageChanged="pageChanged"></Pagination>
    <div v-if="isShowFilters" class="filter-box-container">
      <div class="inputs-container">
        <div class="input-row">
          <div>Filtros</div>
          <Icon name="mi:close" class="close-icon" @click="showFilters()"/>
        </div>
        <div class="input-row">
          <div class="unique-input-row">
            <div class="input-label">País</div>
            <div class="countries-container">
              <div v-for="country in filtersContent.countries" :key="country" @click="setCountry(country)">
                <img :src="getCountryIcon(country)" :alt="country" class="country-icon" :class="filtersValues.country === country ? ' selected' : ''"/>
              </div>
            </div>
          </div>
        </div>
        <div class="input-row">
          <div class="unique-input-row">
            <div class="input-label">Marcas</div>
            <select v-model="filtersValues.brand" class="input-select" @change="setModelsContent()">
              <option v-for="(brand, i) in filtersContent.brands" :key="i" :value="brand">{{ brand }}</option>
            </select>
          </div>
          <div class="unique-input-row">
            <div class="input-label">Modelos</div>
            <select v-model="filtersValues.model" class="input-select" :disabled="!filtersValues.brand">
              <option v-for="model in filtersContent.models" :key="model" :value="model">{{ model }}</option>
            </select>
          </div>
        </div>
        <div class="input-row">
          <div class="unique-input-row">
            <div class="input-label">Color</div>
            <div class="countries-container">
              <div v-for="(color, i) in filtersContent.colors" :key="i" :value="color" @click="setColor(color)">
                <div class="color-circle" :class="filtersValues.color === color ? ' selected' : ''" :style="{ backgroundColor: color }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-row">
          <div class="unique-input-row">
            <div class="input-label">Movimiento</div>
            <select v-model="filtersValues.movement" class="input-select">
              <option v-for="(movement, i) in filtersContent.movements" :key="i" :value="movement">{{ movement }}</option>
            </select>
          </div>
          <div class="unique-input-row">
            <div class="input-label">Tipo</div>
            <select v-model="filtersValues.type" class="input-select">
              <option v-for="(type, i) in filtersContent.types" :key="i" :value="type">{{ type }}</option>
            </select>
          </div>
        </div>
        <div class="input-row">
          <div class="unique-input-row">
            <div class="input-label">Precio</div>
            <div class="range-container">
              <div>0</div>
              <input v-model="filtersValues.price"
                   type="range"
                   id="price"
                   name="price"
                   min="0"
                   :max="filtersContent.prices.sort(((b, a) => a - b))[0]" />
              <div>{{ filtersValues.price ? filtersValues.price : filtersContent.prices.sort(((b, a) => a - b))[0] }}</div>
            </div>
          </div>
        </div>
        <div class="input-row">
          <div class="unique-input-row">
            <div class="input-label">Tamaño</div>
            <select v-model="filtersValues.size" class="input-select">
              <option v-for="(size, i) in filtersContent.sizes" :key="i" :value="size">{{ size }}</option>
            </select>
          </div>
          <div class="unique-input-row">
            <div class="input-label">Resistencia al agua</div>
            <select v-model="filtersValues.waterResistance" class="input-select">
              <option v-for="(waterResistance, i) in filtersContent.waterResistances" :key="i" :value="waterResistance">{{ waterResistance }}</option>
            </select>
          </div>
        </div>
        <div class="input-row buttons-width">
          <div class="clear-button" @click="clearFilters()">Limpiar filtros</div>
          <div class="apply-button" @click="applyFilters()">Aplicar</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Relojes',
  async setup() {
    // Relojes cargados en SSR desde @nuxt/content (normalizados a la forma
    // que espera la lógica de filtros: url y water_resistance).
    const { data } = await useAsyncData('watch-list:all', () =>
      queryCollection('content').where('kind', '=', 'watch').all()
    )
    const watchesList = (data.value || []).map((d) => ({
      ...d,
      url: d.path,
      water_resistance: d.waterResistance
    }))
    useSeoMeta({
      title: 'Relojes',
      description:
        'Listado de todos los relojes reseñados en Tiempo de Calidad. En cada uno encontrarás un análisis detallado de sus características, una valoración personal y el enlace de compra.'
    })
    return { watchesList }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 9,
      isShowFilters: false,
      applied: null,
      filtersContent: {
        brands: [],
        models: [],
        countries: [],
        colors: [],
        movements: [],
        prices: [],
        types: [],
        sizes: [],
        waterResistances: []
      },
      filtersValues: {
        brand: null,
        model: null,
        country: null,
        color: null,
        movement: null,
        price: null,
        type: null,
        size: null,
        waterResistance: null
      },
      searchText: ''
    }
  },
  computed: {
    // Lista completa filtrada (búsqueda + filtros aplicados). Newest-first.
    filteredWatches() {
      let list = [...this.watchesList].reverse();
      const f = this.applied;
      if (f) {
        if (f.country) list = list.filter(w => w.country === f.country);
        if (f.brand) list = list.filter(w => w.brand === f.brand);
        if (f.model) list = list.filter(w => w.model === f.model);
        if (f.color) list = list.filter(w => w.colors.includes(f.color));
        if (f.movement) list = list.filter(w => w.movement === f.movement);
        if (f.price) list = list.filter(w => w.price <= f.price);
        if (f.type) list = list.filter(w => w.type === f.type);
        if (f.size) list = list.filter(w => w.size === f.size);
        if (f.waterResistance) list = list.filter(w => w.water_resistance === f.waterResistance);
      }
      if (this.searchText.length > 2) {
        const q = this.searchText.toLowerCase();
        list = list.filter(w => w.brand.toLowerCase().includes(q) || w.model.toLowerCase().includes(q));
      }
      return list;
    },
    totalItems() {
      return this.filteredWatches.length;
    },
    // Página actual sobre la lista filtrada.
    watches() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredWatches.slice(start, start + this.itemsPerPage);
    }
  },
  created() {
    this.setFiltersContent();
  },
  methods: {
    showFilters() {
      this.isShowFilters = !this.isShowFilters;
    },
    getCountryIcon(country) { 
      return '/assets/img/flags/' + country.replace(' ', '-').toLowerCase() + '.png';
    },
    pageChanged(page) {
      this.currentPage = page;
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    setFiltersContent() {
      this.filtersContent.brands = [...new Set(this.watchesList.map(watch => watch.brand))];
      this.filtersContent.movements = [...new Set(this.watchesList.map(watch => watch.movement))];
      this.filtersContent.countries = [...new Set(this.watchesList.map(watch => watch.country))];
      this.filtersContent.colors = this.getColorsCollection(this.watchesList);
      this.filtersContent.prices = [...new Set(this.watchesList.map(watch => watch.price))];
      this.filtersValues.price = this.filtersContent.prices.sort((b, a) => a - b)[0];
      this.filtersContent.types = [...new Set(this.watchesList.map(watch => watch.type))];
      this.filtersContent.sizes = [...new Set(this.watchesList.map(watch => watch.size))].sort((a, b) => a - b);
      this.filtersContent.waterResistances = [...new Set(this.watchesList.map(watch => watch.water_resistance))].sort((a, b) => a - b);
    },
    setModelsContent() {
      this.filtersContent.models = [...new Set(this.watchesList.filter(watch => watch.brand === this.filtersValues.brand).map(watch => watch.model))];
    },
    clearFilters() {
      this.filtersValues = {
        brand: null,
        model: null,
        country: null,
        color: null,
        movement: null,
        price: this.filtersContent.prices.sort((b, a) => a - b)[0],
        type: null,
        size: null,
        waterResistance: null
      };
      this.applied = null;
      this.currentPage = 1;
      this.setFiltersContent();
    },
    setCountry(country) {
      this.filtersValues.country = country;
      this.filtersContent.brands = [...new Set(this.watchesList.filter(watch => watch.country === country).map(watch => watch.brand))];
      this.filtersContent.models = [...new Set(this.watchesList.filter(watch => watch.country === country).map(watch => watch.model))];
    },
    setColor(color) {
      this.filtersValues.color = color;
    },
    getColorsCollection(watchesList) {
      const colors = [];
      watchesList.forEach(watch => {
        watch.colors.forEach(color => {
          if (!colors.includes(color)) {
            colors.push(color);
          }
        });
      });
      return colors;
    },
    filterBySearch() {
      // La búsqueda es reactiva (computed); solo volvemos a la primera página.
      this.currentPage = 1;
    },
    applyFilters() {
      // Tomamos una instantánea de los filtros; el computed hace el resto.
      this.applied = { ...this.filtersValues };
      this.currentPage = 1;
      this.isShowFilters = false;
    }
  }
}
</script>

<style scoped>
.watches-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
  text-align: center;
}

.watches-title {
  font-size: 34px;
  margin-bottom: 20px;
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

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-width {
  width: 30%;
  margin: 10px;
  text-decoration: none;
}

.filter-box-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 999;
  transition: all 0.3s ease;
}

.inputs-container {
  width: 50%;
  max-width: 350px;
  max-height: 570px;
  padding: 20px;
  background-color: #ffffff94;
  backdrop-filter: blur(8px);
  border: 1px solid #ffffff14;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.dark-mode .inputs-container {
  background-color: #02061894;
}

.input-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.unique-input-row {
  display: block;
  width: 100%;
  margin: 0 10px;
  text-align: left;
}

.close-icon {
  cursor: pointer;
  font-size: 25px;
}

.input-label {
  font-size: 12px;
  margin-bottom: 5px;
}

.input-select {
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #7b7b7b;
  background-color: #00000000;
  font-size: 14px;
  outline: none;
}

.dark-mode .input-select {
  color: #ffffff;
  border-bottom: 1px solid #ccc;
}

.dark-mode .input-select option {
  background-color: #020618;
  color: #ffffff;
}

.countries-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.buttons-width {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.country-icon {
  width: 35px;
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
  cursor: pointer;
}

.country-icon:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}

.country-icon.selected {
  border: 4px solid #00a182;
}

.color-circle {
  width: 35px;
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
  margin-bottom: 5px;
  border: 1px solid #868686;
  cursor: pointer;
}

.color-circle:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}

.color-circle.selected {
  border: 4px solid #00a182;
}

.clear-button {
  cursor: pointer;
  background-color: #000000;
  color: white;
  font-size: 12px;
  border-radius: 8px;
  padding: 5px 10px;
}

.dark-mode .clear-button {
  background-color: #ffffff;
  color: #000000;
}

.clear-button:hover {
  background-color: #bebebe;
}

.apply-button {
  cursor: pointer;
  background-color: #00a182;
  color: white;
  font-size: 12px;
  border-radius: 8px;
  padding: 5px 10px;
  margin-left: 10px;
}

.apply-button:hover {
  background-color: #007f6b;
}

.range-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.range-container input[type="range"] {
  width: 100%;
  height: 5px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
}

/* Mobile media query */
@media (max-width: 768px) {
  .watches-container {
    margin-top: 50px;
  }

  .card-width {
    width: 45%;
  }

  .inputs-container {
    width: 80%;
  }
}

@media (max-width: 460px) {
  .card-width {
    width: 90%;
  }
}
</style>