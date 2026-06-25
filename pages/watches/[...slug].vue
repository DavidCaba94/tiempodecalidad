<template>
  <div class="post-container">
    <Breadcrumbs :items="[{ name: 'Inicio', path: '/' }, { name: 'Relojes', path: '/watch-list' }, { name: `${doc.brand} ${doc.model}` }]" />
    <h1 class="post-title">{{ doc.title }}</h1>
    <div class="post-content">
      <ContentRenderer :value="doc" />
    </div>

    <section v-if="related.length" class="related">
      <h2 class="related-title">Relojes relacionados</h2>
      <div class="related-grid">
        <NuxtLink v-for="w in related" :key="w.path" :to="w.path" class="related-item">
          <WatchCard :watchObject="w" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: doc } = await useAsyncData(`content:${route.path}`, () =>
  queryCollection('content').path(route.path).first()
)

if (!doc.value || doc.value.kind !== 'watch') {
  throw createError({ statusCode: 404, statusMessage: 'Reloj no encontrado', fatal: true })
}

const d = doc.value
const SITE_URL = 'https://tiempodecalidad.net'

// Relojes relacionados: misma marca primero, luego mismo tipo, luego el resto.
const { data: allWatches } = await useAsyncData('watches:all', () =>
  queryCollection('content').where('kind', '=', 'watch').all()
)
const related = computed(() => {
  const all = (allWatches.value || []).filter((w) => w.path !== d.path)
  const sameBrand = all.filter((w) => w.brand === d.brand)
  const sameType = all.filter((w) => w.brand !== d.brand && w.type === d.type)
  const rest = all.filter((w) => w.brand !== d.brand && w.type !== d.type)
  return [...sameBrand, ...sameType, ...rest].slice(0, 4)
})

useSeoMeta({
  title: d.title,
  description: d.description,
  ogTitle: d.title,
  ogDescription: d.description,
  ogImage: `${SITE_URL}${d.image}`,
  ogType: 'article'
})

useHead({
  script: [{ type: 'application/ld+json', innerHTML: jsonLdScript(watchJsonLd(d)) }]
})
</script>

<style scoped>
.related {
  margin-top: 60px;
}

.related-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.related-item {
  text-decoration: none;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
