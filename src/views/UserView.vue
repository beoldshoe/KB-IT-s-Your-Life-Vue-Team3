<template>
  <TopNavBar />
  <LogoutButton />
  <div class="user-container">
    <div class="user-box">
      <h2>{{ edit_title }}</h2>
      <div class="input-box">
        <div class="input-row">
          <label for="email">{{ emailLabel }}</label>
          <span class="origin-email"
            >{{ origin_email }}{{ originalEmail }}</span
          >
        </div>
        <div class="input-row">
          <input
            v-model="newEmail"
            name="email"
            :placeholder="emailPlaceholder"
          />
          <button class="edit-btn" @click="onUpdateEmail">
            {{ edit_btn }}
          </button>
        </div>
        <div v-if="newEmail && !isValidEmail(newEmail)" class="error-msg">
          {{ val_email_text }}
        </div>
      </div>
      <div class="input-box">
        <div class="input-row">
          <label for="password">{{ passwordLabel }}</label>
        </div>
        <div class="input-row">
          <input
            v-model="password"
            name="password"
            type="password"
            :placeholder="passwordPlaceholder"
          />
          <button class="edit-btn" @click="onUpdatePassword">
            {{ edit_btn }}
          </button>
        </div>
        <div v-if="password && !isValidPassword(password)" class="error-msg">
          {{ val_password_text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useFinancialStore } from '@/stores/financial';
import TopNavBar from '@/components/TopNavBar.vue';
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  name: 'UserView',
  components: { TopNavBar, LogoutButton },
  setup() {
    const emailLabel = ref('이메일');
    const passwordLabel = ref('비밀번호');
    const emailPlaceholder = ref('이메일을 입력해주세요.');
    const passwordPlaceholder = ref('비밀번호를 입력해주세요');
    const edit_btn = ref('수정');
    const edit_title = ref('회원정보 수정');
    const origin_email = ref('기존 이메일 : ');
    const val_email_text = ref('올바른 이메일 형식을 입력해주세요.');
    const val_password_text = ref('비밀번호는 최소 6자 이상이어야 합니다.');

    const originalEmail = ref('');
    const newEmail = ref('');
    const password = ref('');

    const userStore = useFinancialStore();

    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    // 이메일 유효성 검사
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // 비밀번호 유효성 검사 (6자 이상)
    const isValidPassword = (pw) => pw.length >= 6;

    onMounted(() => {
      let user = userStore.currentUser;

      if (!user) {
        const localUser = localStorage.getItem('user');
        if (localUser) {
          user = JSON.parse(localUser);
          userStore.currentUser = user;
        }
      }

      if (user) {
        originalEmail.value = user.email;
      }
    });

    const onUpdateEmail = async () => {
      if (!isValidEmail(newEmail.value)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
      }

      await userStore.updateEmail(newEmail.value);
      originalEmail.value = newEmail.value;
      newEmail.value = '';
      alert('이메일이 수정되었습니다!');
    };

    const onUpdatePassword = async () => {
      if (!isValidPassword(password.value)) {
        alert('비밀번호는 6자 이상이어야 합니다.');
        return;
      }

      await userStore.updatePassword(password.value);
      password.value = '';
      alert('비밀번호가 수정되었습니다!');
    };

    return {
      emailLabel,
      passwordLabel,
      emailPlaceholder,
      passwordPlaceholder,
      edit_title,
      edit_btn,
      origin_email,
      originalEmail,
      val_email_text,
      val_password_text,
      newEmail,
      password,
      onUpdateEmail,
      onUpdatePassword,
      isValidEmail,
      isValidPassword,
    };
  },
};
</script>

<style scoped>
.user-container {
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}
.user-box {
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
  width: 100%;
  display: flex;
  flex-direction: column;
}
.input-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
}
input {
  width: 100%;
  border-radius: 8px;
  border: 2px solid #969696;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
.edit-btn {
  width: 100px;
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
  background-color: #2d539e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.edit-btn:hover {
  color: #969696;
  background-color: #1e3e7a;
}
.origin-email {
  color: #969696;
  font-size: 0.875rem;
}

.error-msg {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: red;
}
</style>
