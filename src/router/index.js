import Vue from 'vue'
import VueRouter from 'vue-router'
import { getItem } from 'utils/storage'

// 路由懒加载
const Login = () => import('views/login/Login')
const LayOut = () => import('views/layout/LayOut')
const Home = () => import('views/home/Home')
const My = () => import('views/my/My')
const Admin = () => import('views/admin/Admin')
const Detect = () => import('views/detect/Detect')
// 注册页面
const Register = () => import('views/register/Register')
// 管理员登录页面
const AdminLogin = () => import('views/adminlogin/AdminLogin')
// 修改密码
const ChangePassword = () => import('views/changepassword/ChangePassword')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      Login: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      Login: false,
    },
  },
  {
    path: '/adminlogin',
    name: 'adminlogin',
    component: AdminLogin,
    meta: {
      Login: false,
    },
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      Login: false,
    },
  },
  {
    path: '/',
    component: LayOut,
    // 子路由
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          Login: true,
        },
      },
      {
        path: '/detect',
        name: 'detect',
        component: Detect,
        meta: {
          Login: true,
        },
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
          Login: true,
        },
      },
      {
        path: '/my',
        name: 'my',
        component: My,
        meta: {
          Login: true,
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

// 路由拦击器
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
router.beforeEach((to, from, next) => {
  // 判断登录 如果是 /login 就放行 如果不是 /login 判断如果登录过了就放行 没登录就回到登录页面
  // if (to.path !== '/login') {
  //   if (getItem('user')) {
  //     //  登录过了 允许通过
  //     next()
  //   } else {
  //     // 没登录就回到登录页面
  //     next('/login')
  //   }
  // } else {
  //   // 是登录页面就放行
  //   next()
  // }  // 这种方法 会让 用户注册就不去 报错

  if (to.meta.Login) {
    // 为 true 说明需要登录  就来判断有没有 user 有 user 就说明登录进来了
    if (getItem('user')) {
      // 就放行
      next()
      return
    }
    next('/login')
  } else {
    // 到这里来了说明那个页面不需要登录就可以访问
    next()
  }
})

export default router
