<template>
   <div>
      <TopNavBar></TopNavBar>
      <ChooseDate></ChooseDate>
      <Calendar :year="year" :month="month" />
      <AddButton/>
  </div>
</template>

<script setup>
import Calendar from '@/components/Calendar.vue';
import { watch, onMounted, computed } from 'vue';
import { useFinancialStore } from '@/stores/financial.js';
import TopNavBar from '@/components/TopNavBar.vue';
import AddButton from '@/components/AddButton.vue';
import ChooseDate from '@/components/ChooseDate.vue';

const store = useFinancialStore();

const year = computed(() => store.year);
const month = computed(() => store.months);

const userId = 1;

const getStartEndDate = () => {
  const startDate = `${year.value}-${String(month.value).padStart(2, '0')}-01`;
  const lastDay = new Date(year.value, parseInt(month.value), 0).getDate();
  const endDate = `${year.value}-${String(month.value).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return { startDate, endDate };
};

const fetchTransactions = async () => {
  const { startDate, endDate } = getStartEndDate();
  await store.fetchBudgets(userId, startDate, endDate);
};

onMounted(fetchTransactions);
watch([year, month], fetchTransactions);
</script>