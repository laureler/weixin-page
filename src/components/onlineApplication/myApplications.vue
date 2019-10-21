<template>
	<div class="container">
		<page-head title="我的业务"></page-head>
		<div class="application-list">
			<van-cell style="padding: 0;">
				<van-field v-model="keyword" clearable placeholder="请输入关键字">
					<van-button slot="button" size="small" type="primary" @click.native="searchKeyword()">搜索
					</van-button>
				</van-field>
			</van-cell>
			<van-list v-model="isLoading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished"
				finished-text="没有更多了" @load="onLoad">
				<div class="application-item" v-for="(item, index) in applications" v-bind:key="index"
					@click="clickedItem(item)">
					<div style="display: none;">{{ item }}</div>
					<div class="item-title">
						申请编号：{{ item.f2 }}
					</div>
					<div class="item-content">
						<div class="flex-box content-name">
							<div class="key">申办业务：</div>
							<div class="value">{{ item['job_base-btitle'] }}</div>
						</div>
						<div class="flex-box content-address">
							<div class="key">坐落：</div>
							<div class="value">{{ item.f4 }}</div>
						</div>
						<div class="flex-box content-reason" v-show="item['job_base-regtype'] === '不通过'">
							<div class="key">原因：</div>
							<div class="value"></div>
						</div>
					</div>
					<div class="flex-box buttons">
						<van-button class="custom-button" square size="large" type="default"
							@click.stop="checkApplication()">申请书</van-button>
						<van-button v-if="item['job_base-datastate'] == 0" class="custom-button" square size="large"
							type="default" @click.stop="deleteCreateJobs(item, index)">删除</van-button>
					</div>
					<div class="status" :class="[item['job_base-regtype'] === '不通过'?'status-fail':'status-success']">
						{{ item['job_base-regtype'] }}
					</div>
				</div>
				<div class="application-item" style="display: none;">
					<div class="item-title">
						申请编号：201903060009
					</div>
					<div class="item-content">
						<div class="flex-box content-name">
							<div class="key">申办业务：</div>
							<div class="value">土地及房屋所有权转移及抵押登记</div>
						</div>
						<div class="flex-box content-address">
							<div class="key">坐落：</div>
							<div class="value">中山市东凤镇凤安路 3 号</div>
						</div>
					</div>
					<div class="flex-box buttons">
						<van-button class="custom-button" square size="large" type="default">查看申请书</van-button>
					</div>
					<div class="status status-success">
						已出证
					</div>
				</div>
				<div class="application-item" style="display: none;">
					<div class="item-title">
						申请编号：201903060009
					</div>
					<div class="item-content">
						<div class="flex-box content-name">
							<div class="key">申办业务：</div>
							<div class="value">土地及房屋所有权转移及抵押登记</div>
						</div>
						<div class="flex-box content-address">
							<div class="key">坐落：</div>
							<div class="value">中山市东凤镇凤安路 3 号</div>
						</div>
					</div>
					<div class="flex-box buttons">
						<van-button class="custom-button" square size="large" type="default">查看类型</van-button>
					</div>
					<div class="status status-discard">
						已作废
					</div>
				</div>
			</van-list>

		</div>
	</div>
</template>

<script>
	import Head from '../app/head';
	import {
		GET_PROGRESS_JOBDATA_BY_MONGODB
	} from '../../constants/index.js';
	import {
		Toast
	} from 'vant';
	import {
		business
	} from '../../constants/data-util';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				applications: [],
				pageIndex: 0,
				isLoading: false,
				error: false,
				finished: false,
				total: 0,
				keyword: ''
			}
		},
		methods: {
			checkApplication: function () {
				console.log('查看申请书');
			},
			deleteCreateJobs: function (item, index) {
				var _this = this;
				this.$dialog.confirm({
					title: '提示',
					message: '确定要删除该条业务吗?'
				}).then(() => {
					// on confirm
					_this.$fetch('/workflowWebService/deleteCreateJobs?processInstanceIds=' + item[
								'job_base-wfrid'] + '&businessNumbers=' + item['job_base-jid'] +
							'&deleteType=2')
						.then(response => {
							_this.applications.splice(index, 1);
						})
						.catch(error => {

						});
				}).catch(() => {
					// on cancel
				});

			},
			onLoad: function () {
				this.pageIndex += 1;
				this.getProgressJobDataByMongodb(true);
			},
			searchKeyword: function () {
				this.pageIndex = 1;
				this.getProgressJobDataByMongodb(true);
			},
			clickedItem: function (item) {
				if (item['job_base-regtype'] === '预审') {
					return;
				}
				console.log('item:', item);
				console.log('business:', business);
				var b = business[item['job_base-bcode']];
				console.log('b:', b);

				if (b != undefined) {
					console.log('业务类型名称:', b['job_base-btitle']);
					this.$router.push({
						path: b.path,
						query: {
							processInstanceId: item['job_base-wfrid']
						}
					});
				} else {
					Toast('无法打开该条业务，\n请使用电脑端打开!');
				}

				/* var path = '';
				switch (item['job_base-btitle']) {
					case '不动产权利证书遗失（换证）登记':
						path = '/onlineApplication/BDCQSZSYSDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '异议登记':
						path = '/onlineApplication/YYDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '异议注销登记':
						path = '/onlineApplication/YYZXDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '不动产权利证书注销登记':
						path = '/onlineApplication/BDCQSZSZXDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '不动产权利证书更正登记':
						path = '/onlineApplication/BDCQSZSGZDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '建设用地使用权、宅基地使用权变更登记':
						path = '/onlineApplication/JSYDSYQBGDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '建设用地使用权、宅基地使用权转移登记':
						path = '/onlineApplication/JSYDSYQZYDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '存量房（二手房）转移登记':
						path = '/onlineApplication/CLFZYDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '房地产权（独幢、层、套、间房屋）转移登记':
						path = '/onlineApplication/FDCQZYDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					case '房地产权（独幢、层、套、间房屋）变更登记':
						path = '/onlineApplication/FDCQBGDJ/info';
						this.$router.push({
							path: path,
							query: {
								processInstanceId: item['job_base-wfrid']
							}
						});
						break;
					default:
						path = '';
						Toast('无法打开该条业务，\n请使用电脑端打开!');
						break;
				}
				console.log('item:', item); */
			},
			getProgressJobDataByMongodb: function (showLoading = false) {
				var searchTxt = '';
				if (this.keyword.length > 0) {
					searchTxt = 'all::' + this.keyword + '::searchtext';
				}
				var _this = this;
				var params = {
					searchTxt: searchTxt, // 'all::2019090400043::searchtext'
					stateSelect: '全部',
					// todo 模块ID
					moduleId: '3df95ec4-a0a9-4e3b-9543-b8e7d0690e6f',
					page: _this.pageIndex,
					rows: 20
				}
				if (showLoading || this.pageIndex === 1) {
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
				}
				this.axios({
					url: GET_PROGRESS_JOBDATA_BY_MONGODB,
					method: 'post',
					data: params,
					transformRequest: [function (data) {
						let ret = ''
						for (let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}]
				}).then(response => {
					Toast.clear();
					console.log(response);
					_this.isLoading = false;
					_this.total = response.data.total;
					if (_this.pageIndex === 1) {
						_this.applications = response.data.rows;
					} else {
						_this.applications.push(...response.data.rows);
					}
					// 数据全部加载完成
					if (_this.applications.length >= _this.total) {
						_this.finished = true;
					}

				}).catch(error => {
					Toast.clear();
					_this.isLoading = false;
					_this.error = true;
					console.log(error);
				});
			}
		},
		mounted() {
			// this.getProgressJobDataByMongodb();
		},
	}

</script>

<style scoped>
	.flex-box {
		display: flex;
	}

	.application-list {
		font-size: .4rem;
		padding-bottom: 10px;
	}

	.application-item {
		border: 1px solid #ccc;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		margin: 10px;
	}

	.item-title {
		padding: .3rem 0;
		margin: 0 10px;
		border-bottom: 1px solid #ccc;
		color: #222222;
		font-weight: bolder;
		font-size: .42rem;
	}

	.item-content {
		padding: 0 10px;
	}

	.item-content>div {
		margin: .3rem 0;
	}

	.key {
		width: 100px;
	}

	.status {
		position: absolute;
		right: 0;
		top: 0;
		font-size: .32rem;
		line-height: 2;
		padding: 0 100px;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		transform: rotate(30deg) translate(85px, -44px);
		z-index: 5000;
	}

	.custom-button {
		border-bottom: none;
	}

	.status-fail {
		border-color: #ff3f64;
		color: #ff3f64;
		opacity: .5;
	}

	.status-success {
		border-color: #00b957;
		color: #00b957;
		opacity: .5;
	}

	.status-discard {
		border-color: #666b6e;
		color: #666b6e;
		opacity: .5;
	}

</style>
