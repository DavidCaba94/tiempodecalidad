<template>
  <div :class="darkMode ? 'dark-mode' : 'light-mode'">
    <Menu :darkMode="darkMode" @onChangeDarkMode="onChangeDarkMode"></Menu>
    <NuxtPage />
    <Footer></Footer>
  </div>
</template>

<script setup>
// SEO global aplicado a todas las páginas.
// El título por página se define con <Title> y aquí solo añadimos el sufijo
// de marca cuando aún no está presente (evita duplicar "Tiempo de Calidad").
const SITE_URL = 'https://tiempodecalidad.net'
const route = useRoute()

useHead({
  htmlAttrs: { lang: 'es' },
  titleTemplate: (title) =>
    !title
      ? 'Tiempo de Calidad'
      : title.includes('Tiempo de Calidad')
        ? title
        : `${title} · Tiempo de Calidad`,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: () => `${SITE_URL}${route.path}` }
  ]
})

useSeoMeta({
  ogSiteName: 'Tiempo de Calidad',
  ogType: 'website',
  ogLocale: 'es_ES',
  ogUrl: () => `${SITE_URL}${route.path}`,
  ogImage: `${SITE_URL}/assets/img/banner/banner.png`,
  twitterCard: 'summary_large_image'
})

// JSON-LD de la home (WebSite + Organization). Las fichas y artículos
// inyectan el suyo desde su propia página a partir del doc de contenido.
useHead(() => ({
  script:
    route.path === '/'
      ? [{ type: 'application/ld+json', innerHTML: jsonLdScript(homeJsonLd()) }]
      : []
}))
</script>

<script>
export default {
  name: 'Index',
  data() {
    return {
      darkMode: true
    }
  },
  mounted() {
    if (localStorage.getItem('darkMode') === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.darkMode = false;
      document.body.classList.add('light-mode');
    }
  },
  methods: {
    onChangeDarkMode() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    }
  },
}
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}

body.dark-mode {
  background-color: #111421;
  color: #ffffff;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
}

body.light-mode {
  background-color: #f7f7f7;
  color: #000000;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
}
</style>
