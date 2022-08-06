import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 权限路由过滤
import './permission'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
