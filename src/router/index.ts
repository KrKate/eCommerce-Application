import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CartView from '@/views/CartView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import { useUserStore } from '@/stores/authorization'
import ProductInfoView from '@/views/ProductInfoView.vue'
import ProfileView from "@/views/ProfileView.vue";

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
      path: '/product/:id',
      name: 'product',
      component: ProductInfoView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: async () => {
        if (!useUserStore().isLogin) await router.push('/login')
        return useUserStore().isLogin
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AuthorizationView.vue'),
      beforeEnter: async () => {
        if (useUserStore().isLogin) {
          await router.push('/')
          return false
        }
        return !useUserStore().isLogin
      }
    },
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationView,
      beforeEnter: async () => {
        if (useUserStore().isLogin) {
          await router.push('/')
          return false
        }
        return !useUserStore().isLogin
      }
    },
    { path: '/:pathMatch(.*)*', name: '404', component: NotFoundView }
  ]
})

export default router
