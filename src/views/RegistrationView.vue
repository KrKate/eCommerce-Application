<template>
  <div class="registration-page">
    <form
      :novalidate="true"
      ref="reg"
      @submit.prevent="
        signIn({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
      "
    >
      <h2>{{ store.isLogin ? 'Successful registration!' : 'Registration' }}</h2>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          required
          placeholder="user@example.com"
          v-model="email"
          @input.prevent="validateEmail"
          :class="{ 'invalid-input': emailErrors.length }"
        />
        <div v-if="emailErrors.length" class="error">
          <ul>
            <li v-for="error in emailErrors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          v-model="password"
          @input.prevent="validatePassword"
          :class="{ 'invalid-input': passwordErrors.length }"
        />
        <div v-if="passwordErrors.length" class="error">
          <ul>
            <li v-for="error in passwordErrors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          required
          v-model="firstName"
          @input.prevent="validateFirstName"
          :class="{ 'invalid-input': firstNameError.length }"
        />
        <div v-if="firstNameError.length" class="error">
          <ul>
            <li v-for="error in firstNameError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          required
          v-model="lastName"
          @input.prevent="validateLastName"
          :class="{ 'invalid-input': lastNameError.length }"
        />
        <div v-if="lastNameError.length" class="error">
          <ul>
            <li v-for="error in lastNameError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="date">Date of Birth:</label>
        <input
          type="date"
          id="date"
          required
          v-model="dateOfBirth"
          @input.prevent="validateDateOfBirth"
          :class="{ 'invalid-input': dateError.length }"
        />
        <div v-if="dateError.length" class="error">
          <ul>
            <li v-for="error in dateError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="street">Street:</label>
        <input
          type="text"
          id="street"
          required
          v-model="street"
          @input.prevent="validateStreet"
          :class="{ 'invalid-input': streetError.length }"
        />
        <div v-if="streetError.length" class="error">
          <ul>
            <li v-for="error in streetError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="country">Country:</label>
        <select id="country" required v-model="country">
          <option v-for="item in countries" v-bind:value="item" v-bind:key="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="city">City:</label>
        <input
          type="text"
          id="city"
          required
          v-model="city"
          @input.prevent="validateCity"
          :class="{ 'invalid-input': cityError.length }"
        />
        <div v-if="cityError.length" class="error">
          <ul>
            <li v-for="error in cityError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="postalCode">Postal Code:</label>
        <input
          type="text"
          id="postalCode"
          required
          v-model="postalCode"
          @input.prevent="validatePostalCode"
          :class="{ 'invalid-input': postalCodeError.length }"
        />
        <div v-if="postalCodeError.length" class="error">
          <ul>
            <li v-for="error in postalCodeError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registerContainer" v-if="!store.isLogin">
        <input class="register" type="submit" value="Register" :disabled="!formIsValid" />
      </div>
      <p class="login-link" v-if="!store.isLogin">
        Already have an account? <RouterLink to="/login">Login</RouterLink>
      </p>
      <div class="logout" v-if="store.isLogin">
        <img src="@/assets/gif/login_success.gif" alt="login_success" />
        <h2>Redirecting...</h2>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { UserRegistrationInfo } from '@/stores/types'
import { useUserStore } from '@/stores/authorization'
import router from '@/router'
import { Countries, StaticErrors } from '@/global/constatnts'
import Validator from '@/services/validator'
const validator = new Validator()
export default {
  name: 'AuthorizationView',
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      emailErrors: [],
      passwordErrors: [],
      firstNameError: [],
      lastNameError: [],
      dateError: '',
      streetError: [],
      cityError: [],
      postalCodeError: [],
      countryError: [],
      countries: Countries,
      isCorrectData: false,
      store: useUserStore()
    }
  },
  computed: {
    formIsValid: function () {
      return (
        this.emailErrors.length === 0 &&
        this.passwordErrors.length === 0 &&
        this.firstNameError.length === 0 &&
        this.lastNameError.length === 0 &&
        this.dateError.length === 0 &&
        this.streetError.length === 0 &&
        this.cityError.length === 0 &&
        this.postalCodeError.length === 0 &&
        this.countryError.length === 0 &&
        this.email &&
        this.password &&
        this.firstName &&
        this.lastName &&
        this.dateOfBirth &&
        this.street &&
        this.city &&
        this.postalCode &&
        this.country
      )
    }
  },
  methods: {
    validateEmail: function () {
      validator.validateEmail(this.email)
      this.emailErrors = validator.errorsEmail
    },
    validatePassword: function () {
      validator.validatePassword(this.password)
      this.passwordErrors = validator.errorsPassword
    },
    validateFirstName: function () {
      this.firstNameError = []
      if (!validator.validateOnlyLetters(this.firstName))
        this.firstNameError = [StaticErrors.ONLY_LETTERS]
    },
    validateLastName: function () {
      this.lastNameError = []
      if (!validator.validateOnlyLetters(this.lastName))
        this.lastNameError = [StaticErrors.ONLY_LETTERS]
    },
    validateDateOfBirth: function () {
      this.dateError = []
      if (!validator.validateAge(this.dateOfBirth)) this.dateError = [StaticErrors.AGE]
    },
    validateStreet: function () {
      this.streetError = []
      if (!validator.validateStreet(this.street)) this.streetError = [StaticErrors.STREET]
    },
    validateCity: function () {
      this.cityError = []
      if (!validator.validateOnlyLetters(this.city)) this.cityError = [StaticErrors.ONLY_LETTERS]
    },
    validatePostalCode: function () {
      this.postalCodeError = []
      if (!validator.validatePostalCode(this.country, this.postalCode))
        this.postalCodeError = [StaticErrors.POSTAL_CODE]
    },
    async signIn(user: UserRegistrationInfo) {
      this.store.isLoading = true
      await this.store.fetchToken()
        if (await this.store.signup(user)) {
          if (await this.store.getTokens(user.email, user.password)) {
            if (await this.store.login(user.email, user.password)) {
              this.store.changeLogin()
              setTimeout(() => router.push('/'), 2000)
            } else {
              this.isCorrectData = true
              setTimeout(() => (this.isCorrectData = false), 6000)
            }
          }
        } else {
            this.emailErrors.push(StaticErrors.EMAIL_USED)
        }
      this.store.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';

.registration-page {
  @include view(100%, auto, relative, flex);
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  font-size: 1rem;
  gap: 5px;
  background-color: $app-gray;
  border-radius: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 200px auto 20px auto;
  padding: 15px 30px;
  max-height: fit-content;
  width: 500px;

  h2 {
    @include pokemon-text($app-yellow, $app-dark-blue);
    -webkit-text-stroke: 1px $app-light-blue;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
    width: 100%;
  }

  .login-link {
    text-align: center;
    width: 100%;
  }

  .logout {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    img {
      display: flex;
      margin: 0 auto;
    }
  }
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  padding: 5px;
  max-height: 30px;
  border-radius: 8px;
  font-size: 1rem;
  flex-grow: 1;
  display: flex;
  width: 100%;

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
}

.registration-item {
  display: flex;
  flex-direction: column;
  width: 47%;
}

.registerContainer {
  display: flex;
  width: 100%;
  margin: 10px auto;
  justify-content: center;

  .register {
    width: 100%;
    justify-content: center;
    max-height: 50px;
    padding: 10px;
    background-color: $app-red;
    color: $app-white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.8rem;
    transition: all 2s ease;
    text-transform: uppercase;

    &:disabled {
      opacity: 0.5;
      flex-grow: 0;
      width: 50%;
      cursor: default;
    }

    &:hover:not(:disabled) {
      font-weight: 700;

      &:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

.error {
  ul {
    text-align: left;
    color: $app-red;
    padding: 5px;
    font-size: 0.6rem;
  }

  li {
    list-style-type: none;
    &::before {
      content: '✖';
      margin-right: 5px;
    }
  }
}

.invalid-input {
  border: 2px solid $app-red;
  box-shadow: 0 0 1rem $app-red;
}
</style>
