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
