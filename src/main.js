import { createApp } from 'vue'
import App from './App.vue'
import { createPinia, setActivePinia } from 'pinia'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
setActivePinia(pinia);

app.use(pinia)
app.use(router)
app.mount('#app')

