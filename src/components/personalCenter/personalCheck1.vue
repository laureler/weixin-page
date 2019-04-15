<template>
	<!-- 个人信息设置之手机验证 -->
	<div style="display:flex;flex-direction:column;">
		<head-nav-bar title="个人信息设置"></head-nav-bar>
		<van-cell-group>
			<van-field id="phoneNumber" label="手机号码" placeholder="请输入手机号码" v-model.trim="phoneNumber" type="number"
					   clearable/>
			<van-field
				v-model="smsCode"
				center
				clearable
				label="短信验证码"
				type="number"
				placeholder="请输入验证码"
			>
				<van-button slot="button" size="small" type="default" @click="getSmsCode" class="btn-color"
							:disabled="curCount!=0">{{smsCodeBtnValue}}
				</van-button>
			</van-field>
		</van-cell-group>
		<div style="margin-top: 20px;">
			<van-button size="large" class="blueButton" @click="nextPage">下一步</van-button>
		</div>
	</div>
</template>

<script>

	import headNavBar from './headNavBar';
	import { Toast, Dialog } from 'vant';

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'head-nav-bar': headNavBar
		},
		data () {
			return {
				phoneNumber: '',
				sendSmsNumber: '',
				smsCode: '',
				// 验证码按钮值
				smsCodeBtnValue: '获取验证码',
				// 设置倒计时大小 默认60秒
				countdownSize: 60,
				// 倒计时，当前剩余秒数
				curCount: 0,
			};
		},
		methods: {
			// 进入个人信息设置页面
			nextPage () {
				const _this = this;
				if (this.smsCode === '') {
					Toast('请输入验证码！');
					return;
				}
				if (_this.sendSmsNumber !== '') {
					// 短信认证
					const openId = isWx() ? Cookies.get('openid') : '';
					let params = {
						openId: openId,
						number: _this.sendSmsNumber,
						code: _this.smsCode
					};
					const config = { headers: { 'Content-Type': 'multipart/form-data' } };
					this.$post('/pubWeb/system/public/savePhoneNumberByOpenId', params, config).then(response => {
						if (response) {
							Dialog.alert({
								title: '提示',
								message: '手机号码设置成功，开始个人身份信息设置！'
							}).then(() => {
								// 进入个人身份信息设置
								_this.$router.push({
									path: '/personalCheck2',
									query: { phoneNumber: _this.phoneNumber }
								});
							});
						} else {
							Toast('验证码无效！');
						}
					}).catch(error => {
						console.log(error);
					});
				} else {
					Toast('请获取验证码！');
					return;
				}
			},
			// 发送短信获取验证码
			getSmsCode () {
				const _this = this;
				if (_this.phoneNumber === '') {
					Toast('请输入手机号码！');
					return;
				} else if (!(/^1[3|4|5|7|8]\d{9}$/.test(_this.phoneNumber))) {
					Toast('手机号码格式不正确！');
					return;
				} else {
					// 条件满足，开始发送短信
					this.$fetch('/pubWeb/system/public/smsCode?number=' + _this.phoneNumber)
						.then(response => {
							_this.sendSmsNumber = _this.phoneNumber;
						}).catch(error => {
							console.log(error);
						});

					// 页面倒计时和禁用按钮效果
					_this.curCount = _this.countdownSize;
					_this.smsCodeBtnValue = '倒计时 ' + _this.curCount + 'S';
					var TimerObj = setInterval(() => {
						if (_this.curCount > 0) {
							_this.curCount--;
							_this.smsCodeBtnValue = '倒计时 ' + _this.curCount + 'S';
						} else {
							// 禁用时间结束，关闭轮询，释放按钮
							clearInterval(TimerObj);
							_this.smsCodeBtnValue = '获取验证码';
						}
					}, 1000);
				}
			},
		},
		mounted () {
			const _this = this;
			const openId = isWx() ? Cookies.get('openid') : '';
			_this.$fetch('/pubWeb/public/faceRecognition/getAuthenticatedUserInfo?openId=' + openId)
				.then(response => {
					// 如果已经完成个人设置，则直接前往人脸识别
					if (response) {
						_this.$router.push({ path: '/preApprove', query: { isPersonalHomeCheck: true } });
					}
				}).catch(error => {
					console.log(error);
				});
		}
	};

</script>

<style scoped>
	.btn-color {
		color: #1989FA;
	}
</style>
