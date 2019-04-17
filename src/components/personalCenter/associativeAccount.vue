<template>
	<div class="personal-ibase-account">
		<head-nav-bar title="选择账户"></head-nav-bar>
		<div class="ibaseAccountList" v-if="accountDataArray.length!==0">
			<van-cell-group v-for="(accountItem, index) in accountDataArray">
				<van-cell :title="accountItem.loginName" @click="associativeAccount(index)" />
			</van-cell-group>
		</div>
	</div>
</template>

<script>

	import headNavBar from './headNavBar';
	import { Dialog, Toast } from 'vant'

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'head-nav-bar': headNavBar,
		},
		data () {
			return {
				accountDataArray: [],
				active: 0,
			}
		},
		watch: {
		},
		methods: {
			/*
				关联已有ibase账户
			 */
			associativeAccount(index) {
				const _this = this;
				Dialog.confirm({
					title: '提示',
					message: '确认关联该账号？'
				}).then(() => {
					const openId = isWx() ? Cookies.get('openid') : '';
					const config = { headers: { 'Content-Type': 'multipart/form-data' } };
					let userId = _this.accountDataArray[index].userId;
					let param = {
						userId: userId,
						openId: openId,
					}
					_this.$post('/pubWeb/public/faceRecognition/updateAccountWxOpenId', param, config).then(response => {
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
			const _this = this;
			/*
			* 已完成人脸识别，直接使用身份信息获取ibase账号
			* */
			let cardName = _this.$store.getters.getPersonCardInfo.cardName;
			let cardCode = _this.$store.getters.getPersonCardInfo.cardCode;
			_this.$post('/pubWeb/public/faceRecognition/getLinkedAccounts?cardName=' + cardName + '&cardCode=' + cardCode)
				.then(dataList => {
					console.log(dataList);
					if (dataList && dataList.length > 0) {
						// 如果只有一个ibase账号，则默认关联直接跳转
						if (dataList.length === 1)  {
							Toast('关联ibase账号成功！');
							_this.$store.commit('SET_VERIFY_STATE', true);
							_this.$store.commit('IBASE_ACCOUNT_ID', dataList[0].userId);
							setTimeout(() => {
								_this.$router.push({ path: '/personalCenter' });
							}, 1000);
						} else {
							_this.accountDataArray = dataList
						}
					} else {
						// 如果没有ibase账号，则到注册页面
						_this.$router.push({ path: '/signInAccount' });
					}
				}).catch(error => {
					console.log(error);
				});
		}
	}
</script>

<style scoped>
</style>
