// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap'
  ],
  site: { 
    url: 'https://tiempodecalidad.net', 
    name: 'Tiempo de Calidad' 
  },
  robots: {
    allow: ['/'],
    disallow: ['/admin', '/login'],
    sitemap: 'https://tiempodecalidad.net/sitemap.xml'
  }
})