import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.css' //reset
import webp from '@/plugins/webp'

const app = createApp(App)

app.use(webp).mount('#app')
