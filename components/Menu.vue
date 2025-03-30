<template>
  <div :class="{'full-menu-container': true, 'expanded': isMenuShow || isSearchShow}">
    <div class="menu-container">
      <div class="hamburger-menu" @click="toggleMenu()">
        <div class="bar" ref="bar"></div>
      </div>
      <div class="logo-container">
        <NuxtLink to="/">
          <img src="../assets/img/icono.png" alt="Logo" style="width: 50px; height: 50px;" />
        </NuxtLink>
      </div>
      <div :class="isSearchShow ? 'search-icon search-active' : 'search-icon'" @click="toggleSearch()">
        <Icon name="uil:search"/>
      </div>
    </div>
    <transition name="dropdown">
      <div v-if="isMenuShow" class="list-menu">
        <NuxtLink to="/" :class="activeRoute === '/' ? 'active' : ''">Inicio</NuxtLink>
        <NuxtLink to="/reviews" :class="activeRoute === '/reviews' ? 'active' : ''">Reseñas</NuxtLink>
        <NuxtLink to="/watches" :class="activeRoute === '/watches' ? 'active' : ''">Relojes</NuxtLink>
        <NuxtLink to="/recomendaciones" :class="activeRoute === '/recomendaciones' ? 'active' : ''">Recomendaciones</NuxtLink>
        <NuxtLink to="/videos" :class="activeRoute === '/videos' ? 'active' : ''">Vídeos</NuxtLink>
      </div>
    </transition>
    <transition name="dropdown">
      <div v-if="isSearchShow" class="search-container">
        <input v-model="searchText" type="text" placeholder="Buscar..." @keyup="searchItems()" />
        <div v-if="searchText !== ''">
          <div class="results-container">
            <NuxtLink v-for="item in searchedItems" :key="item.id" :to="item.link" class="result-item">
              <div class="result-item-img"></div>
              <div class="result-item-name">{{ item.name }}</div>
            </NuxtLink>
          </div>
        </div>
        <div class="no-items-text" v-if="searchText !== '' && searchedItems.length === 0">No hay resultados disponibles</div>
      </div>
    </transition>
  </div>
</template>

<script>
import '~/assets/css/menu.css'

export default {
  name: 'Menu',
  data() {
    return {
      isMenuShow: false,
      isSearchShow: false,
      searchText: '',
      searchedItems: [],
      items: [
        { id: 1, name: 'Pagani Design', link: '/watches/1' },
        { id: 2, name: 'Tandorio', link: '/watches/2' },
        { id: 3, name: 'Cadisen', link: '/watches/3' },
        { id: 4, name: 'Steeldive', link: '/watches/4' },
        { id: 5, name: 'Addiesdive', link: '/watches/5' }
      ]
    }
  },
  computed: {
    activeRoute() {
      return this.$route.path
    }
  },
  methods: {
    toggleMenu() {
      if (this.isSearchShow) this.toggleSearch();
      this.$refs.bar.classList.toggle('animate');
      this.isMenuShow = !this.isMenuShow;
    },
    toggleSearch() {
      if (this.isMenuShow) this.toggleMenu();
      this.isSearchShow = !this.isSearchShow;
    },
    searchItems() {
      this.searchedItems = this.searchText
        ? this.items.filter(item => 
            item.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
        : [];
    }
  }
}
</script>

<style>
.full-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: -webkit-fill-available;
  background-color: #ffffff94;
  backdrop-filter: blur(5px);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.07);
  padding: 15px 10px;
  transition: max-height 0.5s ease-in-out;
  max-height: 50px;
  overflow: hidden;
}
.full-menu-container.expanded {
  max-height: 300px;
}
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  height: 50px;
  transition: all .5s ease;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

.logo-title {
  font-size: 25px;
  margin-left: 20px;
}

.search-icon {
  margin-right: 20px;
  color: black;
  font-size: 25px;
  cursor: pointer;
}

.search-active {
  color: #00a182;
}

.search-icon:hover {
  color: #00a182;
}

.list-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 50px;
  margin-top: 20px;
}

.list-menu a {
  text-decoration: none;
  color: black;
  font-size: 16px;
  padding: 10px;
}

.list-menu a:hover {
  color: #00a182;
}

.list-menu a.active {
  color: #00a182;
}

.search-container {
  padding: 20px;
}

.search-container input {
  width: 100%;
  max-width: 300px;
  height: 30px;
  margin-left: 40px;
  padding: 5px;
  border: 0;
  border-bottom: 1px solid #000;
  background-color: transparent;
  color: #000;
  outline: none;
}

.no-items-text {
  margin-top: 40px;
  font-size: 14px;
  color: #000;
  text-align: center;
}

.results-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: auto;
  margin-top: 30px;
  padding: 0px 40px;
}

.result-item {
  width: 90px;
  height: 110px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.08);
  margin-right: 10px;
  text-decoration: none;
  color: #000;
}

.result-item:hover {
  color: #00a182;
  transition: all 0.3s ease;
}

.result-item-img {
  width: 90px;
  height: 80px;
  background-color: #858585;
  border-radius: 5px;
}

.result-item-name {
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  text-decoration: none;
}

/*ANIMACIÓN MENU*/
.hamburger-menu {
  margin-top: -10px;
  margin-left: 20px;
  float: right;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.bar,
.bar:after,
.bar:before {
  width: 30px;
  height: 2px;
}

.bar {
  position: relative;
  transform: translateY(25px);
  background: black;
  transition: all 0ms 300ms;
}
.bar.animate {
  background: rgba(255, 255, 255, 0);
}

.bar:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 10px;
  background: black;
  transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.bar:after {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  background: black;
  transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.bar.animate:after {
  top: 0;
  transform: rotate(45deg);
  transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.bar.animate:before {
  bottom: 0;
  transform: rotate(-45deg);
  transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
/*FIN ANIMACIÓN MENU*/
</style>