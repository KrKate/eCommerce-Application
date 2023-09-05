<template>
  <main>
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
        <div class="price"  :class="{ 'crossed-out': getDiscount(product) !== ' ' }">
          €
          {{
            (product.masterData?.current.masterVariant.prices[0].value.centAmount / 100).toFixed(2)
          }}
        </div>
        <div class="discount" >
          {{ getDiscount(product) }}
        </div>
      </div>
      <div class="description">{{ product.masterData?.current.description['en-US'] }}</div>
      <button class="add-button">Add to Cart</button>
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
import router from '@/router'

export default {
  name: 'ProductInfoView',
  data() {
    return {
      store: useUserStore(),
      product: {} as Product,
      currentImageIndex: 0,
      isModalOpen: false
    }
  },
  async beforeMount() {
    this.store.isLoading = true
    const productId = this.$route.params.id as string
    if (await this.store.checkProductExistsById(productId)) {
      this.product = await this.store.getProductById(productId)
    } else {
      await router.push({ name: '404' })
    }
    this.store.isLoading = false
  },
  methods: {
    getDiscount(product: Product) {
      const discounted =
        product.masterData?.current?.masterVariant?.prices[0]?.discounted?.value?.centAmount
      return discounted ? `€ ${(discounted / 100).toFixed(2)}` : ' '
    },
    changeImage(index: number) {
      this.currentImageIndex = index
    },
    nextImage() {
      if (this.currentImageIndex < this.product.masterData.staged.masterVariant.images.length - 1) {
        this.currentImageIndex++
      } else {
        this.currentImageIndex = 0
      }
    },
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
      } else {
        this.currentImageIndex = this.product.masterData.staged.masterVariant.images.length - 1
      }
    },
    openModal(index: number) {
      this.isModalOpen = true
      this.currentImageIndex = index
    },
    closeModal() {
      this.isModalOpen = false
    }
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
  align-items: flex-end;
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
  @media screen and (max-width: 600px) {
    justify-content: center;
    height: 120px;
  }
}

.alternate-img {
  width: 25%;
}

.alternate-img,
.main-image {
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

.modal-arrow {

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
  top: 10px;
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
</style>
