<template>
  <div class="pagination" v-if="totalPages > 1">
    <Icon name="uil:arrow-left" @click="go(currentPage - 1)" class="arrow-icon" />
    <div
      v-for="index in totalPages"
      :key="index"
      @click="go(index)"
      :class="currentPage === index ? 'page-number active' : 'page-number'"
    >{{ index }}</div>
    <Icon name="uil:arrow-right" @click="go(currentPage + 1)" class="arrow-icon" />
  </div>
</template>

<script setup>
// Componente controlado: la página activa la marca el padre vía prop.
const props = defineProps({
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  currentPage: { type: Number, default: 1 }
})
const emit = defineEmits(['pageChanged'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage)))

function go(page) {
  if (page < 1 || page > totalPages.value || page === props.currentPage) return
  emit('pageChanged', page)
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
