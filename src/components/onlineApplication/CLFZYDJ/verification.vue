<template>
	<div class="container">
		<page-head title="存量房转移登记"></page-head>
		<div class="box-body">
			<div class="box-body_head" style="padding: 5px; color:#57C5FA; text-align: center;">
				身份核验
			</div>
			<div class="plate">
				<div class="plate-title"
					style="color: #222; font-weight: bolder; padding: 10px; background-color: #F5F5F5;">买方信息</div>
				<div class="plate-content" style="padding: 10px;">
					<div class="plate-content-item" style="display: flex; justify-content: space-between;"
						v-for="(item, index) in wBuyers" :key="index">
						<div class="item-left" style="flex: 1; word-break: break-all; overflow-wrap: break-word;">
							<div style="word-wrap:break-word; overflow-wrap: break-word; margin-bottom: 5px;">买方:
								{{ item['FSQRMC'] }}
							</div>
							<div style="word-wrap:break-word; overflow-wrap: break-word; margin-bottom: 5px;">手机号码:
								{{ item['FLXDH'] }}</div>
						</div>
						<div class="item-right" style="margin-left: 10px;">
							<van-button v-if="isMine(item)" size="small" plain type="primary"
								style="display: block; color: #ff9b26; border-color: #ff9b26;"
								@click="myVerification()">本人核验</van-button>
							<!-- -if="!item.FXXQRZT || item.FXXQRZT == 0 || item.FXXQRZT == '' || item.FXXQRZT == 'null'" -->
							<van-button v-else size="small" plain type="primary"
								style="display: block; color: #ff9b26; border-color: #ff9b26;"
								@click="getMessageTemplate(item)">发送核验短信</van-button>
							<!-- <van-button v-else size="small" type="primary"
								style="display: block; color: #666666; background-color: #dcdcdc; border-color: #dcdcdc;">
								60s后重新发送</van-button> -->
							<div v-if="item.FXXQRZT == 2 && !isMine(item)" style="color: #999999;">已发短信</div>
							<div v-else-if="item.FXXQRZT == 1" style="color: #4FC47F;">已核验</div>
						</div>
					</div>
				</div>
			</div>
			<div class="plate">
				<div class="plate-title"
					style="color: #222; font-weight: bolder; padding: 10px; background-color: #F5F5F5;">卖方信息</div>
				<div class="plate-content" style="padding: 10px;">
					<div class="plate-content-item" style="display: flex; justify-content: space-between;"
						v-for="(item, index) in wSellers" :key="index">
						<div class="item-left" style="flex: 1; word-break: break-all; overflow-wrap: break-word;">
							<div style="word-wrap:break-word; overflow-wrap: break-word; margin-bottom: 5px;">买方:
								{{ item['FSQRMC'] }}
							</div>
							<div style="word-wrap:break-word; overflow-wrap: break-word; margin-bottom: 5px;">手机号码:
								{{ item['FLXDH'] }}</div>
						</div>
						<div class="item-right" style="margin-left: 10px;">
							<van-button v-if="isMine(item)" size="small" plain type="primary"
								style="display: block; color: #ff9b26; border-color: #ff9b26;"
								@click="myVerification()">本人核验</van-button>
							<!-- -if="!item.FXXQRZT || item.FXXQRZT == 0 || item.FXXQRZT == '' || item.FXXQRZT == 'null'" -->
							<van-button v-else size="small" plain type="primary"
								style="display: block; color: #ff9b26; border-color: #ff9b26;"
								@click="getMessageTemplate(item)">发送核验短信</van-button>
							<!-- <van-button size="small" type="primary"
								style="display: block; color: #666666; background-color: #dcdcdc; border-color: #dcdcdc;">
								60s后重新发送</van-button> -->
							<div v-if="item.FXXQRZT == 2 && !isMine(item)" style="color: #999999;">已发短信</div>
							<div v-else-if="item.FXXQRZT == 1" style="color: #4FC47F;">已核验</div>
						</div>
					</div>
				</div>
			</div>
			<div class="plate">
				<div class="plate-title"
					style="color: #222; font-weight: bolder; padding: 10px; background-color: #F5F5F5;">不动产信息</div>
				<div class="plate-content" style="padding: 10px;">
					<div class="plate-content-item info-item" style="word-break: break-all; overflow-wrap: break-word;">
						<div class="item-top">取得价格：</div>
						<div class="item-bottom">{{ wFormData['JOB_FDCQXXB.FFDCJYJG'] }} 万元</div>
					</div>
					<div class="plate-content-item info-item" style="word-break: break-all; overflow-wrap: break-word;">
						<div class="item-top">不动产单元号：</div>
						<div class="item-bottom">{{ wFormData['JOB_FDCQXXB.FBDCDYH'] }}</div>
					</div>
					<div class="plate-content-item info-item" style="word-break: break-all; overflow-wrap: break-word;">
						<div class="item-top">不动产权证号：</div>
						<div class="item-bottom">{{ wFormData['JOB_FDCQXXB.FBDCQZH'] }}</div>
					</div>
					<div class="plate-content-item info-item" style="word-break: break-all; overflow-wrap: break-word;">
						<div class="item-top">不动产坐落：</div>
						<div class="item-bottom">{{ wFormData['JOB_FDCQXXB.FFDZL'] }}</div>
					</div>
					<div class="plate-content-item info-item" style="word-break: break-all; overflow-wrap: break-word;">
						<div class="item-top">房屋面积：</div>
						<div class="item-bottom">{{ wFormData['JOB_FDCQXXB.FJZMJ'] }} m²</div>
					</div>
				</div>
			</div>
			<div style="height: 50px;"></div>
			<div class="bottom-box">
				<van-button size="large" plain type="default">查看申请书</van-button>
				<van-button size="large" type="info" @click.native="nextStep()">下一步</van-button>
			</div>
		</div>
		<van-dialog v-model="showDialog" show-cancel-button @confirm="confirmDialog()" @cancel="cancelDialog()">
			<div class="dialog-title">提示</div>
			<div class="dialog-content">
				核对业务无误后，点击确认按钮，进行刷脸核验身份。
			</div>
		</van-dialog>
	</div>
</template>

<script>
	// 2019100800045
	// 441324199108284019 超级管理员1
	import Head from '../../app/head.vue';
	import {
		Toast,
		Dialog
	} from 'vant';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				wBuyers: [],
				wSellers: [],
				wFormData: JSON.parse(sessionStorage.getItem('formdata')),
				rids: {},
				userInfo: {},
				showDialog: false,
			}
		},
		methods: {
			confirmDialog() {
				console.log('确认');
				// 进入人脸核身
				this.$router.push({
					path: '/preApprovenew',
					query: {
						callbackUrl: '/pubWeb/public/weChatPublic/onlineApplication/CLFZYDJ/verification'
					}
				})
			},
			cancelDialog() {
				console.log('取消');
			},
			nextStep: function () {
				console.log('下一步');
				var _this = this;
				var pass = true;
				var users = [];
				for (let i = 0; i < _this.wBuyers.length; i++) {
					const element = _this.wBuyers[i];
					if (element.FXXQRZT != 1) {
						pass = false;
						users.push(element['FSQRMC']);
					}
				}
				for (let i = 0; i < _this.wSellers.length; i++) {
					const element = _this.wSellers[i];
					if (element.FXXQRZT != 1) {
						pass = false;
						users.push(element['FSQRMC']);
					}
				}
				if (pass) {
					_this.submitTaskFormData();
				} else {
					var string = users.join('、');
					string = string + '，尚未对信息进行核验确认。'
					Toast(string);
				}
				
/* 				this.$router.push({
					path: '/onlineApplication/CLFZYDJ/success'
				}); */
			},
			submitTaskFormData: function () {
				Toast.loading({
					mask: true,
					message: '提交中...'
				});
				var taskId = sessionStorage.getItem('taskId');
				var formData = JSON.parse(sessionStorage.getItem('formdata'));
				this.axios({
					url: SUBMIT_TASK_FORM_DATA + '?taskId=' + taskId,
					method: 'post',
					data: formData,
					transformRequest: [function (data) {
						let ret = ''
						for (let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(response => {
					console.log(response);
					Toast.clear();
					if (response.status == 200) {
						this.$router.push({
							path: '/onlineApplication/CLFZYDJ/success'
						});
					}
				}).catch(error => {
					console.log(error);
					Toast.clear();
				});
			},
			isMine(item) {
				debugger;
				var FZJHM = item['FZJHM'];
				var zjhm = this.userInfo['TYPENUMB'].split(",")[1];
				if (item['FSQRMC'] == this.userInfo['REALNAME'] && FZJHM === zjhm) {
					return true;
				}
				return false;
			},
			// 本人核验
			myVerification() {
				this.showDialog = true;
				return;
			},
			// 获取短信模板
			getMessageTemplate(item) {
				console.log('item:', item);
				var _this = this;
				this.$fetch('/formengineWebService/getMessageTemplate?code=YWDXQR')
					.then(response => {
						debugger;
						var data = response;
						var msgContent = {};
						var content = data;
						var c1 = content.replace('{0}', item['FSQRMC']);
						var c2 = c1.replace('{1}', item['JID']);
						msgContent.content = c2;
						msgContent.receiverTel = item['FLXDH'];
						msgContent.rid = item['RID'];
						msgContent.type = 1;
						_this.sendMessage(msgContent, item);
					})
					.catch((error) => {
						console.log(error);
					});
			},
			// 发送短信
			sendMessage(msgContent, item) {
				var _this = this;
				let config = {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}
				};
				this.$post('/pubWeb/system/sendSmsMessage', [msgContent], config)
					.then(data => {
						console.log('data:', data);
						_this.updateApplicantState();
						item.sendingSMS = true;
					})
					.catch(error => {
						console.log('error:', error);
					});
			},
			// 更新状态
			updateApplicantState() {
				var _this = this;
				let config = {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}
				};
				this.$post('/formengineWebService/updateApplicantState', this.rids, config)
					.then(data => {
						console.log('data:', data);
						_this.fetchApplicantInfo();
					})
					.catch(error => {
						console.log('error:', error);
					});
			},
			fetchApplicantInfo() {
				var _this = this;
				this.$fetch('/formengineWebService/getApplicantInfo?jid=' + sessionStorage.getItem('jid'))
					.then(data => {
						console.log('data:', data);
						_this.wBuyers = data.JOB_SQRXXB;
						_this.wSellers = data.JOB_SQRXXB_OLD;
						var rids = {}
						debugger;
						for (var key in data) {
							var arr = [];
							for (var index = 0; index < data[key].length; index++) {
								var item = data[key][index];
								if (item['RID']) {
									arr.push(item['RID']);
								}
							}
							rids[key] = arr;
						}
						_this.rids = rids;
					})
					.catch(error => {
						console.log('error:', error);
					});
			},
			fetchUserInfo() {
				let config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				};
				var formData = new FormData();
				formData.append('sql1', '获取登录用户信息');
				formData.append('param1', JSON.stringify({
					"USERID": "00000001-0000-0000-0010-000000000001"
				}));
				var _this = this;
				this.$post('/formengineWebService/execsql', formData, config)
					.then(data => {
						console.log('data:', data);
						_this.userInfo = data.sql1[0];
						_this.fetchApplicantInfo();
					})
					.catch(error => {
						console.log('error:', error);
					});
			}
		},
		mounted() {
			var formData = JSON.parse(sessionStorage.getItem('formdata'));
			console.log('formData:', formData);

			this.fetchUserInfo();
		},
		created() {

		},
	}

</script>

<style scoped>
	.box-body_head {
		font-size: .45rem;
		line-height: 1.5
	}

	.plate {
		font-size: .4rem;
	}

	.info-item {
		padding: 10px 0;
	}

	.info-item:not(:last-child) {
		border-bottom: 1px solid #999;
	}

	.info-item:last-child {
		padding-bottom: 0;
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
	}

	.bottom-box .van-button+.van-button {
		border: none;
		border-radius: 0;
		background: -webkit-gradient(linear, left top, right top, from(#2db6ff), to(#2edbfd)) !important;
		background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	}

	.dialog-title {
		font-weight: bold;
		font-size: .5rem;
		line-height: 2;
		text-align: center;
		color: #ffffff;
		background: -webkit-gradient(linear, left top, right top, from(#2db6ff), to(#2edbfd)) !important;
		background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	}

	.dialog-content {
		padding: 20px;
		font-size: .4rem;
	}

</style>
