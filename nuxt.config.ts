// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Enumera todas las rutas de contenido (content/**/*.md -> /ruta) para
// prerenderizarlas aunque no estén enlazadas directamente (paginación, etc.).
function contentRoutes(): string[] {
  const dir = resolve('content')
  try {
    return readdirSync(dir, { recursive: true })
      .map((f) => String(f).replace(/\\/g, '/'))
      .filter((f) => f.endsWith('.md'))
      // @nuxt/content normaliza las rutas a minúsculas: igualamos aquí.
      .map((f) => '/' + f.replace(/\.md$/, '').toLowerCase())
  } catch {
    return []
  }
}

export default defineNuxtConfig({
  compatibilityDate: '2025-10-01',
  devtools: { enabled: true },
  css: ['~/assets/css/post.css'],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: contentRoutes()
    }
  },
  content: {
    // Encabezados como títulos normales (sin envolverlos en un enlace de ancla).
    renderer: { anchorLinks: false }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
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