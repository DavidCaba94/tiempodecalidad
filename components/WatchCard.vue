<template>
  <div class="news-card" :style="{ backgroundImage: 'url(../assets/img/watches' + watchObject.image + ')' }">
    <p class="brand">{{ watchObject.brand }}</p>
    <p class="model">{{ watchObject.model }}</p>
    <img :src="getCountryIcon(watchObject.country)" :alt="watchObject.country" class="country-icon"/>
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
      return '../assets/img/flags/' + country.toLowerCase() + '.png';
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
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
}

.model {
  font-size: 16px;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
  margin-bottom: 10px;
}

.country-icon {
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
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