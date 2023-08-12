import { defineStore } from 'pinia'
import axios from 'axios'
type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    token: ''
  }),
  getters: {
    getToken(state) {
      return state.token
    }
  },
  actions: {
    async fetchToken() {
      try {
        const data: TokenResponse = await axios.post(
          'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
          {},
          {
            headers: {
              Authorization: `Basic ${btoa(
                `dfl2XWxHLbWwv8yU8bYwctWO:rsHEEwEvL3-cpCElTgirDd7Pep8HjTwW`
              )}`
            }
          }
        ).then(data => data.data)
        this.token = data.access_token;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    changeLogin() {
      this.isLogin = !this.isLogin;
    }
  }
})
