<template>
	<!-- 个人信息设置页面 -->
	<div class="personal-sign-in">
		<head-nav-bar title="注册账号"></head-nav-bar>
		<div class="sign-in-info">
			<div class="title-bg-div">
				账号信息
			</div>
			<van-cell-group>
				<van-field id="accountName" label="账号" placeholder="请输入账号名" v-model.trim="accountName" type="text" clearable />
				<van-field id="password" label="密码" placeholder="请输入密码" v-model.trim="password" type="text" clearable />
			</van-cell-group>

			<div class="title-bg-div">
				个人信息
			</div>
			<van-cell-group>
				<van-field id="username" label="姓名" placeholder="请输入姓名" v-model.trim="username" type="text"
						    label-align="left" clearable />
				<van-field id="cerNumber" label="身份证号" placeholder="请输入身份证号码" v-model.trim="cerNumber" type="text" clearable />
				<van-field id="address" label="地址" placeholder="请输入联系地址" v-model.trim="address" type="text" clearable />

				<van-field id="phoneNumber" label="手机号码" placeholder="请输入手机号码" v-model.trim="phoneNumber"
						   type="text" clearable/>
				<van-field
					v-model="smsCode"
					clearable
					label="短信验证码"
					type="number"
					placeholder="请输入验证码"
				>
					<van-button slot="button" size="small" type="default" @click="sendSmsCode" class="blue-color"
								:disabled="curCount!=0">{{smsCodeBtnValue}}
					</van-button>
				</van-field>
			</van-cell-group>
		</div>
		<div style="margin-top: 50px;">
			<van-button size="large" class="blueButton new-btn" @click="checkInfo">注册账号</van-button>
		</div>
	</div>
</template>

<script>

	import { Toast } from 'vant';
	import headNavBar from './headNavBar';

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'head-nav-bar': headNavBar
		},
		data () {
			return {
				accountName: '',	// 账号
				password: '',	// 密码

				username: '',
				cerNumber: '',  // 当前输入的证件号码
				address: '',	// 用户联系地址
				phoneNumber: '',
				sendSmsNumber: '',	// 发送短信的号码

				smsCode: '',	// 短信验证码
				smsCodeBtnValue: '获取验证码',	// 验证码按钮值
				countdownSize: 60,	// 设置倒计时大小 默认60秒
				curCount: 0,	// 倒计时，当前剩余秒数
			};
		},
		methods: {
			checkInfo () {
				if (this.accountName === '' || this.password === '' || this.username === '' || this.cerNumber === '' ||
						this.address === '' || this.phoneNumber === '' || this.smsCode === '') {
					Toast('请完善个人信息！');
					return;
				} else {
					if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.phoneNumber))) {
						Toast('手机号码格式不正确！');
						return;
					}
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if (!reg.test(this.cerNumber)) {
						Toast('请输入正确的身份证号码！');
						return;
					}

					this.saveInfo();
				}
			},
			// 保存个人信息的修改
			saveInfo () {
				const _this = this;
				/*
				* 验证通过，保存信息
				* */
				const openId = isWx() ? Cookies.get('openid') : '';
				const config = { headers: { 'Content-Type': 'multipart/form-data' } };
				let params = {
					wxOpenId: openId,
					accountName: _this.accountName,
					password: _this.password,

					fullName: _this.username,
					idNumber: _this.cerNumber,
					address: _this.address,

					phoneNumber: _this.sendSmsNumber,
					code: _this.smsCode,
				};
				_this.$post(ctx2 + '/pubWeb/public/saveUserInfo', params, config).then(response => {
					if (response) {
						Toast('注册成功！');
						_this.$store.commit('IBASE_ACCOUNT_ID', response.accountId);
						_this.$store.commit('SET_VERIFY_STATE', true);
						// 验证结束，进入个人中心
						setTimeout(() => {
							_this.$router.push({ path: '/personalCenter' });
						}, 1000);
					}
				}).catch(error => {
					console.log(error);
				});
			},
			// 发送短信获取验证码
			sendSmsCode () {
				const _this = this;
				if (_this.phoneNumber === '') {
					Toast('请输入手机号码！');
					return false;
				} else if (!(/^1[3|4|5|7|8]\d{9}$/.test(_this.phoneNumber))) {
					Toast('手机号码格式不正确！');
					return false;
				}
				// 条件满足，开始发送短信
				this.$fetch('/pubWeb/system/public/smsCode?number=' + _this.phoneNumber)
					.then(response => {
						_this.sendSmsNumber = _this.phoneNumber;
					})
					.catch(error => {
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
			},
		},
		mounted () {
			let cardInfo = this.$store.getters.getPersonCardInfo;
			if (cardInfo.cardName) {
				this.username = cardInfo.cardName;
				this.cerNumber = cardInfo.cardCode;
			}
		}
	};

</script>

<style scoped>
	.personal-sign-in {
		width: 100%;
		height: 100%;
	}

	.new-btn {
		border-radius: 5px;
	}

	.title-bg-div {
		height: 30px;
		padding: 5px 10px;
		letter-spacing: 1px;
		background:#f3f3f3;
	}

	.blue-color {
		color: #1989FA;
	}

</style>
