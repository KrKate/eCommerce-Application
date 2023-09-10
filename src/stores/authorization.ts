import { defineStore } from 'pinia'
import axios from 'axios'
import type {
  Category,
  CategoryResponse,
  ChangePasswordDTO,
  ChannelResponse,
  Customer,
  CustomerInfo,
  PasswordFlowResponse,
  Product,
  ProductResponse,
  SiteCookie,
  TokenResponse,
  UpdateUserInfoDTO,
  UserRegistrationInfo,
  lineItem
} from '@/stores/types'
import router from '@/router'
import type { Channel } from 'diagnostics_channel'

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
    email: '',
    userInfo: {} as CustomerInfo,
    redirectTimer: -1
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
    async getMyCustomerDetails() {
      try {
        const customerInfo: CustomerInfo = await axios
          .get('https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/me', {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((data) => data.data)
        return customerInfo
      } catch (error) {
        return {} as CustomerInfo
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
        this.userInfo = customerData.customer
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
    async updateUserInfo(data: UpdateUserInfoDTO) {
      try {
        const customerInfo: CustomerInfo = await axios
          .post(
            `https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/me`,
            JSON.stringify(data),
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((data) => data.data)
        return customerInfo
      } catch (error) {
        return {} as CustomerInfo
      }
    },
    async changePassword(data: ChangePasswordDTO) {
      try {
        const customerInfo: CustomerInfo = await axios
          .post(
            `https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/me/password`,
            JSON.stringify(data),
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((data) => data.data)
        return customerInfo
      } catch (error) {
        return {} as CustomerInfo
      }
    },
    setCookie(cookie: SiteCookie) {
      document.cookie = `pokemonStore=${encodeURI(JSON.stringify(cookie))};max-age=${this.expires}`
    },
    async readCookie() {
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
      } else {
        await this.getAnonymousToken()
      }
    },
    clearCookie() {
      const cookies = document.cookie.split(';')
      const siteData = cookies.filter((value) => value.includes('pokemonStore='))
      if (siteData.length) {
        document.cookie = `pokemonStore=;max-age=0`
      }
    },
    async changeLogin() {
      if (this.isLogin) {
        this.clearCookie()
        await router.push('/')
      } else {
        this.redirectTimer = setTimeout(() => router.push('/'), 2000)
      }
      this.isLogin = !this.isLogin
    },
    async getProducts() {
      try {
        const productsData: ProductResponse = await axios
          .get(`https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/products`, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
          .then((data) => data.data)
        return productsData.results as Product[]
      } catch (error) {
        return [] as Product[]
      }
    },
    async getSortedProducts(limit = '30', page = '0', query = '') {
      try {
        const productsData: ProductResponse = await axios
          .get(
            `https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/product-projections/search?limit=${limit}&offset=${page}${query}`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((data) => data.data as ProductResponse)
        return productsData as ProductResponse
      } catch (error) {
        return {} as ProductResponse
      }
    },
    async getProductById(id: string) {
      try {
        const product: Product = await axios
          .get(
            `https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((data) => data.data)
        return product
      } catch (error) {
        return {} as Product
      }
    },
    async getCategories() {
      try {
        const categoriesData: CategoryResponse = await axios
          .get(`https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/categories`, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
          .then((data) => data.data)
        return categoriesData.results
      } catch (error) {
        return [] as Category[]
      }
    },
    async checkProductExistsById(id: string) {
      try {
        const status = await axios
          .head(
            `https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((data) => data.status)
        return status === 200
      } catch (error) {
        return false
      }
    },
    async getAnonymousToken()  {
      try {
        const anonimousTokenData: PasswordFlowResponse = await axios
          .post(
            `https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce_app_sloths/anonymous/token?grant_type=client_credentials`,
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
        this.token = anonimousTokenData.access_token
        this.refreshToken = anonimousTokenData.refresh_token
        this.expires = anonimousTokenData.expires_in
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async createCart() {
      try {
        const body = {
          currency: "EUR"
        }
        const status = await axios
          .post(
            "https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/me/carts",
            body,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              },
            }
          )
          .then((data) => data.data)
        console.log(status);
        return status === 200
      } catch (error) {
        return false
      }
    },
    async getChannels() {
      try {
        const channelsData: ChannelResponse = await axios
          .get(`https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/channels`, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
          .then((data) => data.data)
          console.log(channelsData.results)
        return channelsData.results
      } catch (error) {
        return [] as Channel[]
      }
    },
  }
})
