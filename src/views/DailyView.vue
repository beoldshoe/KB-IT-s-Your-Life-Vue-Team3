<template>
  <h2>DailyView</h2>
  <!-- <button @click="starthandler" /> -->
  <AmounList :items="state.items" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import * as api from '@/api/transaction.js';
import AmounList from '@/components/AmounList.vue';

// import { useTransactionStore } from '@/stores/financial.js';
// const Transactionstore = useTransactionStore();
// const { dayTotalExpense, dayTotalIncome, fetchTransactions, dayTransactions } =
//   Transactionstore;

// const starthandler = async () => {
//   await fetchTransactions(1, '2025-05-01', '2025-05-20');
//   console.log('총 지출: ' + dayTotalExpense('2025-04-07'));
//   console.log('총 수입: ' + dayTotalIncome('2025-04-07'));
//   console.log('특정 일자 가계부: ' + dayTransactions('2025-04-07'));
// };

// 데이터 가져오기 (수정)
const userId = ref(1);
const date = ref('2025-04');
const params = `?userId=${userId.value}&date_gte=${date.value}-01&date_lte=${date.value}-28`;

const state = reactive({ items: [] });
const load = async () => {
  state.items = await api.getTransaction(params);
  console.log(state.items);
};
load();
</script>
