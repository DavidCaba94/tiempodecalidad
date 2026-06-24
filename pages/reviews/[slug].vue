<template>
  <div class="post-container">
    <h1 class="post-title">{{ doc.title }}</h1>
    <div class="post-content">
      <ContentRenderer :value="doc" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: doc } = await useAsyncData(`content:${route.path}`, () =>
  queryCollection('content').path(route.path).first()
)

if (!doc.value || doc.value.kind !== 'article') {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

const d = doc.value
const SITE_URL = 'https://tiempodecalidad.net'

useSeoMeta({
  title: d.title,
  description: d.description,
  ogTitle: d.title,
  ogDescription: d.description,
  ogImage: `${SITE_URL}${d.image}`,
  ogType: 'article'
})

useHead({
  script: [{ type: 'application/ld+json', innerHTML: jsonLdScript(articleJsonLd(d)) }]
})
</script>
