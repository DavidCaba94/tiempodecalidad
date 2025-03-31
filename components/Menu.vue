<template>
  <div :class="{'full-menu-container': true, 'expanded': isMenuShow}">
    <div class="menu-container">
      <div class="hamburger-menu" @click="toggleMenu()">
        <div class="bar" ref="bar"></div>
      </div>
      <div class="logo-container">
        <NuxtLink to="/">
          <img src="../assets/img/icono.png" alt="Logo" class="img-logo" />
        </NuxtLink>
      </div>
      <div class="night-icon" @click="toggleDarkMode()">
        <Icon v-if="!isDarkMode" name="uil:moon"/>
        <Icon v-else name="uil:sun"/>
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
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      isMenuShow: false,
      isDarkMode: false,
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
      this.$refs.bar.classList.toggle('animate');
      this.isMenuShow = !this.isMenuShow;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
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

.img-logo {
  width: 50px;
  height: 50px;
}

.night-icon {
  width: 40px;
  margin-left: 10px;
  margin-right: 10px;
  color: black;
  font-size: 25px;
  cursor: pointer;
}

.night-icon:hover {
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

/* Mobile media query */
@media (max-width: 768px) {
  .menu-container {
    height: 30px;
  }

  .bar:before {
    bottom: 8px;
  }

  .bar:after {
    top: 8px;
  }

  .night-icon {
    font-size: 23px;
  }

  .list-menu {
    flex-direction: column;
    height: 200px;
  }

  .list-menu a {
    font-size: 14px;
}

  .img-logo {
    width: 40px;
    height: 40px;
  }
}
</style>