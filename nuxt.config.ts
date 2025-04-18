// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-28',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/sitemap'
  ],
  site: { 
    url: 'https://tiempodecalidad.net', 
    name: 'Tiempo de Calidad' 
  }
})