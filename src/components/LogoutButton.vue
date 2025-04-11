<template>
  <button class="logout-button" @click="handleLogout">
    <img src="@/assets/logout-icon.png" alt="Logout" class="logout-icon" />
  </button>
</template>

<script setup>
import { useFinancialStore } from '@/stores/financial.js';
import { useRouter } from 'vue-router';

const router = useRouter(); // ✅ 이거 추가

const store = useFinancialStore();

const handleLogout = () => {
  const confirmed = confirm('로그아웃 하시겠습니까?');
  if (confirmed) {
    store.logout();
    alert('로그아웃 되었습니다!');
    router.push('/');
  }
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
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.logout-button:hover {
  transition: 0.3s;
  transform: scale(1.2);
}
</style>
