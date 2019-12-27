import Mock from 'mockjs2'
import sha1 from 'sha1'

// 微信配置相关
/**
 * @param
 * debug: boolean, 是否开启调试模式，调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
 * jsApiList: string[], // 必填，需要使用的JS接口列表 【https://mp.weixin.qq.com/wiki?action=doc&id=mp1421141115&t=0.635647727302765#63】
 * signature: string,  // 必填，签名
 * appId: string,      // 必填，公众号的唯一标识
 * nonceStr: string,    // 必填，生成签名的随机串
 * beta: boolean,
 * timestamp: string    // 必填，生成签名的时间戳
 */
let wechatConfig = options => {
	// noncestr=Wm3WZYTPz0wzccnW
	// jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg
	// timestamp=1414587457
	// url=http://mp.weixin.qq.com?params=value

	console.log("代理ajax地址：/pubWeb/public/getWeChatConfig");
	console.log(options);
	let configObj = {
		"debug": false,
		"jsApiList": ["scanQRCode", "requestWxFacePictureVerifyUnionVideo", "requestWxFacePictureVerify", "checkIsSupportFaceDetect"],
		"signature": "f4ea9647ba6e6fc897b5d037df516c590108d41a",
		"appId": "wx11b4173555837201",
		"nonceStr": "0bZsC89AwFKfQcCRIC0TNTBF",
		"beta": true,
		"timestamp": parseInt(new Date().getTime() / 1000)
	};
	let encodString = `noncestr=Wm3WZYTPz0wzccnW
						jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg
						timestamp=1414587457
						url=http://mp.weixin.qq.com?params=value`
	configObj.signature = sha1(encodString)
	return configObj
}
let wechatRemoteCheck = () => {
	let wechatRemoteCheck = {
			status: 1
	}
	return wechatRemoteCheck
}
let jidSmsCodeInfo = () => {
	return {
		code: "true"
	};
}
Mock.mock(/\/pubWeb\/public\/getWeChatConfig2/, 'get', wechatConfig)
Mock.mock(/\/pubWeb\/public\/system\/WeChatRemoteCheck/, 'post', wechatRemoteCheck)
// mock "/pubWeb/system/public/jidSmsCode"

// /pubWeb/system/public/jidSmsCode?jid=9&number=13121679989
Mock.mock(/\/pubWeb\/system\/public\/jidSmsCode/, 'get', jidSmsCodeInfo)
