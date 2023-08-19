<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import {onMounted} from "vue";
import {useUserStore} from "@/stores/authorization";
onMounted(()=> {
  useUserStore().readCookie()
})
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style scoped></style>
