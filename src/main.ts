import { createApp } from 'vue'
import { Mobile } from '$/keys'
import './scripts/webfont'
import './style.postcss'
import App from './App.vue'

const isMobile = navigator.userAgentData?.mobile ?? !!navigator.userAgent.match(/Mobile/i)

const app = createApp(App)
app
  .provide(Mobile, isMobile)
  .mount('#app')
