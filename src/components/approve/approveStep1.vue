<template>
	<!-- 身份验证 -->
	<div class="step1_1">
		<page-head title="人脸核身"></page-head>
		<div class="space_between"></div>
		<img src="../../../public/images/approve/face_checkout.png" class="face_checkout"/>
		<van-cell-group>
			<van-field
				v-model="username"
				@focus="hide(false)"
				@blur="hide(true)"
				id="username"
				label="姓名："
				input-align="right"
				center
			></van-field>

			<van-field
				@focus="hide(false)"
				@blur="hide(true)"
				id="ID_number"
				v-model="cardCode"
				label="身份证号："
				input-align="right"
				center
				oninput="if(value.length>18)value=value.slice(0,18)"

				onafterpaste="this.value=this.value.replace(/\D/g,'')"
			></van-field>
		</van-cell-group>
		<p v-model="errorMessage" class="errorC">{{errorMessage}}</p>

		<div style="height: 40px"></div>
		<van-button size="large" class="blueButton" @click="nextPage()">开启人脸识别验证</van-button>

		<tencentBottom :type="showType"></tencentBottom>

	</div>
</template>

<script>
	import { CellGroup, Field, Uploader } from 'vant';

	import Vue from 'vue';
	import Head from '../app/head';
	import Cookies from 'js-cookie';
	import tencentBottom from '../app/TencentBottom.vue';

	Vue.use(Uploader).use(Field).use(CellGroup);
	export default {
		components: {
			'page-head': Head,
			tencentBottom
		},
		data () {
			return {
				//显示用户信息
				username: null,
				cardCode: null,
				//用户信息存储
				data_name: null,
				data_id: null,
				errorMessage: '',
				isShow: false,
				showType: true,
			};
		},
		watch: {
			//监听用户是否修改的信息,保存修改的数据值
			username: function (newValue, oldValue) {
				//如果用户一次性输入，oldValue为null，则判断如果新值没有带*号就作为正确值使用
				if (newValue != null && !newValue.match(RegExp(/\*/))) {
					this.data_name = newValue;
				}
			},
			cardCode: function (newValue, oldValue) {
				if (newValue != null && !newValue.match(RegExp(/\*/))) {
					this.data_id = newValue;
				}
			}
		},
		methods: {
			//通过聚焦判断控制tencentBottom的显示隐藏
			hide (param) {
				this.showType = param;
			},
			//将显示信息加*
			checkInfo (_name, _id) {
				//如果用户名长度大于二，则中间名字使用*号表示
				if (_name.length > 2) {
					_name = _name.substr(0, 1) + '*' + _name.substr(_name.length - 1, 1);
				}
				_id = _id.substr(0, 1) + '********' + _id.substr(_id.length - 1, 1);
				this.username = _name;
				this.cardCode = _id;
			},
			successToDo (_this, verify_result) {
				let config = { headers: { 'Content-Type': 'multipart/form-data' } };
				var formData = new FormData();
				formData.append('token', sessionStorage.getItem('token'));  //扫码的值
				formData.append('openId', Cookies.get('openid'));  //openid
				formData.append('fullName', _this.data_name);  // 验证填入的姓名
				formData.append('idNumber', _this.data_id);  //验证填入的身份证号
				formData.append('verifyResult', verify_result);
				//
				_this.$post('/pubWeb/public/faceRecognition/setAuthenticationResult', formData, config).then(data => {
					//如果存在callbackUrl，则按callbackUrl重定向处理
					if (_this.$store.state.callbackUrl) {
						//如果callbackUrl是WeChatRemoteCheck接口则请求PDF数据给用户
						if (_this.$store.state.callbackUrl == '/pubWeb/public/system/WeChatRemoteCheck') {
							let strJson = JSON.stringify({
								'qlr': _this.data_name,
								'zjhm': _this.data_id,
								'returnbyte': true
							});
							var stringUrl = _this.$store.state.callbackUrl;
							paramData = {
								'strJson': strJson
							};
							let config = { headers: { 'Content-Type': 'multipart/form-data' } };
							_this.$post(stringUrl, paramData, config).then(rs => {
								switch (rs.status) {
									case '-1' || undefined:
										alert('服务器出错');
										break;
									case '0':
										alert('没有权限下载');
										break;
									case '1':
										window.location.href = stringUrl + +'?strJson=' + encodeURIComponent(strJson);
										break;
								}
							}).catch(e => {
								alert('服务器出错');
							});
						} else if (_this.$store.state.callbackUrl == '/pubWeb/public/weChatPublic/personInfo') {
							_this.$router.push({
								path: '/approveStep2',
								query: { isSuccess: -10, cardCode: _this.data_id, username: _this.data_name }
							});
						} else {
							console.log(_this.$store.state.callbackUrl);
						}
					} else {
						//默认验证成功页面
						_this.$router.push({
							path: '/approveStep2',
							query: { isSuccess: 1, cardCode: _this.data_id, username: _this.data_name }
						});
					}
				}).catch(error => {
					console.log(error);
					_this.$router.push({
						path: '/approveStep2', query: { isSuccess: 0 }
					});
				});
			},
			WeChatFaceCheck () {
				var _this = this;
				wx.invoke('checkIsSupportFaceDetect', {}, function (res) {
					console.log(res);
					if (res.err_code == 0) { // 检测成功
						var info = { 'request_verify_pre_info': '{"name":"' + _this.data_name + '","id_card_number":"' + _this.data_id + '"}' };
						wx.invoke('requestWxFacePictureVerifyUnionVideo', info, function (res) {
							console.log(res);
							if (res.hasOwnProperty('err_code')) {
								if (res.err_code == 0) {
									_this.successToDo(_this, res.verify_result);
								}
								else if (res.err_code == 90100) {
									return;
								} else {
									_this.$router.push({
										path: '/approveStep2', query: { isSuccess: 0 }
									});
								}
							} else {
								wx.invoke('requestWxFacePictureVerify', info, function (res) {
									console.log(res);
									if (res.err_code == 0) {
										_this.successToDo(_this, res.verify_result);
									}
									else if (res.err_code == 90100) {
										return;
									}
									else {
										_this.$router.push({
											path: '/approveStep2', query: { isSuccess: 0 }
										});
									}
								});
							}
						});
					} else if (res.err_code == 10001) {
						alert('不支持人脸采集：设备没有前置摄像头');
					} else if (res.err_code == 10002) {
						alert('不支持人脸采集：没有下载到必要模型');
					} else if (res.err_code == 10003) {
						alert('不支持人脸采集：后台黑名单控制');
					} else {
						alert(res.err_msg);
					}
				});
			},
			nextPage () {
				if (this.checkID_number()) {
					this.WeChatFaceCheck();
				}
			},
			checkID_number () {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				//如果data_id为空，则用户信息为手动输入，将用户输入的值用于验证
				if (this.data_id == null) {
					this.data_id = this.cardCode;
				}
				if (this.data_name == null || this.data_name.length < 2) {
					this.errorMessage = '请输入正确的姓名';
					return false;
				}
				if (!reg.test(this.data_id)) {
					this.errorMessage = '请输入正确的身份证号码';
					return false;
				}
				this.errorMessage = '';
				return true;
			}
		},
		mounted () {
			var _this = this;
			this.token = sessionStorage.getItem('token');
			// 获取微信openId
			let openId = Cookies.get('openid');

			if (openId) { // 判断微信用户是否已认证，如果已认证直接进入到人脸识别过程
				_this.$post('/pubWeb/public/faceRecognition/getAuthenticatedUserInfo?openId=' + openId).then(rs => {
					if (rs) {
						//使用变量保存用户信息，用于后面的验证显示
						_this.data_name = rs.name;
						_this.data_id = rs.id;
						//有返回信息，对信息进行加*处理显示
						_this.checkInfo(rs.name, rs.id);
					}
				}).catch(e => {

				});
			}
			// 重新获取配置（针对android系统）
			_this.$fetch('/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0]).then(res => {
				wx.config(res);
			});
		}
	};
</script>

<style lang="less" type="text/less" scoped>
	.space_between {
		background-color: #eff7f7;
		height: 8px;
		margin: 0;
	}

	.step1_1 {
		width: 100%;
		height: 640px;
		background: #ffffff;

		.face_checkout {
			width: 100%;
		}

		.errorC {
			text-align: right;
			color: red;
			margin-right: 0.4rem;
		}

	}
</style>
