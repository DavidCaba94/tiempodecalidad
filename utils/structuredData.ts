// Generación de JSON-LD (schema.org).
// Las fichas/artículos lo generan desde su doc de @nuxt/content (en la página).
// La home lo genera en app.vue.
const SITE_URL = 'https://tiempodecalidad.net'
const SITE_NAME = 'Tiempo de Calidad'
const LOGO_URL = `${SITE_URL}/assets/img/icono.png`

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  logo: { '@type': 'ImageObject', url: LOGO_URL }
}

function abs(p: string): string {
  return p?.startsWith('http') ? p : `${SITE_URL}${p}`
}

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`
    }))
  }
}

// Serializa para inyectar en un <script type="application/ld+json">.
export function jsonLdScript(data: object[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

// Ficha de reloj → Product + Review + Breadcrumb
export function watchJsonLd(doc: any): object[] {
  const url = `${SITE_URL}${doc.path}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${doc.brand} ${doc.model}`,
      image: abs(doc.image),
      description: doc.description,
      brand: { '@type': 'Brand', name: doc.brand },
      category: doc.type,
      offers: {
        '@type': 'Offer',
        price: doc.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: doc.rating, bestRating: 5, worstRating: 1 },
        author: { '@type': 'Organization', name: SITE_NAME },
        datePublished: doc.publishedAt,
        publisher
      }
    },
    breadcrumb([
      { name: 'Inicio', path: '/' },
      { name: 'Relojes', path: '/watch-list' },
      { name: `${doc.brand} ${doc.model}`, path: doc.path }
    ])
  ]
}

// Artículo / guía → Article + Breadcrumb
export function articleJsonLd(doc: any): object[] {
  const url = `${SITE_URL}${doc.path}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: doc.title,
      description: doc.description,
      image: abs(doc.image),
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: 'es'
    },
    breadcrumb([
      { name: 'Inicio', path: '/' },
      { name: 'Reseñas', path: '/reviews-list' },
      { name: doc.title, path: doc.path }
    ])
  ]
}

// Home → WebSite + Organization
export function homeJsonLd(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'es'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: LOGO_URL,
      sameAs: [
        'https://www.youtube.com/@TiempoDeCalidad',
        'https://t.me/+kttAAJ61LeE1NzE0'
      ]
    }
  ]
}
