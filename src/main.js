import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/less/index.less' // 引入全局less
import router from './router' // 引入路由
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component) // 注册图标组件
}
app.use(router).mount("#app") // 使用路由
