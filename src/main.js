import { createApp } from 'vue'
import { useVant } from './components/vant'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import './assets/css/initial.css'
import './assets/css/common.css'

const vm = createApp(App)
vm.use(router)
useVant(vm)
vm.mount('#app')