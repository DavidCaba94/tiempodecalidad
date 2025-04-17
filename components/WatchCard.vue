<template>
  <div class="news-card" :style="{ backgroundImage: 'url(../assets/img/watches' + watchObject.image + ')' }">
    <div class="brand">
      <img :src="getCountryIcon(watchObject.country)" :alt="watchObject.country" class="country-icon"/>
      <p>{{ watchObject.brand }}</p>
    </div>
    <p class="model">{{ watchObject.model }}</p>
    <div class="color-palette">
      <div v-for="(color, i) in watchObject.colors" :key="i" class="color-bubble" :style="{ backgroundColor: color }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WatchCard',
  props: {
    watchObject: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCountryIcon(country) { 
      return '../assets/img/flags/' + country.replace(' ', '-').toLowerCase() + '.png';
    }
  }
}
</script>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 200px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  cursor: pointer;
  text-decoration: none;
}

.news-card:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0px 6px rgba(0, 0, 0, 1);
  margin: 0;
}

.brand p {
  margin: 0;
  margin-left: 10px;
}

.model {
  font-size: 16px;
  color: white;
  text-shadow: 0 0px 6px rgba(0, 0, 0, 1);
  margin: 0;
  margin-bottom: 5px;
}

.country-icon {
  width: 20px;
  height: 20px;
}

.color-palette {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.color-bubble {
  width: 10px;
  height: 10px;
  border: 1px solid #c3c3c3;
  border-radius: 50%;
  margin: 0 5px;
}

/* Mobile media query */
@media (max-width: 768px) {
  .news-card {
    width: 100%;
    max-width: 500px;
    height: 300px;
    margin-right: 0;
  }
}
</style>