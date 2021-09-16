import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Router from 'vue-router'
Vue.use(VueRouter)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      tabbarShow: true
    },
    component: Home,
    children: [
      {
        path: 'prpop',
        name: 'MyPrpop',
        component: () => import(/* webpackChunkName: "about" */ '../views/MyPrpop.vue')
      }
    ]
  },
  {
    path: '/topic',
    name: 'topic',
    meta: {
      tabbarShow: true
    },
    component: () => import(/* webpackChunkName: "Topic" */ '../views/Topic.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta: {
      tabbarShow: true
    },
    component: () => import(/* webpackChunkName: "Category" */ '../views/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      tabbarShow: true
    },
    component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue')
  },

  {
    path: '/user',
    name: 'User',
    meta: {
      tabbarShow: true
    },
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')
  },
  {
    path: '/productdetail',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "ProductDetail" */ '../views/ProductDetail.vue')
  },
]

const router = new VueRouter({
  routes
})

/* 路由拦截 */
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.path == '/cart') {
    if (token) {
      next()
    } else {
      Vue.prototype.$toast('请先登录');
      setTimeout(() => {
        next('/user')
      }, 1000)

    }
    return
  }
  next()
})
export default router
