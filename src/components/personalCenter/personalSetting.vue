<template>
	<!-- 个人信息设置页面 -->
	<div class="personal-setting">
		<head-nav-bar title="个人信息设置"></head-nav-bar>
		<div class="personal-info-content">
			<van-cell-group>
				<van-field id="phoneNumber" label="手机号码" placeholder="请输入手机号码" v-model.trim="showPhoneNumber"
						   type="text" :error="isChanged"
						   :disabled="isAlter" clearable/>
				<van-field
					v-model="smsCode"
					clearable
					v-show="showSmsCheck"
					label="短信验证码"
					type="number"
					placeholder="请输入验证码"
				>
					<van-button slot="button" size="small" type="default" @click="getSmsCode" class="blue-color"
								:disabled="curCount!=0">{{smsCodeBtnValue}}
					</van-button>
				</van-field>
				<van-field id="name" label="姓名" placeholder="请输入姓名" v-model.trim="name" type="text"
						   :disabled="allowEdit" label-align="left"
						   clearable />
				<van-cell id="sex" title="性别" :value="sex" @click="selectSex" data-type="list" value-class="change-cell"
						  is-link/>
				<van-field id="cerNumber" label="证件号码" placeholder="请输入身份证号码" v-model.trim="showCerNumber" type="text"
						   :disabled="allowEdit" clearable />
			</van-cell-group>
		</div>
		<div class="personal-set-btn">
			<van-button size="large" class="blueButton new-btn" @click="alterInfo">{{alterBtn}}</van-button>
			<van-button size="large" class="blueButton new-btn red-btn" @click="unboundInfo">解除个人信息绑定</van-button>
		</div>

		<!-- 选择弹框 -->
		<van-popup v-model="showPopup" position="bottom" :overlay="false">
			<van-picker show-toolbar :columns="columns" @confirm="confirmSex" @cancel="selectSex"/>
		</van-popup>
	</div>
</template>

<script>

	import { Toast, Dialog } from 'vant';
	import headNavBar from './headNavBar';

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'head-nav-bar': headNavBar
		},
		data () {
			return {
				showPopup: false,	// 是否展示数据选择项
				name: '',
				cerNumber: '',  // 当前输入的证件号码
				showCerNumber: '',	// 显示的证件号码
				phoneNumber: '',
				sendSmsNumber: '',	// 发送短信的号码
				showPhoneNumber: '',	//显示的手机号码
				sex: '男',
				columns: ['男', '女'],  // 当前下拉框需要展示的数据
				alterBtn: '修改信息',
				isAlter: 'disabled',	// 启动修改
				allowEdit: 'disabled',	// 允许修改姓名证件号码
				modifiedClass: {},	// 更改修改后label颜色
				isChanged: false,
				showSmsCheck: false,	// 是否显示短信验证
				smsCode: '',	// 短信验证码
				smsCodeBtnValue: '获取验证码',	// 验证码按钮值
				countdownSize: 60,	// 设置倒计时大小 默认60秒
				curCount: 0,	// 倒计时，当前剩余秒数
			};
		},
		methods: {
			alterInfo () {
				if (this.isAlter === 'disabled') {
					this.openSaveActive();
				} else {
					this.closeSaveActive();
				}
			},
			openSaveActive () {
				this.showPhoneNumber = this.phoneNumber;
				this.isAlter = false;
				this.alterBtn = '保存';
				this.showSmsCheck = !this.showSmsCheck;
			},
			closeSaveActive () {
				if (!this.checkPhoneInfo(this.showPhoneNumber)) {
					// 手机号码格式不正确
					return;
				}
				if (!this.saveInfo()) {
					// 如果保存不成功，则中止
					return;
				}
				this.phoneNumber = this.showPhoneNumber;
				this.alterShowInfo(this.phoneNumber, this.cerNumber);
				this.isAlter = 'disabled';
				this.alterBtn = '修改信息';
				this.showSmsCheck = !this.showSmsCheck;
			},
			// 保存个人信息的修改
			saveInfo () {
				const _this = this;
				// 微信号
				const openId = isWx() ? Cookies.get('openid') : '';
				const config = { headers: { 'Content-Type': 'multipart/form-data' } };
				if (_this.allowEdit === 'disabled') {
					// 不允许修改姓名证件号码等身份信息，只修改手机号码
					if (_this.phoneNumber === _this.showPhoneNumber) {
						// 如果没有修改手机号码，则直接运行保存
						return true;
					}
					if (_this.sendSmsNumber === '') {
						Toast('请获取验证码！');
						return false;
					}
					if (_this.smsCode === '') {
						Toast('验证码不能为空！');
						return false;
					}
					let params = {
						openId: openId,
						phoneNumber: _this.showPhoneNumber,
						code: _this.smsCode
					};
					this.$post('/pubWeb/system/public/savePhoneNumberByOpenId', params, config).then(response => {
						if (response) {
							Toast('保存成功！');
							_this.isChanged = true;
						} else {
							Toast('验证码无效！');
							return false;
						}
					}).catch(error => {
						console.log(error);
						return false;
					});
				} else {
					let params = {
						wxOpenId: openId,
						fullName: _this.name,
						idNumber: _this.cerNumber,
						sex: _this.sex
					};
					_this.$post('/pubWeb/public/faceRecognition/saveAuthenticatedUserInfo', params, config).then(response => {
						if (response) {
							_this.$store.commit('CARD_CODE', { cardCode: _this.cerNumber });
							_this.$store.commit('CARD_NAME', { cardName: _this.name });
							Toast('保存成功！');
						} else {
							Toast('服务器异常！');
							return false;
						}
					}).catch(error => {
						console.log(error);
						return false;
					});
				}
				return true;
			},
			// 解除个人信息绑定
			unboundInfo () {
				const _this = this;
				Dialog.confirm({
					title: '警告',
					message: '删除信息绑定后将无法查看个人信息！'
				}).then(() => {
					const openId = isWx() ? Cookies.get('openid') : '';
					const config = { headers: { 'Content-Type': 'multipart/form-data' } };
					let params = {
						openId: openId
					};
					_this.$post('/pubWeb/public/faceRecognition/deleteAuthenticatedUserInfo', params, config).then(response => {
						if (response) {
							Toast('解除绑定成功！');
							_this.$store.commit('SET_FACE_CHECK', false);
							setTimeout(() => {
								Dialog.confirm({
									title: '提示',
									message: '是否关闭当前页面?'
								}).then(() => {
									// 关闭当前浏览器
									wx.closeWindow();
								}).catch(() => {
									_this.$router.push({
										path: '/personalCheck'
									});
								});
							}, 1500);
						} else {
							Toast('服务器异常！');
						}
					}).catch(error => {
						console.log(error);
					});
				}).catch(() => {
				});
			},
			// 发送短信获取验证码
			getSmsCode () {
				const _this = this;
				if (this.checkPhoneInfo(_this.showPhoneNumber)) {
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
				}
			},
			// 验证手机号码格式是否正确
			checkPhoneInfo (phoneNumber) {
				if (phoneNumber === '') {
					Toast('请输入手机号码！');
					return false;
				} else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))) {
					Toast('手机号码格式不正确！');
					return false;
				}
				return true;
			},
			// 将显示信息加*
			alterShowInfo (phoneNumber, cerNumber) {
				// 如果用户名长度大于二，则中间名字使用*号表示
				this.showPhoneNumber = phoneNumber.substr(0, 3) + '****' + phoneNumber.substr(phoneNumber.length - 4, 4);
				this.showCerNumber = cerNumber.substr(0, 4) + '***********' + cerNumber.substr(cerNumber.length - 3, 3);
			},
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
			/**
			 * 确认下拉框选项
			 **/
			confirmPicker: function (value, index) {
				this.sex = value;
				this.showPopup = !this.show;
			},
		},
		mounted () {
			const _this = this;
			const openId = isWx() ? Cookies.get('openid') : '';
			_this.$fetch('/pubWeb/public/faceRecognition/getAuthenticatedUserInfo?openId=' + openId)
				.then(response => {
					if (response) {
						_this.phoneNumber = response.phone;
						_this.name = response.name;
						_this.sex = response.sex;
						_this.cerNumber = response.id;
						// 给显示的手机号码和身份证信息加*号
						_this.alterShowInfo(_this.phoneNumber, _this.cerNumber);
					}
				}).catch(error => {
				console.log(error);
			});
		}
	};

</script>

<style scoped>
	.personal-setting {
		width: 100%;
		height: 100%;
	}

	.personal-info-content {
		overflow-y: auto;
		height: calc(100% - 200px);
		margin-bottom: 15px;
	}

	.new-btn {
		border-radius: 8px;
		margin-top: 10px !important;
	}

	.red-btn {
		background: #F5222D !important;
	}

	.change-cell {
		text-align: left;
	}

	.blue-color {
		color: #1989FA;
	}

</style>
