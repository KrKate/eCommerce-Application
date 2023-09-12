<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyCart',
  props: {
    productInCart: Number
  }
})
</script>

<template>
  <div class="empty-cart" v-if="productInCart === 0">
    <img src="@/assets/images/empty_cart.webp" alt="empty" />
    <h3>Your cart is currently empty!</h3>
    <p>Before proceed to check out you must add some product to your shopping cart.</p>
    <p>You will find a lot of interesting products in our "Catalog" page.</p>
    <router-link to="/catalog" custom v-slot="{ navigate }">
      <button class="info-button" @click="navigate" role="link">Return to catalog</button>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';
.empty-cart {
  display: flex;
  width: 80vw;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  img {
    display: flex;
    max-width: 200px;
  }

  h3 {
    @include pokemon-text($app-yellow, $app-dark-blue);
    -webkit-text-stroke: 1px $app-light-blue;
    margin: 10px;
  }

  p {
    font-size: 0.8rem;
  }

  .info-button {
    margin: 30px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    text-decoration: none;

    &:before {
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
      filter: blur(15px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      border-radius: 10px;
    }

    &:active:after {
      background: #002bff;
      color: black;
    }

    &:hover:before {
      opacity: 1;
    }

    &:after {
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
  }
}

@media screen and (max-width: 800px) {
  .empty-cart {
    width: 90vw;

    h3 {
      font-size: 2rem;
    }

    .info-button {
      margin: 20px;
      height: 40px;
    }
  }
}

@media screen and (max-width: 440px) {
  .empty-cart {
    width: 90vw;

    h3 {
      font-size: 2rem;
    }

    .info-button {
      margin: 20px;
      height: 40px;
    }
  }
}

@media screen and (max-width: 575px) {
  .empty-cart {
    display: flex;
    width: 95vw;

    h3 {
      font-size: 1.1rem;
    }

    p {
      font-size: 0.5rem;
    }

    .info-button {
      margin: 10px;
      height: 40px;
      font-size: 0.9rem;
    }
  }
}
</style>
