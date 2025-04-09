<template>
  <TopNavBar />
  <ChooseDate />
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
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
    </div>

    <AddButton />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import AmounList from '@/components/AmounList.vue';
import AddButton from '@/components/AddButton.vue';
import TopNavBar from '@/components/TopNavBar.vue';
import ChooseDate from '@/components/ChooseDate.vue';
import { useFinancialStore } from '@/stores/financial.js';

const store = useFinancialStore();

const userId = ref(1);
//const userId = ref(store.currentUser.id);
const date = computed(() => {
  return `${store.year}-${String(store.months).padStart(2, '0')}`;
});

const currentPage = ref(1);

const startDate = ref('');
const endDate = ref('');

const dateRange = computed(() => getDateRange(startDate.value, endDate.value));
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(store.totalTransactionCount / 10));
});

watch(
  [() => store.selectedCategory, currentPage, date],
  async ([newCategory, newPage, newDate]) => {
    setDate(); // 먼저 날짜 설정

    if (newCategory === '') {
      await store.fetchTransactions(
        userId.value,
        startDate.value,
        endDate.value,
        newPage
      );
      await store.fetchAllTransactions(
        userId.value,
        startDate.value,
        endDate.value
      );
    } else {
      await store.fetchCategoryTransactions(
        userId.value,
        startDate.value,
        endDate.value,
        newCategory,
        newPage
      );
      await store.fetchAllCategoryTransactions(
        userId.value,
        startDate.value,
        endDate.value,
        newCategory
      );
    }
  }
);

onMounted(async () => {
  setDate();
  await store.fetchTransactions(
    userId.value,
    startDate.value,
    endDate.value,
    currentPage
  );
  await store.fetchAllTransactions(
    userId.value,
    startDate.value,
    endDate.value
  );
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
.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.pagination button {
  padding: 4px 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
