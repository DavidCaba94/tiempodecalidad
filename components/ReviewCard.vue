<template>
  <div class="review-card">
    <div class="review-card-img">
      <div :style="{ backgroundImage: 'url(../assets/img/watches' + review.image + ')' }" class="review-img" :alt="review.title"></div>
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
  },
  methods: {
    readMore() {
      this.$router.push(this.review.url);
    }
  }
}
</script>

<style scoped>
.review-card {
  display: flex;
  border: 1px solid #bababa1c;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
}

.review-card:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}

.review-img {
  width: 160px;
  height: 100%;
  border-radius: 8px;
  margin-right: 16px;
  background-size: cover;
  background-position: center;
}

.review-card-body {
  text-align: left;
  color: #333;
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
}

@media (max-width: 768px) {
  .review-card-body h2 {
  font-size: 16px;
}

.review-card-body p {
  font-size: 14px;
}
}
</style>