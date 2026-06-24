<template>
  <div class="link-container">
    <img :src="`/assets/img/icons/${store}.png`" :alt="`Comprar en ${store}`" class="link-icon" />
    <a :href="url" target="_blank" rel="nofollow sponsored noopener">{{ label }}</a>
  </div>
</template>

<script setup>
defineProps({
  url: { type: String, required: true },
  store: { type: String, default: 'aliexpress' },
  label: { type: String, default: 'Click aquí para comprarlo en Aliexpress' }
})
</script>

<style scoped>
.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.link-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.link-container a {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
}

.dark-mode .link-container a {
  color: #ffffff;
}

.light-mode .link-container a {
  color: #000000;
}

.link-container a:hover {
  color: #00a182;
}
</style>
