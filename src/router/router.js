/*
 * @Author: charls.fairy
 * @格言: 如果做得不是最好的宁愿从未开始。
 * @Website: https://www.fairy520.top/
 * @Github: https://github.com/CharlsPrince
 * @Date: 2019-07-16 11:42:54
 * @LastEditors: charls.fairy
 * @LastEditTime: 2019-10-09 09:13:45
 * @Description: 头部注释
 */
import Vue from 'vue';
import Router from 'vue-router';

import { gdbdcRouterMap } from "../config/router.gdbdc.config";
import { BasicRouterMap } from "../config/router.basic.config";
import { zhongshanRouterMap } from "../config/router.zhongshan.config";
import store from "../store";
import { fetch } from "../utils/http";

Vue.use(Router);

const router = new Router({
	base: 'pubWeb/public/weChatPublic',
	// base: 'app',
	mode: 'history',
	routes: [
		...BasicRouterMap,
		...gdbdcRouterMap,
		zhongshanRouterMap
	]
});

router.beforeEach((to, from, next) => {
	console.log("to:", to.path);
	console.log("from:", from.path);

	// 如果是要进入个人中心首页或相关页面，需要验证配置和人脸识别
	if (!to.meta.isNeedLogin && to.meta.isPersonalHomePage) {
		if ((/^true$/i).test(store.getters.getVerifyState)) {
			// 完成人脸识别表示已完成个人设置
			next();
		} else {
			// 开始个人设置
			next({
				path: '/preApprovenew',
				query: {
					isPersonalHomeCheck: true
				}
			});
		}
	}

	if (from.path !== 'checkLogin' && to.meta.isNeedLogin) {
		fetch('/mainWeb/initLogin').then(response => {
			if (/html/i.test(response)) {
				// 返回若是html页面，则表示未cas登陆
				next({
					path: '/checkLogin',
					query: {
						isTo: to.path
					}
				});
			} else {
				sessionStorage.setItem('wxUserInfo', JSON.stringify(response));
				// cas登陆成功
				if (to.meta.isPersonalHomePage) {
					if ((/^true$/i).test(store.getters.getVerifyState)) {
						// 完成人脸识别表示已完成个人设置
						next();
					} else {
						// 开始个人设置
						next({
							path: '/preApprovenew',
							query: {
								isPersonalHomeCheck: true
							}
						});
					}
				} else {
					next();
				}
			}
		}).catch(error => {
			console.log(error);
			next({
				path: '/checkLogin',
				query: {
					isTo: to.path
				}
			});
		});
	} else {
		next();
	}
});

// 增加路由导航
router.afterEach(route => {
	Vue.nextTick(() => {
		if (typeof document === 'object') {
			document.documentElement.scrollTop = 10;
			document.body.scrollTop = 10;
			setTimeout(() => {
				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
			}, 10);
		}
	});
});

export default router;
