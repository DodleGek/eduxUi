import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/less/index.less' // 引入全局less
import router from './router' // 引入路由
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

// TODO :引入mock数据 - 开发环境使用
// 如果不需要mock数据，注释掉这一行即可
import '@/api/mock/homeMock' 

const pinia = createPinia() // 创建pinia实例

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component) // 注册图标组件
}

app.use(router)
  .use(pinia)
  .mount("#app") // 使用路由