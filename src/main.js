// 引入vue全家桶
import Vue from 'vue'
import router from './router'
import store from './store'

// 引入App组件
import App from './App.vue'

// 引入样式
import './assets/css/index';

// 引入网络请求
import './network'

// 引用UI库
import vuetify from './plugins/vuetify';

// 引入插件
import cookies from 'js-cookie';
Vue.prototype.$yyCookies = cookies;

// 引入全局快捷函数
import yy from './utils'
Vue.prototype.$yyHot = yy.$yyHot

// 配置
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')