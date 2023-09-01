import { defineStore } from 'pinia'
import axios from 'axios'
import type {
  Customer,
  PasswordFlowResponse,
  Product,
  ProductResponse,
  SiteCookie,
  TokenResponse,
  UserRegistrationInfo
} from '@/stores/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    token: '',
    refreshToken: '',
    expires: 0,
    firstName: '',
    lastName: '',
    isLoading: false,
    id: '',
    email: ''
  }),
  actions: {
    async fetchToken() {
      try {
        const data: TokenResponse = await axios
          .post(
            'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
            {},
            {
              headers: {
                Authorization: `Basic ${btoa(
                  `dfl2XWxHLbWwv8yU8bYwctWO:rsHEEwEvL3-cpCElTgirDd7Pep8HjTwW`
                )}`
              }
            }
          )
          .then((data) => data.data)
        this.token = data.access_token
      } catch (error) {
        console.log(error)
      }
    },
    async login(email: string, password: string) {
      try {
        const customerData: Customer = await axios
          .post(
            'https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/login',
            JSON.stringify({
              email: email,
              password: password
            }),
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((data) => data.data)
        this.firstName = customerData.customer.firstName
        this.lastName = customerData.customer.lastName
        this.email = customerData.customer.email
        this.id = customerData.customer.id
        const cookie: SiteCookie = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          id: this.id,
          accessToken: this.token,
          refreshToken: this.refreshToken
        }
        this.setCookie(cookie)
        return true
      } catch (error) {
        return false
      }
    },
    async getTokens(email: string, password: string) {
      try {
        const userData: PasswordFlowResponse = await axios
          .post(
            `https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce_app_sloths/customers/token?grant_type=password&username=${email}&password=${encodeURIComponent(
              password
            )}`,
            {},
            {
              headers: {
                Authorization: `Basic ${btoa(
                  `dfl2XWxHLbWwv8yU8bYwctWO:rsHEEwEvL3-cpCElTgirDd7Pep8HjTwW`
                )}`
              }
            }
          )
          .then((data) => data.data)
        this.token = userData.access_token
        this.refreshToken = userData.refresh_token
        this.expires = userData.expires_in
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async signup(user: UserRegistrationInfo) {
      try {
        await axios.post(
          `https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/me/signup`,
          JSON.stringify(user),
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        return true
      } catch (error) {
        return false
      }
    },
    setCookie(cookie: SiteCookie) {
      document.cookie = `pokemonStore=${encodeURI(JSON.stringify(cookie))};max-age=${this.expires}`
    },
    readCookie() {
      const cookies = document.cookie.split(';')
      const siteData = cookies.filter((value) => value.includes('pokemonStore='))
      if (siteData.length) {
        const data: SiteCookie = JSON.parse(decodeURI(siteData[0].replace('pokemonStore=', '')))
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.token = data.accessToken
        this.email = data.email
        this.id = data.id
        this.refreshToken = data.refreshToken
        this.isLogin = true
      }
    },
    clearCookie() {
      const cookies = document.cookie.split(';')
      const siteData = cookies.filter((value) => value.includes('pokemonStore='))
      if (siteData.length) {
        document.cookie = `pokemonStore=;max-age=0`
      }
    },
    changeLogin() {
      if (this.isLogin) this.clearCookie()
      this.isLogin = !this.isLogin
    },
    async getProducts() {
      try {
        const productsData: ProductResponse = await axios
          .get(
            `https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/products?limit=50`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((data) => data.data)
          return productsData.results
      } catch (error) {
        return [] as Product[]
      }
    }
  }

})
