<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CartIcon',
  props: {
    productInCart: Number
  }
})
</script>

<template>
  <div class="warapper">
    <router-link to="/cart" custom v-slot="{ navigate }">
      <img @click="navigate" role="link" src="@/assets/icons/cart.svg" alt="" />
      <span id="cart-text">{{ productInCart }}</span>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/colors';
@font-face {
  font-family: 'Orbitron';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(@/assets/fonts/Orbitron.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304,
    U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
    U+FFFD;
}

.warapper {
  display: flex;
  position: relative;
  margin: auto;
  font-family: 'Orbitron', sans-serif;
  text-shadow: none;
  color: $app-yellow;
  max-width: 70px;
  max-height: 70px;

  &:hover {
    scale: 1.2;
  }

  img {
    display: flex;
    height: 100%;
    width: 100%;
  }

  #cart-text {
    display: flex;
    position: absolute;
    font-size: 1rem;
    font-weight: 700;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    bottom: 15px;
    left: 25px;
  }
}

@media screen and (max-width: 1023px) {
  .warapper {
    max-width: 60px;
    max-height: 60px;

    #cart-text {
      bottom: 10px;
      left: 22px;
    }
  }
}

@media screen and (max-width: 700px) {
  .warapper {
    max-width: 50px;
    max-height: 50px;

    #cart-text {
      font-size: 0.7rem;
      bottom: 5px;
      left: 15px;
    }
  }
}
</style>
