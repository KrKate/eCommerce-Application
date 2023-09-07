<template>
  <div class="registration-page">
    <AmBreadcrumbs :showCurrentCrumb="true" />
    <form :novalidate="true" ref="reg" @submit.prevent="signIn(userDTO)">
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
      <div class="separator" v-if="!store.isLogin">
        <span> Shipping Address </span>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="street-shipping">Street:</label>
        <input
          type="text"
          id="street-shipping"
          ref="streetShipping"
          required
          v-model="shippingStreet"
          @input.prevent="validateShippingStreet"
          :class="{ 'invalid-input': shippingStreetError.length }"
        />
        <div v-if="shippingStreetError.length" class="error">
          <ul>
            <li v-for="error in shippingStreetError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="country-shipping">Country:</label>
        <select id="country-shipping" required v-model="shippingCountry">
          <option v-for="item in countries" v-bind:value="item" v-bind:key="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="city-shipping">City:</label>
        <input
          type="text"
          id="city-shipping"
          required
          v-model="shippingCity"
          @input.prevent="validateShippingCity"
          :class="{ 'invalid-input': shippingCityError.length }"
        />
        <div v-if="shippingCityError.length" class="error">
          <ul>
            <li v-for="error in shippingCityError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="registration-item" v-if="!store.isLogin">
        <label for="postalCode-shipping">Postal Code:</label>
        <input
          type="text"
          id="postalCode-shipping"
          required
          v-model="shippingPostalCode"
          @input.prevent="validateShippingPostalCode"
          :class="{ 'invalid-input': shippingPostalCodeError.length }"
          :disabled="!shippingCountry"
        />
        <div v-if="shippingPostalCodeError.length" class="error">
          <ul>
            <li v-for="error in shippingPostalCodeError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>

      <div class="check-item" v-if="!store.isLogin">
        <input class="check" type="checkbox" id="saveDefaultShippingAddress" />
        <label for="saveDefaultShippingAddress">Save as default shipping address</label>
      </div>

      <div class="check-item" v-if="!store.isLogin">
        <input
          class="check"
          type="checkbox"
          id="also"
          :disabled="
            shippingPostalCodeError.length !== 0 ||
            shippingCityError.length !== 0 ||
            shippingStreetError.length !== 0 ||
            shippingStreet === '' ||
            shippingPostalCode === '' ||
            shippingCity === '' ||
            shippingCountry === ''
          "
          @change="copyShippingToBilling"
          ref="isAlsoBilling"
          v-model="also"
        />
        <label for="also">This is also my billing address</label>
      </div>
      <div v-show="!also" style="display: contents">
        <div class="separator" v-if="!store.isLogin">
          <span> Billing Address </span>
        </div>
        <div class="registration-item" v-if="!store.isLogin">
          <label for="street-billing">Street:</label>
          <input
            type="text"
            id="street-billing"
            required
            v-model="billingStreet"
            :disabled="also"
            @input.prevent="validateBillingStreet"
            :class="{ 'invalid-input': billingStreetError.length }"
          />
          <div v-if="billingStreetError.length" class="error">
            <ul>
              <li v-for="error in billingStreetError" :key="error">{{ error }}</li>
            </ul>
          </div>
        </div>
        <div class="registration-item" v-if="!store.isLogin">
          <label for="country-billing">Country:</label>
          <select id="country-billing" required v-model="billingCountry" :disabled="also">
            <option v-for="item in countries" v-bind:value="item" v-bind:key="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="registration-item" v-if="!store.isLogin">
          <label for="city-billing">City:</label>
          <input
            type="text"
            id="city-billing"
            required
            v-model="billingCity"
            @input.prevent="validateBillingCity"
            :class="{ 'invalid-input': billingCityError.length }"
          />
          <div v-if="billingCityError.length" class="error">
            <ul>
              <li v-for="error in billingCityError" :key="error">{{ error }}</li>
            </ul>
          </div>
        </div>
        <div class="registration-item" v-if="!store.isLogin">
          <label for="postalCode-billing">Postal Code:</label>
          <input
            type="text"
            id="postalCode-billing"
            required
            v-model="billingPostalCode"
            @input.prevent="validateBillingPostalCode"
            :class="{ 'invalid-input': billingPostalCodeError.length }"
            :disabled="!billingCountry"
          />
          <div v-if="billingPostalCodeError.length" class="error">
            <ul>
              <li v-for="error in billingPostalCodeError" :key="error">{{ error }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="check-item" v-if="!store.isLogin">
        <input class="check" type="checkbox" id="saveDefaultBillingAddress" />
        <label for="saveDefaultBillingAddress">Save as default billing address</label>
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
import type {
  ActionsDTO,
  CustomerAddress,
  UpdateUserInfoDTO,
  UserRegistrationInfo
} from '@/stores/types'
import { useUserStore } from '@/stores/authorization'
import {
  Countries,
  CountryCodesByCountry,
  CustomerUpdateActions,
  StaticErrors
} from '@/global/constatnts'
import Validator from '@/services/validator'

const validator = new Validator()
export default {
  name: 'AuthorizationView',
  data() {
    return {
      also: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      shippingStreet: '',
      billingStreet: '',
      shippingCity: '',
      billingCity: '',
      shippingPostalCode: '',
      billingPostalCode: '',
      shippingCountry: '',
      billingCountry: '',
      emailErrors: [] as string[],
      passwordErrors: [] as string[],
      firstNameError: [] as string[],
      lastNameError: [] as string[],
      dateError: [] as string[],
      shippingStreetError: [] as string[],
      billingStreetError: [] as string[],
      shippingCityError: [] as string[],
      billingCityError: [] as string[],
      shippingPostalCodeError: [] as string[],
      billingPostalCodeError: [] as string[],
      countryError: [] as string[],
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
        this.shippingStreetError.length === 0 &&
        this.billingStreetError.length === 0 &&
        this.shippingCityError.length === 0 &&
        this.billingCityError.length === 0 &&
        this.shippingPostalCodeError.length === 0 &&
        this.billingPostalCodeError.length === 0 &&
        this.countryError.length === 0 &&
        this.email &&
        this.password &&
        this.firstName &&
        this.lastName &&
        this.dateOfBirth &&
        this.shippingStreet &&
        this.billingStreet &&
        this.shippingCity &&
        this.billingCity &&
        this.shippingPostalCode &&
        this.billingPostalCode &&
        this.shippingCountry &&
        this.billingCountry
      )
    },
    userDTO: function () {
      const userInfo: UserRegistrationInfo = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth
      }
      return userInfo
    }
  },
  methods: {
    copyShippingToBilling() {
      if (!this.also) {
        this.billingStreet = this.shippingStreet
        this.billingCountry = this.shippingCountry
        this.billingCity = this.shippingCity
        this.billingPostalCode = this.shippingPostalCode
      }
    },
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
    validateShippingStreet: function () {
      this.shippingStreetError = []
      if (!validator.validateStreet(this.shippingStreet))
        this.shippingStreetError = [StaticErrors.STREET]
    },
    validateBillingStreet: function () {
      this.billingStreetError = []
      if (!validator.validateStreet(this.billingStreet))
        this.billingStreetError = [StaticErrors.STREET]
    },
    validateShippingCity: function () {
      this.shippingCityError = []
      if (!validator.validateOnlyLetters(this.shippingCity))
        this.shippingCityError = [StaticErrors.ONLY_LETTERS]
    },
    validateBillingCity: function () {
      this.billingCityError = []
      if (!validator.validateOnlyLetters(this.billingCity))
        this.billingCityError = [StaticErrors.ONLY_LETTERS]
    },
    validateShippingPostalCode: function () {
      this.shippingPostalCodeError = []
      if (!validator.validatePostalCode(this.shippingCountry, this.shippingPostalCode))
        this.shippingPostalCodeError = [StaticErrors.POSTAL_CODE]
    },
    validateBillingPostalCode: function () {
      this.billingPostalCodeError = []
      if (!validator.validatePostalCode(this.billingCountry, this.billingPostalCode))
        this.billingPostalCodeError = [StaticErrors.POSTAL_CODE]
    },
    getAddressesForRegistration(): UpdateUserInfoDTO {
      const updateData: UpdateUserInfoDTO = {
        version: 1,
        actions: [] as ActionsDTO[]
      }
      const addressShipping: Partial<CustomerAddress> = {
        city: this.shippingCity,
        country: CountryCodesByCountry[this.shippingCountry],
        postalCode: this.shippingPostalCode,
        streetName: this.shippingStreet
      }
      updateData.actions.push({
        action: CustomerUpdateActions.addAddress,
        address: addressShipping
      })
      if (!this.$refs.isAlsoBilling) {
        const addressBilling: Partial<CustomerAddress> = {
          city: this.billingCity,
          country: CountryCodesByCountry[this.billingCountry],
          postalCode: this.billingPostalCode,
          streetName: this.billingStreet
        }
        updateData.actions.push({
          action: CustomerUpdateActions.addAddress,
          address: addressBilling
        })
      }
      return updateData
    },
    signIn: async function (user: UserRegistrationInfo) {
      this.store.isLoading = true
      await this.store.fetchToken()
      if (await this.store.signup(user)) {
        if (await this.store.getTokens(user.email, user.password)) {
          if (await this.store.login(user.email, user.password)) {
            this.store.userInfo = await this.store.updateUserInfo(
              this.getAddressesForRegistration()
            )
            await this.store.changeLogin()
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
  },
  unmounted() {
    if (this.store.redirectTimer > 0) clearTimeout(this.store.redirectTimer)
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
  position: relative;

  nav {
    display: flex;
    position: absolute;
    font-size: 1rem;
    width: 100%;
    padding-left: 40px;
    top: 150px;
  }
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
  @media screen and (max-width: 540px) {
    max-width: 400px;
  }
  @media screen and (max-width: 450px) {
    max-width: 300px;
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
  @media screen and (max-width: 540px) {
    width: 100%;
  }
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

.separator {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid $app-dark-blue;
  text-align: center;
  margin: 10px 0;
}

span {
  font-size: 1.2rem;
  background-color: $app-gray;
  padding: 0 10px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}

.check {
  width: 20px;
  height: 20px;
}
</style>
