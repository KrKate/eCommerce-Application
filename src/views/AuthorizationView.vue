<template>
  <div class="login-page">
    <div class="container-forms">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group" v-if="!store.isLogin">
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
        <div class="form-group" v-if="!store.isLogin">
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
        <button type="submit" v-if="!store.isLogin">SIGN IN</button>
        <button @click="logout" v-if="store.isLogin">LOG OUT</button>
      </form>
      <p class="registration-link" v-if="!store.isLogin">
        Not registered yet? <RouterLink to="/registration">Register here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/authorization'
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

export default {
  name: 'AuthorizationView',
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      store: useUserStore()
    }
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.emailError = EmailError.REQUIRED
      } else {
        this.emailError = ''

        const formatEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!formatEmailRegex.test(this.email)) {
          this.emailError = EmailError.FORMAT
        }
        const trimRegex = /^[^\s].+[^\s]$/
        if (!trimRegex.test(this.email)) {
          this.emailError += EmailError.WHITESPACE
        }

        if (!(this.email as string).includes('@')) {
          this.emailError += EmailError.DOMAIN
        }

        if ((this.email as string).split('@').length !== 2) {
          this.emailError += EmailError.SYMBOL
        }

        const latinRegex = /^[a-zA-Z0-9@._-]+$/
        if (!latinRegex.test(this.email)) {
          this.emailError += EmailError.LATIN
        }
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = PasswordError.REQUIRED as string
      } else {
        this.passwordError = ''
        if ((this.password as string).length < 8) {
          this.passwordError += PasswordError.LENGTH
        }
        if (!/[A-Z]/.test(this.password)) {
          this.passwordError += PasswordError.UPPERCASE
        }
        if (!/[a-z]/.test(this.password)) {
          this.passwordError += PasswordError.LOWERCASE
        }
        if (!/\d/.test(this.password)) {
          this.passwordError += PasswordError.DIGIT
        }
        if (!/[@$!%*?&]/.test(this.password)) {
          this.passwordError += PasswordError.SPECIAL_CHARACTER
        }
        if ((this.password as string).trim() !== this.password) {
          this.passwordError += PasswordError.WHITESPACE
        }
      }
    },
    async login() {
      if (this.email && this.password) {
          await this.store.fetchToken()
          if (await this.store.login(this.email, this.password)) {
            this.store.changeLogin()
          } else {
            alert('Invalid data')
          }
      }
    },
    logout() {
        this.store.changeLogin()
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

#email:valid:not(:placeholder-shown),
#email:focus:valid,
#password:valid:not(:placeholder-shown),
#password:focus:valid {
  border: 3px solid green;
  outline: none;
}

#email:invalid:not(:placeholder-shown),
#email:focus:invalid,
#password:invalid:not(:placeholder-shown),
#password:focus:invalid {
  border: 3px solid red;
  outline: none;
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
