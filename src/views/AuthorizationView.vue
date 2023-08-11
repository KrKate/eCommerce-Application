<template>
  <div class="login-page">
    <div class="container-forms">
    <h1>Login</h1>
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="user@example.com" v-model.trim="email" @input.prevent="validateEmail" required>
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Make it secure!" v-model.trim="password" @input.prevent="validatePassword" required>
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
      <button @click="login" >SIGN IN</button>
    </form>
    <p>Not registered yet? <RouterLink to="/registration">Register here</RouterLink></p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AuthorizationView",
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    }
  },
  created() {
    const savedLogin = localStorage.getItem('login');
    const savedPassword = localStorage.getItem('password');
    if (savedLogin && savedPassword) {
      this.email = savedLogin;
      this.password = savedPassword;
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.trim()) {
        this.emailError = 'Email is required';
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Invalid email format';
      } else {
        this.emailError = '';
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!this.password.trim()) {
        this.passwordError = 'Password is required';
      } else if (!passwordRegex.test(this.password)) {
        this.passwordError = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character';
      } else {
        this.passwordError = '';
      }
    },
    login() {
      localStorage.setItem('login', this.email);
      localStorage.setItem('password', this.password);
    }

  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';
.login-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container-forms {
  background-color: $app-gray;
  border-radius: 20px;
  margin: 150px auto 0 auto;
  padding: 40px 60px;
  height: 70%;
  max-width: 500px;
}

h1 {
  @include pokemon-text($app-yelow, $app-dark-blue);
  text-align: center;
}

.form-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
}

.error {
  color: red;
  font-size: 12px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: $app-red;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  &:hover {
  font-weight: 700;
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
}

}


</style>
