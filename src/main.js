import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式文件
import './styles/base.css'

// 安装 ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
