<template>
      <button class="add-button">Add to Cart</button>
</template>

  <script lang="ts">
import { type Product, type Cart } from '@/stores/types';
import { useUserStore } from '@/stores/authorization';

   export default {
    name: 'addToCartButton',
    data() {
      return {
        store: useUserStore(),
            product: {} as Product,
            cart: {} as Cart,
      }
    },
  methods: {
    // async addToCart(event: MouseEvent) {
    //   const button = event.target as HTMLButtonElement;
    //   const cart = await this.store.getCarts();
    //   console.log(cart);
      // if (cart && cart.id) {
      //     await this.store.addLineItem(cart.id);
    //   // }
    // }
  }
}

  </script>


<style lang="scss">
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


  </style>
