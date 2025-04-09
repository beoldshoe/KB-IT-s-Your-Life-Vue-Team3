<template>
  <div class="login-container">
    <h1>{{ title }}</h1>
    <div class="subtitle">
      <h6 v-for="(line, idx) in subtitle" :key="idx">{{ line }}</h6>
    </div>
    <form @submit.prevent="onSubmit" class="login-box">
      <h2>{{ formTitle }}</h2>
      <div class="input-box">
        <label for="email">{{ emailLabel }}</label>
        <input v-model="email" name="email" :placeholder="emailPlaceholder" />
      </div>
      <div class="input-box">
        <label for="password">{{ passwordLabel }}</label>
        <input
          v-model="password"
          name="password"
          type="password"
          :placeholder="passwordPlaceholder"
        />
      </div>
      <button type="submit">{{ buttonText }}</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFinancialStore } from '@/stores/financial';

export default {
  name: 'LoginView',
  setup() {
    const title = ref('국민을 위한 가계부, 국가');
    const subtitle = ref([
      '국가는 수입과 지출을 쉽고 빠르게 기록하고,',
      '카테고리별 지출 현황을 시각적으로 파악하며,',
      '나만의 소비습관을 점검할 수 있습니다.',
      '금융 파트너인 KB와 함께 현명한 소비생활을 시작해보세요.',
    ]);
    const formTitle = ref('로그인');
    const emailLabel = ref('이메일');
    const passwordLabel = ref('비밀번호');
    const emailPlaceholder = ref('이메일을 입력해주세요.');
    const passwordPlaceholder = ref('비밀번호를 입력해주세요');
    const buttonText = ref('로그인');

    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const userStore = useFinancialStore();

    const onSubmit = async () => {
      const success = await userStore.login(email.value, password.value);
      if (success) {
        alert(`👋 ${userStore.currentUser.name}님, 환영합니다!`);
        router.push('/daily');
      } else {
        alert('❌ 이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    };

    return {
      title,
      subtitle,
      formTitle,
      emailLabel,
      passwordLabel,
      emailPlaceholder,
      passwordPlaceholder,
      buttonText,

      email,
      password,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.login-container {
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}
.subtitle {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.subtitle > h6 {
  color: #969696;
  margin: 0;
  line-height: 1.4;
}
.login-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #969696;
  border-radius: 16px;
  background-color: white;
  padding: 1.5rem 3rem;
  gap: 0.5rem;
}
.input-box {
  display: flex;
  width: 100%;
  flex-direction: column;
}
input {
  border-radius: 8px;
  border: 2px solid #969696;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
button {
  width: 80%;
  color: white;
  border: none;
  border-radius: 8px;
  background-color: #2d539e;
  padding: 3px;
  margin-top: 1rem;
}
button:hover {
  color: #969696;
  background-color: #1e3e7a;
}
h1 {
  font-weight: 600;
}
h2 {
  font-weight: 400;
}
</style>
