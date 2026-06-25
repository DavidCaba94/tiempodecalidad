<template>
  <footer class="footer">
    <nav class="footer-links" aria-label="Pie de página">
      <NuxtLink to="/">Inicio</NuxtLink>
      <NuxtLink to="/watch-list">Relojes</NuxtLink>
      <NuxtLink to="/reviews-list">Reseñas</NuxtLink>
      <NuxtLink to="/videos">Vídeos</NuxtLink>
      <NuxtLink to="/sobre-mi">Sobre mí</NuxtLink>
      <NuxtLink to="/contact">Contacto</NuxtLink>
    </nav>
    <div class="footer-social">
      <a href="https://www.youtube.com/@TiempoDeCalidad" target="_blank" rel="noopener" aria-label="YouTube">
        <Icon name="uil:youtube" />
      </a>
      <a href="https://t.me/+kttAAJ61LeE1NzE0" target="_blank" rel="noopener" aria-label="Telegram">
        <Icon name="uil:telegram" />
      </a>
    </div>
    <p class="footer-copy">{{ 'Copyright © ' + currentYear + ' Tiempo de Calidad' }}</p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  box-sizing: border-box;
  padding: 40px 20px 30px;
  text-align: center;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
  margin-top: 40px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  margin-bottom: 16px;
}

.footer-links a {
  text-decoration: none;
  color: #828282;
  font-size: 15px;
}

.footer-links a:hover {
  color: #00a182;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.footer-social a {
  color: #828282;
  font-size: 24px;
}

.footer-social a:hover {
  color: #00a182;
}

.footer-copy {
  color: #7a7e82;
  font-size: 14px;
  margin: 0;
}
</style>
