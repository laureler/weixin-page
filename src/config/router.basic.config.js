import applications from "../router/applications";

/**
 * 基础路由
 * @type { *[] }
 */
export const BasicRouterMap = [
	// 证书查验界面
	{
		path: '/certificateCheck',
		name: '/certificateCheck',
		component: resolve => require(['@/page/certificateCheck.vue'], resolve)
	},
	// 人脸识别验证界面
	{
		path: '/faceVerify',
		name: '/faceVerify',
		component: resolve => require(['@/page/faceVerify.vue'], resolve)
	},
	{
		path: '/',
		name: '/',
		component: resolve => require(['@/views/devlop/RouterView.vue'], resolve)
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
		meta: { desc: "业务确认页面" },
		component: resolve => require(['@/components/app/serviceConfirm.vue'], resolve)
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
		meta: { title: "进度查询", desc: "进度查询页面" },
		component: resolve => require(['@/components/app/ScheduleQuery'], resolve),
	},
	// 在线查档
	{
		path: '/oqarc',
		name: 'OnlineQueryArchives',
		component: resolve => require(['@/components/app/OnlineQueryArchives'], resolve)
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
		meta: { desc: "排队进度查询" },
		component: resolve => require(['@/components/app/QueuingProgress.vue'], resolve)
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
		name: 'newgui',
		path: '/newgui',
		component: resolve => require(['@/components/app/NewGuide'], resolve)
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
	// 登陆验证
	{
		path: '/checkLogin',
		name: 'CheckUser',
		component: resolve => require(['@/components/app/CheckLogin'], resolve),
	},
	// 准备开启人脸核身验证
	{
		path: '/preApprovenew',
		name: 'preApprove',
		component: resolve => require(['@/components/approve/preApprove'], resolve),
	},
	/*
	 * 人脸核身
	 * 人脸核身页面1：/approve/approveStep1
	 * 人脸核身页面2：/approve/approveStep2
	 * */
	{
		path: '/approvenew',
		component: resolve => require(['@/components/approve/approve'], resolve),
		children: [{
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
	// 在线申办
	applications,
	{
		path: '/myApplications',
		name: 'myApplications',
		component: resolve => require(['@/components/onlineApplication/myApplications'], resolve),
		meta: {
			isNeedLogin: true
		}
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
		path: '/houseCertifyDownload',
		name: 'houseCertifyDownload',
		component: resolve => require(['@/components/personalCenter/houseCertifyDownload'], resolve),
	},
]
