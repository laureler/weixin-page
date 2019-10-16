<template>
	<!-- 身份验证 -->
	<div class="step1_1">
		<page-head :title="faceTitle"></page-head>
		<div class="space_between"></div>
		<img src="../../../public/images/approve/face_checkout.png" class="face_checkout" />
		<van-cell-group>
			<van-field v-model="username" @focus="hide(false)" @blur="hide(true)" id="username" label="姓名："
				input-align="right" :readonly="!editable" center></van-field>

			<van-field @focus="hide(false)" @blur="hide(true)" id="ID_number" v-model="cardCode" :readonly="!editable"
				label="身份证号：" input-align="right" center oninput="if(value.length>18)value=value.slice(0,18)"
				onafterpaste="this.value=this.value.replace(/\D/g,'')"></van-field>
		</van-cell-group>
		<p v-model="errorMessage" class="errorC">{{errorMessage}}</p>

		<div style="height: 40px"></div>
		<van-button size="large" class="blueButton" @click="nextPage()">开启人脸识别验证</van-button>

		<tencentBottom :type="showType"></tencentBottom>

	</div>
</template>

<script>
	import {
		Dialog,
		CellGroup,
		Field,
		Uploader
	} from 'vant';

	import Vue from 'vue';
	import Head from '../app/head';
	import Cookies from 'js-cookie';
	import tencentBottom from '../app/TencentBottom.vue';

	Vue.use(Uploader).use(Field).use(CellGroup).use(Dialog);
	export default {
		components: {
			'page-head': Head,
			tencentBottom
		},
		data() {
			return {
				faceTitle: '人脸核身',
				faceVerifyType: 1,
				editable: true,
				// 显示用户信息
				username: null,
				cardCode: null,
				// 用户信息存储
				data_name: null,
				data_id: null,
				errorMessage: '',
				isShow: false,
				showType: true,
			};
		},
		watch: {
			// 监听用户是否修改的信息,保存修改的数据值
			username: function (newValue, oldValue) {
				// 如果用户一次性输入，oldValue为null，则判断如果新值没有带*号就作为正确值使用
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
			// 通过聚焦判断控制tencentBottom的显示隐藏
			hide(param) {
				this.showType = param;
			},
			// 将显示信息加*
			checkInfo(_name, _id) {
				// 如果用户名长度大于二，则中间名字使用*号表示
				if (_name.length > 2) {
					_name = _name.substr(0, 1) + '*' + _name.substr(_name.length - 1, 1);
				}
				_id = _id.substr(0, 1) + '********' + _id.substr(_id.length - 1, 1);
				this.username = _name;
				this.cardCode = _id;
			},
			successToDo(_this, verify_result) {
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				var formData = new FormData();
				formData.append('token', sessionStorage.getItem('token')); // 扫码的值
				formData.append('openId', Cookies.get('openid')); // openid
				formData.append('fullName', _this.data_name); // 验证填入的姓名
				formData.append('idNumber', _this.data_id); // 验证填入的身份证号
				formData.append('verifyResult', verify_result);
				_this.$post('/pubWeb/public/faceRecognition/setAuthenticationResult', formData, config).then(data => {
					// 如果存在callbackUrl，则按callbackUrl重定向处理
					if (_this.$store.state.callbackUrl) {
						// TODO 如果是核验功能，实现核验逻辑
						if (_this.$store.state.callbackUrl == '/pubWeb/public/weChatPublic/onlineApplication/CLFZYDJ/verification') {
							_this.$router.push({
								path: '/onlineApplication/CLFZYDJ/verification'
							});
						}
						// fiexme 合并核验功能callBack处理
						//如果callbackUrl是WeChatRemoteCheck接口则请求PDF数据给用户
						if (_this.$store.state.callbackUrl == '/pubWeb/system/public/WeChatRemoteCheck') {
							console.log("跳转至住房证明查询！");
							_this.getGrantDeep();
						} else if (_this.$store.state.callbackUrl ==
							'/pubWeb/public/weChatPublic/GetPersonDataInfo') {
							console.log("跳转至不动产登记资料查询！");
							// _this.getArchiveDataInfoPage();
							_this.$router.push({
								path: '/arcl',
								query: {
									inter: '/GetPersonDataInfo',
									title: '不动产登记资料查询',
									filter: {
										strJson: JSON.stringify({
											qlr: this.data_name,
											zjhm: this.data_id
										})
									}
								}
							});
						} else if (_this.$store.state.callbackUrl == '/pubWeb/public/weChatPublic/personInfo') {
							_this.$router.push({
								path: '/approveStep2',
								query: {
									isSuccess: -10,
									cardCode: _this.data_id,
									username: _this.data_name
								}
							});
						} else {
							console.log("跳转路径：" + _this.$store.state.callbackUrl);
						}
					} else {
						// 默认验证成功页面
						_this.$router.push({
							path: '/approveStep2',
							query: {
								isSuccess: 1,
								cardCode: _this.data_id,
								username: _this.data_name
							}
						});
					}
				}).catch(error => {
					console.log(error);
					_this.$router.push({
						path: '/approveStep2',
						query: {
							isSuccess: 0
						}
					});
				});
			},
			// 跳转至 不动产登记资料查询
			getArchiveDataInfoPage() {
				this.$router.push({
					path: '/arcl',
					query: {
						inter: '/GetPersonDataInfo',
						title: '不动产登记资料查询',
						filter: {
							strJson: JSON.stringify({
								qlr: this.data_name,
								zjhm: this.data_id
							})
						}
					}
				})
			},
			// 住房证明查询
			getGrantDeep() {
				const _this = this;
				// 加入微信openId，用于记录查档
				const strJson = JSON.stringify({
					qlr: _this.data_name,
					zjhm: _this.data_id,
					openId: Cookies.get('openid')
				}) + '';
				let stringUrl = _this.$store.state.callbackUrl;
				let config = {
					headers: {
						'Content-Type': 'charset=UTF-8;multipart/form-data'
					}
				};
				var formData = new FormData();
				formData.append('strJson', strJson);
				const url = stringUrl + '?strJson=' + encodeURIComponent(strJson);
				this.$router.push({
					path: '/arcd',
					query: {
						filter: '',
						title: '住房证明查询',
						inter: url
					}
				});
				/*_this.$post(stringUrl, formData, config).then(rs => {
					if (rs) {
						switch (Number(rs.status)) {
							case -1 || undefined:
								_this.dialogAlert('服务器出错');
								break;
							case 0:
								_this.dialogAlert('没有权限下载');
								break;
							case 1:
								// window.location.href = stringUrl + '?strJson=' + encodeURIComponent(strJson);
								const url = stringUrl + '?strJson=' + encodeURIComponent(strJson);
								_this.$router.push({
									path: '/arcd',
									query: {filter: '', title: '住房证明查询', inter: url}
								});
								break;
							default:
								_this.dialogAlert('接口返回数据异常！');
								break;
						}
					}
				}).catch(error => {
					_this.dialogAlert('接口异常' + error);
				});*/
			},
			dialogAlert(message) {
				Dialog.alert({
					message: message
				}).then({});
			},
			WeChatFaceCheck() {
				var _this = this;
				var info = {
					'request_verify_pre_info': '{"name":"' + _this.data_name + '","id_card_number":"' + _this.data_id +
						'"}',
					'check_alive_type': '1'
				};
				let invokeCallback = function (res) {
					// 人脸识别成功
					_this.$store.commit('CARD_CODE', _this.data_id);
					_this.$store.commit('CARD_NAME', _this.data_name);
					// 判断是不是从个人中心首页进来的
					if (_this.$route.query.isPersonalHomeCheck) {
						_this.$fetch('/pubWeb/public/faceRecognition/getLinkedAccounts?cardName=' + _this.data_name +
								'&cardNumber=' + _this.data_id)
							.then(dataList => {
								if (dataList.length === 0) {
									// 如果没有ibase账号，则到注册页面
									_this.$router.push({
										path: '/signInAccount'
									});
								} else {
									_this.$router.push({
										name: 'associativeAccount',
										params: {
											dataList: dataList
										}
									});
								}
							}).catch(error => {
								console.log(error);
							});
					} else {
						console.log(res);
						if (res.hasOwnProperty('err_code')) {
							if (res.err_code == 0) {
								_this.successToDo(_this, res.verify_result);
							} else if (res.err_code == 90100) {

							} else {
								_this.$router.push({
									path: '/approveStep2',
									query: {
										isSuccess: 0
									}
								});
							}
						} else {
							wx.invoke('requestWxFacePictureVerify', info, function (res) {
								console.log(res);
								if (res.err_code == 0) {
									_this.successToDo(_this, res.verify_result);
								} else if (res.err_code == 90100) {

								} else {
									_this.$router.push({
										path: '/approveStep2',
										query: {
											isSuccess: 0
										}
									});
								}
							});
						}
					}
				};
				if (process.env.VUE_APP_PREVIEW === 'true') {
					// todo 若为开发模式 则默认提交过去
					let invokeresult = {
						err_code: 0,
						err_msg: "requestWxFacePictureVerifyUnionVideo:ok",
						verify_result: "XXIzTtMqCxwOaawoE91-VBZV1h2zOEwpKSm2MRJYZPVBqp5iZk3hW2aIhH6CWIwtpQpO8L1FCui4i_A45FXug1KdbtCS_ToSxlIFwgLGMs_IP1-CeVhQatQHVVZbz0Pr"
					}
					invokeCallback(invokeresult)
				} else {
					wx.invoke('checkIsSupportFaceDetect', {}, function (res) { // 检测微信人脸识别的功能
						console.log(res);
						console.log(res);
						console.log(res);
						if (res.err_code == 0 || true) { // 检测成功
							wx.invoke('requestWxFacePictureVerifyUnionVideo', info, invokeCallback);
						} else if (res.err_code == 10001) {
							alert('不支持人脸采集：设备没有前置摄像头');
						} else if (res.err_code == 10002) {
							alert('不支持人脸采集：没有下载到必要模型');
						} else if (res.err_code == 10003) {
							alert('不支持人脸采集：后台黑名单控制');
						} else {
							console.log(res)
						}
					});
				}
			},
			nextPage() {
				if (this.checkID_number()) {
					this.WeChatFaceCheck();
				}
			},
			checkID_number() {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				// 如果data_id为空，则用户信息为手动输入，将用户输入的值用于验证
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
		mounted() {
			var _this = this;
			// 微信标题
			_this.$fetch('/gdbdcWebService/WeChatConfig/public/getProtocolTitleInfomation')
				.then(res => {
					_this.faceTitle = res.WECHATTITLE;
				})
				.catch(erro => {})
			_this.$fetch('/gdbdcWebService/WeChatConfig/public/getFaceIdentificationInfomation')
				.then(res => {
					_this.faceVerifyType = (res.CHECKALIVETYPE == null || res.CHECKALIVETYPE == undefined) ? 1 : res
						.CHECKALIVETYPE;
				})
				.catch(error => {
					_this.faceVerifyType = 1;
					console.log(error);
				})
			this.token = sessionStorage.getItem('token');
			// 获取微信openId
			let openId = Cookies.get('openid');
			// 新增判断逻辑

			let item = sessionStorage.getItem('personId');
			let item1 = sessionStorage.getItem('personName');
			if (item1 && item) {
				this.username = item1;
				this.cardCode = item;
				this.editable = false;
			} else {
				if (openId) { // 判断微信用户是否已认证，如果已认证直接进入到人脸识别过程
					_this.$fetch('/pubWeb/public/faceRecognition/getAuthenticatedUserInfo?openId=' + openId).then(rs => {
						if (rs) {
							// 使用变量保存用户信息，用于后面的验证显示
							_this.data_name = rs.name;
							_this.data_id = rs.id;
							// 有返回信息，对信息进行加*处理显示
							_this.checkInfo(rs.name, rs.id);
						}
					}).catch(e => {

					});
				}
			}
			console.log("微信配置参数" + '/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0])
			// 重新获取配置（针对android系统）
			_this.$fetch('/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0]).then(res => {
				console.log("微信配置结果")
				console.log(res);
				console.log(res);
				console.log(res);
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
