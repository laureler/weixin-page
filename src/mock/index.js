import Mock from 'mockjs2'

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV);
console.log('2019年8月2日12:06:28');
console.log(process.env.VUE_APP_PREVIEW);
console.log(process.env.VUE_APP_PREVIEW);
console.log(process.env.VUE_APP_PREVIEW);
console.log(process.env.VUE_APP_PREVIEW);
// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.VUE_APP_PREVIEW === 'true') {
	// 使用同步加载依赖
	// 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
	console.log('mock mounting');
	// require('./services/user.js');
	require('./services/doIntranetRequest.js');
	require('./services/pubWeb-public.js');
	require("./services/formengineWebService.js");
	Mock.setup({
		timeout: 800 // setter delay time
	});
	console.log('mock mounted')
}
