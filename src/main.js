import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Vue.config.productionTip = false

const app = createApp(App)
app.config.productionTip = false
app.use(store);
app.use(router)
app.use(ElementPlus)
app.mount('#app')

