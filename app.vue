<template>
  <div>
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
  ],
  // Fija el tema en <html> antes del primer pintado (evita el destello/FOUC).
  script: [
    {
      tagPosition: 'head',
      innerHTML:
        "(function(){try{var t=localStorage.getItem('darkMode')==='true'?'dark-mode':'light-mode';document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('light-mode')}})()"
    }
  ]
})

useSeoMeta({
  ogSiteName: 'Tiempo de Calidad',
  ogType: 'website',
  ogLocale: 'es_ES',
  ogUrl: () => `${SITE_URL}${route.path}`,
  ogImage: `${SITE_URL}/assets/img/banner/banner.webp`,
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
      darkMode: false
    }
  },
  mounted() {
    // El script inline ya fijó la clase en <html>; aquí solo sincronizamos
    // el estado reactivo para el icono del menú (sol/luna).
    this.darkMode = document.documentElement.classList.contains('dark-mode');
  },
  methods: {
    setTheme(dark) {
      const el = document.documentElement;
      el.classList.toggle('dark-mode', dark);
      el.classList.toggle('light-mode', !dark);
      localStorage.setItem('darkMode', dark ? 'true' : 'false');
    },
    onChangeDarkMode() {
      this.darkMode = !this.darkMode;
      this.setTheme(this.darkMode);
    }
  },
}
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}

/* Tema fijado en <html> por el script inline (sin FOUC). El color de fondo por
   defecto es claro, para que coincida con el estado por defecto si no hay JS. */
html {
  background-color: #f7f7f7;
  color: #000000;
}

html.dark-mode {
  background-color: #111421;
  color: #ffffff;
}

html.dark-mode body {
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

html.light-mode body {
  color: #000000;
  -webkit-font-smoothing: antialiased;
}

html,
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
