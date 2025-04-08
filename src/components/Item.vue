<template>
  <div class="transaction_item">
    <span class="category">{{ item.category }}</span>
    <span class="content">{{ item.memo }}</span>
    <span class="price" :class="item.type">{{ item.price }}원</span>
  </div>
  <hr />
</template>

<script setup>
const props = defineProps({ item: { type: Object, required: true } });
</script>

<style>
.transaction_item {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 총 3칸으로 변경 */
  gap: 10px;
  align-items: center;
  padding: 12px 0;
  width: 100%;
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
