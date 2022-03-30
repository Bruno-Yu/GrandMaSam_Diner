import { createRouter, createWebHashHistory } from 'vue-router';
import FrontView from '../views/FrontView.vue';

const routes = [
  {
    path: '/',
    name: 'frontView',
    component: FrontView,
    children: [
      {
        path: '',
        component: () => import('../views/IndexView.vue'),
      },
      {
        path: '/productsView',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: '/localStorage',
        component: () => import('../views/LocalStorage.vue'),
      },
      {
        path: '/userOrders',
        component: () => import('../views/UserOrders.vue'),
        children: [
          {
            path: '/cartView',
            component: () => import('../views/CartView.vue'),
          },
          {
            path: '/userContact',
            component: () => import('../views/UserContact.vue'),
          },
          {
            path: '/orderCheck',
            component: () => import('../views/OrderCheck.vue'),
          },
          {
            path: '/paidSuccess',
            component: () => import('../views/PaidSuccess.vue'),
          },
        ],
      },
      {
        path: '/about',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: '/productView/:id',
        name: 'Product',
        component: () => import('../views/ProductView.vue'),
      },
    ],
  },

  {
    path: '/admin',
    name: 'dashboardView',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/ProductsAdmin.vue'),
      },
      {
        path: '/orderAmin',
        component: () => import('../views/OrdersAdmin.vue'),
      },
      {
        path: '/couponsAdmin',
        component: () => import('../views/CouponsAdmin.vue'),
      },
      {
        path: '/aboutAdmin',
        component: () => import('../views/AboutAdmin.vue'),
      },
      {
        path: '/eventAdmin',
        component: () => import('../views/EventAdmin.vue'),
      },
    ],
  },
  {
    path: '/trueusLogin',
    name: 'trueusLogin',
    component: () => import('../views/TrueusLogin.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from) {
    if (to.fullPath.match('about') && from.fullPath.match('404')) {
      return {
        top: 3400,
      };
    }
    return {};
  },
});

export default router;
