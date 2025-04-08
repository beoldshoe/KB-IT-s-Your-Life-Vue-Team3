import { defineStore } from 'pinia';
import { getUser } from '@/api/transaction';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async login(email, password) {
      const data = await getUser('', { email, password });
      if (data.length === 1) {
        this.currentUser = data[0];
        localStorage.setItem('user', JSON.stringify(data[0]));
        return true;
      }
      return false;
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem('user');
    },
  },
});
