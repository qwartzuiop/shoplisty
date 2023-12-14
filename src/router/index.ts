import { createRouter, createWebHistory } from 'vue-router';
import ShoppingListView from '@/views/ShoppingListView.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shoppingList',
      component: ShoppingListView,
    },
  ],
});
