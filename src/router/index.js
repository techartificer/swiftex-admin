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
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/merchant',
    name: 'Merchant',
    component: () => import('../views/Merchant.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/rider',
    name: 'Rider',
    component: () => import('../views/Riders.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import('../views/Payment.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/shops',
    name: 'Shops',
    component: () => import('../views/Shops.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/*',
    name: '404',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

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
