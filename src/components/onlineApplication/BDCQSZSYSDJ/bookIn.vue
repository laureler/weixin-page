<!--
 * @Author: charls.fairy
 * @Motto: Your smile is my rainbow.
 * @Website: https://www.fairy520.top/
 * @Github: https://github.com/CharlsPrince
 * @Date: 2019-10-16 19:21:13
 * @LastEditors: charls.fairy
 * @LastEditTime: 2019-10-23 18:21:12
 * @Description: 文件注释
 -->
<template>
	<div class="container">
		<page-head title="不动产权利证书遗失（换证）登记"></page-head>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>不动产类型
			</div>
			<van-field v-model="estateType" right-icon="arrow" placeholder="请输入不动产类型"  clickable 
				@click.native="estateTypeClicked()" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>申请人名字
			</div>
			<van-field v-model="qlr" clearable placeholder="请输入申请人名字" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>权利证书号码
			</div>
			<van-field v-model="cqzh" clearable placeholder="请输入权利证书号码" />
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
								@click.native="checkoutID()">校验</van-button>
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
		data () {
			return {
				estateType: '',
				cqlx: '',
				show: false,
				qlr: '',  // 杨智勇
				cqzh: '',  // 湘（2017）苏仙不动产权第0022928号
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
			checkoutID: function () {
				if (!this.cqlx.length) {
					Toast('请选择不动产类型!');
					return;
				}
				this.customStatus = '';
				Toast.loading({
					duration: 0,
					mask: true,
					message: '加载中...'
				});
				this.axios.get(CHECKOUT_REAL_ESTATE, {
					params: {
						strJson: {
							qlr: this.qlr,
							cqzh: this.cqzh,
							cqlx: this.cqlx,
						},
						path: '/WSYY/GetPropertyRightInfo'
					}
				}).then(res => {
					Toast.clear();
					console.log(res)
					this.checkout = res.data;

					if (this.checkout.resultcode === '0') {
						Toast(this.checkout.resultmsg);
						this.customStatus = this.checkout.resultmsg;
						return;
					}

					sessionStorage.setItem('rid', this.checkout.cqxx[0].RID);
					if (this.checkout.cqxx.length == 0) {
						Toast('证书不存在!');
						this.customStatus = '证书不存在!';
					} else if (this.checkout.cqxx.length == 1) {
						var state = '';
						if (this.checkout.cqxx[0].SFYG == 1) {
							state += '已预告、'
						} else if (this.checkout.cqxx[0].SFYDY == 1) {
							state += '已抵押、'
						} else if (this.checkout.cqxx[0].SFBGL == 1) {
							state += '已被其他业务关联、'
						} else if (this.checkout.cqxx[0].SFCF == 1) {
							state += '已查封、'
						} else if (this.checkout.cqxx[0].SFDY == 1) {
							state += '已抵押、'
						} else if (this.checkout.cqxx[0].SFYY == 1) {
							state += '已异议、'
						} else if (this.checkout.cqxx[0].SFDJ == 1) {
							state += '已冻结、'
						} else if (this.checkout.cqxx[0].SFLZ == 0) {
							state += '未落宗、'
						} else if (this.checkout.cqxx[0].SFXZXZ == 1) {
							state += '已行政限制、'
						} else {
							state += "校验通过、"
						}
						if (state != '') {
							this.customStatus = state.substring(0, state.length - 1);
						}
					}
				}).catch(err => {
					Toast.clear();
					console.log(err)
					Toast.fail(err);
				})
			},
			onCancel: function () {},
			nextStep: function () {
				if (this.customStatus != '校验通过') {
					Toast('请校验证书通过后进行下一步!');
				} else {
					var businessDefinitionId = sessionStorage.getItem('businessDefinitionId');
					this.$router.push({
						path: '/onlineApplication/BDCQSZSYSDJ/info',
						query: {
							cqxx: this.checkout.cqxx[0],
							businessDefinitionId: businessDefinitionId
						}
					})
				}
			}
		},
		mounted () {
			console.log('bookIn');
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
