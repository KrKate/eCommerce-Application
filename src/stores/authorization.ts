import { defineStore } from 'pinia'
import axios from 'axios'

export type Customer = {
  customer: {
    id: string
    version: number
    versionModifiedAt: string
    lastMessageSequenceNumber: number
    createdAt: string
    lastModifiedAt: string
    lastModifiedBy: {
      isPlatformClient: boolean
      user: {
        typeId: string
        id: string
      }
    }
    createdBy: {
      isPlatformClient: boolean
      user: {
        typeId: string
        id: string
      }
    }
    email: string
    firstName: string
    lastName: string
    middleName: string
    title: string
    salutation: string
    password: string
    addresses: []
    shippingAddressIds: []
    billingAddressIds: []
    isEmailVerified: boolean
    customerGroup: {
      typeId: string
      id: string
    }
    stores: []
    authenticationMode: string
  }
}
export type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

export type CategoryResponse = {
  limit: number
  offset: number
  count: number
  total: number
  results: Category[]
}

type Category = {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  createdBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  key: string
  name: {
    'en-US': string
  }
  slug: {
    'en-US': string
  }
  description: {
    'en-US': string
  }
  ancestors: []
  orderHint: string
  externalId: string
  assets: []
}

type PasswordFlowResponse = {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
}

type SiteCookie = {
  firstName: string
  lastName: string
  email: string
  id: string
  accessToken: string
  refreshToken: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    token: '',
    refreshToken: '',
    expires: 0,
    firstName: '',
    lastName: '',
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
            `https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce_app_sloths/customers/token?grant_type=password&username=${email}&password=${password}`,
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
        return false
      }
    },
    setCookie(cookie: SiteCookie) {
      document.cookie = `pokemonStore=${encodeURI(JSON.stringify(cookie))};max-age=${this.expires}`
    },
    readCookie() {
      const cookies = document.cookie.split(';')
      const siteData = cookies.filter(value => value.includes('pokemonStore='))
      if (siteData.length) {
        const data: SiteCookie = JSON.parse(decodeURI(siteData[0].replace('pokemonStore=', '')))
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.token = data.accessToken;
        this.email = data.email;
        this.id = data.id;
        this.refreshToken = data.refreshToken;
        this.isLogin = true;
      }
    },
    clearCookie(){
      const cookies = document.cookie.split(';')
      const siteData = cookies.filter(value => value.includes('pokemonStore='))
      if (siteData.length) {
        document.cookie = `pokemonStore=;max-age=0`
      }
    },
    changeLogin() {
      if (this.isLogin) this.clearCookie()
      this.isLogin = !this.isLogin
    }
  }
})
