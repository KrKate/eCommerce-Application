<template>
  <main>
            <!-- <button @click="getProducts">BTn</button> -->
    <div class="cards-container">
       <div class="product-card" v-for="cart in products" :key="cart.id">
        <h3 class="product-title">{{ cart.masterData.current.name['en-US'] }}</h3>
        <img :src="getImageUrl(cart)"  alt="Product Image" class="product-image">
        <div class="product-price">€ {{ getPriceValue(cart) }} </div>
        <button class="info-button">More info</button>
      </div>
    </div>
    <!-- <p v-for="cart in products" :key="cart.id">{{ cart }}</p> -->
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
mounted() {
    this.getProducts()
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
@import '@/assets/styles/colors';

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

.product-price {
  font-size: 1.2rem;
  text-align: center;
}

.info-button {
    height: 30px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    margin-top:auto;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info-button:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.info-button:active {
    color: #000
}

.info-button:active:after {
    background: transparent;
}

.info-button:hover:before {
    opacity: 1;
}

.info-button:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #0075be;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}
</style>
