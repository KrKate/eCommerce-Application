<template>
  <div class="login-page">
    <img
      src="@/assets/images/psyduck.svg"
      alt="error"
      :id="emailErrors.length || passwordErrors.length ? 'show' : 'error'"
    />
    <div
      v-if="emailErrors.length || passwordErrors.length"
      :class="emailErrors.length || passwordErrors.length ? 'showClip' : 'hideClip'"
    ></div>
    <div
      v-if="emailErrors.length || passwordErrors.length"
      :class="emailErrors.length || passwordErrors.length ? 'showClip1' : 'hideClip1'"
    ></div>
    <div
      v-if="emailErrors.length || passwordErrors.length"
      :class="
        emailErrors.length || passwordErrors.length ? 'show-error-message' : 'hide-error-message'
      "
    >
      <ul>
        <li v-for="error in passwordErrors" :key="error">{{ error }}</li>
        <li v-for="error in emailErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div class="container-forms">
      <h2 v-if="!store.isLogin">Login</h2>
      <h2 v-if="store.isLogin">Successfully logged!</h2>
      <form method="post" novalidate="true" ref="log" @submit.prevent="login">
        <div class="form-group" v-if="!store.isLogin">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            ref="email"
            placeholder="user@example.com"
            v-model="email"
            @input.prevent="validateEmail"
            required
            :class="{ 'invalid-input': emailErrors.length > 0 }"
          />
          <div class="clear-cross" v-if="email.length" @click="$refs.email.value = ''">
            &#x2715;
          </div>
        </div>
        <div class="form-group" v-if="!store.isLogin">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Make it secure!"
            v-model="password"
            @input.prevent="validatePassword"
            ref="password"
            required
            :class="{ 'invalid-input': passwordErrors.length > 0 }"
          />
          <div class="clear-cross" v-if="password.length" @click="$refs.password.value = ''">
            &#x2715;
          </div>
        </div>
        <div class="signUpContainer" v-if="!store.isLogin">
          <input class="signUp" type="submit" value="SIGN IN" :disabled="!formIsValid" />
        </div>
        <div class="logout" v-if="store.isLogin">
          <img src="@/assets/gif/login_success.gif" alt="login_success" />
          <h2>Redirecting...</h2>
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
import router from '@/router'
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

const formatEmailRegex = /^[a-zA-Z0-9._%+-\s]+@[a-zA-Z0-9.-\s]+\.[a-zA-Z\s]{1,}$/
const uppercaseRegex = /[A-Z]/
const lowercaseRegex = /[a-z]/
const digitRegex = /\d/
const latinRegex = /^[a-zA-Z0-9@._-\s]+$/
const specialRegex = /^(?=.*[!@#$%^&*()+=._-])/
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
    formIsValid: function () {
      return (
        this.emailErrors.length === 0 &&
        this.passwordErrors.length === 0 &&
        this.email &&
        this.password
      )
    }
  },
  methods: {
    validateEmail: function () {
      this.emailErrors = []
      if (!this.email) this.emailErrors.push(EmailError.REQUIRED)
      if (!this.validEmailFormat(this.email)) this.emailErrors.push(EmailError.FORMAT)
      if (this.validEmailWhitespace(this.email)) this.emailErrors.push(EmailError.WHITESPACE)
      if (!this.validEmailDomain(this.email)) this.emailErrors.push(EmailError.DOMAIN)
      if (!this.validEmailSymbol(this.email)) this.emailErrors.push(EmailError.SYMBOL)
      if (!this.validEmailLatin(this.email)) this.emailErrors.push(EmailError.LATIN)
    },
    validatePassword: function () {
      this.passwordErrors = []
      if (!this.password) this.passwordErrors.push(PasswordError.REQUIRED)
      if (!this.validPasswordLength(this.password)) this.passwordErrors.push(PasswordError.LENGTH)
      if (!this.validPasswordUppercase(this.password))
        this.passwordErrors.push(PasswordError.UPPERCASE)
      if (!this.validPasswordLowercase(this.password))
        this.passwordErrors.push(PasswordError.LOWERCASE)
      if (!this.validPasswordDigit(this.password)) this.passwordErrors.push(PasswordError.DIGIT)
      if (!this.validPasswordSpecial(this.password))
        this.passwordErrors.push(PasswordError.SPECIAL_CHARACTER)
      if (this.validPasswordWhitespace(this.password))
        this.passwordErrors.push(PasswordError.WHITESPACE)
    },
    validEmailFormat: function (email: string) {
      return formatEmailRegex.test(email)
    },
    validEmailWhitespace: function (email: string) {
      return email.trim() !== email
    },
    validEmailDomain: function (email: string) {
      return domainRegex.test(email)
    },
    validEmailSymbol: function (email: string) {
      return email.includes('@')
    },
    validEmailLatin: function (email: string) {
      return latinRegex.test(email)
    },

    validPasswordLength: function (password: string) {
      return password.length >= 8
    },
    validPasswordUppercase: function (password: string) {
      return uppercaseRegex.test(password)
    },
    validPasswordLowercase: function (password: string) {
      return lowercaseRegex.test(password)
    },
    validPasswordDigit: function (password: string) {
      return digitRegex.test(password)
    },
    validPasswordSpecial: function (password: string) {
      return specialRegex.test(password)
    },
    validPasswordWhitespace: function (password: string) {
      return password.trim() !== password
    },
    async login() {
      if (this.email && this.password) {
        await this.store.fetchToken()
        if (await this.store.login(this.email, this.password)) {
          this.store.changeLogin()
          setTimeout(() => router.push('/'), 2000)
        } else {
          alert('Invalid data')
        }
      }
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
  position: relative;
}
.container-forms {
  background-color: $app-gray;
  z-index: 100;
  border-radius: 20px;
  margin: 150px auto 0 auto;
  padding: 15px 30px;
  max-height: fit-content;
  min-height: 50vh;
  max-width: 500px;
  @media screen and (max-width: 500px) {
    max-width: 300px;
  }
}

#error {
  position: absolute;
  transform: rotate(0deg);
  height: 150px;
  left: 40%;
  top: 53%;
}

#show {
  position: absolute;
  transition: 2s;
  height: 250px;
  transform: rotate(60deg);
  left: 57%;
}

.show-error-message {
  position: absolute;
  color: $app-red;
  z-index: 600;
  background-color: white;
  border-radius: 60px;
  padding: 10px 20px;
  border: 3px solid black;
  bottom: 58%;
  margin: 0 auto;
  overflow: hidden;
  animation: showDiv1 4s forwards;
  min-width: 640px;
}

.hide-error-message {
  position: absolute;
  z-index: 600;
  height: 0;
  background-color: white;
  border-radius: 60px;
  padding: 0;
  border: none;
  bottom: 58%;
  left: 20%;
}

@keyframes showDiv1 {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.hideClip {
  position: absolute;
  top: 39%;
  clip-path: polygon(37% 12%, 9% 15%, 93% 111%);
  z-index: 605;
  left: 53%;
  background-color: white;
}

.hideClip1 {
  position: absolute;
  top: 39%;
  clip-path: polygon(45% 20%, 5% 20%, 92% 110%);
  z-index: 604;
  left: 53%;
  background-color: black;
}

.showClip {
  position: absolute;
  top: 39%;
  opacity: 1;
  width: 100px;
  clip-path: polygon(37% 12%, 9% 15%, 93% 111%);
  height: 100px;
  z-index: 605;
  left: 53%;
  background-color: white;
  animation: showDiv 4s forwards;
}

.showClip1 {
  position: absolute;
  top: 39%;
  opacity: 1;
  width: 100px;
  clip-path: polygon(45% 20%, 5% 20%, 92% 110%);
  height: 100px;
  z-index: 604;
  left: 53%;
  background-color: black;
  animation: showDiv 5s forwards;
}

@keyframes showDiv {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.invalid-input {
  border: 2px solid $app-red;
  box-shadow: 0 0 1rem $app-red;
}
h2 {
  @include pokemon-text($app-yelow, $app-dark-blue);
  -webkit-text-stroke: 1px $app-light-blue;
  text-align: center;
  font-size: 2rem;
}

.form-group {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 15px auto;
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

.clear-cross {
  position: absolute;
  right: 15px;
  font-size: 12px;
  top: 40px;
  font-weight: 700;

  &:hover {
    transform: scale(1.2);
    font-weight: 900;
    cursor: pointer;
  }
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
    content: '✖';
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

.signUp {
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

.logout {
  img {
    display: flex;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1240px) {
  #show {
    left: 58%;
  }
}

@media screen and (max-width: 1000px) {
  #show {
    left: 60%;
  }
}

@media screen and (max-width: 670px) {
  #show {
    max-height: 200px;
    left: 64%;
  }
  .show-error-message {
    border-radius: 60px;
    padding: 5px 20px;
    border: 3px solid black;
    font-size: 0.8rem;
    width: 80vw;
    min-width: 300px;
  }
}

@media screen and (max-width: 560px) {
  #show {
    max-height: 150px;
    left: 50%;
    top: 79%;
    transform: rotate(180deg);
  }
  .show-error-message {
    border-radius: 60px;
    padding: 5px 20px;
    border: 3px solid black;
    font-size: 0.6rem;
    width: 95vw;
    min-width: 300px;
    bottom: 55%;
  }
  .showClip {
    position: absolute;
    top: 38%;
    opacity: 1;
    width: 100px;
    clip-path: polygon(76% 14%, 44% 14%, 53% 120%);
    height: 350px;
    z-index: 605;
    left: 53%;
    background-color: white;
    animation: showDiv-82752b24 4s forwards;
  }
  .showClip1[data-v-82752b24] {
    position: absolute;
    top: 38%;
    opacity: 1;
    width: 100px;
    clip-path: polygon(80% 13%, 41% 13%, 52% 119%);
    height: 350px;
  }
}

@media screen and (max-width: 360px) {
  .show-error-message {
    border-radius: 60px;
    padding: 10px 10px;
    border: 3px solid black;
    font-size: 0.6rem;
    width: 95vw;
    min-width: 300px;
    bottom: 55%;
  }
}
</style>
