<template>
  <main>
    <p>Authorization page</p>
    <input type="text">
    <input type="text">
    <button @click="changeLogin">Click</button>
  </main>
</template>

<script>

import {useUserStore} from "@/stores/authorization";

export default {
  name: "AuthorizationView",
  data() {
    return {
      store: useUserStore()
    }
  },
  methods: {
    changeLogin() {
      this.store.changeLogin()
    }
  },
}
</script>
<style scoped>
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  padding-top: 200px;
}

button {
  height: 20px;
  width: 100px;
}
</style>
