<template>
  <main>
    <h1>Choose your pokemon!</h1>
    <div class="setting-bar">
    <form class="search-form">
      <input class="search-input" type="text" placeholder="Enter your search query">
      <button class="search-button" type="submit">Search</button>
    </form>
    <button class="category-btn" @click="toggleSelect">Category</button>
   </div>
   <div class="select" :class="{ show: showSelect }">
     <div class="item" v-for="item in items" :key="item.id">
      <input type="checkbox" :id="item.id" :value="item.value">
        <label :for="item.id">{{ item.label }}</label>
     </div>
   </div>
    <div class="cards-container">
       <div class="product-card" v-for="cart in products" :key="cart.id">
        <h3 class="product-title">{{ cart.masterData.current.name['en-US'] }}</h3>
        <img :src="getImageUrl(cart)"  alt="Product Image" class="product-image">
        <div class="prices">
          <div class="product-price" :class="{ 'crossed-out': getDiscount(cart) !== ' ' }"> {{ getPriceValue(cart) }} </div>
            <div class="product-discount"> {{ getDiscount(cart) }} </div>
        </div>

        <RouterLink class="info-button" :to="'/' + cart.masterData.current.masterVariant.id">More info</RouterLink>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/authorization';
import type { Product } from '@/stores/types';

export default {
data() {
  return {
    store: useUserStore(),
    products: [] as Product[],
    items: [
      { id: "electric", value: "electric", label: "Electric" },
      { id: "fire", value: "fire", label: "Fire" },
      { id: "normal", value: "normal", label: "Normal" },
      { id: "psychic", value: "psychic", label: "Psychic" },
      { id: "water", value: "water", label: "Water" }
    ],
    showSelect: false
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
        return `€ ${(cart.masterData.current.masterVariant.prices[0].value.centAmount)/100}`;
      } else {
        return 'free';
      }
    },
    getDiscount(cart: Product) {
        const discounted = cart.masterData.current.masterVariant.prices[0]?.discounted?.value.centAmount;
        return discounted ? `€ ${discounted / 100}` : " ";
},
    toggleSelect() {
      this.showSelect = !this.showSelect;
    }
}
}

</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';

h1 {
  @include pokemon-text($app-yellow, $app-dark-blue);
  margin: 0 auto;
  font-size: 3rem;
  @media screen and (max-width: 760px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 560px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 390px) {
     font-size: 1.5rem;
  }
}


main {
  display: flex;
  margin: auto;
  padding-top: 200px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
  overflow-x: hidden;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: 50px 20px 20px 20px;
  gap: 50px;
  align-content: center;
  align-items: center;
  justify-content: center;
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
  background-color:  #e2e1e1;
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
.prices {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.product-price {
  font-size: 1.2rem;
}

.product-discount {
  font-size: 1.2rem;
  color: $app-red;
  font-weight: 700;
}

.crossed-out {
  position: relative;
}

.crossed-out::before, .crossed-out::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1.5px;
  background-color: $app-red;
}

.crossed-out::before {
  transform: rotate(-35deg);
}
.crossed-out::after {
  transform: rotate(35deg);
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
    font-size: 1.2rem;
    text-decoration: none;
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

.search-form {
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #cccccc;
  width: 50%;
  margin: 15px 10px 0px 0px;
}

.search-button {
  border-radius: 0 7px 7px 0;
  color: black;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
.search-input {
  border-radius: 7px 0 0 7px;
  width: 70%;
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.setting-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.select {
  display: none;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  border: 2px solid #cccccc;
  border-radius: 10px;
  padding: 15px;
  font-size: 1rem;
  position: absolute;
  right: 2%;
  top: 295px;
  z-index: 10;
  background-color: #fbfafa;
  @media screen and (max-width: 760px) {
    top: 280px;
  }
  @media screen and (max-width: 710px) {
    top: 330px;
    right: 12%;
  }
  @media screen and (max-width: 560px) {
    top: 320px;
    right: 9.5%;
  }
  @media screen and (max-width: 470px) {
    top: 320px;
    right: 8%;
  }
  @media screen and (max-width: 450px) {
    top: 320px;
    right: 7%;
  }
  @media screen and (max-width: 344px) {
    top: 365px;
    right: 13%;
  }
}

.show {
  display: flex;
}
.category-btn {
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #cccccc;
  margin-top: 15px;
}

label {
  margin-left: 10px;
}



</style>
