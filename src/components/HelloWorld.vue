<script setup lang="ts">
// import { type Ref, ref } from 'vue'

// const token = ref({} as TokenResponse)
// let categories: Ref<null | Category[]> = ref(null)
//
// type TokenResponse = {
//   access_token: string
//   token_type: string
//   expires_in: number
//   scope: string
// }
//
// type CategoryResponse = {
//   limit: number
//   offset: number
//   count: number
//   total: number
//   results: Category[]
// }
//
// type Category = {
//   id: string
//   version: number
//   versionModifiedAt: string
//   lastMessageSequenceNumber: number
//   createdAt: string
//   lastModifiedAt: string
//   lastModifiedBy: {
//     isPlatformClient: boolean
//     user: {
//       typeId: string
//       id: string
//     }
//   }
//   createdBy: {
//     isPlatformClient: boolean
//     user: {
//       typeId: string
//       id: string
//     }
//   }
//   key: string
//   name: {
//     'en-US': string
//   }
//   slug: {
//     'en-US': string
//   }
//   description: {
//     'en-US': string
//   }
//   ancestors: []
//   orderHint: string
//   externalId: string
//   assets: []
// }
//
// const requestOptions = {
//   method: 'POST',
//   headers: {
//     Authorization: `Basic ${btoa(`dfl2XWxHLbWwv8yU8bYwctWO:rsHEEwEvL3-cpCElTgirDd7Pep8HjTwW`)}`
//   }
// }
//
// fetch(
//   'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
//   requestOptions
// )
//   .then((response) => response.json())
//   .then((data) => {
//     token.value = data as TokenResponse
//     fetch('https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/categories', {
//       headers: { Authorization: `Bearer ${data?.access_token}` }
//     })
//       .then((response) => response.json())
//       .then((data: CategoryResponse) => {
//         categories.value = data?.results as Category[]
//       })
//   })
</script>

<template>
  <div class="greetings">
    <div class="card text-center m-3">
      <h5>POST Request for getting token</h5>
      <div class="token">Access token: {{ token?.access_token }}</div>
    </div>
    <h5>Categories names</h5>
    <ul>
      <li v-for="item in categories" :key="item.key">
        {{ item.key }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.token,
ul {
  margin: 5px auto;
  font-size: 10px;
  font-weight: 700;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

h5 {
  font-style: italic;
  font-size: 16px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
