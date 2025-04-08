import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/less/index.less' // 引入全局less
import router from './router' // 引入路由
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from 'pinia'
import '@/api/mock.js' // 引入mock数据
import api from '@/api/api' // 引入api接口

const pinia = createPinia() // 创建pinia实例

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component) // 注册图标组件
}
app.config.globalProperties.$api = api // 将api挂载到全局属性上
app.use(pinia) // 使用pinia
app.use(router).mount("#app") // 使用路由
