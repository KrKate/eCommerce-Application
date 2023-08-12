<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from '@/stores/authorization'
import { onMounted } from 'vue'
const store = useUserStore()
onMounted(() => {
  store.fetchToken()
})
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style scoped></style>
