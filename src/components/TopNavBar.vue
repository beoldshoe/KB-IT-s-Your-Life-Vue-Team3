<template>
  <div class="header">
    <div class="tabs">
      <!--탭 부분-->
      <button
        class="baseButton"
        :class="{ selectButton: currentTab === 'daily' }"
        @click="daily"
      >
        일일
      </button>
      <button
        class="baseButton"
        :class="{ selectButton: currentTab === 'months' }"
        @click="months"
      >
        월별
      </button>
      <button
        class="baseButton"
        :class="{ selectButton: currentTab === 'profile' }"
        @click="profile"
      >
        프로필
      </button>
    </div>
    <div class="category">
      <!-- 카테고리 부분-->
      <select
        class="categoryDesign"
        v-if="route.path !== '/user'"
        v-model="categoryStore.selectedCategory"
        @change="categoryChanged"
      >
        <option disabled value="" select hidden>목록 선택</option>
        <option value="categoryall">전체</option>
        <option
          v-for="category in categoryStore.categories"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
  </div>
  <hr />
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { useFinancialStore } from '@/stores/financial.js';

const router = useRouter();
const route = useRoute();
const current = ref('');

const currentTab = computed(() => current.value);
const categoryStore = useFinancialStore();

const daily = () => {
  current.value = 'daily';
  router.push('/daily');
};
const months = () => {
  current.value = 'months';
  router.push('/month');
};
const profile = () => {
  current.value = 'profile';
  router.push('/user');
};
onMounted(() => {
  categoryStore.startCategories();
  if (route.path === '/daily') current.value = 'daily';
  else if (route.path === '/month') current.value = 'months';
  else if (route.path === '/user') current.value = 'profile';
});

const categoryChanged = () => {
  console.log('선택한 카테고리:', categoryStore.selectedCategory);
};
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
}
.baseButton {
  color: #969696;
  margin: 0;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: 1px solid white;
}
.selectButton {
  color: #108cb6;
}
.tabs {
  gap: 1em;
  display: flex;
}
.categoryDesign {
  border-radius: 5px;
  border: 1px solid gainsboro;
  padding: 3px 5px 3px 0;
  text-align: center;
}
</style>
