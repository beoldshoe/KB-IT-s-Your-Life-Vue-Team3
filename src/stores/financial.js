// /src/stores/financialStore.js
import { defineStore } from 'pinia';
import * as api from '@/api/transaction.js'; // getCategory 호출을 위해 api 모듈 임포트

export const useFinancialStore = defineStore('financial', {
  state: () => ({
    categories: [],
    transaction: [],
    selectedCategory: '',
    user: null,
    budgetList: [],
    currentUser: null,
    transactionList: [],
  }),

  getters: {
    //특정 일 조회
    getBudgetByDate: (state) => (year, month, day) => {
      const paddedMonth = String(month).padStart(2, '0');
      const paddedDay = String(day).padStart(2, '0');
      const targetDate = `${year}-${paddedMonth}-${paddedDay}`;
      return state.budgetList.filter((item) => item.date === targetDate);
    },
    //지출 통계
    totalSpend: (state) => {
      return state.budgetList
        .filter((item) => item.type === '지출')
        .reduce((sum, item) => sum + item.price, 0);
    },
    //수입통계
    totalIncome: (state) => {
      return state.budgetList
        .filter((item) => item.type === '수입')
        .reduce((sum, item) => sum + item.price, 0);
    },
    // 일자별 총 지출
    dayTotalExpense: (state) => (date) => {
      return state.transactionList
        .filter((item) => item.date === date)
        .filter((item) => item.type === '지출')
        .reduce((acc, cur) => acc + cur.price, 0);
    },
    // 일자별 총 수입
    dayTotalIncome: (state) => (date) => {
      return state.transactionList
        .filter((item) => item.date === date)
        .filter((item) => item.type === '수입')
        .reduce((acc, cur) => acc + cur.price, 0);
    },
    // 특정 일자 가계부
    dayTransactions: (state) => (date) => {
      return state.transactionList.filter((item) => item.date === date);
    },
  },

  actions: {
    // getCategory를 호출하여 데이터를 categories에 저장하는 액션
    async fetchCategories() {
      try {
        // getCategory 함수 호출
        const data = await api.getCategory('', '');

        // 데이터를 categories에 저장
        this.categories = data;
        console.log(this.categories);
      } catch (e) {
        console.error('[ERROR] Failed to fetch categories', e);
      }
    },

    async postTrans(userId, date, type, category, price, memo) {
      try {
        // 전달할 데이터 준비
        const budget = {
          userId,
          date,
          type,
          category,
          price,
          memo,
        };

        // postTransaction 함수 호출
        const data = await api.postTransaction('', budget);

        // 데이터가 정상적으로 전달되면 처리
        console.log(data); // 응답 받은 데이터 출력
        // 필요에 따라, 응답 데이터를 상태에 저장하거나 추가 작업을 할 수 있습니다.
      } catch (e) {
        console.error('[ERROR] Failed to post transaction', e);
      }
    },

    async removeTrans(id) {
      try {
        const url = `/${id}`;
        const data = await api.removeTransaction(url, '');

        console.log(data);
        alert('삭제 완료되었습니다!');
        window.location.reload(); // ✅ 또는 await store.fetchTransactions();
      } catch (e) {
        console.error('[ERROR] Failed to post transaction', e);
        alert('삭제 실패하였습니다!');
      }
    },

    async editTrans(id, userId, date, type, category, price, memo) {
      try {
        const url = `/${id}`;
        const budget = {
          userId,
          date,
          type,
          category,
          price,
          memo,
        };

        const data = await api.putTransaction(url, budget);

        console.log(data);
        alert('수정 완료되었습니다!');
        window.location.reload(); // ✅ 또는 await store.fetchTransactions();
      } catch (e) {
        console.error('[ERROR] Failed to post transaction', e);
        alert('수정 실패하였습니다.');
      }
    },

    async startCategories() {
      try {
        const res = await axios.get('http://localhost:3000/category');
        this.categories = res.data;
        console.log('categories불러오기', this.categories);
      } catch (err) {
        console.error('카테고리 가져오기 실패:', err);
      }
    },

    async fetchBudgets(userId, startDate, endDate) {
      console.log('요청 날짜:', startDate, '~', endDate);
      const res = await getTransaction('', {
        userId,
        date_gte: startDate,
        date_lte: endDate,
      });
      console.log('api 응답:', res);
      this.budgetList = res || [];
    },

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

      const updated = await putUser(`${this.currentUser.id}`, {
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

      const updated = await putUser(`${this.currentUser.id}`, {
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
    //특정 달 가계부 조회(날짜 내림차순)
    async fetchTransactions(userId, startDate, endDate) {
      console.log('특정 달 가계부 조회');
      console.log('요청 날짜:', startDate, '~', endDate);
      const res = await api.getTransaction('', {
        userId,
        date_gte: startDate,
        date_lte: endDate,
        _sort: 'date',
        _order: 'DESC',
      });
      console.log('api 응답:', res);
      this.transactionList = res || [];
    },
    // 특정 카테고리 가계부 조회
    async fetchCategoryTransactions(userId, startDate, endDate, category) {
      console.log('특정 카테고리 가계부 조회');
      console.log('요청 날짜:', startDate, '~', endDate);
      const res = await api.getTransaction('', {
        userId,
        category,
        date_gte: startDate,
        date_lte: endDate,
        _sort: 'date',
        _order: 'DESC',
      });
      console.log('api 응답:', res);
      this.transactionList = res || [];
    },

    // async fetchTrans() {
    //   try {
    //     // getCategory 함수 호출
    //     const data = await api.getTransaction('', '');

    //     // 데이터를 categories에 저장
    //     this.transaction = data;
    //     console.log(this.transaction);
    //   } catch (e) {
    //     console.error('[ERROR] Failed to fetch categories', e);
    //   }
    // },
  },
});
