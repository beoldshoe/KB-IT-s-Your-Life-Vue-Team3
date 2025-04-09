<template>
   <div>
   
      <Calendar :year="year" :month="month" />
      <AddButton/>
  </div>
</template>

<script setup>
import Calendar from '@/components/Calendar.vue';
import { ref, onMounted, watch } from 'vue';
import { useFinancialStore } from '@/stores/financial.js';
//import TopNavBar from '@/components/TopNavBar.vue';
import AddButton from '@/components/AddButton.vue';

const store = useFinancialStore();

//현재 날짜를 기반으로 (추후 변경)
const today = new Date();
const year = ref(String(today.getFullYear()));
const month = ref(String(today.getMonth() + 1).padStart(2, '0'));

const userId = 1;

const getStartEndDate = () => {
  const startDate = `${year.value}-${month.value}-01`;
  const lastDay = new Date(year.value, parseInt(month.value), 0).getDate();
  const endDate = `${year.value}-${month.value}-${String(lastDay).padStart(2, '0')}`;
  return { startDate, endDate };
};

const fetchTransactions = async () => {
  const { startDate, endDate } = getStartEndDate();
  await store.fetchBudgets(userId, startDate, endDate);
};

onMounted(async () => {
  const { startDate, endDate } = getStartEndDate();
  await store.fetchBudgets(userId, startDate, endDate);

  //stores 테스트 출력
  console.log('전체 budgetList:', store.budgetList);
  const budgetsOn07th = store.getBudgetByDate(year.value, month.value, '07');
  console.log('07일 데이터:', budgetsOn07th);
  console.log('총 지출:', store.totalSpend);
  console.log(' 총 수입:', store.totalIncome);
});

watch([year, month], fetchTransactions);
</script>
