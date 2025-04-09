<template>
  <div class="chooseDateHeader">
    <div class="chooseDate">
      <button class="cssButton" @click="chooseDateStore.beforeButton"><</button>
      <div class="date">{{ chooseDateStore.currentDate }}</div>
      <button class="cssButton" @click="chooseDateStore.nextButton">></button>
    </div>
  </div>
</template>
<script setup>
import { useFinancialStore } from '@/stores/financial.js';
const chooseDateStore = useFinancialStore();
</script>

<style>
.chooseDateHeader {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.chooseDate {
  grid-column: 3 / 11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}
.cssButton {
  display: flex;
  width: 40px;
  height: 30px;
  font-size: 3em;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 1px;
  color: #0a0a23;
  background-color: white;
  border: none;
  cursor: pointer;
}
.date {
  font-size: 2em;
  text-align: center;
  justify-content: center;
  height: 30px;
}
</style>
