<template>
  <main>
    <AmBreadcrumbs :showCurrentCrumb="true" />
    <p>Users cart page</p>
  </main>
</template>

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
<script setup lang="ts"></script>
