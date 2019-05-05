import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
	base: 'pubWeb/public/weChatPublic',
	mode: 'history',
	routes: [
		{
			path: '/',
			name: '/',
			component: resolve => require(['@/components/app/Home'], resolve)
		},
		{
			path: '',
			name: '',
			component: resolve => require(['@/components/app/Home'], resolve)
		},
		{
			path: '/index.html',
			name: 'index',
			component: resolve => require(['@/components/app/Home'], resolve)
		},
		{
			path: '/home',
			name: 'Home',
			component: resolve => require(['@/components/app/Home'], resolve)
		},
		// 业务确认页面
		{
			path: '/serviceConfirm',
			name: 'serviceConfirm',
			component: resolve => require(['@/components/app/serviceConfirm'], resolve)
		},
		// 个人预约界面
		{
			path: '/appl',
			name: 'Application',
			component: resolve => require(['@/components/app/Application'], resolve)
		},
		{
			path: '/appr',
			name: 'ApplicationResult',
			component: resolve => require(['@/components/app/ApplicationResult'], resolve)
		},
		{
			path: '/schq',
			name: 'ScheduleQuery',
			component: resolve => require(['@/components/app/ScheduleQuery'], resolve)
		},
		{
			path: '/resq',
			name: 'ReservationQuery',
			component: resolve => require(['@/components/app/ReservationQuery'], resolve)
		},
		{
			path: '/quer',
			name: 'QueryResult',
			component: resolve => require(['@/components/app/QueryResult'], resolve)
		},
		{
			path: '/canr',
			name: 'CancelReservation',
			component: resolve => require(['@/components/app/CancelReservation'], resolve)
		},
		{
			path: '/tnum',
			name: 'TakeNumber',
			component: resolve => require(['@/components/app/TakeNumber'], resolve)
		},
		{
			path: '/wtnum',
			name: 'WechatTakeNumber',
			component: resolve => require(['@/components/app/WechatTakeNumber'], resolve)
		},
		{
			path: '/qupr',
			name: 'QueuingProgress',
			component: resolve => require(['@/components/app/QueuingProgress'], resolve)
		},
		{
			path: '/wecq',
			name: 'WechatQuerry',
			component: resolve => require(['@/components/app/WechatQuerry'], resolve)
		},
		{
			name: 'gui',
			path: '/gui',
			component: resolve => require(['@/components/app/Guide'], resolve)
		},
		{
			path: '/guid',
			name: 'guid',
			component: resolve => require(['@/components/app/GuideDetail'], resolve)
		},
		{
			path: '/poli',
			name: 'Policy',
			component: resolve => require(['@/components/app/Policy'], resolve)
		},
		{
			path: '/appm',
			name: 'ApplicationMessage',
			component: resolve => require(['@/components/app/ApplicationMessage'], resolve)
		},
		{
			path: '/spea',
			name: 'SpecialApplication',
			component: resolve => require(['@/components/app/SpecialApplication'], resolve)
		},
		{
			path: '/samsg',
			name: 'SpeApplMsg',
			component: resolve => require(['@/components/app/SpeApplMsg'], resolve)
		},
		{
			path: '/onlineReservation',
			name: 'OnlineReservation',
			component: resolve => require(['@/components/app/OnlineReservation'], resolve)
		},
		// 准备开启人脸核身验证
		{
			path: '/preApprovenew',
			name: 'preApprove',
			component: resolve => require(['@/components/approve/preApprove'], resolve),
		},
		// 人脸识别接口1 /approve/approveStep1
		// 人脸识别接口2 /approve/approveStep2
		{
			path: '/approvenew',
			component: resolve => require(['@/components/approve/approve'], resolve),
			children: [
				{
					path: '',
					name: 'approveStep1',
					component: resolve => require(['@/components/approve/approveStep1'], resolve),
				},
				{
					path: '/approveStep2',
					name: 'approveStep2',
					component: resolve => require(['@/components/approve/approveStep2'], resolve)
				}
			]
		},
		// 短信认证页面
		{
			path: '/messageApprove',
			component: resolve => require(['@/components/messageApprove/messageApprove'], resolve),
			children: [
				// 默认路径
				{
					path: '',
					name: 'messageStep1',
					component: resolve => require(['@/components/messageApprove/messageStep1'], resolve)
				},
				// 默认路径第二步
				{
					path: '/messageStep2',
					name: 'messageStep2',
					component: resolve => require(['@/components/messageApprove/messageStep2'], resolve)
				},
				// 默认路径第三步
				{
					path: '/messageStep3',
					name: 'messageStep3',
					component: resolve => require(['@/components/messageApprove/messageStep3'], resolve)
				}
			]
		},
		// 个人信息查询
		{
			path: '/personInfo',
			name: 'personInfo',
			component: resolve => require(['@/components/approve/personInfo'], resolve)
		},
		// 导航功能主页
		{
			path: '/routerHomePage',
			name: 'routerHomePage',
			component: resolve => require(['@/components/routerPage/routerHomePage'], resolve)
		},
		{
			path: '/routerListPage',
			name: 'routerListPage',
			component: resolve => require(['@/components/routerPage/routerListPage'], resolve)
		},
		/**
		 * 个人中心
		 */
		{
			path: '/personalCenter',
			name: 'personalCenter',
			component: resolve => require(['@/components/personalCenter/personalCenter'], resolve),
			meta: {
				isPersonalHomePage: true
			}
		},
		{
			path: '/personalBusiness',
			name: 'personalBusiness',
			component: resolve => require(['@/components/personalCenter/personalBusiness'], resolve),
			meta: {
				isPersonalHomePage: true
			}
		},
		{
			path: '/personalSetting',
			name: 'personalSetting',
			component: resolve => require(['@/components/personalCenter/personalSetting'], resolve),
			meta: {
				isPersonalHomePage: true
			}
		},
		{
			path: '/associativeAccount',
			name: 'associativeAccount',
			component: resolve => require(['@/components/personalCenter/associativeAccount'], resolve),
		},
		{
			path: '/signInAccount',
			name: 'signInAccount',
			component: resolve => require(['@/components/personalCenter/signInAccount'], resolve),
		},
		{
			path: '/FirstHouseQuery',
			name: 'FirstHouseQuery',
			component: resolve => require(['@/components/personalCenter/houseCertifyDownload'], resolve),
		},
	]
});

router.beforeEach((to, from, next) => {
	// 如果是要进入个人中心首页或相关页面，需要验证配置和人脸识别
	if (to.meta.isPersonalHomePage) {
		if ((/^true$/i).test(store.getters.getVerifyState)) {
			// 完成人脸识别表示已完成个人设置
			next();
		} else {
			// 开始个人设置
			next({ path: '/preApprovenew', query: { isPersonalHomeCheck: true } });
		}
	}
	next();
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
