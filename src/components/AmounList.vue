<template>
  <div class="item_list m-2 p-2">
    <!-- 헤더 -->
    <div class="header">
      <div class="date_info">
        <span class="day">{{ day }}</span>
        <span class="amount_date">{{ year }} / {{ month }}</span>
      </div>
      <div class="spacer"></div>
      <div class="amount_info">
        <span class="income">{{ totalIncome.toLocaleString() }}원</span>
        <span class="expense">{{ totalExpense.toLocaleString() }}원</span>
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
  date: { type: String, required: true },
  totalIncome: { type: Number, required: true },
  totalExpense: { type: Number, required: true },
});
//console.log(props.date);
const [year, month, day] = props.date.split('-');
</script>

<style>
.item_list {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: sans-serif;
  background-color: white;
  border-radius: 3%;
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

.amount_date {
  font-size: 0.8rem;
}
hr {
  border: none;
  border-top: 1px solid #424242;
  margin: 0;
}
</style>
