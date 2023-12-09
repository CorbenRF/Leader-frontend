import { createRouter, createWebHistory } from 'vue-router';
import CataloguePage from '@/pages/CataloguePage.vue';
import CartPage from '@/pages/CartPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: CataloguePage,
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CartPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
