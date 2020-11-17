import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = ()=>import('@/views/Main');
const UserManage = ()=>import('@/views/UserManage');
const ShopManage = ()=>import('@/views/ShopManage');

const routes = [
  {
    path: '/',
    redirect:'/Main'
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  },
  {
    path: '/UserManage',
    name: 'UserManage',
    component: UserManage
  },
  {
    path: '/ShopManage',
    name: 'ShopManage',
    component: ShopManage
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
