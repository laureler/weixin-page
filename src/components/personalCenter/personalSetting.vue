<template>
	<!-- 个人信息设置页面 -->
	<div class="personal-setting">
		<page-head title="个人信息"></page-head>
		<div class="personal-info-content">
			<van-cell-group>
				<van-field id="phoneNumber" label="手机号码" placeholder="请输入手机号码" v-model.trim="showPhoneNumber"
						   type="text" :disabled="isAllowEdit" clearable/>
				</van-field>
				<div :class="">
					<van-field id="name" label="姓名" placeholder="请输入姓名" v-model.trim="name" type="text"
							   :disabled="isAllowEdit" label-align="left"
							   clearable />
					<van-cell id="sex" title="性别" :value="sex" data-type="list" value-class="change-cell" is-link/>
					<van-field id="cerNumber" label="证件号码" placeholder="请输入身份证号码" v-model.trim="showCerNumber" type="text"
							   :disabled="isAllowEdit" clearable />
				</div>
			</van-cell-group>
		</div>
		<div style="margin-top: 50px;">
			<van-button size="large" class="blueButton new-btn red-btn" @click="unboundInfo">解除个人信息绑定</van-button>
		</div>
	</div>
</template>

<script>

	import { Toast, Dialog } from 'vant';
	import Head from '../app/head';

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'page-head': Head
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

				isAllowEdit: 'disabled',	// 允许个人信息？
			};
		},
		methods: {
			// 解除个人信息绑定
			unboundInfo () {
				const _this = this;
				Dialog.confirm({
					title: '警告',
					message: '解除信息绑定后将无法查看个人信息！'
				}).then(() => {
					const config = { headers: { 'Content-Type': 'multipart/form-data' } };
					let formData = new FormData();
					formData.append('userId', _this.$store.getters.getIbaseAccountId);
					formData.append('openId', '');	// 传空表示解除绑定
					_this.$post('/pubWeb/public/faceRecognition/updateAccountWxOpenId', formData, config).then(response => {
						if (response) {
							Toast('解除绑定成功！');
							_this.$store.commit('SET_VERIFY_STATE', false);
							setTimeout(() => {
								Dialog.confirm({
									title: '提示',
									message: '是否关闭当前页面?'
								}).then(() => {
									// 关闭当前浏览器
									wx.closeWindow();
								}).catch(() => {
									_this.$router.push({
										path: '/preApprove'
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
			// 将显示信息加*
			alterShowInfo (phoneNumber, cerNumber) {
				// 如果用户名长度大于二，则中间名字使用*号表示
				this.showPhoneNumber = phoneNumber.substr(0, 3) + '****' + phoneNumber.substr(phoneNumber.length - 4, 4);
				this.showCerNumber = cerNumber.substr(0, 4) + '***********' + cerNumber.substr(cerNumber.length - 3, 3);
			},
		},
		mounted () {
			const _this = this;
			_this.$fetch('/pubWeb/public/faceRecognition/getAccountUserInfo?userId=' + _this.$store.getters.getIbaseAccountId)
				.then(response => {
					if (response) {
						_this.phoneNumber = response.phone;
						_this.name = response.name;
						_this.sex = response.sex;

						let id = response.id.split(',')[1];
						_this.cerNumber = id;
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

	.new-btn {
		border-radius: 5px;
		margin-top: 10px !important;
	}

	.red-btn {
		background: #F5222D !important;
	}

	.change-cell {
		text-align: left;
	}

</style>
