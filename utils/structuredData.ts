// Generación de JSON-LD (schema.org) en función de la ruta actual.
// Data-driven: lee de los JSON de relojes/reseñas para no duplicar nada por página.
import watches from '~/assets/json/watches.json'
import reviews from '~/assets/json/reviews.json'

const SITE_URL = 'https://tiempodecalidad.net'
const SITE_NAME = 'Tiempo de Calidad'
const LOGO_URL = `${SITE_URL}/assets/img/icono.png`

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  logo: { '@type': 'ImageObject', url: LOGO_URL }
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

// Devuelve el array de objetos JSON-LD que corresponde a la ruta dada.
export function buildStructuredData(path: string): object[] {
  // Normaliza (quita slash final salvo raíz)
  const p = path !== '/' ? path.replace(/\/$/, '') : path

  // 1) Ficha de reloj → Product + Review + Breadcrumb
  const watch = (watches as any[]).find((w) => w.url === p)
  if (watch) {
    const url = `${SITE_URL}${watch.url}`
    const image = `${SITE_URL}/assets/img/watches${watch.image}`
    const reviewMeta = (reviews as any[]).find((r) => r.url === p)
    const description =
      reviewMeta?.description ||
      `Análisis del ${watch.brand} ${watch.model}: ${watch.type}, calibre ${watch.movement}, ${watch.size}mm y ${watch.water_resistance}m de resistencia al agua.`

    const product: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${watch.brand} ${watch.model}`,
      image,
      description,
      brand: { '@type': 'Brand', name: watch.brand },
      category: watch.type,
      offers: {
        '@type': 'Offer',
        price: watch.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: watch.rating,
          bestRating: 5,
          worstRating: 1
        },
        author: { '@type': 'Organization', name: SITE_NAME },
        datePublished: watch.publishedAt,
        publisher
      }
    }

    return [
      product,
      breadcrumb([
        { name: 'Inicio', path: '/' },
        { name: 'Relojes', path: '/watch-list' },
        { name: `${watch.brand} ${watch.model}`, path: watch.url }
      ])
    ]
  }

  // 2) Artículo (guías / TOP) → Article + Breadcrumb
  const article = (reviews as any[]).find((r) => r.url === p && p.startsWith('/reviews/'))
  if (article) {
    const url = `${SITE_URL}${article.url}`
    const image = `${SITE_URL}/assets/img${article.image}`
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        inLanguage: 'es'
      },
      breadcrumb([
        { name: 'Inicio', path: '/' },
        { name: 'Reseñas', path: '/reviews-list' },
        { name: article.title, path: article.url }
      ])
    ]
  }

  // 3) Home → WebSite + Organization
  if (p === '/') {
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
        sameAs: ['https://t.me/+kttAAJ61LeE1NzE0']
      }
    ]
  }

  // Resto de páginas: sin JSON-LD específico
  return []
}
