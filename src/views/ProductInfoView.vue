<template>
  <main>
    <AmBreadcrumbs :showCurrentCrumb="true" />
    <div class="images-container">
      <div class="alternate-images">
        <img
          v-for="(image, index) in product.masterData?.staged.masterVariant.images"
          :key="index"
          class="alternate-img"
          :src="image.url"
          alt="Pokemon"
          @click="changeImage(index)"
        />
      </div>
      <div class="main-img-container">
        <button class="arrow" @click="previousImage">❮</button>
        <div class="main-image">
          <img
            class="central-img"
            :src="product.masterData?.staged.masterVariant.images[currentImageIndex]?.url"
            alt="Pokemon"
            @click="openModal(currentImageIndex)"
          />
        </div>
        <button class="arrow" @click="nextImage">❯</button>
      </div>
    </div>
    <div class="main-description">
      <h1 class="title">{{ product.masterData?.current.name['en-US'] }}</h1>
      <div class="price-container">
        <div class="price" :class="{ 'crossed-out': getDiscount(product) !== ' ' }">
          €
          {{
            (product.masterData?.current.masterVariant.prices[0].value.centAmount / 100).toFixed(2)
          }}
        </div>
        <div class="discount">
          {{ getDiscount(product) }}
        </div>
      </div>
      <div class="description">{{ product.masterData?.current.description['en-US'] }}</div>
      <div class="add-wrapper">
      <div class="buttons-wrapper">
      <AddToCart class="add-button" @click="addToCart"/>
      <button class="delete-product"></button>
      </div>
      <div class="quantity-container">
        <button class="quantity-btn" @click="decreaseQuantity">-</button>
        <input type="number" class="quantity-input" v-model="quantity" min="1" />
        <button class="quantity-btn" @click="increaseQuantity">+</button>
      </div>
    </div>
    </div>
    <div class="modal-wrapper" v-show="isModalOpen">
      <div v-show="isModalOpen" class="modal">
        <button class="arrow modal-arrow" @click="previousImage">❮</button>
        <img
          class="modal-content"
          :src="product.masterData?.staged.masterVariant.images[currentImageIndex]?.url"
          alt="Pokemon"
        />
        <span class="close" @click="closeModal">&times;</span>
        <button class="arrow modal-arrow" @click="nextImage">❯</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/authorization'
import { type Product } from '@/stores/types'
import {type Cart} from '@/stores/types'
import router from '@/router'
import AddToCart from '@/components/AddToCart.vue'

export default {
    name: 'ProductInfoView',
    data() {
        return {
            store: useUserStore(),
            product: {} as Product,
            cart: {} as Cart,
            currentImageIndex: 0,
            isModalOpen: false,
            quantity: 1
        };
    },
    async beforeMount() {
        this.store.isLoading = true;
        const productId = this.$route.params.id as string;
        if (!this.store.token)
            await this.store.readCookie();
        if (await this.store.checkProductExistsById(productId)) {
            this.product = await this.store.getProductById(productId);
        }
        else {
            await router.push({ name: '404' });
        }
        this.store.isLoading = false;
    },
    methods: {
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
            this.quantity--;
       }
        },
        getDiscount(product: Product) {
            const discounted = product.masterData?.current?.masterVariant?.prices[0]?.discounted?.value?.centAmount;
            return discounted ? `€ ${(discounted / 100).toFixed(2)}` : ' ';
        },
        changeImage(index: number) {
            this.currentImageIndex = index;
        },
        nextImage() {
            if (this.currentImageIndex < this.product.masterData.staged.masterVariant.images.length - 1) {
                this.currentImageIndex++;
            }
            else {
                this.currentImageIndex = 0;
            }
        },
        previousImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
            }
            else {
                this.currentImageIndex = this.product.masterData.staged.masterVariant.images.length - 1;
            }
        },
        openModal(index: number) {
            this.isModalOpen = true;
            this.currentImageIndex = index;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        async addToCart() {

        }
    },
    
    components: { AddToCart }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';

main {
  display: flex;
  margin: auto;
  padding-top: 160px;
  font-size: 2rem;
  font-weight: 700;
  flex-wrap: wrap;
  font-style: italic;
  align-items: center;
  gap: 30px;
  justify-content: center;

  nav {
    display: flex;
    font-size: 1rem;
    width: 100%;
    padding-left: 40px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
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
  align-items: flex-start;
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
  width: 50%;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  @media screen and (max-width: 450px) {
    width: 70%;
  }
  @media screen and (max-width: 450px) {
    width: 80%;
  }
}

.central-img {
  height: 40vh;
  object-fit: contain;
  width: 100%;
  @media screen and (max-width: 600px) {
    height: 30vh;
  }
}

.alternate-images {
  display: flex;
  gap: 10px;
  justify-content: center;
  height: auto;
}

.alternate-img {
  width: 25%;
}

.alternate-img,
.main-image {
  border: 3px solid #cccccc;
  border-radius: 10px;
}

.description {
  @media screen and (max-width: 600px) {
    text-align: justify;
  }
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

.price,
.discount {
  font-weight: 500;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.main-img-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal {
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 999;
  width: 60%;
  height: 70%;
  background: white;
  border-radius: 20px;
  border: 3px solid #cccccc;
  object-fit: cover;
  overflow: hidden;
  @media screen and (max-width: 900px) {
    height: 60%;
  }
  @media screen and (max-width: 500px) {
    height: 40%;
  }
}

.modal-content {
  max-width: 50%;
  @media screen and (max-width: 1200px) {
    max-width: 60%;
  }
  @media screen and (max-width: 850px) {
    max-width: 70%;
  }
  @media screen and (max-width: 650px) {
    max-width: 80%;
  }
  @media screen and (max-width: 500px) {
    max-width: 85%;
  }
  @media screen and (max-width: 490px) {
    max-width: 80%;
  }
}

.close {
  position: absolute;
  top: -20px;
  right: 10px;
  font-size: 4rem;
  color: black;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    font-size: 3rem;
  }
}

.modal-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.modal-arrow:first-child {
  left: 10px;
}

.modal-arrow:last-child {
  right: 10px;
}

.quantity-container {
  display: flex;
  align-items: center;
  width: 50%;
  gap: 8px;
}

.quantity-btn {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  color: #0075be;
}

.quantity-input {
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 1.1rem;
  border: 2px solid #0075be;
  border-radius: 10px;
}

.add-wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items:flex-start;
  gap: 20px;
}

.buttons-wrapper {
  display: flex;
  gap: 30px;
  width: 100%;
}

.delete-product {
  width: 45px;
  height: 45px;
  border: none;
  background-image: url(../assets/images/empty-cart.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.6s ease;
}

.delete-product:hover {
  animation: sway 0.5s forwards;
}

@keyframes sway {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(10deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}


.delete-product:active {
  animation: rotate 0.4s;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

</style>
