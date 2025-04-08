import { defineStore } from 'pinia';
import { getUser, putUser } from '@/api/transaction';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async login(email, password) {
      console.log('로그인 요청 →', { email, password });

      const data = await getUser('', { email, password });

      console.log('로그인 응답 ←', data);

      if (data.length === 1) {
        this.currentUser = data[0];
        console.log('currentUser 저장됨:', this.currentUser);

        localStorage.setItem('user', JSON.stringify(data[0]));
        return true;
      }

      console.warn('로그인 실패: 일치하는 유저 없음');
      return false;
    },

    logout() {
      console.log('로그아웃');
      this.currentUser = null;
      localStorage.removeItem('user');
    },

    async updateEmail(newEmail) {
      if (!this.currentUser) {
        console.warn('updateEmail 호출 시 currentUser 없음');
        return;
      }

      console.log('이메일 수정 요청 →', {
        id: this.currentUser.id,
        newEmail,
      });

      const updated = await putUser(`/${this.currentUser.id}`, {
        ...this.currentUser,
        email: newEmail,
      });

      console.log('이메일 수정 응답 ←', updated);

      if (updated) {
        this.currentUser.email = newEmail;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        console.log('currentUser.email 수정됨:', this.currentUser.email);
      }
    },

    async updatePassword(newPassword) {
      if (!this.currentUser) {
        console.warn('updatePassword 호출 시 currentUser 없음');
        return;
      }

      console.log('비밀번호 수정 요청 →', {
        id: this.currentUser.id,
        newPassword,
      });

      const updated = await putUser(`/${this.currentUser.id}`, {
        ...this.currentUser,
        password: newPassword,
      });

      console.log('비밀번호 수정 응답 ←', updated);

      if (updated) {
        this.currentUser.password = newPassword;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        console.log('currentUser.password 수정됨');
      }
    },
  },
});
