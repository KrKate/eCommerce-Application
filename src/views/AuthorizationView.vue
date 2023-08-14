<template>
  <div class="login-page">
    <div class="container-forms">
      <h1>Login</h1>
      <form
      @submit="checkForm"
      method="post"
      novalidate="true"
      >
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="user@example.com"
            v-model="email"
            @input="validateEmail"
            required
          />
          <p v-if="emailErrors" class="error">
          <ul>
            <li v-for="error in emailErrors" :key="error">{{ error }}</li>
          </ul>
        </p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Make it secure!"
            v-model="password"
            @input="validatePassword"
            required
          />
          <p v-if="passwordErrors.length" class="error">
          <ul>
            <li v-for="error in passwordErrors" :key="error">{{ error }}</li>
          </ul>
          </p>
        </div>
        <input type="submit" value="SIGN IN">
      </form>
      <p class="registration-link">Not registered yet? <RouterLink to="/registration">Register here</RouterLink></p>
    </div>
  </div>
</template>

<script lang="ts">
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

const formatEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;
const latinRegex = /^[a-zA-Z0-9@._-]+$/;
const specialRegex = /^(?=.*[!@#$%^&*()+=._-])/;
const domainRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/


export default {
  name: 'AuthorizationView',
  data() {
    return {
      email: null,
      password: null,
      emailErrors: [] as string[],
      passwordErrors: [] as string[]
    }
  },
  methods: {
    checkForm: function() {
    },
    validateEmail: function(e) {
      this.emailErrors = [];
      if(!this.email) this.emailErrors.push(EmailError.REQUIRED)
      if(!this.validEmailFormat(this.email)) this.emailErrors.push(EmailError.FORMAT)
      if(!this.validEmailWhitespace(this.email)) this.emailErrors.push(EmailError.WHITESPACE)
      if(!this.validEmailDomain(this.email)) this.emailErrors.push(EmailError.DOMAIN)
      if (!this.validEmailSymbol(this.email)) this.emailErrors.push(EmailError.SYMBOL)
      if (!this.validEmailLatin(this.email)) this.emailErrors.push(EmailError.LATIN)
      e.preventDefault();
    },
    validatePassword: function(e) {
      this.passwordErrors = [];
      if(!this.password) this.passwordErrors.push(PasswordError.REQUIRED)
      if(!this.validPasswordLength(this.password)) this.passwordErrors.push(PasswordError.LENGTH)
      if(!this.validPasswordUppercase(this.password)) this.passwordErrors.push(PasswordError.UPPERCASE)
      if(!this.validPasswordLowercase(this.password)) this.passwordErrors.push(PasswordError.LOWERCASE)
      if(!this.validPasswordDigit(this.password)) this.passwordErrors.push(PasswordError.DIGIT)
      if(!this.validPasswordSpecial(this.password)) this.passwordErrors.push(PasswordError.SPECIAL_CHARACTER)
      if(this.validPasswordWhitespace(this.password)) this.passwordErrors.push(PasswordError.WHITESPACE)
      e.preventDefault();
    },

    validEmailFormat:function(email) {
     return formatEmailRegex.test(email);
    },
    validEmailWhitespace:function(email) {
      return email.trim() !== email
    },
    validEmailDomain:function(email) {
      return domainRegex.test(email)
    },
    validEmailSymbol: function(email) {
       return email.includes('@')
    },
    validEmailLatin: function(email) {
      return latinRegex.test(email)
    },


    validPasswordLength: function(password) {
      return password.length < 8
    },
    validPasswordUppercase:function(password) {
      return uppercaseRegex.test(password)
    },
    validPasswordLowercase:function(password) {
      return lowercaseRegex.test(password)
    },
    validPasswordDigit:function(password){
      return digitRegex.test(password)
    },
    validPasswordSpecial:function(password) {
      return specialRegex.test(password)
    },
    validPasswordWhitespace:function(password) {
      return password.trim() !== password
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
