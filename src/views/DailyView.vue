<template>
  <!-- <TopNavBar /> -->

  <div class="daily-wrapper">
    <!-- <h2>DailyView</h2> -->
    <div v-for="date in dateRange" :key="date">
      <AmounList
        v-if="store.dayTransactions(date).length > 0"
        :date="date"
        :items="store.dayTransactions(date)"
        :totalIncome="store.dayTotalIncome(date)"
        :totalExpense="store.dayTotalExpense(date)"
      />
    </div>
    <AddButton />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import AmounList from '@/components/AmounList.vue';
import AddButton from '@/components/AddButton.vue';
// import TopNavBar from '@/components/TopNavBar.vue';
import { useFinancialStore } from '@/stores/financial.js';

const store = useFinancialStore();

const userId = ref(1);
//const userId = ref(store.currentUser.id);
const date = ref('2025-04');
// const date = computed({
//   get: () => store.date,
//   set: (val) => {
//     store.date = val;
//   },
// });

const startDate = ref('');
const endDate = ref('');

const dateRange = computed(() => getDateRange(startDate.value, endDate.value));

watch(
  () => store.selectedCategory,
  async (newVal) => {
    if (newVal === '') {
      await store.fetchTransactions(
        userId.value,
        startDate.value,
        endDate.value
      );
    } else {
      await store.fetchCategoryTransactions(
        userId.value,
        startDate.value,
        endDate.value,
        store.selectedCategory
      );
    }
  }
);

onMounted(async () => {
  setDate();
  await store.fetchTransactions(userId.value, startDate.value, endDate.value);
});

const setDate = () => {
  const today = new Date();
  const [selYear, selMonth] = date.value.split('-');

  const isCurrentMonth =
    today.getFullYear() === +selYear && today.getMonth() + 1 === +selMonth;
  const lastDay = isCurrentMonth
    ? today.getDate()
    : new Date(+selYear, +selMonth, 0).getDate();

  startDate.value = `${date.value}-01`;
  endDate.value = `${date.value}-${String(lastDay).padStart(2, '0')}`;
};

// 날짜 범위 만들기(내림차순)
const getDateRange = (start, end) => {
  const result = [];
  const current = new Date(start);
  const last = new Date(end);

  while (current <= last) {
    result.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return result.reverse(); // 내림차순
};
</script>

<style>
.daily-wrapper {
  background-color: #e7f1fe;
  padding: 16px;
}
</style>
