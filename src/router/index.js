import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'prpop',
        name: 'MyPrpop',
        component: () => import(/* webpackChunkName: "about" */ '../views/MyPrpop.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
