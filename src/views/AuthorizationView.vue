<template>
  <div class="login-page">
    <div class="container-forms">
      <h1>Login</h1>
      <form
      method="post"
      novalidate="true"
      ref="log"
      @submit.prevent="login"
      >
        <div class="form-group" v-if="!store.isLogin">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="user@example.com"
            v-model="email"
            @input.prevent="validateEmail"
            required
            :class="{ 'invalid-input': emailErrors.length > 0 }"
          />
          <p v-if="emailErrors" class="error">
          <ul><li v-for="error in emailErrors" :key="error">{{ error }}</li></ul>
          </p>
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
            :class="{ 'invalid-input': passwordErrors.length > 0 }"
          />
          <p v-if="passwordErrors.length" class="error">
            <ul>
                <li v-for="error in passwordErrors" :key="error"> {{ error }} </li>
            </ul>
          </p>
        </div>
        <div class="signUpContainer">
          <input class='signUp' type="submit" value="SIGN IN" :disabled="!formIsValid" v-if="!store.isLogin">
          <input class='signUp' @click="logout" value="LOG OUT" :disabled="!formIsValid" v-if="store.isLogin">
        </div>
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
  REQUIRED = 'Email is required',
  FORMAT = 'Email address must be properly formatted (e.g., user@example.com).',
  WHITESPACE = 'Email address must not contain leading or trailing whitespace.',
  DOMAIN = 'Email address must contain a domain name (e.g., example.com).',
  SYMBOL = "Email address must contain an '@' symbol separating local part and domain name.",
  LATIN = 'The email address can only contain Latin characters.'
}

enum PasswordError {
  REQUIRED = `Password is required`,
  LENGTH = 'Password must contain at least 8 characters.',
  UPPERCASE = 'Password must contain at least one uppercase letter.',
  LOWERCASE = 'Password must contain at least one lowercase letter.',
  DIGIT = 'Password must contain at least one digit.',
  SPECIAL_CHARACTER = 'Password must contain at least one special character.',
  WHITESPACE = 'Password must not contain leading or trailing whitespace.'
}

const formatEmailRegex = /^[a-zA-Z0-9._%+-\s]+@[a-zA-Z0-9.-\s]+\.[a-zA-Z\s]{1,}$/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;
const latinRegex = /^[a-zA-Z0-9@._-\s]+$/;
const specialRegex =  /^(?=.*[!@#$%^&*()+=._-])/;
const domainRegex = /^\s*[^\s@]+@[^\s@]+\.[^\s@]{2,}\s?$/


export default {
  name: 'AuthorizationView',
  data() {
    return {
      email: '',
      password: '',
      emailErrors: [] as string[],
      passwordErrors: [] as string[],
      store: useUserStore()
    }
  },
  computed: {
    formIsValid: function() {
      return this.emailErrors.length === 0 && this.passwordErrors.length === 0  && this.email && this.password;
    }
  },
  methods: {
    validateEmail: function() {
      this.emailErrors = [];
      if(!this.email) this.emailErrors.push(EmailError.REQUIRED)
      if(!this.validEmailFormat(this.email)) this.emailErrors.push(EmailError.FORMAT)
      if(this.validEmailWhitespace(this.email)) this.emailErrors.push(EmailError.WHITESPACE)
      if(!this.validEmailDomain(this.email)) this.emailErrors.push(EmailError.DOMAIN)
      if (!this.validEmailSymbol(this.email)) this.emailErrors.push(EmailError.SYMBOL)
      if (!this.validEmailLatin(this.email)) this.emailErrors.push(EmailError.LATIN)
    },
    validatePassword: function() {
      this.passwordErrors = [];
      if(!this.password) this.passwordErrors.push(PasswordError.REQUIRED)
      if(!this.validPasswordLength(this.password)) this.passwordErrors.push(PasswordError.LENGTH)
      if(!this.validPasswordUppercase(this.password)) this.passwordErrors.push(PasswordError.UPPERCASE)
      if(!this.validPasswordLowercase(this.password)) this.passwordErrors.push(PasswordError.LOWERCASE)
      if(!this.validPasswordDigit(this.password)) this.passwordErrors.push(PasswordError.DIGIT)
      if(!this.validPasswordSpecial(this.password)) this.passwordErrors.push(PasswordError.SPECIAL_CHARACTER)
      if(this.validPasswordWhitespace(this.password)) this.passwordErrors.push(PasswordError.WHITESPACE)
    },
    validEmailFormat:function(email: string) {
     return formatEmailRegex.test(email);
    },
    validEmailWhitespace:function(email: string) {
      return email.trim() !== email
    },
    validEmailDomain:function(email: string) {
      return domainRegex.test(email)
    },
    validEmailSymbol: function(email: string) {
       return email.includes('@')
    },
    validEmailLatin: function(email: string) {
      return latinRegex.test(email)
    },


    validPasswordLength: function(password: string) {
      return password.length >= 8
    },
    validPasswordUppercase:function(password: string) {
      return uppercaseRegex.test(password)
    },
    validPasswordLowercase:function(password: string) {
      return lowercaseRegex.test(password)
    },
    validPasswordDigit:function(password: string){
      return digitRegex.test(password)
    },
    validPasswordSpecial:function(password: string) {
      return specialRegex.test(password)
    },
    validPasswordWhitespace:function(password: string) {
      return password.trim() !== password
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
  padding: 15px 30px;
  max-height: fit-content;
  min-height: 60vh;
  max-width: 500px;
  @media screen and (max-width: 500px) {
    max-width: 300px;
  }
}
.invalid-input {
  border: 2px solid $app-red;
}
h1 {
  @include pokemon-text($app-yelow, $app-dark-blue);
  text-align: center;
}

.form-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 15px;
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
.registration-link {
    text-align: center;
  }
.error {
  color: red;
  font-size: 12px;
  text-align: left;
}

ul {
  padding: 5px 0 0 20px;
  text-align: left;
}

li {
  list-style-type: none;
&::before {
  content: "✖";
  margin-right: 5px;
}
}

.signUpContainer {
  display: flex;
  justify-content: center;
}
  .signUp:disabled {
    background-color: whitesmoke;
    color: $app-red;
    width: 50%;
    cursor: default;
  }

  .signUp  {
  width: 100%;
  padding: 10px;
  background-color: $app-red;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 2s ease;
  &:hover {
    font-weight: 700;
    &:active {
      transform: translateY(-1px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  }

}
</style>
