<script lang="ts">
import { useUserStore } from '@/stores/authorization'
import { Product } from '@/stores/types'

export default {
  name: 'ProductInfoView',
  data() {
    return {
      store: useUserStore(),
      product: {} as Product
    }
  },
  async mounted() {
    this.store.isLoading = true
    this.product = await this.store.getProductById(this.$route.params.id)
    this.store.isLoading = false
  }
}
</script>

<template>
  <main>
    <p>{{ product }}</p>
  </main>
</template>

<style scoped lang="scss">
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
