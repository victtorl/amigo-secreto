import { createApp } from 'vue'
import App from './App.vue'
import { createPinia, setActivePinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
setActivePinia(pinia);

app.use(pinia)
app.use(router)
app.use(Vue3Toastify, { autoClose: 3000 })
app.mount('#app')

