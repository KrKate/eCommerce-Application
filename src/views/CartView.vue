<template>
  <main>
    <AmBreadcrumbs :showCurrentCrumb="true" />
    <p>Users cart page</p>
    <p></p>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/authorization'
import { type Product } from '@/stores/types'
import {type Cart} from '@/stores/types'

 export default {
  name: 'CartView',
  data() {
    return {
      store: useUserStore(),
      product: {} as Product,
      cart: {} as Cart,
    }
  },

 }

</script>


<style scoped lang="scss">
main {
  display: flex;
  margin: auto;
  padding-top: 160px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
  align-items: center;
  nav {
    display: flex;
    font-size: 1rem;
    width: 100%;
    padding-left: 40px;
  }
}
</style>

