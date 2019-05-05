<template>
	<div class="personal-ibase-account">
		<page-head title="选择账户"></page-head>
		<div style="background-color: #eff7f7;height: 25px;line-height:25px;padding-left: 10px;">
			请选择不动产登记在线申请系统注册账号进行账号绑定
		</div>
		<div class="ibase-accountList" v-if="accountDataArray.length!==0">
			<van-cell-group v-for="(accountItem, index) in accountDataArray">
				<van-cell :title="accountItem.loginName" @click="selectedAccount(index)">
					<van-icon slot="right-icon" name="success" v-if="selectedIndex==index" color="#2db6ff" size="20px"/>
				</van-cell>
			</van-cell-group>
		</div>
		<van-button size="large" class="blueButton"  @click="associativeAccount()">下一步</van-button>
	</div>
</template>

<script>

	import Head from '../app/head';
	import { Dialog, Toast } from 'vant'

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'page-head': Head,
		},
		data () {
			return {
				accountDataArray: [],
				active: 0,
				selectedIndex: 0,
			}
		},
		methods: {
			selectedAccount(index) {
				this.selectedIndex = index;
			},
			/*
				关联已有ibase账户
			 */
			associativeAccount() {
				const _this = this;
				Dialog.confirm({
					title: '提示',
					message: '确认关联该账号？'
				}).then(() => {
					const openId = isWx() ? Cookies.get('openid') : '';
					// const openId = Cookies.get('openid') || 'zyk';
					const config = { headers: { 'Content-Type': 'multipart/form-data' } };
					let userId = _this.accountDataArray[_this.selectedIndex].userId;
					let formData = new FormData();
					formData.append('userId', userId);
					formData.append('openId', openId);
					_this.$post('/pubWeb/public/faceRecognition/updateAccountWxOpenId', formData, config).then(response => {
						if (response) {
							// 关联成功，，进入个人中心
							_this.$store.commit('SET_VERIFY_STATE', true);
							_this.$store.commit('IBASE_ACCOUNT_ID', userId);
							_this.$router.push({ path: '/personalCenter' });
						} else {
							Toast('关联ibase账号失败，请重试！');
						}
					}).catch(error => {
						console.log(error);
					});
				}).catch(() => {
				});
			}
		},
		//在$el被替换的时候调用钩子函数
		mounted () {
			let dataList = this.$route.query.dataList;
			console.log(dataList[0].userId);
			if (dataList[0].userId) {
				this.accountDataArray = this.$route.query.dataList;
			} else {
				const _this = this;
				/*
				* 用户返回重新关联时数据丢失，重新获取数据
				* */
				let cardName = _this.$store.getters.getPersonCardInfo.cardName;
				let cardNumber = _this.$store.getters.getPersonCardInfo.cardCode;
				_this.$fetch('/pubWeb/public/faceRecognition/getLinkedAccounts?cardName=' + cardName + '&cardNumber=' + cardNumber)
					.then(dataList => {
						if (dataList.length > 0) {
							_this.accountDataArray = dataList;
						}
					}).catch(error => {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.personal-ibase-account {
		width: 100%;
		height: 100%;
	}

	.ibase-accountList {
		overflow-y: auto;
		margin-bottom: 10px;
		height: calc(100% - 140px);
	}

	.ibase-accountList /deep/ .van-cell__title {
		max-width: none !important;
	}
</style>
