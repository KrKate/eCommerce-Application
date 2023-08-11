<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AuthorizationView from '@/views/AuthorizationView.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style scoped></style>
