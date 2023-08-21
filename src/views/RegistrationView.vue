<template>
  <main>
    <p>Registration page</p>
    <input ref="email" placeholder="email" />
    <input ref="firstName" placeholder="firstName" />
    <input ref="lastName" placeholder="lastName" />
    <input ref="password" placeholder="password" />
    <button
      @click="
        signIn({
          email: $refs.email.value,
          firstName: $refs.firstName.value,
          lastName: $refs.lastName.value,
          password: $refs.password.value
        })
      "
    >
      Registartion
    </button>
  </main>
</template>

<script lang="ts">
import { UserRegistrationInfo } from '@/stores/types'
import { useUserStore } from '@/stores/authorization'
import router from '@/router'

export default {
  name: 'RegistrationView',
  data() {
    return {
      isCorrectData: false,
      store: useUserStore()
    }
  },
  methods: {
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
main {
  display: flex;
  margin: auto;
  padding-top: 200px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
  align-items: center;
}
</style>
