<template>
	<!-- 个人信息设置页面 -->
	<div class="personal-sign-in">
		<page-head title="注册账号"></page-head>
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
				<van-field id="username" label="姓名" v-model.trim="username" type="text" label-align="left" clearable readonly />
				<van-field id="cerNumber" label="身份证号" v-model.trim="cerNumber" type="text" clearable readonly />
				<van-field id="cardAddress" label="证件地址" placeholder="证件地址"
						   v-model.trim="cardAddress" type="text" @click="showOrHideAreaPopup" clearable readonly/>
				<!--证件地址选择弹出框-->
				<van-popup v-model="isSelectedAreaPopup" position="bottom">
					<van-picker show-toolbar :columns="showAreaList"  @confirm="onChangeArea" @cancel="showOrHideAreaPopup"/>
				</van-popup>

				<van-field id="mAddress" label="详细地址" placeholder="请输入详细地址" v-model.trim="mAddress" type="text" clearable />
				<van-cell id="sex" title="性别" :value="sex" @click="selectSex" data-type="list" value-class="change-cell"
						  is-link/>
				<!-- 性别选择弹框 -->
				<van-popup v-model="isSexPopup" position="bottom">
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
	import Head from '../app/head';

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	const sha1 = require('sha1');

	export default {
		components: {
			'page-head': Head
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
				mAddress: '',	// 详细地址
				phoneNumber: '',
				sendSmsNumber: '',	// 发送短信的号码

				smsCode: '',	// 短信验证码
				smsCodeBtnValue: '获取验证码',	// 验证码按钮值
				countdownSize: 60,	// 设置倒计时大小 默认60秒
				curCount: 0,	// 倒计时，当前剩余秒数

				isSexPopup: false,

				areaList: {
					province_list: [],
					city_list: [],
					county_list: []
				},	// 省市区信息
				provinceData: [],	// 省份name数据
				showAreaList: [],	// 省市区显示信息列表
				countGetArea: 1,	// 跟踪省市区，1表示已获取省数据
				selectedArea: [],	// 用户选中的证件地址
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
						if (response) {
							_this.accountHintInfo = '';
							/*
							* 验证通过，保存信息
							* */
							const openId = isWx() ? Cookies.get('openid') : '';
							// const openId = Cookies.get('openid') || 'zyk';
							const config = { headers: { 'Content-Type': 'multipart/form-data' } };
							const idAddress = _this.cardAddress.replace(/\//g, '::');

							let formData = new FormData();
							formData.append('wxOpenId', openId);
							formData.append('loginName', _this.loginName);
							formData.append('password', sha1(_this.password).toUpperCase());

							formData.append('realName', _this.username);
							formData.append('typeNumb', '身份证,' + _this.cerNumber);
							formData.append('cardAddress', idAddress);
							formData.append('address', _this.mAddress);
							formData.append('sex', _this.sex);

							formData.append('phone', _this.sendSmsNumber);
							formData.append('code', _this.smsCode);

							// 注册并关联微信
							_this.$post('/pubWeb/public/faceRecognition/weChatOnlineRegister', formData, config).then(response => {
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
			// 重置证件地址选项
			showOrHideAreaPopup() {
				this.countGetArea = 1;
				this.showAreaList = this.provinceData;
				this.areaList.city_list = [];
				this.areaList.county_list = [];
				this.isSelectedAreaPopup = !this.isSelectedAreaPopup;
			},
			onChangeArea(value, index) {
				const _this = this;
				_this.selectedArea.push(value);
				// 3表示已获取区数据
				if (_this.countGetArea === 3) {
					_this.cardAddress = _this.selectedArea[0] + '/' +  _this.selectedArea[1] + '/' + _this.selectedArea[2];
					_this.showOrHideAreaPopup();
					return;
				}
				let code = '';
				if (_this.countGetArea === 1) {
					code = _this.areaList.province_list[index].split('-')[0];
				} else {
					code = _this.areaList.city_list[index].split('-')[0];
				}
				_this.getAreaData(code, _this.countGetArea);

				_this.countGetArea++;
			},
			// 获取市、区数据，index:0是省，1是市，2是区
			getAreaData(code, index) {
				const _this = this;
				_this.$fetch('/mainWeb/public/system/register/getsuCitysOrArea?type=' + code)
					.then(data => {
						if (data) {
							let list = '';
							_this.showAreaList = [];
							if (index === 1) {
								list = _this.areaList.city_list;
							} else if (index === 2) {
								list = _this.areaList.county_list;
							} else {
								list = _this.areaList.province_list;
							}
							for (var i = 0, len = data.length; i < len; i++) {
								list.push(data[i].code + '-' + data[i].lname);
								_this.showAreaList.push(data[i].lname);
								_this.provinceData.push(data[i].lname);
							}
						}
					})
					.catch(error => {
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
				if (this.allowEdit === 'disabled') {
					// 不允许的话也不允许修改性别
					return;
				}
				this.isSexPopup = !this.isSexPopup;
			},
			confirmSex (value, index) {
				this.sex = value;
				this.isSexPopup = false;
			},

		},
		mounted () {
			let cardInfo = this.$store.getters.getPersonCardInfo;
			if (cardInfo.cardName) {
				this.username = cardInfo.cardName;
				this.cerNumber = cardInfo.cardCode;
			}
			/*
				获取省级信息
			 */
			this.getAreaData('provinces', 0);
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
