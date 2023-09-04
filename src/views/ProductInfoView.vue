<template>
  <main>
    <div class="images-bar"></div>
    <div class="alternate-images"></div>
    <div class="main-image">
      <img :src=" product.masterData.current.masterVariant.images[0].url" alt="Pokemon">
    </div>
    <div class="main-description">
      <h1 class="title">{{ product.masterData.current.name['en-US'] }}</h1>
      <div class="description">{{ product.masterData.current.description['en-US'] }}</div>
      <add-button>Добавить в корзину</add-button>
    </div>
    <!-- <p>{{ product }}</p> -->
  </main>
</template>



<script lang="ts">
import { useUserStore } from '@/stores/authorization'
import { type Product } from '@/stores/types'

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



<style scoped lang="scss">
main {
  display: flex;
  margin: auto;
  padding-top: 200px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  align-items: center;
}

.main-description {
  display: flex;
  flex-direction: column;
}

</style>
