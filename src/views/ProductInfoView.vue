<template>
  <main>
    <div class="images-container">
    <div class="alternate-images">
      <img class="alternate-img" :src="product.masterData.staged.masterVariant.images[0]?.url || '#'" alt="Pokemon">
      <img class="alternate-img" :src="product.masterData.staged.masterVariant.images[1]?.url || '#'" alt="Pokemon">
      <img class="alternate-img" :src="product.masterData.staged.masterVariant.images[2]?.url || '#'" alt="Pokemon">
    </div>
    <div class="main-image">
      <img :src="product.masterData.current.masterVariant.images[0].url" alt="Pokemon">
    </div>
  </div>
    <div class="main-description">
      <h1 class="title">{{ product.masterData.current.name['en-US'] }}</h1>
      <div class="price-container">
        <div class="price">€ {{ (product.masterData.current.masterVariant.prices[0].value.centAmount)/100 }} </div>
        <div class="discount" :class="{ 'crossed-out': getDiscount(product) !== ' ' }">{{ getDiscount(product) }}</div>
      </div>
      <div class="description">{{ product.masterData.current.description['en-US'] }}</div>
      <button class="add-button">Add to Cart</button>
    </div>
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
  },
  methods: {
      getDiscount(product: Product) {
      const discounted =
        product.masterData?.current?.masterVariant?.prices[0]?.discounted?.value?.centAmount
      return discounted ? `€ ${discounted / 100}` : ' '
    },
  }

}
</script>


<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';

main {
  display: flex;
  margin: auto;
  padding-top: 200px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  align-items: center;
  gap: 30px;
  justify-content: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
}

img {
  object-fit: cover;
  width: 100%;
}

h1 {
  @include pokemon-text($app-yellow, $app-dark-blue);
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
.main-description {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: right;
  font-size: 1.5rem;
  width: 40%;
  @media screen and (max-width: 1000px) {
    width: 50%;
  }
  @media screen and (max-width: 760px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    align-items: center;
    gap: 15px;
    width: 85%;
  }
}


.images-container {
  width: 30%;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  @media screen and (max-width: 600px) {
    width: 60%;
  }
}

.main-image img{
  height: 40vh;
  object-fit: contain;
  @media screen and (max-width: 600px) {
    height: 30vh;
  }
}
.alternate-images {
   display: flex;
   gap: 10px;
   justify-content:space-between;
   @media screen and (max-width: 600px) {
    justify-content: center;
    height: 120px;
  }
}

.alternate-img {
  width: 25%;
}

.alternate-img, .main-image {
  border: 3px solid #cccccc;
  border-radius: 10px;
}

.price-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 1.7rem;
  }
}

.add-button {
  height: 50px;
  width: 50%;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  margin-top: auto;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-decoration: none;
}

.add-button:before {
  content: '';
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.add-button:active {
  color: #000;
}

.add-button:active:after {
  background: transparent;
}

.add-button:hover:before {
  opacity: 1;
}

.add-button:after {
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
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.crossed-out {
  position: relative;
}

.crossed-out::before,
.crossed-out::after {
  content: '';
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

.price, .discount {
  font-weight: 500;
}

</style>
