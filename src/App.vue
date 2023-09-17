<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from '@/stores/authorization'
import Preloader from '@/components/AppPreloader.vue'
import { onBeforeMount } from 'vue'
onBeforeMount(async () => {
  await useUserStore().readCookie()
})
</script>

<template>
  <AppHeader />
  <Preloader v-if="useUserStore().isLoading" />
  <RouterView />
</template>

<style scoped></style>

  //  if (isUserLoggedIn) {
  //   console.log('Hello, my user')
  //   } else {
  //     const cart = await useUserStore().createCart()
  //     console.log(cart)
  //   }
  //   watch(() => useUserStore().isLogin, (newValue) => {
  //   if (newValue) {
  //     console.log('Hello, my user')
  //   } else {
  //     console.log('Hello, anonymous user')
  //   }
  // })

  // if (useUserStore().isLogin) {
  //   const carts = await useUserStore().getCarts()
  //   if (carts.length > 0) {
  //     console.log('У пользователя есть корзина')
  //   } else {
  //     console.log('У пользователя нет корзины')
  //   }
  // } else {
  //   console.log('Произошло что-то не то')
  // }
  // provide('cartID', cartID.value)

