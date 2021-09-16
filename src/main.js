import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

/* 引入reset-css样式表 */
import 'reset-css';

/* vant组件样式表和引入js文件 */
import 'vant/lib/index.css';
import '@/vantui'

// axios
axios.defaults.baseURL = 'http://kumanxuan1.f3322.net:8001'
// 请求拦截器
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['X-Nideshop-Token'] = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(config => {
  return config.data
})
Vue.prototype.$http = axios

/* 过滤器 */
Vue.filter('filterMoney', function (val) {
  let newVal = Number(val)
  return '￥' + newVal.toFixed(2) + '元'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
