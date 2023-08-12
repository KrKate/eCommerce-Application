<template>
  <header>
    <div class="wrapper">
      <router-link to="/" custom v-slot="{ navigate }">
        <h1 @click="navigate">Pokemon market</h1>
      </router-link>
      <img src="@/assets/images/25.svg" alt="pikachu" class="logo" />
      <div class="control">
        <router-link to="/login" custom v-slot="{ navigate }" v-if="!store.isLogin">
          <button @click="navigate" role="link">Login</button>
        </router-link>
        <router-link to="/login" custom v-slot="{ navigate }" v-if="store.isLogin">
          <button @click="navigate" role="link">User</button>
        </router-link>
        <router-link to="/cart" custom v-slot="{ navigate }">
          <button @click="navigate" role="link">Cart</button>
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
import { useUserStore } from '@/stores/authorization'
export default {
  name: 'AppHeader',
  data() {
    return {
      store: useUserStore()
    }
  }
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
  z-index: 99;

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
        font-size: 2rem;
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

      a {
        @include pokemon-text($app-black, $app-white);
        font-size: 1.5rem;
        background: transparent;
        text-decoration: none;

        &:hover {
          @include pokemon-text($app-white, $app-black);
          font-size: 1.5rem;
        }
      }
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
    padding: 10px 10px;
    color: $app-black;
    border: 1px solid $app-white;
  }
}

@media screen and (max-width: 1023px) {
  header {
    .wrapper {
      padding: 0 20px 0 25%;

      h1 {
        font-size: 2rem;
        padding-left: 0;
      }

      .control {
        display: flex;
        gap: 15px;

        button {
          font-size: 1.5rem;
        }
      }
    }

    ul {
      @include view(50%, auto, relative, flex);
      justify-content: space-between;
    }

    .logo {
      left: calc(0% + 20px);
    }

    input {
      @include view(40%, auto, relative, flex);
    }
  }
}

@media screen and (max-width: 700px) {
  header {
    .wrapper {
      padding: 0 20px 0 25%;

      h1 {
        font-size: 1.5rem;

        &:hover {
          -webkit-text-stroke: 1px $app-light-blue;
        }
      }

      .control {
        gap: 10px;

        button {
          letter-spacing: 3px;
          font-size: 1.2rem;
          padding: 5px;
        }
      }
    }

    ul {
      width: 40%;
      li {
        a {
          font-size: 1rem;

          &:hover {
            font-size: 1rem;
          }
        }
      }
    }

    input {
      @include view(50%, auto, relative, flex);
      padding: 5px 10px;
    }
  }
}

@media screen and (max-width: 580px) {
  header {
    .wrapper {
      padding: 0 20px;

      h1 {
        padding-left: 100px;
      }
    }

    .control {
      max-width: 100px;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 0;

      button {
        display: flex;
        padding: 0 5px;
        height: 30px;
      }
    }
    .logo {
      @include view(auto, 90px, absolute, flex);
    }
  }
}
@media screen and (max-width: 424px) {
  header {
    nav {
      height: 80px;

      .wrapper {
        row-gap: 10px;
        flex-direction: column-reverse;
      }
    }

    .wrapper {
      flex-direction: column;
      justify-content: center;

      h1 {
        padding-left: 100px;
      }
    }

    .control {
      max-width: 100%;
      padding-left: 100px;
      flex-direction: row;
    }
    ul {
      width: 100%;
      justify-content: space-around;
    }

    input {
      @include view(100%, auto, relative, flex);
    }
  }
}
@media screen and (max-width: 424px) {
  header {
    .wrapper {
      h1 {
        font-size: 1rem;
      }
    }
  }
}
</style>
