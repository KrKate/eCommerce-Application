import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import CatalogView from '../views/CatalogView.vue'
import CartView from '../views/CartView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import {useUserStore} from "@/stores/authorization";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AuthorizationView.vue'),
      beforeEnter: () => {
          return !useUserStore().isLogin
      }
    },
    { path: '/:pathMatch(.*)*', name: '404', component: NotFoundView },
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationView
    }
  ]
})

export default router
