import Vue from 'vue';
import FastClick from 'fastclick';
// import component
import App from './App.vue';
// import  dependency
import store from './store/index.js';
import router from './router/index.js';
import './registerServiceWorker.js';


// 移动端屏幕适配
import '@/assets/lib-flexible/flexible.js';
// todo 重构请求方式为标准的 post请求
import { request, post, fetch, patch, put } from './utils/http.js';
// vue 网络环境
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// todo 是否用使用 引入changeBottom指令
import changeBottom from '@/directive/changeBottom.js';
// todo 是否有使用 引入过滤器
import keepTowNum from '@/filter/keepTowNum.js';

//todo 卸载uiScript的依赖 引入uiScript
import '@/assets/js/uiScript.js';
import overwritePrototype from './utils/overwritePrototype.js';



// 引入 Vant (mobile-vue组件库)
import Vant from 'vant';
import 'vant/lib/index.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import jsonp from 'jsonp';

Vue.use(Vant);
Vue.use(Antd);


// 注册全局自定义指令
Vue.directive('changeBottom', changeBottom);
// 注册全局过滤器
Vue.filter('keepTowNum', keepTowNum);

FastClick.attach(document.body);

Vue.config.productionTip = false;

// todo 抽取到JS文件封装
request({
	url: '/GetWeChatPublicName',
	data: {},
	success (response) {
		if (response.resultcode == 1 || response.resultcode == '1') {
			window['titleValue'] = response.name;
			document.getElementsByTagName('title')[0].innerHTML = response.name;
		}
	},
	fail (error) {
		console.log('/WSYYUSER接口错误');
		console.log(error);
	},
});

// todo 抽取到JS文件封装
if (/;jsessionid/i.test(window.location.href)) {
	window.location.href = window.location.href.split(';jsessionid')[0];
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box');

// 重写原型(拓展方法)
overwritePrototype();

Vue.prototype.$jsonp = jsonp;
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
