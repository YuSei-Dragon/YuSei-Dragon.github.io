import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Vue.config.productionTip = false
import * as echarts from 'echarts';

const app = createApp(App)
app.config.productionTip = false
app.use(store);
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$echarts = echarts
app.mount('#app')

