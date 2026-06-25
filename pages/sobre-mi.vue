<template>
  <div class="about-container">
    <Breadcrumbs :items="[{ name: 'Inicio', path: '/' }, { name: 'Sobre mí' }]" />
    <h1 class="about-title">Sobre mí</h1>

    <p class="about-text">
      <strong>Tiempo de Calidad</strong> nace de la pasión por la relojería accesible. Soy un aficionado
      que lleva años coleccionando, usando y analizando relojes, con un foco especial en los modelos que
      ofrecen una <strong>relación calidad-precio sobresaliente</strong>: divers automáticos, homenajes,
      cronógrafos y piezas con carácter que no cuestan una fortuna.
    </p>

    <p class="about-text">
      Cada reseña que publico está basada en la <strong>experiencia real</strong> con el reloj en la muñeca:
      acabados, calibre, comodidad, lúmen, sensaciones del día a día y, por supuesto, si justifica su precio.
      No soy un laboratorio ni pretendo sentar cátedra; soy alguien que comparte, con honestidad, lo que ha
      probado para ayudarte a elegir mejor.
    </p>

    <p class="about-text">
      Todo el contenido se complementa con vídeos en mi canal de YouTube y con una
      <strong>comunidad muy activa en Telegram</strong>, donde compartimos fotos, dudas y ofertas. Si te gusta
      este mundo, te animo a unirte: entre todos siempre aprendemos más.
    </p>

    <div class="link-container">
      <Icon name="uil:youtube" class="tg-icon" />
      <a href="https://www.youtube.com/@TiempoDeCalidad" target="_blank" rel="noopener">Mi canal de YouTube</a>
    </div>
    <div class="link-container">
      <Icon name="uil:telegram" class="tg-icon" />
      <a href="https://t.me/+kttAAJ61LeE1NzE0" target="_blank" rel="noopener">Únete a la comunidad de Telegram</a>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Sobre mí',
  description:
    'Quién está detrás de Tiempo de Calidad: un aficionado a la relojería que reseña relojes con la mejor relación calidad-precio basándose en su experiencia real de uso.'
})
</script>

<style scoped>
.about-container {
  max-width: 750px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
}

.about-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
}

.about-text {
  font-size: 16px;
  font-weight: 300;
  text-align: justify;
  margin-bottom: 24px;
}

.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.tg-icon {
  font-size: 26px;
  margin-right: 10px;
  color: #00a182;
}

.link-container a {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: #00a182;
}

@media (max-width: 768px) {
  .about-container {
    margin-top: 80px;
    padding: 10px;
  }
}
</style>
