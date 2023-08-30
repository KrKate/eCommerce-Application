<template>
  <main>
    <div class="cards-container">
      <div class="product-card">
        <h3 class="product-title">DDD</h3>
        <img src="../assets/images/mewtwo.png" alt="Product Image" class="product-image">
        <button @click="getProducts">BTn</button>
        <div class="product-description">dd</div>
        <div class="product-price">JJJ</div>
      </div>
    </div>
    <p v-for="cart in products" :key="cart">{{ cart }}</p>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/authorization';
import type { Product } from '@/stores/types';

export default {
data() {
  return {
    store: useUserStore(),
    products: []
  }
},
methods: {
  async getProducts() {
    this.products =  await this.store.getProducts()
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
}

.product-card {
  max-height: 500px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  border: 2px solid #cccccc;
  padding: 10px;
}

.product-card::before {
  content: "";
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  opacity: 0;
  transition: opacity 0.5s;
}

.product-card:hover::before {
  opacity: 1;
}

.product-image {
  object-fit: cover;
  margin-bottom: 10px;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  background-color: black;
  color: white;
  text-align: center;
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
