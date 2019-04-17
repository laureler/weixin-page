<template>
	<!-- 个人信息设置页面 -->
	<div class="personal-sign-in">
		<head-nav-bar title="注册账号"></head-nav-bar>
		<div class="sign-in-info">
			<div class="title-bg-div">
				账号信息
			</div>
			<van-cell-group>
				<van-field id="loginName" label="账号" placeholder="ibase账号名"
						   v-model.trim="loginName" type="text" :error-message="accountHintInfo" clearable />
				<van-field id="password" label="密码" placeholder="密********码" v-model.trim="password" type="password" clearable />
			</van-cell-group>

			<div class="title-bg-div">
				个人信息
			</div>
			<van-cell-group>
				<van-field id="username" label="姓名" placeholder="真实姓名" v-model.trim="username" type="text"
						    label-align="left" clearable />
				<van-field id="cerNumber" label="身份证号" placeholder="身份证号码" v-model.trim="cerNumber" type="text" clearable />
				<van-field id="showCardAddress" label="证件地址" placeholder="证件地址"
						   v-model.trim="showCardAddress" type="text" @click="showOrHideAreaPopup" clearable />
				<!--证件地址选择弹出框-->
				<van-popup v-model="isSelectedAreaPopup" position="bottom">
					<van-area :area-list="areaList" @confirm="confirmAddress" @cancel="showOrHideAreaPopup" />
				</van-popup>

				<van-field id="mAddress" label="详细地址" placeholder="联系人详细地址" v-model.trim="mAddress" type="text" clearable />
				<van-cell id="sex" title="性别" :value="sex" @click="selectSex" data-type="list" value-class="change-cell"
						  is-link/>
				<!-- 性别选择弹框 -->
				<van-popup v-model="showPopup" position="bottom">
					<van-picker show-toolbar :columns="columns" @confirm="confirmSex" @cancel="selectSex"/>
				</van-popup>

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
		<div style="margin: 50px 0;">
			<van-button size="large" class="blueButton new-btn" @click="checkInfo">注册账号</van-button>
		</div>
	</div>
</template>

<script>

	import { Toast } from 'vant';
	import headNavBar from './headNavBar';

	import { isWx } from '../../utils/ua';
	import areaList from '../../assets/js/area';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'head-nav-bar': headNavBar
		},
		data () {
			return {
				loginName: '',	// 账号
				password: '',	// 密码

				sex: '男',
				columns: ['男', '女'],
				username: '',
				cerNumber: '',  // 证件号码
				cardAddress: '',	// 证件地址
				showCardAddress: '',	// 证件地址
				mAddress: '',	// 详细地址
				phoneNumber: '',
				sendSmsNumber: '',	// 发送短信的号码

				smsCode: '',	// 短信验证码
				smsCodeBtnValue: '获取验证码',	// 验证码按钮值
				countdownSize: 60,	// 设置倒计时大小 默认60秒
				curCount: 0,	// 倒计时，当前剩余秒数

				showPopup: false,

				areaList,	// 省市区信息
				isSelectedAreaPopup: false,
				accountHintInfo: '',	// 账户唯一性提示信息
			};
		},
		methods: {
			checkInfo () {
				if (this.loginName === '' || this.password === '' || this.username === '' || this.cerNumber === '' ||
						this.cardAddress === '' || this.phoneNumber === '' || this.sex === '' || this.mAddress === '') {
					Toast('请完善个人信息！');
					return;
				} else {
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if (!reg.test(this.cerNumber)) {
						Toast('请输入正确的身份证号码！');
						return;
					}
					if (this.sendSmsNumber === '') {
						Toast('请获取手机验证码！');
						return;
					}
					if (this.smsCode === '') {
						Toast('请输入短信验证码！');
						return;
					}

					this.saveInfo();
				}
			},
			// 保存个人信息的修改
			saveInfo () {
				const _this = this;
				// 验证账号名是否唯一
				_this.$fetch('/mainWeb/public/system/register/verifyUserName?loginName=' + _this.loginName)
					.then(response => {
						response = response.result;
						if (response) {
							_this.accountHintInfo = '';
							/*
							* 验证通过，保存信息
							* */
							const openId = isWx() ? Cookies.get('openid') : '';
							const config = { headers: { 'Content-Type': 'multipart/form-data' } };
							let params = {
								wxOpenId: openId,
								mLoginName: _this.loginName,
								mUserPassword: _this.password,

								mRealName: _this.username,
								typeNumb: _this.cerNumber,
								cardAddress: _this.cardAddress,
								mAddress: _this.mAddress,
								mUserSex: _this.sex,

								mPhone: _this.sendSmsNumber,
							};
							_this.$post('/pubWeb/public/faceRecognition/weChatOnlineRegister?code=' + _this.smsCode, params, config).then(response => {
								if (Number(response.code) === 0) {
									Toast('注册成功！');
									_this.$store.commit('IBASE_ACCOUNT_ID', response.result);
									_this.$store.commit('SET_VERIFY_STATE', true);
									// 验证结束，进入个人中心
									setTimeout(() => {
										_this.$router.push({ path: '/personalCenter' });
									}, 1000);
								} else {
									Toast(response.msg);
								}
							}).catch(error => {
								console.log(error);
							});
						} else {
							_this.accountHintInfo = '账户名已存在!';
							Toast('账户名已存在，请重新输入！');
							return;
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			// 显示选择证件地址
			showOrHideAreaPopup() {
				this.isSelectedAreaPopup = !this.isSelectedAreaPopup;
			},
			confirmAddress(value) {
				console.log(value);
				this.cardAddress = '';
				this.showCardAddress = '';
				for (let i = 0, len = value.length; i < len; i++) {
					if (i < len - 1) {
						this.cardAddress += value[i].name + '::'
						if (i===0 && /市/.test(value[i].name)) {
							// 如果省级名称是市，则不显示省级名称
							continue;
						}
						this.showCardAddress += value[i].name + '/'
					} else {
						this.cardAddress += value[i].name
						this.showCardAddress += value[i].name
					}
				}
				this.isSelectedAreaPopup = !this.isSelectedAreaPopup;
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
				_this.$fetch('/pubWeb/system/public/smsCode?number=' + _this.phoneNumber)
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
			/*
				选择性别
			 */
			selectSex () {
				// todo 允不允许修改证件号码信息？
				if (this.allowEdit === 'disabled') {
					// 不允许的话也不允许修改性别
					return;
				}
				this.showPopup = !this.showPopup;
			},
			confirmSex (value, index) {
				this.sex = value;
				this.showPopup = false;
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

	.change-cell {
		text-align: left;
	}

</style>
