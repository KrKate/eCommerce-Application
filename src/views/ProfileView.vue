<template>
  <main>
    <p>Profile page</p>
    <p style="font-size: 12px">{{ userInfo }}</p>
  </main>
</template>

<script>
import { useUserStore } from '@/stores/authorization'
export default {
  name: 'ProfileView',
  data() {
    return {
      store: useUserStore(),
      userInfo: {}
    }
  },
  async beforeMount() {
    this.store.isLoading = true
    this.userInfo = await this.store.getMyCustomerDetails()
    this.store.isLoading = false
  },
  mounted() {}
}
</script>

<style scoped>
main {
  display: flex;
  margin: auto;
  padding-top: 200px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
  align-items: center;
}
</style>
