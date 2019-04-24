<template>
	<!-- 个人信息设置之身份信息 -->
	<div>
		<page-head title="个人信息设置"></page-head>
		<van-cell-group>
			<van-field id="cerNumber" label="证件号码" placeholder="请输入身份证号码" v-model.trim="cerNumber" type="text" clearable
					   required/>
			<van-field id="name" label="姓名" placeholder="请输入姓名" v-model.trim="name" type="text" clearable required/>
			<van-cell id="sex" title="性别" value-class="change-cell" :value="sex" @click="selectSex" data-type="list"
					  is-link center required/>
		</van-cell-group>
		<div style="margin-top: 20px;">
			<van-button size="large" class="blueButton" @click="checkInfo">下一步</van-button>
		</div>

		<!-- 选择弹框 -->
		<van-popup v-model="showPopup" position="bottom" :overlay="false">
			<van-picker show-toolbar :columns="columns" @confirm="confirmSex" @cancel="selectSex"/>
		</van-popup>
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
				isDisabled: 'disabled',
				name: '',
				cerNumber: '',  // 当前输入的证件号码
				sex: '男',	// 性别，默认：男
				columns: ['男', '女'],  // 当前下拉框需要展示的数据
			};
		},
		methods: {
			// 验证信息
			checkInfo () {
				if (this.cerNumber !== '' && this.name !== '' && this.sex !== '') {
					if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.cerNumber))) {
						Toast('身份证格式不正确！');
						return;
					} else if (this.name == null || this.name.length < 2) {
						Toast('请输入正确的姓名！');
						return;
					} else {
						this.saveInfoToNext();
					}
				} else {
					Toast('请完善个人信息！');
					return;
				}
			},
			saveInfoToNext () {
				const _this = this;
				// 微信号
				const openId = isWx() ? Cookies.get('openid') : '';
				const config = { headers: { 'Content-Type': 'multipart/form-data' } };
				let params = {
					wxOpenId: openId,
					fullName: _this.name,
					idNumber: _this.cerNumber,
					sex: _this.sex
				};
				_this.$post('/pubWeb/public/faceRecognition/saveAuthenticatedUserInfo', params, config)
					.then(response => {
						if (response) {
							_this.$store.commit('CARD_CODE', _this.cerNumber);
							_this.$store.commit('CARD_NAME', _this.name);

							Dialog.alert({
								title: '提示',
								message: '个人信息设置成功，开始人脸识别！'
							}).then(() => {
								// 进入人脸核身页面
								_this.$router.push({ path: '/preApprovenew', query: { isPersonalHomeCheck: true } });
							});
						} else {
							Toast('服务器异常！');
						}
					}).catch(error => {
					console.log(error);
				});
			},
			selectSex () {
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
		}
	};

</script>

<style scoped>
	.change-cell {
		text-align: left;
	}
</style>
