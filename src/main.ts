import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import breadcrumbs from 'vue-3-breadcrumbs'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(breadcrumbs, {
  includeComponent: true
})

app.mount('#app')
