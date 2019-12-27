<template>
	<div class="container">
		<page-head title="权籍调查申请"></page-head>
		<div class="box-body">
			<van-tabs>
				<van-tab title="基本信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请事项
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FDJLX']" right-icon="arrow" placeholder="请选择申请事项"
							  clickable 
							@click.native="applicationClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>镇区
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FZQDM']" right-icon="arrow" placeholder="请选择镇区"
							  clickable 
							@click.native="townshipClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权调原因
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FQDYY']" right-icon="arrow" placeholder="权调原因"
							  clickable 
							@click.native="investigateReasonClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>面积
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FMJ']" clearable placeholder="面积" />
					</van-cell-group>

					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>产权坐落
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FZL']" clearable placeholder="产权坐落" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							原不动产权证号
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FYBDCQZSH']" clearable placeholder="原不动产权证号" />
					</van-cell-group>
				</van-tab>
				<van-tab title="申请人">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请人
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FSQRMC']" clearable placeholder="申请人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>联系电话
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FLXDH']" clearable placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FZJZL']" right-icon="arrow" placeholder="请选择证件种类"
							  clickable 
							@click.native="certificateClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件号码
						</div>
						<van-field v-model="valuesParams['JOB_QDXXB.FZJHM']" clearable placeholder="证件号码" />
					</van-cell-group>
				</van-tab>
			</van-tabs>
			<div style="height: 50px;"></div>
			<div class="bottom-box">
				<!-- <van-button size="large" plain type="default" @click="checkBox()">查看申请书</van-button> -->
				<van-button size="large" type="info" @click.native="nextStep()">下一步</van-button>
			</div>
			<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect">
				<!-- <p v-for="(action, index) in actions">{{ action.name }}</p> -->
			</van-actionsheet>
		</div>
	</div>
</template>

<script>
	function cleanParams(datas) {
		var v_data = {};
		for (var a in datas) {
			if (datas[a] != null && datas[a] instanceof Array) {
				v_data[a] = [];
			} else {
				v_data[a] = null;
			}
		}
		return v_data;
	}
	import Head from '../../app/head.vue';
	import {
		Toast
	} from 'vant';
	import {
		GET_BUSINESS_START_FROM,
		START_EXACT_BUSINNESS,
		SAVE_TASK_FORM_DATA,
		FILL_SUB_FORM_DATA,
		ADD_SUB_FORM_DATA,
		TEST,
		SUBMIT_TASK_FORM_DATA,
		exchangeZqdm,
    exchangeZqdmToZqmc
	} from '../../../constants/index.js'
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				show: false,
				type: 0,
				valuesParams: {}, // 主表
				applications: [{
					name: '权籍调查申请'
				}],
				townships: [{
						name: '石岐区'
					},
					{
						name: '东区'
					},
					{
						name: '南区'
					},
					{
						name: '西区'
					},
					{
						name: '东升'
					},
					{
						name: '板芙'
					},
					{
						name: '三角'
					},
					{
						name: '三乡'
					},
					{
						name: '民众'
					},
					{
						name: '横栏'
					},
					{
						name: '阜沙'
					},
					{
						name: '港口'
					},
					{
						name: '沙溪'
					},
					{
						name: '东凤'
					},
					{
						name: '大涌'
					},
					{
						name: '南朗'
					},
					{
						name: '古镇'
					},
					{
						name: '南头'
					},
					{
						name: '五桂山'
					},
					{
						name: '黄圃'
					},
					{
						name: '火炬开发区'
					},
					{
						name: '神湾'
					},
					{
						name: '坦洲'
					},
					{
						name: '小榄'
					}
				],
				actions: [],
				taskId: '',
				investigateReasons: [{
						name: '首次登记'
					},
					{
						name: '面积变更'
					},
					{
						name: '申请分割'
					},
					{
						name: '申请合并'
					}
				],
				certificates: [{
					name: '身份证'
				}, {
					name: '港澳台身份证'
				}, {
					name: '护照'
				}, {
					name: '户口簿'
				}, {
					name: '军官证（士兵证）'
				}, {
					name: '组织机构代码'
				}, {
					name: '营业执照'
				}, {
					name: '其他'
				}],
				goBack: false,
			}
		},
		methods: {
			checkBox: function () {
				window.open(
					'/SouthGISBI/vision/openresource.jsp?resid=I2c9591a8016a69c669c6c39d016a8704d9b97d32&user=admin&password=12345&paramsInfo=%5B%7Bname%3A%22jid%22%2Cvalue%3A%22201908281931%22%7D%5D'
					)
			},
			onCancel: function () {
				this.show = false;
			},
			applicationClicked: function () {
				this.show = true;
				this.type = 0;
				this.actions = this.applications;
			},
			townshipClicked: function () {
				this.show = true;
				this.type = 1;
				this.actions = this.townships;
			},
			investigateReasonClicked: function () {
				this.show = true;
				this.type = 2;
				this.actions = this.investigateReasons;
			},
			certificateClicked: function () {
				this.show = true;
				this.type = 3;
				this.actions = this.certificates;
			},
			onSelect: function (val) {
				console.log(val)
				this.show = false;
				if (this.type == 0) {
					this.valuesParams['JOB_SJDJB.FDJLX'] = val.name;
				} else if (this.type == 1) {
					this.valuesParams['JOB_SJDJB.FZQDM'] = val.name;
				} else if (this.type == 2) {
					this.valuesParams['JOB_QDXXB.FQDYY'] = val.name;
				} else if (this.type == 3) {
					this.valuesParams['JOB_QDXXB.FZJZL'] = val.name;
				}
			},
			nextStep: function () {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var reg2 = /(^[1]+[3-9]+\d{9}$)/;
				//基本信息内容判断未填项
				if (!this.valuesParams['JOB_SJDJB.FDJLX'] || this.valuesParams['JOB_SJDJB.FDJLX'].length == 0) {
					Toast('请选择申请事项!');
					return;
				} else if (!this.valuesParams['JOB_SJDJB.FZQDM'] || this.valuesParams['JOB_SJDJB.FZQDM'].length == 0) {
					Toast('请选择镇区!');
					return;
				} else if (!this.valuesParams['JOB_QDXXB.FQDYY'] || this.valuesParams['JOB_QDXXB.FQDYY'].length == 0) {
					Toast('请填写权调原因!');
					return;
				} else if (!this.valuesParams['JOB_QDXXB.FMJ'] || this.valuesParams['JOB_QDXXB.FMJ'].length == 0) {
					Toast('请填写面积!');
					return;
				} else if (!this.valuesParams['JOB_QDXXB.FZL'] || this.valuesParams['JOB_QDXXB.FZL'].length == 0) {
					Toast('请填写产权坐落!');
					return;
				}
				//申请人内容判断未填项
				if (!this.valuesParams['JOB_QDXXB.FSQRMC'] || this.valuesParams['JOB_QDXXB.FSQRMC'].length == 0) {
					Toast('请填写申请人姓名!');
					return;
				} else if (!this.valuesParams['JOB_QDXXB.FLXDH'] || this.valuesParams['JOB_QDXXB.FLXDH'].length == 0) {
					Toast('请填写申请人联系电话!');
					return;
				} else if (!reg2.test(this.valuesParams['JOB_QDXXB.FLXDH'])) {
					Toast('请填写申请人正确的联系电话!');
					return;
				} else if (!this.valuesParams['JOB_QDXXB.FZJZL'] || this.valuesParams['JOB_QDXXB.FZJZL'].length == 0) {
					Toast('请选择申请人证件种类!');
					return;
				} else if (!this.valuesParams['JOB_QDXXB.FZJHM'] || this.valuesParams['JOB_QDXXB.FZJHM'].length == 0) {
					Toast('请填写申请人证件号码!');
					return;
				} else if (this.valuesParams['JOB_QDXXB.FZJZL'] === "身份证" && !reg.test(this.valuesParams['JOB_QDXXB.FZJHM'])) {
					Toast('请填写申请人正确的证件号码!');
					return;
				}

				this.submitTaskFormData();
				return;
			},
			// saveTaskFormData: function () {
			// 	sessionStorage.setItem('formdata', JSON.stringify(this.valuesParams));
			// 	Toast.loading({
					duration: 0,
			// 		mask: true,
			// 		message: '加载中...'
			// 	});
			// 	var _this = this;
			// 	this.axios({
			// 		url: SAVE_TASK_FORM_DATA + '?taskId=' + this.taskId + '&createType=2',
			// 		method: 'post',
			// 		data: this.valuesParams,
			// 		transformRequest: [function (data) {
			// 			let ret = ''
			// 			for (let it in data) {
			// 				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			// 			}
			// 			return ret
			// 		}],
			// 		headers: {
			// 			'Content-Type': 'application/x-www-form-urlencoded'
			// 		}
			// 	}).then(response => {
			// 		console.log('saveTaskFormData', response);
			// 		Toast.clear();
			// 		this.$router.push({
			// 			path: '/onlineApplication/QJDCSQ/success'
			// 		});
			// 	}).catch(error => {
			// 		Toast.clear();
			// 		Toast('请求出错!');
			// 		console.log(error);
			// 	});
			// },
			submitTaskFormData: function () {
				Toast.loading({
					duration: 0,
					mask: true,
					message: '提交中...'
				});
				this.axios({
					url: SUBMIT_TASK_FORM_DATA + '?taskId=' + this.taskId + '&createType=2',
					method: 'post',
					data: this.valuesParams,
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
					this.$router.push({
						path: '/onlineApplication/QJDCSQ/success'
					});
				}).catch(error => {
					console.log(error);
					Toast.clear();
					Toast('请求失败');
				});
			}
		},
		mouthed() {

		},
		created() {
			var _this = this;
			Toast.loading({
					duration: 0,
				mask: true,
				message: '加载中...'
			});
			this.$fetch(GET_BUSINESS_START_FROM, {
				businessDefinitionId: sessionStorage.getItem('businessDefinitionId') // 业务ID
			}).then(function (response) {
				Toast.clear();
				var businessNumber = response.businessNumber;
				var result = JSON.parse(response.result);
				var values = result.data.values;
				var taskId = response.taskId;
				sessionStorage.setItem('taskId', taskId);
				sessionStorage.setItem('business', JSON.stringify(response));
				_this.taskId = taskId;
				console.log('taskId:', _this.taskId);
				_this.valuesParams = values;
				console.log('>>>:', _this.valuesParams);
				sessionStorage.setItem('jid', businessNumber);
			}).catch(function (error) {
				console.log(error);
				Toast.clear();
			});
		}
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



	.buttons {
		padding: .8rem;
		text-align: center;
	}

	.info-btn {
		width: 100px;
	}

	.info-btn+.info-btn {
		margin-left: 20px;
	}

	.applicants .title {
		display: flex;
		font-weight: bolder;
	}

	.applicants .title .name {
		width: 25%;
		font-size: .4rem;
		text-align: center;
		line-height: 3;
	}

	.applicants .title .num {
		width: 55%;
		font-size: .4rem;
		text-align: center;
		line-height: 3;
	}

	.applicants .title .handle {
		width: 20%;
		font-size: .4rem;
		text-align: center;
		line-height: 3;
	}

	.applicants-group {
		display: flex;
		padding: .3rem 0;
		align-items: center;
	}

	.applicants-group .name {
		width: 25%;
		font-size: .35rem;
		text-align: center;
		word-wrap: break-word;
	}

	.applicants-group .num {
		width: 55%;
		font-size: .35rem;
		text-align: center;
		word-wrap: break-word;
		padding: .2rem;
	}

	.applicants-group .handle {
		width: 20%;
		font-size: .35rem;
		text-align: center;
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

	.field-background {
		background-color: #E5E5E5;
		color: #333333;
	}

	.van-field__control:disabled {
		color: #000;
	}

</style>
