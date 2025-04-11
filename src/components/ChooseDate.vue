<template>
  <div class="chooseDateHeader">
    <div class="chooseDate">
      <button class="cssButton" @click="chooseDateStore.beforeButton"><</button>

      <div class="date" @click="showPicker = true">
        {{ chooseDateStore.currentDate }}
      </div>
      <input
        v-if="showPicker"
        type="month"
        class="month-picker"
        v-model="selectedMonth"
        @change="onMonthChange"
        @blur="showPicker = false"
      />

      <button class="cssButton" @click="chooseDateStore.nextButton">></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useFinancialStore } from '@/stores/financial.js';

const chooseDateStore = useFinancialStore();
const showPicker = ref(false);

const selectedMonth = ref(
  `${chooseDateStore.year}-${String(chooseDateStore.months).padStart(2, '0')}`
);

const onMonthChange = () => {
  const [year, month] = selectedMonth.value.split('-').map(Number);
  chooseDateStore.year = year;
  chooseDateStore.months = month;
  showPicker.value = false;
};
</script>

<style scoped>
.chooseDateHeader {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.chooseDate {
  grid-column: 3 / 11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.cssButton {
  display: flex;
  width: 40px;
  height: 30px;
  font-size: 3em;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  padding-top: 1px;
  border: none;
  cursor: pointer;
}
.date {
  font-size: 2.2em;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  height: 40px;
  padding: 6px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.month-picker {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  margin-top: 10px;
  font-size: 1.2em;
  padding: 6px 12px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;
}
</style>
