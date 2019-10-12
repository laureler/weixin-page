// import your vue components
// import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

/**
 * mainWeb模块路由
 * @type { *[] }
 */
export const zhongshanRouterMap = {
	path: '/onlineApplication',
	name: 'onlineApplication',
	component: resolve => require(['@/components/onlineApplication/onlineApplication'], resolve),
	redirect: '/onlineApplication/index',
	children: [
		{
			path: "/onlineApplication/index",
			name: "onlineIndex",
			component: resolve => require(['@/components/onlineApplication/index'], resolve),
		},
		// 不动产权利证书遗失登记
		{
			path: "/onlineApplication/BDCQSZSYSDJ/bookIn",
			name: "BDCQSZSYSDJBookIn",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSYSDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/BDCQSZSYSDJ/info",
			name: "BDCQSZSYSDJInfo",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSYSDJ/info'], resolve)
		}, {
			path: "/onlineApplication/BDCQSZSYSDJ/attachment",
			name: "BDCQSZSYSDJattachment",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSYSDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/BDCQSZSYSDJ/ems",
			name: "BDCQSZSYSDJEMS",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSYSDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/BDCQSZSYSDJ/success",
			name: "BDCQSZSYSDJSuccess",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSYSDJ/success'], resolve),
		},
		// 不动产权利证书注销登记
		{
			path: "/onlineApplication/BDCQSZSZXDJ/bookIn",
			name: "BDCQSZSZXDJBookIn",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSZXDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/BDCQSZSZXDJ/info",
			name: "BDCQSZSZXDJInfo",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSZXDJ/info'], resolve)
		}, {
			path: "/onlineApplication/BDCQSZSZXDJ/attachment",
			name: "BDCQSZSZXDJattachment",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSZXDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/BDCQSZSZXDJ/ems",
			name: "BDCQSZSZXDJEMS",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSZXDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/BDCQSZSZXDJ/success",
			name: "BDCQSZSZXDJSuccess",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSZXDJ/success'], resolve),
		},
		// 存量房转移登记
		{
			path: "/onlineApplication/CLFZYDJ/bookIn",
			name: "CLFZYDJBookIn",
			component: resolve => require(['@/components/onlineApplication/CLFZYDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/CLFZYDJ/info",
			name: "CLFZYDJInfo",
			component: resolve => require(['@/components/onlineApplication/CLFZYDJ/info'], resolve)
		}, {
			path: "/onlineApplication/CLFZYDJ/attachment",
			name: "CLFZYDJattachment",
			component: resolve => require(['@/components/onlineApplication/CLFZYDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/CLFZYDJ/ems",
			name: "CLFZYDJEMS",
			component: resolve => require(['@/components/onlineApplication/CLFZYDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/CLFZYDJ/verification",
			name: "CLFZYDJVerification",
			component: resolve => require(['@/components/onlineApplication/CLFZYDJ/verification'], resolve),
		}, {
			path: "/onlineApplication/CLFZYDJ/success",
			name: "CLFZYDJSuccess",
			component: resolve => require(['@/components/onlineApplication/CLFZYDJ/success'], resolve),
		},
		// 房地产权转移登记
		{
			path: "/onlineApplication/FDCQZYDJ/bookIn",
			name: "FDCQZYDJBookIn",
			component: resolve => require(['@/components/onlineApplication/FDCQZYDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/FDCQZYDJ/info",
			name: "FDCQZYDJInfo",
			component: resolve => require(['@/components/onlineApplication/FDCQZYDJ/info'], resolve)
		}, {
			path: "/onlineApplication/FDCQZYDJ/attachment",
			name: "FDCQZYDJattachment",
			component: resolve => require(['@/components/onlineApplication/FDCQZYDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/FDCQZYDJ/ems",
			name: "FDCQZYDJEMS",
			component: resolve => require(['@/components/onlineApplication/FDCQZYDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/FDCQZYDJ/success",
			name: "FDCQZYDJSuccess",
			component: resolve => require(['@/components/onlineApplication/FDCQZYDJ/success'], resolve),
		},
		// 建设用地使用权变更登记
		{
			path: "/onlineApplication/JSYDSYQBGDJ/bookIn",
			name: "JSYDSYQBGDJBookIn",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQBGDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/JSYDSYQBGDJ/info",
			name: "JSYDSYQBGDJInfo",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQBGDJ/info'], resolve)
		}, {
			path: "/onlineApplication/JSYDSYQBGDJ/attachment",
			name: "JSYDSYQBGDJattachment",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQBGDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/JSYDSYQBGDJ/ems",
			name: "JSYDSYQBGDJEMS",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQBGDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/JSYDSYQBGDJ/success",
			name: "JSYDSYQBGDJSuccess",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQBGDJ/success'], resolve),
		},
		// 房地产权（独幢、层、套、间房屋）变更登记
		{
			path: "/onlineApplication/FDCQBGDJ/bookIn",
			name: "FDCQBGDJBookIn",
			component: resolve => require(['@/components/onlineApplication/FDCQBGDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/FDCQBGDJ/info",
			name: "FDCQBGDJInfo",
			component: resolve => require(['@/components/onlineApplication/FDCQBGDJ/info'], resolve)
		}, {
			path: "/onlineApplication/FDCQBGDJ/attachment",
			name: "FDCQBGDJattachment",
			component: resolve => require(['@/components/onlineApplication/FDCQBGDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/FDCQBGDJ/ems",
			name: "FDCQBGDJEMS",
			component: resolve => require(['@/components/onlineApplication/FDCQBGDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/FDCQBGDJ/success",
			name: "FDCQBGDJSuccess",
			component: resolve => require(['@/components/onlineApplication/FDCQBGDJ/success'], resolve),
		},
		// 异议登记
		{
			path: "/onlineApplication/YYDJ/bookIn",
			name: "YYDJBookIn",
			component: resolve => require(['@/components/onlineApplication/YYDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/YYDJ/info",
			name: "YYDJInfo",
			component: resolve => require(['@/components/onlineApplication/YYDJ/info'], resolve)
		}, {
			path: "/onlineApplication/YYDJ/attachment",
			name: "YYDJattachment",
			component: resolve => require(['@/components/onlineApplication/YYDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/YYDJ/ems",
			name: "YYDJEMS",
			component: resolve => require(['@/components/onlineApplication/YYDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/YYDJ/success",
			name: "YYDJSuccess",
			component: resolve => require(['@/components/onlineApplication/YYDJ/success'], resolve),
		},
		// 异议注销登记
		{
			path: "/onlineApplication/YYZXDJ/bookIn",
			name: "YYZXDJBookIn",
			component: resolve => require(['@/components/onlineApplication/YYZXDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/YYZXDJ/info",
			name: "YYZXDJInfo",
			component: resolve => require(['@/components/onlineApplication/YYZXDJ/info'], resolve)
		}, {
			path: "/onlineApplication/YYZXDJ/attachment",
			name: "YYZXDJattachment",
			component: resolve => require(['@/components/onlineApplication/YYZXDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/YYZXDJ/ems",
			name: "YYZXDJEMS",
			component: resolve => require(['@/components/onlineApplication/YYZXDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/YYZXDJ/success",
			name: "YYZXDJSuccess",
			component: resolve => require(['@/components/onlineApplication/YYZXDJ/success'], resolve),
		},
		// 不动产权利证书更正登记
		{
			path: "/onlineApplication/BDCQSZSGZDJ/bookIn",
			name: "BDCQSZSGZDJBookIn",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSGZDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/BDCQSZSGZDJ/info",
			name: "BDCQSZSGZDJInfo",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSGZDJ/info'], resolve)
		}, {
			path: "/onlineApplication/BDCQSZSGZDJ/attachment",
			name: "BDCQSZSGZDJattachment",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSGZDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/BDCQSZSGZDJ/ems",
			name: "BDCQSZSGZDJEMS",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSGZDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/BDCQSZSGZDJ/success",
			name: "BDCQSZSGZDJSuccess",
			component: resolve => require(['@/components/onlineApplication/BDCQSZSGZDJ/success'], resolve),
		},
		// 建设用地使用权转移登记
		{
			path: "/onlineApplication/JSYDSYQZYDJ/bookIn",
			name: "JSYDSYQZYDJBookIn",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQZYDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/JSYDSYQZYDJ/info",
			name: "JSYDSYQZYDJInfo",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQZYDJ/info'], resolve)
		}, {
			path: "/onlineApplication/JSYDSYQZYDJ/attachment",
			name: "JSYDSYQZYDJattachment",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQZYDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/JSYDSYQZYDJ/ems",
			name: "JSYDSYQZYDJEMS",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQZYDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/JSYDSYQZYDJ/success",
			name: "JSYDSYQZYDJSuccess",
			component: resolve => require(['@/components/onlineApplication/JSYDSYQZYDJ/success'], resolve),
		},
		// 房地产权（独幢、层、套、间房屋）首次登记
		{
			path: "/onlineApplication/FDCQSCDJ/bookIn",
			name: "FDCQSCDJBookIn",
			component: resolve => require(['@/components/onlineApplication/FDCQSCDJ/bookIn'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/FDCQSCDJ/info",
			name: "FDCQSCDJInfo",
			component: resolve => require(['@/components/onlineApplication/FDCQSCDJ/info'], resolve)
		}, {
			path: "/onlineApplication/FDCQSCDJ/attachment",
			name: "FDCQSCDJattachment",
			component: resolve => require(['@/components/onlineApplication/FDCQSCDJ/attachment'], resolve),
		}, {
			path: "/onlineApplication/FDCQSCDJ/ems",
			name: "FDCQSCDJEMS",
			component: resolve => require(['@/components/onlineApplication/FDCQSCDJ/ems'], resolve),
		}, {
			path: "/onlineApplication/FDCQSCDJ/success",
			name: "FDCQSCDJSuccess",
			component: resolve => require(['@/components/onlineApplication/FDCQSCDJ/success'], resolve),
		},
		// 权籍调查申请
		{
			path: "/onlineApplication/QJDCSQ/info",
			name: "QJDCSQInfo",
			component: resolve => require(['@/components/onlineApplication/QJDCSQ/info'], resolve),
			meta: {
				isNeedLogin: true
			}
		}, {
			path: "/onlineApplication/QJDCSQ/success",
			name: "QJDCSQSuccess",
			component: resolve => require(['@/components/onlineApplication/QJDCSQ/success'], resolve),
		},
		// 其他
		{
			path: "/onlineApplication/test",
			name: "test",
			component: resolve => require(['@/components/onlineApplication/test'], resolve),
		}
	]
}
