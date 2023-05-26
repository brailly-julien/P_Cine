import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store' // import your Vuex store

const app = createApp(App)

app.use(router)
app.use(store) // use your Vuex store
app.mount('#app')
