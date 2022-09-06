import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// SPA
// 首屏加载速度很慢
// 路由懒加载 -使用到了路由懒加载，再去请求他
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
