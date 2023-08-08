<template>
  <header>
    <div class="wrapper">
      <h1>Pokemon market</h1>
      <img src="@/assets/mewtwo.png" alt="mewtwo" class="logo" />
      <div class="control">
        <button>Login</button>
        <button>Cart</button>
      </div>
    </div>
    <nav>
      <div class="wrapper">
        <ul>
          <li><RouterLink to="/">Main</RouterLink></li>
          <li><RouterLink to="/catalog">Catalog</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
        </ul>
        <input type="text" placeholder="Find them all!" />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'AppHeader'
}
</script>

<style scoped lang="scss">
@import '@/assets/mixins';

header {
  @include view(100vw, 100px, fixed, flex);
  background-color: var(--app-red);
  left: 0;
  top: 0;
  user-select: none;

  nav {
    @include view(100vw, 60px, absolute, flex);
    background-color: var(--app-gray);
    left: 0;
    top: 100px;
    z-index: 1;
  }

  .wrapper {
    @include view(100%, auto, relative, flex);
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;

    h1 {
      @include pokemon-text(var(--app-yelow), var(--app-light-blue));
      @include view(auto, auto, relative, flex);
      font-size: 3rem;
      padding-left: 30px;
    }

    .control {
      display: flex;
      gap: 15px;

      button {
        @include pokemon-text(var(--app-yelow), var(--app-light-blue));
        letter-spacing: 5px;
        font-size: 2em;
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: transparent;
        border: none;
      }

      button:hover {
        @include pokemon-text(var(--app-light-blue), var(--app-yelow));
        cursor: pointer;
      }
    }
  }

  ul {
    @include view(40%, auto, relative, flex);
    list-style: none;
    justify-content: space-evenly;
    align-items: center;
    padding: 0;

    li {
      display: flex;
    }

    li a {
      @include pokemon-text(var(--app-black), var(--app-white));
      font-size: 1.5rem;
      background: transparent;
    }

    li a:hover {
      @include pokemon-text(var(--app-white), var(--app-black));
      font-size: 1.5rem;
    }
  }

  .logo {
    @include view(auto, 150px, absolute, flex);
    left: calc(50% - 45px);
    top: 5px;
    z-index: 100;
  }

  input {
    @include view(30%, auto, relative, flex);
    background-color: var(--app-gray);
    padding: 2px 5px;
    color: var(--app-black);
    border: 1px solid var(--app-white);
  }
}
</style>
