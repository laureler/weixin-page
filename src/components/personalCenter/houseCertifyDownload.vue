<template>
	<div class="house-certify-download">
		<page-head title="住房证明下载"></page-head>
		<van-cell-group>
			<van-field id="loginName" label="账号" placeholder="ibase账号名" v-model.trim="loginName" type="text"  clearable />
			<van-field id="password" label="密码" placeholder="密********码" v-model.trim="password" type="password" clearable />
			<van-field id="showUserName" label="姓名" placeholder="权利人姓名" v-model.trim="showUserName" type="text"  clearable />
			<van-field id="showCerNumber" label="证件号码" placeholder="权利人身份证号" v-model.trim="showCerNumber" type="text"  clearable />
		</van-cell-group>
		<div style="margin-top: 50px;">
			<van-button size="large" class="blueButton new-btn red-btn" @click="certifyDownload">下载</van-button>
		</div>
	</div>
</template>

<script>

	import { Toast, Dialog } from 'vant';
	import Head from '../app/head';

	export default {
		components: {
			'page-head': Head
		},
		data () {
			return {
				loginName: '',
				password: '',
				username: '',
				showUserName: '',
				cerNumber: '',
				showCerNumber: '',
			};
		},
		methods: {
			// 下载用户住房证明
			certifyDownload() {
				const _this = this;

				if (_this.loginName === '' || _this.password === '' || _this.username === '' || _this.cerNumber === '') {
					Toast('请完善信息！');
					return;
				}

				Dialog.confirm({
					title: '提示',
					message: '确认下载个人住房证明？'
				}).then(() => {
					const config = { headers: { 'Content-Type': 'multipart/form-data' } };
					var stringUrl = ctx2 + '/pubWeb/public/system/WeChatRemoteCheck';
					let strJson = JSON.stringify({
						username: _this.loginName,
						password: _this.password,
						qlr: _this.username,
						zjhm: _this.cerNumber,
					});
					let params = {
						'strJson': strJson
					};
					_this.$post(stringUrl, params, config).then(rs => {
						switch (rs.status) {
							case '-1' || undefined:
								alert('服务器出错');
								break;
							case '0':
								alert('没有权限下载');
								break;
							case '1':
								window.location.href = stringUrl +'?strJson=' + encodeURIComponent(strJson);
								break;
						}
					}).catch(error => {
						console.log(error);
					});
				}).catch(() => {
				});
			},
		},
		mounted () {
			if (this.$store.getters.getVerifyState) {
				this.username = this.$store.getters.getPersonCardInfo.cardName;
				this.cerNumber = this.$store.getters.getPersonCardInfo.cardCode;
				// 给显示的身份证信息加*号
				if (this.username.length > 2) {
					this.showUserName = this.username.substr(0, 1) + '*' + this.username.substr(this.username.length - 1, 1);
				}
				this.showCerNumber = this.cerNumber.substr(0, 4) + '***********' + this.cerNumber.substr(this.cerNumber.length - 3, 3);
			}
		}
	};

</script>

<style scoped>
	.house-certify-download {
		width: 100%;
		height: 100%;
	}

	.new-btn {
		border-radius: 5px;
		margin-top: 10px !important;
	}
</style>
