import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

console.log(store?.getters?.IsLoggedIn);
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store?.getters?.IsLoggedIn) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});

export default router;
