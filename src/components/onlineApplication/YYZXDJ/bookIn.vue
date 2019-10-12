<template>
	<div class="container">
		<page-head title="异议注销登记"></page-head>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>申请人名字
			</div>
			<van-field v-model="qlr" clearable placeholder="请输入申请人名字" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>登记证明号
			</div>
			<van-field v-model="cqzh" clearable placeholder="请输入登记证明号" />
		</van-cell-group>
		<div class="tips">
			提示: 可通过公众号的“信息查询-个人产权查询”查询权利证书号码
		</div>
		<van-cell-group>
			<van-cell class="custom-cell">
				<template>
					<div class="content">
						<div class="content-left">
							<span class="custom-text">证书状态：</span>
							<span class="custom-status">{{ customStatus }}</span>
						</div>
						<div class="content-right">
							<van-button class="verification-button" plain round hairline type="info"
								@click.native="checkoutInfo()">校验</van-button>
						</div>
					</div>
				</template>

			</van-cell>
		</van-cell-group>
		<div style="height: 50px;"></div>
		<van-button size="large" type="info" class="bottom-button" @click.native="nextStep()">下一步</van-button>
		<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect">
			<!-- <p v-for="(action, index) in actions">{{ action.name }}</p> -->
		</van-actionsheet>
	</div>
</template>

<script>
	import Head from '../../app/head.vue';
	import {
		Toast
	} from 'vant';
	import {
		CHECKOUT_REAL_ESTATE
	} from '../../../constants/index.js'
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				estateType: '',
				cqlx: '',
				show: false,
				qlr: '',  // 陈卫行
				cqzh: '粤（）中山市不动产权证明第号',  // 粤（）中山市不动产权证明第号  // 粤（2018）中山市不动产权证明第0029473号
				customStatus: '',
				actions: [{
						name: '房屋'
					},
					{
						name: '土地'
					}
				],
				checkout: {
					"cqxx": [{
						"RID": '',
						"JID": '',
						"FQSZT": '',
						"FBDCQZH": '',
						"FFDZL": '',
						"FJGSJ": '',
						"FFTJZMJ": '',
						"FZYJZMJ": '',
						"FJZMJ": '',
						"FSZC": '',
						"FFWJG": '',
						"FFWXZ": '',
						"FGYFS": '',
						"FTDSYJSSJ": '',
						"FTDSYQSSJ": '',
						"FFTTDMJ": '',
						"FDYTDMJ": '',
						"FZDMJ": '',
						"FQLXZ": '',
						"FQLLX": '',
						"FSYQX": '',
						"FGHYT": '',
						"FZCS": '',
						"FFWBM": '',
						"FQLR": '',
						"FBDCDYH": '',
						"FZJHM": '',
						"FDJSJ": '',
						"FDBR": '',
						// 是否预告
						"SFYG": '',
						// 是否预抵押
						"SFYDY": '',
						// 是否被其他业务关联
						"SFBGL": '',
						// 是否查封
						"SFCF": '',
						// 是否抵押
						"SFDY": '',
						// 是否异议
						"SFYY": '',
						// 是否冻结
						"SFDJ": '',
						// 是否落宗
						"SFLZ": '',
						// 是否行政限制
						"SFXZXZ": ''
					}],
					"dyxx": '',
					"result": '',
					"resultcode": '',
					"resultmsg": '',
					"type": '',
					"ygxx": ''
				}
			}
		},
		methods: {
			estateTypeClicked: function () {
				console.log(this.show);
				this.show = true;
			},
			onSelect: function (val) {
				console.log(val)
				if (val.name == '房屋') {
					this.cqlx = 'FW';
					this.estateType = '房屋';
				} else if (val.name == '土地') {
					this.cqlx = 'TD';
					this.estateType = '土地';
				}
				this.show = false;
			},
			checkoutInfo: function () {
				console.log('校验');
				this.checkoutID();
			},
			checkoutID: function () {
				this.customStatus = '';
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				var formData = new FormData();
				let strJson = JSON.stringify({
					qlr: this.qlr,
					djzmh: this.cqzh,
					MethodName: 'GetObjectionData'
				}) + '';
				formData.append('strJson', strJson);
				formData.append('path', '/WSYY/GeneralExtractData');
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				};
				var _this = this;
				this.axios({
					url: CHECKOUT_REAL_ESTATE,
					method: 'post',
					data: {
						strJson: strJson,
						path: '/WSYY/GeneralExtractData'
					},
					transformRequest: [function (data) {
						let ret = ''
						for (let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(response => {
					console.log(response);
					Toast.clear();
					_this.checkout = response.data;
					if (_this.checkout.resultcode === '0') {
						Toast.fail(_this.checkout.resultmsg);
						return;
					}
					_this.customStatus = '校验通过';
					sessionStorage.setItem('myyxx', JSON.stringify(_this.checkout.yyxx));
					console.log(_this.checkout);
				}).catch(error => {
					Toast.clear();
					console.log(error);
				});


				/* this
					.$post(CHECKOUT_REAL_ESTATE, formData, config)
					.then(response => {
						console.log(response);
					})
					.catch(err => {
						console.log(err);
					}); */

			},
			onCancel: function () {},
			nextStep: function () {
				if (this.customStatus != '校验通过') {
					Toast('请校验证书通过后进行下一步!');
				} else {
					var businessDefinitionId = this.$route.query.businessDefinitionId;
					this.$router.push({
						path: '/onlineApplication/YYZXDJ/info',
						query: {
							businessDefinitionId: businessDefinitionId
						}
					})
				}
			}
		},
		mounted() {
			console.log('bookIn');
			console.log('businessDefinitionId:', this.$route.query.businessDefinitionId);
		},
	}

</script>

<style scoped>
	.van-cell-group {
		padding: .3rem;
	}

	.cell-title {
		font-size: .4rem;
		padding-left: .2rem;
		line-height: 2;
	}

	.required-span {
		color: #ff0000;
		margin-right: .1rem;
	}

	.van-cell {
		padding: .2rem;
		border: 1px solid #d1d1d1;
	}

	.custom-cell {
		border: none;
		padding: 0;
	}

	.custom-cell div .content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.custom-cell div .content .content-left {
		flex: 1;
	}

	.custom-cell div .content .content-left .custom-status {
		color: #00b957;
	}

	.verification-button {
		height: 30px;
		line-height: 30px;
		padding: 0 25px;
	}

	.tips {
		font-size: 14px;
		padding: .3rem;
		color: #999999;
		background-color: #ffffff;
	}

	.bottom-button {
		position: fixed;
		bottom: 0;
		border: none;
		border-radius: 0;
		background: -webkit-gradient(linear, left top, right top, from(#2db6ff), to(#2edbfd)) !important;
		background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	}

	.van-field__control:disabled {
		color: #000;
	}

</style>
