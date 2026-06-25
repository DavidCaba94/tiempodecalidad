<template>
  <div class="error-container">
    <h1 class="error-code">{{ error?.statusCode || 404 }}</h1>
    <p class="error-message">
      {{ error?.statusCode === 404 ? 'Vaya, esta página no existe o se ha movido.' : 'Ha ocurrido un error inesperado.' }}
    </p>
    <div class="error-actions">
      <button class="error-button" @click="handleError">Volver al inicio</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: { type: Object, default: null }
})

useHead({
  htmlAttrs: { lang: 'es' },
  title: 'Página no encontrada · Tiempo de Calidad'
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 160px;
  text-align: center;
}

.error-code {
  font-size: 80px;
  font-weight: bold;
  margin: 0;
  color: #00a182;
}

.error-message {
  font-size: 20px;
  font-weight: 300;
  margin: 20px 0 40px;
}

.error-button {
  background-color: #00a182;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
}

.error-button:hover {
  background-color: #007f6b;
}
</style>
