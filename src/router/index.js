import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () =>
  import ('views/login/Login')
const LayOut = () =>
  import ('views/layout/LayOut')
const Home = () =>
  import ('views/home/Home')
const My = () =>
  import ('views/my/My')
const Publish = () =>
  import ('views/publish/Publish')
const Admin = () =>
  import ('views/admin/Admin')
const Detect = () =>
  import ('views/detect/Detect')

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login,
}, {
  path: '/',
  component: LayOut,
  // 子路由
  children: [{
    path: '/',
    name: 'home',
    component: Home,
  }, {
    path: '/detect',
    name: 'detect',
    component: Detect,
  }, {
    path: '/publish',
    name: 'publish',
    component: Publish,
  }, {
    path: '/admin',
    name: 'admin',
    component: Admin,
  }, {
    path: '/my',
    name: 'my',
    component: My,
  }]
}]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router