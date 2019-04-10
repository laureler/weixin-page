<template>
	<div class="home">
		<approve-head title="人脸核身"></approve-head>
		<div class="space_between"></div>
		<img src="../../../public/images/approve/face_checkout.png" alt="" class="home_title">
		<button class="homt_button" @click="goCheck">快速验证</button>

		<div class="home_approve_container">
			<div class="home_approve">我已认真阅读并同意<span class="approve_font" @click="showDialog">认证授权</span>
				<div class="message_check_box" @click="check">
					<span :class="{message_check:true,message_isCheck:isCheck}"></span>
				</div>
				办理业务
			</div>
		</div>

		<div class="hint">
			<div class="hint_info">
				<span v-if="mark"><p v-html="mark"></p></span>
				<span v-else="mark===''">{{ resultmsg }}</span>
			</div>
		</div>

		<ten-bottom></ten-bottom>
		<van-popup v-model="show" class="home_popup">
			<p class="popup_title">协议标题</p>
			<div class="popup_content">
				<p>重要提示：</p>
				<p>1、根据广东省不动产登记办理相关规定，市民需在办理不动产登记预申请业务时提供真实有效的手机号码、个人身份资料，在实名认证后，便于办理不动产业务以及获取个人业务办理情况等信息。</p>
				<p>2、对于您提供的个人信息，广东省不动产登记外网预申请系统将在后台核实，请确保您注册认证时提交的资料真实有效。如因提供虚假资料，您将承担相关的法律责任。</p>
				<p>3、您在注册时提供的所有个人信息，广东省不动产登记外网预申请系统将严格保密。</p>
				<p>实名认证用户须知：</p>
				<p>
					为进一步提升广东省不动产登记外网预申请系统服务水平，配合广东省不动产登记外网预申请系统网上办理的民生服务。广东省不动产登记外网预申请系统微信公众号推出实名认证业务，用户通过实名认证后，可更方便、快捷地办理业务。
					您在实名认证时提供的视频等资料，广东省不动产登记外网预申请系统将严格保密，仅用于本次实名认证，不另作他用。
				</p>
				<p>
					您在接受服务过程中，需要调用您的手机摄像头，并且根据业务场景的不同，需要读取您的身份证个人信息，包括姓名、公民身份号码、本人相片、证件的有效期和签发机关等身份证信息，或者截取您的脸部图像和认证视频，从而实现身份比对。
					如您使用不成功，请确保您已经按照要求正确使用本服务，或者向为您办理业务的机构咨询其他办理渠道。</p>

			</div>
			<p class="popup_bottom" @click="hideDialog">
				知道了
			</p>
		</van-popup>

	</div>
</template>

<script>
	import Vue from 'vue';
	import { Popup } from 'vant';
	import approveHead from '../app/head';
	import tenBottom from '../app/TencentBottom.vue';
	import { GenerateUUID } from '../../utils/uuidgenerator.js';

	import { request } from '../../utils/http';

	Vue.use(Popup);
	export default {
		data () {
			return {
				// 当有token的时候，不执行扫码过程，默认读取页面url的token作为扫码之后的值
				token: '',
				isCheck: false,
				uuid: GenerateUUID,
				show: false,
				//认证提示信息
				mark: '',
				//返回具体认证错误信息
				resultmsg: ''
			};
		},
		components: {
			approveHead, tenBottom
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			},
			check () {
				this.isCheck = !this.isCheck;
			},
			showDialog () {
				this.show = true;
			},
			hideDialog () {
				this.show = false;
			},
			goCheck () {
				var _this = this;
				// 这个判断是否从个人中心入口进来
				const isPersonalHomeCheck = _this.$route.query.isPersonalHomeCheck;
				if (this.isCheck) {
					if (this.$store.state.callbackUrl) {
						if (isPersonalHomeCheck) {
							_this.$router.push({ path: '/approve', query: { isPersonalHomeCheck: isPersonalHomeCheck} });
						} else {
							_this.$router.push({ path: '/approve' });
						}
						sessionStorage.setItem('token', this.uuid(20, 16));
						//人脸识别首页初始化配置（针对ios系统）
						_this.$fetch('pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0]).then(res => {
							wx.config(res);
							console.log(res);
						});
						return;
					}
					const token = uiScript.getParam('token') || '';
					if (token) {
						//若有token 则不扫码 同时 取token为变量赋值
						sessionStorage.setItem('token', token);
						if (isPersonalHomeCheck) {
							_this.$router.push({
								path: '/approve',
								query: { token: token, isPersonalHomeCheck: isPersonalHomeCheck }
							});
						} else {
							_this.$router.push({ path: '/approve', query: { token: token } });
						}
					} else {
						this.$fetch('pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0]).then(res => {
							wx.config(res);
							console.log(res);
							wx.ready(function () {
								wx.scanQRCode({
									needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
									scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
									success: function (res) {
										var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
										sessionStorage.setItem('token', result);
										if (isPersonalHomeCheck) {
											// 如果是个人设置过来，则带参数去人脸识别页面
											_this.$router.push({
												path: '/approve',
												query: { isPersonalHomeCheck: isPersonalHomeCheck }
											});
										} else {
											_this.$router.push({ path: '/approve' });
										}
									}
								});
							});
						});
					}
				}
			}
		},
		mounted () {
			const _this = this;
			let callbackUrl = uiScript.getParam('callbackUrl') || '';
			this.$store.commit('CALLBACK_URL', callbackUrl);
			let param = {};
			request({
				url: '/GetFaceConfigInfo',
				data: { strJson: JSON.stringify(param) },
				success (response) {
					if (Number(response.resultcode) === 1) {
						let check_mark = '<span style="color: red">&nbsp;&nbsp;' +
							response.mark.match(RegExp(/肇庆市高要区不动产登记中心一楼大厅五号绿色窗口/)).toString() + '&nbsp;&nbsp;</span>';
						_this.mark = response.mark.replace(/肇庆市高要区不动产登记中心一楼大厅五号绿色窗口/, check_mark);
					} else if (Number(response.resultcode) === 0) {
						_this.resultmsg = response.resultmsg;
					}
				},
				fail (err) {
				},
			});
		}
	};
</script>

<style lang="less" type="text/less" scoped>
	.space_between {
		background-color: #eff7f7;
		height: 8px;
		margin: 0px;
	}

	.home {
		.home_title {
			width: 750/75rem;
			height: 310/75rem;
			/*background: burlywood;*/
		}

		.homt_button {
			width: 690/2px;
			height: 88/2px;
			margin: 40/2px 30/2px;
			border: none;
			/*background: #338cfd;*/
			background: linear-gradient(to right, #2db6ff, #2edbfd);
			border-radius: 44/11px;
			font-size: 36/2px;
			color: #fff;
		}

		.home_approve_container {
			position: relative;
		}

		.message_check_box {
			width: 80/2px;
			height: 80/2px;
			position: absolute;
			top: -15/2px;
			left: 90/2px;
		}

		.message_check {
			display: block;
			padding: 18/2px;
			border: 2/2px solid #9a9a9a;
			position: absolute;
			top: 20/2px;
			right: 20/2px;
		}

		.message_isCheck {
			padding: 20/2px;
			border: none;
			background-image: url('../../../public/images/home/icon_gouxuan@2x.png');
			background-repeat: no-repeat;
			background-size: 40/2px 40/2px;
		}

		.home_bottom {
			height: 0.8rem;
			width: 352/73.75rem;
			position: fixed;
			bottom: 50/73.75rem;
			left: 0px;
			right: 0px;
			margin-left: auto;
			margin-right: auto;
			display: block;
		}

		.home_approve {
			height: 50/2px;
			width: 750/2px;
			line-height: 50/2px;
			text-align: center;
			.approve_font {
				color: #338cfd;
			}
		}

		.home_popup {
			width: 600/2px;
			height: 700/2px;
			border-radius: 5/2px;
		}

		.popup_title {
			height: 100/2px;
			line-height: 100/2px;
			border-bottom: 1/2px solid #e4e4e4;
			text-align: center;
			font-size: 30/2px;
		}

		.popup_content {
			padding: 0 30/2px;
			height: 500/2px;
			border-bottom: 1/2px solid #e4e4e4;
			overflow-y: auto;
		}

		.popup_bottom {
			height: 98/2px;
			line-height: 98/2px;
			text-align: center;
			font-size: 30/2px;
			color: #338cfd;
		}

		.hint {
			margin: 50px;
		}

		.hint_info {
			font-size: 14px;
			text-align: center;
		}
	}

</style>
