import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/daily',
      name: 'daily',
      component: () => import('../views/DailyView.vue'),
    },
    {
      path: '/month',
      name: 'month',
      component: () => import('../views/MonthView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
