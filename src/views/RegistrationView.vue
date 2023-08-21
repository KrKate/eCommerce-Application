<template>
  <div class="registration-page">
    <form
      novalidate="true"
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
      <div class="registration-item">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          required
          placeholder="user@example.com"
          v-model="email"
          @input.prevent="validateEmail"
        />
      </div>
      <div v-if="emailError" class="error">{{ emailError }}</div>

      <div class="registration-item">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          v-model="password"
          @input.prevent="validatePassword"
        />
      </div>
      <div v-if="passwordError" class="error">{{ passwordError }}</div>

      <div class="registration-item">
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          required
          v-model="firstName"
          @input.prevent="validateFirstName"
        />
      </div>
      <div v-if="firstNameError" class="error">{{ firstNameError }}</div>

      <div class="registration-item">
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          required
          v-model="lastName"
          @input.prevent="validateLastName"
        />
      </div>
      <div v-if="lastNameError" class="error">{{ lastNameError }}</div>

      <div class="registration-item">
        <label for="date">Date of Birth:</label>
        <input
          type="date"
          id="date"
          required
          v-model="dateOfBirth"
          @input.prevent="validateDateOfBirth"
        />
      </div>
      <div v-if="dateError" class="error">{{ dateError }}</div>

      <div class="registration-item">
        <label for="street">Street:</label>
        <input type="text" id="street" required v-model="street" @input.prevent="validateStreet" />
      </div>
      <div v-if="streetError" class="error">{{ streetError }}</div>

      <div class="registration-item">
        <label for="country">Country:</label>
        <select id="country" required v-model="country">
          <option value="DE">Germany</option>
          <option value="BY">Belarus</option>
          <option value="RU">Russia</option>
          <option value="KZ">Kazakhstan</option>
          <option value="FR">France</option>
          <option value="GB">United Kingdom</option>
          <option value="ES">Spain</option>
          <option value="IT">Italy</option>
          <option value="PL">Poland</option>
        </select>
      </div>

      <div class="registration-item">
        <label for="city">City:</label>
        <input type="text" id="city" required v-model="city" @input.prevent="validateCity" />
      </div>
      <div v-if="cityError" class="error">{{ cityError }}</div>

      <div class="registration-item">
        <label for="postalCode">Postal Code:</label>
        <input
          type="text"
          id="postalCode"
          required
          v-model="postalCode"
          @input.prevent="validatePostalCode"
        />
      </div>
      <div v-if="postalCodeError" class="error">{{ postalCodeError }}</div>
      <div class="registerContainer">
        <input class="register" type="submit" value="Register" :disabled="!formIsValid" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { UserRegistrationInfo } from '@/stores/types'
import { useUserStore } from '@/stores/authorization'
import router from '@/router'
const formatEmailRegex = /^[a-zA-Z0-9._%+-\s]+@[a-zA-Z0-9.-\s]+\.[a-zA-Z\s]{2,}$/
const formatPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
const nameRegex = /^[a-zA-Z]+$/
const cityRegex = /^[a-zA-Z]+$/

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
      emailError: '',
      passwordError: '',
      firstNameError: '',
      lastNameError: '',
      dateError: '',
      streetError: '',
      cityError: '',
      postalCodeError: '',
      countryError: '',
      isCorrectData: false,
      store: useUserStore()
    }
  },
  computed: {
    formIsValid: function () {
      return (
        this.emailError.length === 0 &&
        this.passwordError.length === 0 &&
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
      if (!this.email.match(formatEmailRegex)) {
        this.emailError = 'Invalid email format'
      } else {
        this.emailError = ''
      }
    },
    validatePassword: function () {
      if (!this.password.match(formatPasswordRegex)) {
        this.passwordError =
          'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
      } else {
        this.passwordError = ''
      }
    },
    validateFirstName: function () {
      if (!this.firstName.match(nameRegex)) {
        this.firstNameError =
          'Must contain at least one character and no special characters or numbers'
      } else {
        this.firstNameError = ''
      }
    },
    validateLastName: function () {
      if (!this.lastName.match(nameRegex)) {
        this.lastNameError =
          'Must contain at least one character and no special characters or numbers'
      } else {
        this.lastNameError = ''
      }
    },
    validateDateOfBirth: function () {
      const today = new Date()
      const selectedDate = new Date(this.dateOfBirth)
      const ageDifference = today.getFullYear() - selectedDate.getFullYear()

      if (ageDifference < 13) {
        this.dateError = 'You must be at least 13 years old.'
      } else {
        this.dateError = ''
      }
    },
    validateStreet: function () {
      if (this.street.length === 0) {
        this.streetError = 'Must contain at least one character'
      } else {
        this.streetError = ''
      }
    },
    validateCity: function () {
      if (!this.city.match(cityRegex)) {
        this.cityError = 'Must contain at least one character and no special characters or numbers'
      } else {
        this.cityError = ''
      }
    },
    validatePostalCode: function () {
      const countryCode = this.country
      const postalCode = this.postalCode
      let regex
      switch (countryCode) {
        case 'Germany':
          regex = /^[0-9]{5}$/
          break
        case 'Belarus':
        case 'Russia':
        case 'Kazakhstan':
          regex = /^[0-9]{6}$/
          break
        case 'France':
          regex = /^[0-9]{2}\s?[0-9]{3}$/
          break
        case 'United Kingdom':
          regex =
            /^([A-Z]){1}([0-9][0-9]|[0-9]|[A-Z][0-9][A-Z]|[A-Z][0-9][0-9]|[A-Z][0-9]|[0-9][A-Z]){1}([ ])?([0-9][A-z][A-z]){1}$/i
          break
        case 'Spain':
          regex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/
          break
        case 'Italy':
          regex = /^[0-9]{5}$/
          break
        case 'Poland':
          regex = /^[0-9]{2}-[0-9]{3}$/
          break
        default:
          regex = /.*/
      }
      if (regex.test(postalCode)) {
        this.postalCodeError = ''
      } else {
        this.postalCodeError = `Invalid postal code for ${this.country}`
      }
    },
    async signIn(user: UserRegistrationInfo) {
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
        } else {
          this.isCorrectData = true
          setTimeout(() => (this.isCorrectData = false), 6000)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';
.registration-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

form {
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
  align-items: left;
  gap: 10px;
  background-color: $app-gray;
  z-index: 100;
  border-radius: 20px;
  margin: 200px auto 0 auto;
  padding: 15px 30px;
  max-height: fit-content;
  min-height: 50vh;
  max-width: 800px;
}

label {
  display: block;
  margin-bottom: 5px;
  padding-right: 10px;
  flex-shrink: 0;
}

input,
select {
  padding: 5px;
  border-radius: 8px;
  font-size: 1rem;
  flex-grow: 1;

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
}

.registration-item {
  display: flex;
}

.register {
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

.register:disabled {
  background-color: whitesmoke;
  color: $app-red;
  width: 50%;
  cursor: default;
}
.error {
  color: red;
  font-size: 12px;
  text-align: left;
  &::before {
    content: '✖';
    margin-right: 5px;
  }
}
</style>
