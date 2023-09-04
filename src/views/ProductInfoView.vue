<script lang="ts">
import { useUserStore } from '@/stores/authorization'
import { Product } from '@/stores/types'
import router from '@/router'

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
    const productId = this.$route.params.id as string
    if (await this.store.checkProductExistsById(productId)) {
      this.product = await this.store.getProductById(productId)
    } else {
      await router.push({ name: '404' })
    }

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
