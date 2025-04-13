<template>
  <div class="review-card">
    <div class="review-card-img">
      <div :style="{ backgroundImage: 'url(../assets/img' + review.image + ')' }" class="review-img" :alt="review.title"></div>
    </div>
    <div class="review-card-body">
      <h2>{{ review.title }}</h2>
      <p>{{ review.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCard',
  props: {
    reviewObject: {
      type: Object,
      required: true
    }
  },
  computed: {
    review() {
      return this.reviewObject;
    }
  }
}
</script>

<style scoped>
.review-card {
  display: flex;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.dark-mode .review-card {
  background-color: #1e202c;
}

.light-mode .review-card {
  background-color: #ffffff;
}

.review-card:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}

.review-img {
  width: 160px;
  height: 100%;
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-right: 16px;
  background-size: cover;
  background-position: center;
}

.review-card-body {
  text-align: left;
  color: #333;
  padding: 20px;
}

.dark-mode .review-card-body {
  color: #dfdfdf !important;
}

.review-card-body h2 {
  font-size: 18px;
  margin: 0;
}

.review-card-body p {
  font-size: 15px;
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .review-img {
    width: 120px;
  }

  .review-card-body h2 {
    font-size: 16px;
  }

  .review-card-body p {
    font-size: 14px;
  }
}
</style>