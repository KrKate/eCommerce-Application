<template>
  <div class="login-page">
    <div class="container-forms">
    <h1>Login</h1>
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="user@example.com" v-model.trim="email" @input.prevent="validateEmail" required>
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Make it secure!" v-model.trim="password" @input.prevent="validatePassword" required>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
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
    if (!this.password.trim()) {
      this.emailError = 'Email is required';
    } else {
    this.emailError = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = ' * Email address must be properly formatted (e.g., user@example.com).';
    }

    if (this.email.trim() !== this.email) {
      this.emailError += ' * Email address must not contain leading or trailing whitespace.';
    }

    if (!this.email.includes('@')) {
      this.emailError += ' * Email address must contain a domain name (e.g., example.com).';
    }

    if (this.email.split('@').length !== 2) {
      this.emailError += ' * Email address must contain an \'@\' symbol separating local part and domain name.';
    }

    const latinRegex = /^[a-zA-Z0-9@._-]+$/;
    if (!latinRegex.test(this.email)) {
      this.emailError += ' * The email address can only contain Latin characters.';
    }
  }
  },
    validatePassword() {
      if (!this.password.trim()) {
        this.passwordError = 'Password is required';
      } else {
        this.passwordError = '';
        if (this.password.length < 8) {
          this.passwordError += ' * Password must contain at least 8 characters.';
        }
        if (!/[A-Z]/.test(this.password)) {
          this.passwordError += '* Password must contain at least one uppercase letter.';
        }
        if (!/[a-z]/.test(this.password)) {
          this.passwordError += ' * Password must contain at least one lowercase letter.';
        }
        if (!/\d/.test(this.password)) {
          this.passwordError += ' * Password must contain at least one digit.';
        }
        if (!/[@$!%*?&]/.test(this.password)) {
          this.passwordError += ' * Password must contain at least one special character.';
        }
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
  padding: 30px;
  max-height: fit-content;
  min-height: 60vh;
  max-width: 500px;
  @media screen and (max-width: 500px) {
    max-width: 300px;
  }
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
