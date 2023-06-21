import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store' // import your Vuex store
import { i18n } from './i18n.js' // import i18n configurations

const app = createApp(App)

app.use(router)
app.use(store) // use your Vuex store
app.use(i18n) // use i18n configurations
app.mount('#app')
