<template>
  <button class="logout-button" @click="handleLogout">
    <img src="@/assets/logout-icon.png" alt="Logout" class="logout-icon" />
  </button>
</template>

<script setup>
import { useFinancialStore } from '@/stores/financial.js';

const store = useFinancialStore();

const handleLogout = () => {
  store.logout();
  alert('로그아웃 되었습니다!');
  router.push('/home');
};
</script>

<style scoped>
.logout-button {
  position: fixed;
  bottom: 40px;
  left: 40px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1000;
}

.logout-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.logout-button:hover {
  transition: 0.3s;
  transform: scale(1.2);
}
</style>
