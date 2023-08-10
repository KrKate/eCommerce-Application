<template>
  <div class="login-page">
    <h1>Login</h1>
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button @click="login">SIGN IN</button>
    </form>
    <p>Not registered yet? <RouterLink to="/registration">Register here</RouterLink></p>
  </div>
</template>

<script lang="ts">
export default {
  name: "AuthorizationView",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1 {
  @include pokemon-text($app-yelow, $app-dark-blue);
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: $app-light-blue;
  color: white;
  border: none;
  cursor: pointer;
}


</style>
