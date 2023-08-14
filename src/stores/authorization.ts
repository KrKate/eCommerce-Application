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

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    token: ''
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
        alert(error)
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
        console.log(customerData)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    changeLogin() {
      this.isLogin = !this.isLogin
    }
  }
})
