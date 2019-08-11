<template>
	<div id="faceVerify" class="box-container" style="height: 100%;width: 100%">
		<div class="box">
			<van-loading type="spinner" color="#1989fa" v-show="loading"/>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
		name: 'faceVerify',
		props: {},
		data: function () {
			return {
				loading: true, // true代表开启等待
				personName: null, // 用户姓名（最少两位字符）
				personId: null, // 用户身份证
				message: null, // 页面跳转返回信息
				verifyCode: null, // 人脸识别返回码
				checkCode: null, // 设备检查返回码
				callbackUrl: null, // 回调地址
				verify_result: null // 人脸核身认证返回凭证
			}
		},
		computed: {},
		watch: {},
		methods: {
			startVerify () {
				debugger
				console.log("准备开始人脸核身过程")
				let checkParams = this.checkParams();
				if (checkParams) {
					console.log('checkParams正确，准备开始微信认证,paramsReuslt:' + checkParams);
					this.loading = false;
					console.log("开始微信认证")
					this.checkVerifySupport();
				} else {
					console.log('checkParams不正确：' + checkParams);
					console.log(this.personName);
					console.log(this.personId);
					console.log(this.callbackUrl);
					Toast('参数不正确');
				}
			},
			// 人脸识别认证结束
			done (res) {
				this.returnBack(res);
			},
			// 携带参数返回来源网址
			returnBack () {
				let message = this.message == null ? '' : this.message;
				// 检查设备是否验证 状态码
				let verifyCode = this.verifyCode == null ? '' : this.verifyCode;
				// 检查设备是否支持 状态码
				let checkCode = this.checkCode == null ? '' : this.checkCode;
				window.location = this.callbackUrl + `?verifyCode=${verifyCode}&checkCode=${checkCode}&message=${message}`;
			},
			// 获取url地址参数
			getUrlPara (name) {
				var reg = new RegExp("(^|&|##)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return (r[2]);
				return null;
			},
			// 检查当前页面跳转的参数
			checkParams () {
				console.log("开始校验参数");
				var hrefString = decodeURIComponent(window.location.href)
				console.log("window.location.href:", hrefString);
				// params=吴云龙##411122199202088250##www.baidu.com
				var params = hrefString.split("?")[1].split("params=")[1];

				console.log("params", params);
				var paramsArray = params.split("##");
				console.log(paramsArray);
				let personName = paramsArray[0];
				let personId = paramsArray[1];
				// 最多兼容URL地址中含有一个 “##” 特殊字符
				let callbackUrl = paramsArray.length > 3 ? paramsArray.concat("##", paramsArray[3]) : paramsArray[2];
				console.log("准备开始校验");
				console.log("personName", personName);
				console.log("personId", personId);
				console.log("callbackUrl", callbackUrl);
				if (callbackUrl == null || callbackUrl == '') {
					this.verifyCode = '';
					this.message = '回调函数不存在或者回调函数为空';
					return false;
				}
				if (personName == null || personName.length < 2) {
					this.verifyCode = '';
					this.message = '姓名不存在或者小于两位';
					return false;
				}
				const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!reg.test(personId)) { // 不通过测试
					this.verifyCode = '';
					this.message = '请输入正确的身份证号码';
					return false;
				}
				this.personName = personName;
				this.callbackUrl = callbackUrl;
				this.personId = personId;
				return true;
			},
			checkVerifySupport () {
				let _this = this;
				let info = {
					'request_verify_pre_info': '{"name":"' + _this.personName + '","id_card_number":"' + _this.personId + '"}',
					'check_alive_type': '1'
				};
				// 人脸核身回调
				let faceVerifyCallback = function (res) {
					console.log('faceVerify result' + res.err_code)
					_this.verifyCode = res.err_code;
					if (res.hasOwnProperty('err_code')) {
						_this.done(res);
					} else {
						wx.invoke('requestWxFacePictureVerify', info, function (res) {
							_this.done(res);
						});
					}
				};
				// step1 检测设备是否支持人脸检测
				wx.invoke('checkIsSupportFaceDetect', {}, function (res) {
					console.log("微信设备检查结束,结果为：" + JSON.stringify(res));
					_this.checkCode = res.err_code;
					if (res.err_code == 0) { // 0代表检测成功
						console.log("检查结束，检查成功")
						wx.invoke('requestWxFacePictureVerifyUnionVideo', info, faceVerifyCallback);
					} else {
						console.log("检查结束，检查失败");
						console.log("res.err_code:" + res.err_code);
						_this.message = '当前设备不支持微信人脸核身！';
						_this.returnBack();
					}
				});
			}
		},
		mounted: function () {
			console.log("start mounted");
			let _this = this;
			let configPath = '/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0];
			console.log("configPath" + configPath);
			// _this.startVerify();
			this.$fetch(configPath)
				.then(res => {
				wx.config(res); // 注入权限验证配置
				wx.ready(function () {
					_this.startVerify();
				})
				// this.callbackUrl = this.getUrlPara('callbackUrl');
				// let checkParams = this.checkParams();
				// if (checkParams) {
				// 	this.loading = false;
				// 	this.checkVerifySupport()
				// }
			})
				.catch(error => {
					console.error(error);
					console.log(error);
				})
		},
	}
</script>

<style lang="less" scoped>

	.box-container{
		position: relative;
	}
	.box {
		height: 30px;
		width:  30px;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
</style>
