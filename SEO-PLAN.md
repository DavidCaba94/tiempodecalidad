# Plan de mejora SEO y reestructuración — Tiempo de Calidad

> Documento de trabajo. Estado: **propuesta para aprobar**. Última revisión: 2026-06-25.
> Stack: Nuxt 3 · Despliegue: Netlify (deploy automático en cada push a `master`).
>
> **Decisiones aprobadas:**
> - Arquitectura de contenido: **Markdown con `@nuxt/content`**.
> - URLs: **se mantienen las actuales** (`/watches/...`, `/reviews/...`) → migración solo de backend, **sin redirecciones**, riesgo cero de ranking.
> - JSON-LD autor: **`Organization` "Tiempo de Calidad"**.
> - Ratings: **se definen juntos** (escala 1–5; propondré una nota por reseña y se ajusta).
> - Fechas de publicación: a falta de fechas reales, se usan las de los **commits** como aproximación.

---

## 1. Objetivo

Maximizar el posicionamiento orgánico de todos los artículos (reseñas de relojes y artículos "TOP"), mejorar Core Web Vitals, y dejar una arquitectura donde **publicar un artículo = escribir un `.md`**, sin duplicar código.

---

## 2. Diagnóstico resumido (estado actual)

### Crítico (penaliza indexación directamente)
- **C1.** ~89 rutas de imagen tipo `src="../../../public/assets/img/..."` → **404 en producción** (en Nuxt `public/` se sirve desde `/`, sin `/public`). Pérdida total de SEO de imágenes.
- **C2.** Home y listados rellenan tarjetas en `mounted()` (solo cliente) → contenido **ausente del HTML** que ve Google.
- **C3.** **Cero JSON-LD** (`Product`/`Review`/`Article`) → sin rich snippets (estrellas, precio).
- **C4.** **Cero Open Graph / Twitter Cards** → mal compartido en redes/Telegram.
- **C5.** **Sin URL canónica** en ninguna página.
- **C6.** **Sin `<html lang="es">`**.
- **C7.** `head` definido **dos veces** por página (`<Head>` en template + objeto `head:{}` estático que en Nuxt 3 Options API no se aplica bien).

### Arquitectura / mantenibilidad
- **A1.** ~130 líneas de CSS idéntico duplicadas en cada una de las 17 fichas + 4 artículos.
- **A2.** Contenido (texto) mezclado dentro del `.vue`.
- **A3.** `pages/watches/cadisen/plantilla.vue` → URL basura `/watches/cadisen/plantilla` indexable.
- **A4.** `watches.json` sin fecha, sin nota/valoración, sin cuerpo → falta info para JSON-LD y orden por novedad.
- **A5.** Taxonomía confusa: `/watches/...` y `/reviews/...` son ambos reseñas.

### Rendimiento / otros
- **P1.** `@nuxt/image` instalado pero sin usar (no WebP/AVIF, no lazy, no dimensiones → CLS).
- **P2.** FOUC de dark mode (clase aplicada en `mounted()`).
- **P3.** Enlazado interno pobre (Footer solo copyright; fichas sin "relacionados").
- **P4.** Sin `404.vue`, sin breadcrumbs, sin página de autor/"Sobre mí" (E-E-A-T).

---

## 3. Arquitectura objetivo

### 3.1 Modelo de contenido (`@nuxt/content`)

Dos colecciones de Markdown con frontmatter. **La estructura de carpetas refleja las URLs actuales** (que se mantienen), de modo que `@nuxt/content` genera el `path` automáticamente y no hacen falta redirecciones:

```
content/
  watches/                     # → /watches/<marca>/<modelo>
    casio/marlin-mdv-106.md
    pagani-design/yatch-master-pd1651.md
    san-martin/62mas.md
    ...                        # 1 .md por ficha de reloj (17)
  reviews/                     # → /reviews/<slug>
    top-divers-aliexpress.md
    top-cronos-aliexpress.md
    consejos-coleccion-relojes.md
    seiko-falso-aliexpress.md  # artículos "TOP"/guías (4)
```

**Frontmatter ficha de reloj** (`relojes/*.md`):
```yaml
---
title: "San Martin 62MAS, tiembla Seiko: diver automático premium"
description: "El San Martin 62MAS es uno de los mejores divers..."
brand: "San Martin"
model: "62MAS"
price: 190
currency: "EUR"
movement: "Automatic"
type: "Diver"
waterResistance: 200
material: "Stainless Steel"
bezel: "Ceramic"
mirror: "Sapphire"
size: 39
colors: ["gun gray", "blue", "green"]
country: "China"
rating: 4.5              # NUEVO: para estrellas en JSON-LD
image: "/assets/img/watches/san-martin/62mas.png"
gallery: ["/assets/img/watches/san-martin/62mas.jpeg"]
youtube: "oNfNy8G0vP8"
affiliate: "https://s.click.aliexpress.com/e/_EGLpdF6"
publishedAt: 2025-06-01  # NUEVO: fecha real de publicación
updatedAt: 2026-06-25
---

Cuerpo del artículo en Markdown (h2, párrafos, imágenes...).
```

**Frontmatter artículo "TOP"/guía** (`articulos/*.md`): igual pero sin specs de un solo reloj; incluye `youtube`, `publishedAt`, e idealmente una lista de relojes referenciados para `ItemList`.

> El frontmatter de relojes **reemplaza** a `assets/json/watches.json`: el listado filtrable se generará consultando la colección con `queryCollection`, no un JSON aparte. Misma idea para `reviews.json` (se deriva del contenido).

### 3.2 Estructura de URLs — **SE MANTIENE LA ACTUAL**

Decisión aprobada: no se cambian las URLs. Migración solo de backend → **sin redirecciones**.

| Tipo | URL (sin cambios) |
|------|-------------------|
| Ficha de reloj | `/watches/<marca>/<modelo>` |
| Artículo TOP/guía | `/reviews/<slug>` |
| Listado relojes | `/watch-list` |
| Listado artículos | `/reviews-list` |
| Vídeos | `/videos` |
| Contacto | `/contact` |

### 3.3 Páginas dinámicas (sustituyen a los 21 `.vue` hardcodeados)

Rutas que reproducen las URLs actuales leyendo de la colección:

```
pages/
  watches/
    [brand]/
      [model].vue      # plantilla ÚNICA de ficha de reloj
  reviews/
    [slug].vue         # plantilla ÚNICA de artículo
  watch-list.vue       # listado filtrable (lee colección, SSR)
  reviews-list.vue     # listado de artículos (lee colección, SSR)
  index.vue            # home (SSR, sin mounted())
  videos.vue
  contact.vue
layouts/
  default.vue          # menú + footer + estilos comunes (CSS de post centralizado)
```

### 3.4 Renderizado / Netlify

- Activar **prerender de todas las rutas** (mejor CWV y SEO; HTML estático cacheable):
  ```ts
  // nuxt.config.ts
  nitro: {
    prerender: { crawlLinks: true, routes: ['/'] }
  }
  ```
  Con `crawlLinks` Nitro descubre todas las páginas siguiendo enlaces. `@nuxtjs/sitemap` generará el sitemap a partir de las rutas + colección.
- Netlify detecta Nuxt automáticamente; confirmar `netlify.toml` (build `nuxt build` o `nuxt generate`) y carpeta de publicación.

---

## 4. Estándar SEO por página (a aplicar de forma centralizada)

Composable `useSeo()` reutilizable que en cada página setea:
- `<html lang="es">` (vía `useHead({ htmlAttrs: { lang: 'es' } })` global en `app.vue`).
- `titleTemplate`: `%s · Tiempo de Calidad` (eliminar el sufijo manual repetido).
- `description` única.
- **Canonical**: `https://tiempodecalidad.net{ruta}`.
- **Open Graph**: `og:title`, `og:description`, `og:image` (absoluta), `og:type`, `og:url`, `og:site_name`, `og:locale=es_ES`.
- **Twitter Card**: `summary_large_image`.
- **JSON-LD** según tipo:
  - Ficha de reloj → `Product` + `review` (`Review` con `Rating`) + `offers` (precio, `priceCurrency`).
  - Artículo TOP/guía → `Article` (+ `ItemList` de relojes si aplica).
  - Home → `WebSite` + `Organization` (con `sameAs` a YouTube/Telegram).
  - Listados → `BreadcrumbList`.

Ejemplo JSON-LD ficha (resumen):
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "San Martin 62MAS",
  "image": "https://tiempodecalidad.net/assets/img/watches/san-martin/62mas.png",
  "brand": { "@type": "Brand", "name": "San Martin" },
  "review": {
    "@type": "Review",
    "reviewRating": { "@type": "Rating", "ratingValue": 4.5, "bestRating": 5 },
    "author": { "@type": "Person", "name": "Tiempo de Calidad" }
  },
  "offers": { "@type": "Offer", "price": 190, "priceCurrency": "EUR" }
}
```

---

## 5. Roadmap por fases (checklist)

### Fase 0 — Quick wins críticos (sin cambiar arquitectura) — ✅ COMPLETADA (2026-06-25)
- [x] Arreglar todas las rutas de imagen `public/assets` → `/assets` (C1). 89 refs + dinámicas. Verificado: 0 rutas rotas en SSR.
- [x] `<html lang="es">` global (C6). Verificado en SSR.
- [x] `titleTemplate` global inteligente (no duplica sufijo) (C7).
- [x] Canonical automática reactiva por ruta (C5). Verificado: home y fichas con su URL correcta.
- [x] Open Graph + Twitter Cards base globales en `app.vue` (C4). *(og:title/og:image por página → se afinan en Fase 2.)*
- [x] Eliminar `plantilla.vue` (A3). Verificado: ahora devuelve 404.
- [x] **Extra:** favicon roto `/icon.ico` → `/favicon.ico` (el archivo real es `public/favicon.ico`).
- [x] Verificado `sitemap.xml` (26 URLs, sin `plantilla`) y `robots.txt`. Build SSR OK.

> Pendiente menor heredado (se resuelve en Fase 2): cada página aún tiene un `head:{}` Options API muerto (Nuxt 3 lo ignora) y un `<link rel=icon>` propio redundante con el global. Inofensivo.

### Fase 1 — Datos estructurados — ✅ COMPLETADA (2026-06-25)
- [x] JSON-LD `Product`+`Review` en fichas (C3). Verificado: precio, rating y fecha correctos.
- [x] JSON-LD `Article` + `BreadcrumbList` en artículos `/reviews/`.
- [x] `WebSite`+`Organization` en home; `BreadcrumbList` en fichas y artículos.
- [x] Implementado **data-driven** desde `utils/structuredData.ts` + `app.vue` (cero edición por página).
- [x] Añadidos `rating` (1–5) y `publishedAt` a `watches.json`; `publishedAt` a artículos de `reviews.json`.
- [x] Logo copiado a `public/assets/img/icono.png` para `Organization`.
- [x] Validado: JSON-LD parseable en las 3 tipologías (build SSR OK).
- [ ] **Pendiente tuyo:** revisar las notas (1–5) propuestas en `watches.json` y ajustar las que no encajen.
- [ ] Validar en producción con el [Rich Results Test](https://search.google.com/test/rich-results) tras desplegar.

> Notas propuestas (editables en `watches.json`): Marlin 4.0 · Yacht PD-1651 4.0 · Flieger B 4.0 · Cadisen Royal Oak 4.5 · BB58 PD-1671 4.5 · CasiOak Edifice 4.5 · Flieger A 4.0 · Sugess Deus 4.0 · Moonwatch PD-1701 4.0 · Timex Scout 3.5 · Berny Compressor 4.0 · Steeldive Willard 4.5 · Feice Skeleton 4.0 · Casio Royale 4.0 · Northedge Gavia 2 3.5 · San Martin 62MAS 4.5 · Wishdoit GMT 4.0.

### Fase 2 — Migración a Markdown (`@nuxt/content`)
- [ ] Instalar y configurar `@nuxt/content` (definir colecciones + schema con Zod).
- [ ] Crear `layouts/default.vue` con menú/footer y **CSS de post centralizado**.
- [ ] Crear `pages/relojes/[slug].vue` y `pages/articulos/[slug].vue` (plantillas únicas).
- [ ] Migrar los 17 `.vue` de relojes → `content/relojes/*.md` (texto + frontmatter, añadiendo `rating` y `publishedAt`).
- [ ] Migrar los 4 artículos → `content/articulos/*.md`.
- [ ] Reescribir `index.vue`, `relojes/index.vue`, `articulos/index.vue` para leer de la colección con `queryCollection` (SSR, sin `mounted()`) → resuelve C2.
- [ ] Portar filtros y buscador del listado de relojes a datos de la colección.
- [ ] Borrar los 21 `.vue` hardcodeados de `pages/watches/`+`pages/reviews/`, `watches.json`, `reviews.json` y restos (`.data/content`, `public/content`).
- [ ] Verificar que cada `path` generado por la colección coincide **exactamente** con la URL antigua (no hacen falta redirecciones, pero hay que comprobarlo URL a URL).

### Fase 3 — Rendimiento / CWV
- [ ] Sustituir `<img>` y `background-image` por `<NuxtImg>`/`<NuxtPicture>` (WebP/AVIF, lazy, width/height) (P1).
- [ ] Eliminar FOUC de dark mode (inicialización antes del paint, p. ej. plugin/inline script) (P2).
- [ ] `loading="lazy"` en iframes de YouTube + faceta `lite-youtube` opcional.
- [ ] Auditar Lighthouse (objetivo: 90+ en SEO y Performance).

### Fase 4 — Autoridad y enlazado interno
- [ ] Footer con enlaces (secciones, redes, Telegram, YouTube) (P3).
- [ ] Bloque "relojes relacionados" al final de cada ficha (P3).
- [ ] Breadcrumbs visibles con schema (P4).
- [ ] Página "Sobre mí"/autor para E-E-A-T (P4).
- [ ] `404.vue` personalizada (P4).
- [ ] Enlaces internos contextuales entre artículos y fichas.

---

## 6. Decisiones — RESUELTAS

1. ✅ **URLs:** se mantienen las actuales (`/watches/...`, `/reviews/...`). Sin redirecciones.
2. ✅ **Ratings:** se definen juntos (escala 1–5). Pendiente: pasada para asignar nota a cada reloj.
3. ✅ **Fechas:** se usan las de los commits como aproximación (ajustables si las tienes).
4. ✅ **Autor JSON-LD:** `Organization` "Tiempo de Calidad".

> Único cabo abierto operativo: asignar las **notas (1–5)** a los 17 relojes antes/durante la Fase 1.

---

## 7. Orden de ejecución sugerido

`Fase 0` → `Fase 1` (impacto SEO inmediato, bajo riesgo) → `Fase 2` (la grande) → `Fase 3` → `Fase 4`.
Cada fase es un commit/PR independiente y desplegable, para validar en Netlify de forma incremental.
