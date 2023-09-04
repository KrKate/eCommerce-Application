<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/authorization'
import Preloader from '@/components/AppPreloader.vue'

onMounted(() => {
  useUserStore().readCookie()
})
</script>

<template>
  <AppHeader />
  <Preloader v-if="useUserStore().isLoading" />
  <RouterView />
</template>

<style scoped></style>
