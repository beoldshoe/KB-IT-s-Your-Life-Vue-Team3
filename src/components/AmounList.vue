<template>
  <div class="item_list">
    <!-- 헤더 -->
    <div class="header">
      <div class="date_info">
        <span class="day">날짜</span>
        <span class="date">년도/월</span>
      </div>
      <div class="spacer"></div>
      <div class="amount_info">
        <span class="income">총수입</span>
        <span class="expense">총지출</span>
      </div>
    </div>
    <hr />

    <!-- 항목 리스트 -->
    <Item v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script setup>
import Item from './Item.vue';
const props = defineProps({
  items: { type: Array, required: true },
});
</script>

<style>
.item_list {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: sans-serif;
}

.header {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  align-items: center;
  padding: 12px 0;
}

.date_info {
  display: flex;
  gap: 12px;
  align-items: center;
  padding-left: 8px;
  font-weight: bold;
}

.amount_info {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-right: 8px;
  font-weight: bold;
}

.income {
  color: #3498db;
}

.expense {
  color: #e74c3c;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 0;
}
</style>
