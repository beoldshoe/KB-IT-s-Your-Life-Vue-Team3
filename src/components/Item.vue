<template>
  <div class="transaction_item" @click="openEditModal">
    <span class="category">{{ item.category }}</span>
    <span class="content">{{ item.memo }}</span>
    <span class="price" :class="typeClass(item.type)">
      {{ item.price.toLocaleString() }}원
    </span>
  </div>
  <hr />

  <AddModal
    v-if="showModal"
    :mode="0"
    :itemData="item"
    @close="showModal = false"
  />
</template>

<script setup>
import { ref } from 'vue';
import AddModal from './AddModal.vue';

const showModal = ref(false);

const openEditModal = () => {
  showModal.value = true;
};
const props = defineProps({ item: { type: Object, required: true } });
const typeClass = (type) => {
  return type === '수입' ? 'income' : type === '지출' ? 'expense' : 'unknown';
};
</script>

<style scoped>
.transaction_item {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.transaction_item:hover {
  background-color: #d6ecff;
}

.category {
  text-align: left;
  padding-left: 8px;
}

.content {
  grid-column: span 1;
  text-align: center;
}

.price {
  text-align: right;
  padding-right: 8px;
  font-weight: bold;
}

.expense {
  color: #e74c3c;
}

.income {
  color: #3498db;
}
</style>
