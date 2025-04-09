<template>
  <div class='watches-container'>
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
      <NuxtLink v-for="watch in watches" :key="watch.id" :to="watch.url" class="card-width">
        <WatchCard :watchObject="watch"></WatchCard>
      </NuxtLink>
    </div>
    <Pagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" @pageChanged="pageChanged"></Pagination>
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
                <img :src="'../assets/img/flags/' + country + '.png'" :alt="country" class="country-icon" :class="filtersValues.country === country ? ' selected' : ''"/>
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
import watchesList from '~/assets/json/watches.json'
export default {
  name: 'Relojes',
  head: {
    title: 'Relojes - Tiempo de Calidad',
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
      currentPage: 1,
      itemsPerPage: 9,
      isShowFilters: false,
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
    totalItems() {
      return watchesList?.length;
    }
  },
  mounted() {
    this.getWatches();
    this.setFiltersContent();
  },
  methods: {
    getWatches() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.watches = [...watchesList].reverse().slice(start, end);
    },
    showFilters() {
      this.isShowFilters = !this.isShowFilters;
    },
    getCountryIcon(country) { 
      return '../assets/img/flags/' + country.toLowerCase() + '.png';
    },
    pageChanged(page) {
      this.currentPage = page;
      this.getWatches();
    },
    setFiltersContent() {
      this.filtersContent.brands = [...new Set(watchesList.map(watch => watch.brand))];
      this.filtersContent.movements = [...new Set(watchesList.map(watch => watch.movement))];
      this.filtersContent.countries = [...new Set(watchesList.map(watch => watch.country))];
      this.filtersContent.colors = this.getColorsCollection(watchesList);
      this.filtersContent.prices = [...new Set(watchesList.map(watch => watch.price))];
      this.filtersValues.price = this.filtersContent.prices.sort((b, a) => a - b)[0];
      this.filtersContent.types = [...new Set(watchesList.map(watch => watch.type))];
      this.filtersContent.sizes = [...new Set(watchesList.map(watch => watch.size))].sort((a, b) => a - b);
      this.filtersContent.waterResistances = [...new Set(watchesList.map(watch => watch.water_resistance))].sort((a, b) => a - b);
    },
    setModelsContent() {
      this.filtersContent.models = [...new Set(watchesList.filter(watch => watch.brand === this.filtersValues.brand).map(watch => watch.model))];
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
      this.setFiltersContent();
    },
    setCountry(country) {
      this.filtersValues.country = country;
      this.filtersContent.brands = [...new Set(watchesList.filter(watch => watch.country === country).map(watch => watch.brand))];
      this.filtersContent.models = [...new Set(watchesList.filter(watch => watch.country === country).map(watch => watch.model))];
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
      if (this.searchText.length > 2) {
        this.watches = watchesList.filter(watch => {
          return watch.brand.toLowerCase().includes(this.searchText.toLowerCase()) ||
                 watch.model.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.getWatches();
      }
    },
    applyFilters() {
      this.getWatches();
      if (this.filtersValues.country) {
        this.watches = this.watches.filter(watch => watch.country === this.filtersValues.country);
      }
      if (this.filtersValues.brand) {
        this.watches = this.watches.filter(watch => watch.brand === this.filtersValues.brand);
      }
      if (this.filtersValues.model) {
        this.watches = this.watches.filter(watch => watch.model === this.filtersValues.model);
      }
      if (this.filtersValues.color) {
        this.watches = this.watches.filter(watch => watch.colors.includes(this.filtersValues.color));
      }
      if (this.filtersValues.movement) {
        this.watches = this.watches.filter(watch => watch.movement === this.filtersValues.movement);
      }
      if (this.filtersValues.price) {
        this.watches = this.watches.filter(watch => watch.price <= this.filtersValues.price);
      }
      if (this.filtersValues.type) {
        this.watches = this.watches.filter(watch => watch.type === this.filtersValues.type);
      }
      if (this.filtersValues.size) {
        this.watches = this.watches.filter(watch => watch.size === this.filtersValues.size);
      }
      if (this.filtersValues.waterResistance) {
        this.watches = this.watches.filter(watch => watch.water_resistance === this.filtersValues.waterResistance);
      }
      this.watches = this.watches.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
      this.isShowFilters = false;
      this.currentPage = 1;
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
  overflow: scroll;
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