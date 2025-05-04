import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import './assets/style.css'
import { initializePreferences } from './utils/preferences'

// Initialize user preferences (theme and language) before mounting the app
initializePreferences()

const app = createApp(App)
app.use(i18n)
app.mount('#app')
