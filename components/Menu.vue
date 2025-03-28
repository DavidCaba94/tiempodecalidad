<template>
  <div>
    <NuxtLink to="/">
      Inicio
    </NuxtLink>
    <NuxtLink to="/find">
      Buscar
    </NuxtLink>
  </div>
</template>

<script>
import '~/assets/css/menu.css'

export default {
  name: 'Menu',
  data() {
    return {
      
    }
  }
}
</script>