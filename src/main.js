import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'

import FastClick from 'fastclick'
import '@/assets/lib-flexible/flexible.js'   //移动端屏幕适配
// todo 重构请求方式为标准的 post请求
import {request, post, fetch, patch, put} from './utils/http'
// todo 是否用使用 引入changeBottom指令
import changeBottom from '@/directive/changeBottom.js'
// todo 是否有使用 引入过滤器
import keepTowNum from '@/filter/keepTowNum.js'
// 引入uiScript
import '@/assets/js/uiScript.js'
import overwritePrototype from '@/utils/overwritePrototype'

// vue 路由
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入elementUI组件 todo 修改组建为mint-ui
import ElementUI from 'element-ui'
// 引入elementUI组件css样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入 Vant (mobile-vue组件库)
import Vant from 'vant'
import 'vant/lib/index.css';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import jsonp from 'jsonp'

Vue.use(ElementUI)
Vue.use(Vant)
Vue.use(Antd)
Vue.use(VueAxios, axios)

// 注册全局自定义指令
Vue.directive('changeBottom',changeBottom)
// 注册全局过滤器
Vue.filter('keepTowNum',keepTowNum)

FastClick.attach(document.body)

Vue.config.productionTip = false

request({
    url: '/GetWeChatPublicName',
    data: {},
    success(response) {
        if(response.resultcode == 1 || response.resultcode == "1"){
            window['titleValue'] = response.name;
            document.getElementsByTagName('title')[0].innerHTML = response.name;
        }
    },
    fail(error) {
        console.log('/WSYYUSER接口错误')
        console.log(error)
    },
})

if(/;jsessionid/i.test(window.location.href)) {
    window.location.href = window.location.href.split(";jsessionid")[0]
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

// 重写原型(拓展方法)
overwritePrototype()

Vue.prototype.$jsonp = jsonp
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
