<template>
  <div class="pagination">
    <Icon name="uil:arrow-left" @click="prevPage" class="arrow-icon"/>
    <div v-for="index in totalPages" :key="index" @click="setPage(index)" :class="currentPage === index ? 'page-number active' : 'page-number'">{{ index }}</div>
    <Icon name="uil:arrow-right" @click="nextPage" class="arrow-icon"/>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalItems: {
      type: Number,
      required: true,
      default: 12
    },
    itemsPerPage: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1
    }
  },
  mounted() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.totalItems % this.itemsPerPage !== 0) this.totalPages++;
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit('pageChanged', this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.$emit('pageChanged', this.currentPage);
      }
    },
    setPage(page) {
      this.currentPage = page;
      this.$emit('pageChanged', this.currentPage);
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.page-number {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
}

.arrow-icon:hover,
.page-number:hover {
  color: #00a182;
}

.page-number.active {
  color: #00a182;
  border: 2px solid #00a182;
}

.arrow-icon {
  margin: 5px;
  cursor: pointer;
  font-size: 24px;
}
</style>