<template>
	<div id="faceVerify" class="box-container" style="height: 100%;width: 100%">
		<div class="box">
			<van-loading type="spinner" color="#1989fa" v-show="loading"/>
		</div>
	</div>
</template>

<script>
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
				verify_result: null // 人脸核身认证返回凭证
			}
		},
		computed: {},
		watch: {},
		methods: {
			// 携带参数返回来源网址
			returnBack () {
				const urlParam = {
					// 返回的消息
					message: this.message,
					// 检查设备是否验证 状态码
					verifyCode: this.verifyCode,
					// 检查设备是否支持 状态码
					checkCode: this.checkCode
				};
				window.location = this.callbackUrl + urlParam.toString();
			},
			// 获取url地址参数
			getUrlPara (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return (r[2]);
				return null;
			},
			// 检查当前页面跳转的参数
			checkParams () {
				let personId = this.getUrlPara('personId');
				let personName = this.getUrlPara('personName');
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
				this.personId = personId;
				return true;
			},
			checkVerifySupport () {
				let _this = this;
				// 人脸核身回调
				let faceVerifyCallback = function (res) {
					this.verifyCode = res.err_code;
					if (res.err_code == 0) { // 0代表人脸识别成功
						this.message = "人脸识别认证成功！";
						this.verify_result = res.verify_result;
						this.returnBack()
					} else {
						this.message = this.err_msg;
						this.returnBack();
					}
				};
				// 人脸核身
				let faceVericy = function () {
					let info = {
						request_verify_pre_info: '{"name":"' + _this.personName + '","id_card_number":"' + _this.personId + '"}',
						check_alive_type: '2'
					};
					wx.invoke('requestWxFacePictureVerifyUnionVideo', info.toString(), faceVerifyCallback);
				};
				// 设备检测后回调
				let checkSupportFaceDetectCallback = function (res) {
					if (res.err_code == 0) { // 0代表检测成功
						faceVericy()
					} else {
						this.checkCode = res.err_code;
						this.message = '当前设备不支持微信人脸核身！';
						this.returnBack();
					}
				};
				// step1 检测设备是否支持人脸检测
				wx.invoke('checkIsSupportFaceDetect', { "check_alive_type": "2" }, checkSupportFaceDetectCallback);
			}
		},
		mounted: function () {
			let configPath = '/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0];
			this.$fetch(configPath)
				.then(res => {
				wx.config(res); // 注入权限验证配置
				this.callbackUrl = this.getUrlPara('callbackUrl');
				let checkParams = this.checkParams();
				if (checkParams) {
					this.loading = false;
					this.checkVerifySupport()
				}
			})
				.catch(error => {
					console.error(error);
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
