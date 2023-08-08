<template>
  <header>
    <div class="wrapper">
      <router-link
          to="/"
          custom
          v-slot="{ navigate }"
      >
        <h1
            @click="navigate"
        >
          Pokemon market
        </h1>
      </router-link>
      <img src="@/assets/images/mewtwo.png" alt="mewtwo" class="logo" />
      <div class="control">
        <router-link
            to="/login"
            custom
            v-slot="{ navigate }"
        >
          <button
              @click="navigate"
              role="link"
          >
            Login
          </button>
        </router-link>
        <router-link
            to="/cart"
            custom
            v-slot="{ navigate }"
        >
          <button
              @click="navigate"
              role="link"
          >
            Cart
          </button>
        </router-link>
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
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';

header {
  @include view(100vw, 100px, fixed, flex);
  background-color: $app-red;
  left: 0;
  top: 0;
  user-select: none;

  nav {
    @include view(100vw, 60px, absolute, flex);
    background-color: $app-gray;
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
      @include pokemon-text($app-yelow, $app-dark-blue);
      @include view(auto, auto, relative, flex);
      font-size: 2.5rem;
      -webkit-text-stroke: 1px $app-light-blue;
      padding-left: 5%;

      &:hover {
        -webkit-text-stroke: 3px $app-light-blue;
        text-shadow: 5px 5px $app-dark-blue;
        cursor: pointer;
        transform: scale(1.1);
      }
    }

    .control {
      display: flex;
      gap: 15px;

      button {
        @include pokemon-text($app-yelow, $app-light-blue);
        letter-spacing: 5px;
        font-size: 2em;
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: transparent;
        border: none;
      }

      button:hover {
        @include pokemon-text($app-light-blue, $app-yelow);
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
      @include pokemon-text($app-black, $app-white);
      font-size: 1.5rem;
      background: transparent;
    }

    li a:hover {
      @include pokemon-text($app-white, $app-black);
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
    background-color: $app-gray;
    padding: 2px 5px;
    color: $app-black;
    border: 1px solid $app-white;
  }
}
</style>
