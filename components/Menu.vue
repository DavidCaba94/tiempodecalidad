<template>
  <div class="full-menu-container" :class="{'expanded': isMenuShow, 'dark-mode': darkMode}">
    <div class="menu-container">
      <div class="hamburger-menu" @click="toggleMenu()">
        <div class="bar" :class="{'dark-mode': darkMode}" ref="bar"></div>
      </div>
      <div class="logo-container">
        <NuxtLink to="/">
          <img src="../assets/img/icono.png" alt="Logo" class="img-logo" />
        </NuxtLink>
      </div>
      <div class="night-icon" :class="{'dark-mode': darkMode}" @click="toggleDarkMode()">
        <Icon v-if="!darkMode" name="uil:moon"/>
        <Icon v-else name="uil:sun"/>
      </div>
    </div>
    <transition name="dropdown">
      <div v-if="isMenuShow" class="list-menu" :class="{'dark-mode': darkMode}">
        <NuxtLink to="/" :class="activeRoute === '/' ? 'active' : ''">Inicio</NuxtLink>
        <NuxtLink to="/watch-list" :class="activeRoute === '/watch-list' ? 'active' : ''">Relojes</NuxtLink>
        <NuxtLink to="/reviews-list" :class="activeRoute === '/reviews-list' ? 'active' : ''">Reseñas</NuxtLink>
        <NuxtLink to="/recomendations" :class="activeRoute === '/recomendations' ? 'active' : ''">Recomendaciones</NuxtLink>
        <NuxtLink to="/videos" :class="activeRoute === '/videos' ? 'active' : ''">Vídeos</NuxtLink>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    darkMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMenuShow: false
    }
  },
  computed: {
    activeRoute() {
      return this.$route.path
    }
  },
  watch: {
    activeRoute(newRoute) {
      this.isMenuShow = false
      this.$refs.bar.classList.remove('animate')
    }
  },
  methods: {
    toggleMenu() {
      this.$refs.bar.classList.toggle('animate');
      this.isMenuShow = !this.isMenuShow;
    },
    toggleDarkMode() {
      this.$emit('onChangeDarkMode');
    }
  }
}
</script>

<style scoped>
.full-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: -webkit-fill-available;
  background-color: #ffffff94;
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.07);
  padding: 15px 10px;
  transition: max-height 0.5s ease-in-out;
  max-height: 50px;
  overflow: hidden;
  z-index: 1000;
}

.full-menu-container.dark-mode {
  background-color: #02061894;
  border-bottom: 1px solid #ffffff14;
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
  margin-top: 6px;
}

.img-logo {
  width: 50px;
  height: 50px;
}

.night-icon {
  width: 40px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 7px;
  color: black;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
}

.night-icon.dark-mode {
  color: white;
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

.list-menu.dark-mode a {
  color: white;
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
}
.bar.dark-mode {
  background: white;
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
.bar.dark-mode:before {
  background: white;
}

.bar:after {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  background: black;
  transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
.bar.dark-mode:after {
  background: white;
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