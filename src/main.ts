import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

// GitHub Pages SPA redirect: restore path from 404.html redirect query param
const params = new URLSearchParams(window.location.search)
const rawRedirectRoute = params.get('route')
// Validate: only allow alphanumeric, slashes, hyphens, dots (no protocol, no //, no external URLs)
const SAFE_ROUTE_RE = /^[a-zA-Z0-9/_\-.]+(#[a-zA-Z0-9_-]*)?$/
const redirectRoute = rawRedirectRoute && SAFE_ROUTE_RE.test(rawRedirectRoute) && rawRedirectRoute.length < 2000
  ? rawRedirectRoute
  : null
if (redirectRoute) {
  const cleanUrl = window.location.pathname
  window.history.replaceState(null, '', cleanUrl + '#restored')
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)

// Navigate to restored route after mount (GitHub Pages SPA)
if (redirectRoute) {
  router.isReady().then(() => {
    router.replace('/' + redirectRoute)
  })
}

app.mount('#app')
