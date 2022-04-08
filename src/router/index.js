import { createRouter, createWebHashHistory } from 'vue-router';
import FrontView from '../views/frontend/FrontView.vue';

const routes = [
  {
    path: '/',
    name: 'frontView',
    component: FrontView,
    children: [
      {
        path: '',
        component: () => import('../views/frontend/IndexView.vue'),
      },
      {
        path: '/productsView',
        component: () => import('../views/frontend/ProductsView.vue'),
      },
      {
        path: '/localStorage',
        component: () => import('../views/frontend/LocalStorage.vue'),
      },
      {
        path: '/theEnd',
        component: () => import('../views/frontend/TheEnd.vue'),
      },
      {
        path: '/aidsIntro',
        component: () => import('../views/frontend/AidsIntro.vue'),
      },
      {
        path: '/userOrders',
        component: () => import('../views/frontend/UserOrders.vue'),
        children: [
          {
            path: '/cartView',
            component: () => import('../views/frontend/CartView.vue'),
          },
          {
            path: '/userContact',
            component: () => import('../views/frontend/UserContact.vue'),
          },
          {
            path: '/orderCheck',
            component: () => import('../views/frontend/OrderCheck.vue'),
          },
          {
            path: '/paidSuccess',
            component: () => import('../views/frontend/PaidSuccess.vue'),
          },
        ],
      },
      {
        path: '/about',
        component: () => import('../views/frontend/AboutView.vue'),
      },
      {
        path: '/productView/:id',
        name: 'Product',
        component: () => import('../views/frontend/ProductView.vue'),
      },
    ],
  },

  {
    path: '/admin',
    name: 'dashboardView',
    component: () => import('../views/backend/DashboardView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/backend/ProductsAdmin.vue'),
      },
      {
        path: '/ordersAdmin',
        component: () => import('../views/backend/OrdersAdmin.vue'),
      },
      {
        path: '/couponsAdmin',
        component: () => import('../views/backend/CouponsAdmin.vue'),
      },
      {
        path: '/aboutAdmin',
        component: () => import('../views/backend/AboutAdmin.vue'),
      },
      {
        path: '/eventAdmin',
        component: () => import('../views/backend/EventAdmin.vue'),
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
    if (to.fullPath.match('about') && from.fullPath.match('trueusLogin')) {
      return {
        top: 3400,
      };
    }
    return {};
  },
});

export default router;
