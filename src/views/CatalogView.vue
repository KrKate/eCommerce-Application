<template>
  <main>
            <button @click="getProducts">BTn</button>
    <div class="cards-container">
       <div class="product-card" v-for="cart in products" :key="cart.id">
        <h3 class="product-title">{{ cart.masterData.current.name['en-US'] }}</h3>
        <img :src="getImageUrl(cart)"  alt="Product Image" class="product-image">
        <div class="product-description">{{ cart.masterData.current.description['en-US'] }}</div>
        <div class="product-price">{{ getPriceValue(cart) }}</div>
      </div>
    </div>
    <p v-for="cart in products" :key="cart.id">{{ cart }}</p>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/authorization';
import type { Product } from '@/stores/types';

export default {
data() {
  return {
    store: useUserStore(),
    products: [] as Product[]
  }
},
methods: {
  async getProducts() {
    this.products = await this.store.getProducts() || [] as Product[]
  },
  getImageUrl(cart: Product) {
      if (cart.masterData.current.masterVariant.images.length > 0) {
        return cart.masterData.current.masterVariant.images[0].url;
      } else {
        return '#';
      }
    },
    getPriceValue(cart: Product) {
      if (cart.masterData.current.masterVariant.prices.length > 0) {
        return cart.masterData.current.masterVariant.prices[0].value.centAmount;
      } else {
        return 'free';
      }
    }
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
  flex-direction: column;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  gap: 50px;
  align-content: center
}

.product-card {
  max-height: 500px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  border: 2px solid #cccccc;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.3s linear;
  &:hover {
  transform: perspective(800px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
     .product-image {
      transform: translate3d(0%, -15%, 500px);
      scale: 1.3 1.6;
     }
}
&:active {
  transform: translateY(2%);
  box-shadow: 2px 10px 10px -5px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 10px 10px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 10px 10px -5px rgba(0, 0, 0, 0.75);
  .product-image {
    transform: translate3d(0%, 0%, 0px);
      scale: none;
     }
}

}

.product-image {
  object-fit: cover;
  padding: 10px;
  margin-bottom: 10px;
  transition: all 0.3s linear;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 10px;
}

.product-description {
  margin-bottom: 5px;
  font-size: 1rem;
  text-align: justify;
}

.product-price {
  font-size: 1.2rem;
  text-align: center;
}
</style>
