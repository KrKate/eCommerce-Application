<template>
  <div class="login-page">
    <div class="container-forms">
      <h1>Login</h1>
      <form>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="user@example.com"
            v-model="email"
            @input.prevent="validateEmail"
            required
          />
          <p v-if="emailError" class="error">{{ emailError }}</p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Make it secure!"
            v-model="password"
            @input.prevent="validatePassword"
            required
          />
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>
        <button @click="login">SIGN IN</button>
      </form>
      <p class="registration-link">Not registered yet? <RouterLink to="/registration">Register here</RouterLink></p>
    </div>
  </div>
</template>

<script lang="ts">
enum EmailError {
  REQUIRED = '* Email is required',
  FORMAT = '* Email address must be properly formatted (e.g., user@example.com).',
  WHITESPACE = '* Email address must not contain leading or trailing whitespace.',
  DOMAIN = '* Email address must contain a domain name (e.g., example.com).',
  SYMBOL = "* Email address must contain an '@' symbol separating local part and domain name.",
  LATIN = '* The email address can only contain Latin characters.'
}

enum PasswordError {
  REQUIRED = `* Password is required`,
  LENGTH = '* Password must contain at least 8 characters.',
  UPPERCASE = '* Password must contain at least one uppercase letter.',
  LOWERCASE = '* Password must contain at least one lowercase letter.',
  DIGIT = '* Password must contain at least one digit.',
  SPECIAL_CHARACTER = '* Password must contain at least one special character.',
  WHITESPACE = '* Password must not contain leading or trailing whitespace.'
}

const formatEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const trimRegex = /^[^\s].+[^\s]$/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;
const latinRegex = /^[a-zA-Z0-9@._-]+$/;
const specialRegex = /^(?=.*[!@#$%^&*()+=._-])/;

export default {
  name: 'AuthorizationView',
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.emailError = EmailError.REQUIRED
      } else {
        this.emailError = ''

        if (!formatEmailRegex.test(this.email)) {
          this.emailError = EmailError.FORMAT
        }

        if (!trimRegex.test(this.email)) {
          this.emailError += EmailError.WHITESPACE
        }

        if (!this.email.includes('@')) {
          this.emailError += EmailError.DOMAIN
        }

        if (this.email.split('@').length !== 2) {
          this.emailError += EmailError.SYMBOL
        }

        if (!latinRegex.test(this.email)) {
          this.emailError += EmailError.LATIN
        }
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = PasswordError.REQUIRED
      } else {
        this.passwordError = ''
        if (this.password.length < 8) {
          this.passwordError += PasswordError.LENGTH
        }
        if (!uppercaseRegex.test(this.password)) {
          this.passwordError += PasswordError.UPPERCASE
        }
        if (!lowercaseRegex.test(this.password)) {
          this.passwordError += PasswordError.LOWERCASE
        }
        if (!digitRegex.test(this.password)) {
          this.passwordError += PasswordError.DIGIT
        }
        if (!specialRegex.test(this.password)) {
          this.passwordError += PasswordError.SPECIAL_CHARACTER
        }
        if (this.password.trim() !== this.password) {
          this.passwordError += PasswordError.WHITESPACE
        }
      }
    },
    login() {

    }
  }
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
  .registration-link {
    margin: 0 auto;
  }
}
</style>
