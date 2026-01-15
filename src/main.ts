import './assets/main.css'

import { createApp } from 'vue'
import { i18n } from './lib/i18n'
import App from './App.vue'
import router from './router'
import { vClickOutside } from './directives/clickOutsideDirective'

const app = createApp(App)

app.directive('click-outside', vClickOutside)
app.use(i18n)
app.use(router)
app.mount('#app')
