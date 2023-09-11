<template>
  <main>
    <AmBreadcrumbs :showCurrentCrumb="true" />
    <p>Main page</p>
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Main</button>
    </router-link>
    <router-link to="/login" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Login</button>
    </router-link>
    <router-link to="/registration" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Registration</button>
    </router-link>
    <router-link to="/catalog" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Catalog</button>
    </router-link>
    <router-link to="/cart" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Cart</button>
    </router-link>
    <router-link to="/error" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Not found page</button>
    </router-link>
    <router-link to="/about" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">About</button>
    </router-link>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/colors.scss';
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

  button {
    @include pokemon-text($app-yellow, $app-light-blue);
    letter-spacing: 5px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: transparent;
    border: none;
    margin: 0;
  }

  button:hover {
    @include pokemon-text($app-light-blue, $app-yellow);
    cursor: pointer;
  }
}
</style>
<script setup lang="ts"></script>
