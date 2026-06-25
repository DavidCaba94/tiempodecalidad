<template>
  <nav class="breadcrumbs" aria-label="Migas de pan">
    <template v-for="(item, i) in items" :key="i">
      <NuxtLink v-if="item.path && i < items.length - 1" :to="item.path" class="crumb">{{ item.name }}</NuxtLink>
      <span v-else class="crumb current">{{ item.name }}</span>
      <Icon v-if="i < items.length - 1" name="uil:angle-right" class="sep" />
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true } // [{ name, path? }]
})
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;
  color: #828282;
}

.crumb {
  text-decoration: none;
  color: #828282;
}

.crumb:hover {
  color: #00a182;
}

.current {
  font-weight: 600;
}

.sep {
  margin: 0 4px;
  font-size: 16px;
}
</style>
