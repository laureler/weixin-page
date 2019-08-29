<template>
	<div class="container">
		<page-head title="不动产权利证书更正登记"></page-head>
		<div class="box-body">
			<van-tabs>
				<van-tab title="基本信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请事项
						</div>
						<van-field id="JOB_SJDJB.FDJLX" right-icon="arrow" placeholder="请选择申请事项" disabled clickable
							@click.native="actionsheetClicked('itemOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>镇区
						</div>
						<van-field id="JOB_SJDJB.FZQDM" right-icon="arrow" placeholder="请选择镇区" disabled clickable
							@click.native="actionsheetClicked('townshipOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							不动产单元号
						</div>
						<van-field id="JOB_BDCQK.FBDCDYH" placeholder="不动产单元号" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							不动产类型
						</div>
						<van-field id="JOB_BDCQK.FBDCLX" right-icon="arrow" placeholder="不动产类型" disabled clickable
							@click.native="actionsheetClicked('estateOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							坐落
						</div>
						<van-field id="JOB_BDCQK.FFDZL" placeholder="坐落" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							面积
						</div>
						<van-field id="JOB_BDCQK.FMJ" placeholder="面积" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							用途
						</div>
						<van-field id="JOB_BDCQK.FYT" placeholder="用途" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							原不动产权证号
						</div>
						<van-field id="JOB_BDCQK.FYBDCQSZH" placeholder="原不动产权证号" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							登记原因
						</div>
						<van-field id="JOB_BDCQK.FDJYY" right-icon="arrow" disabled clearable placeholder="登记原因"
							@click.native="actionsheetClicked('reasonOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							其他原因
						</div>
						<van-field id="JOB_BDCQK.FQTYY" clearable placeholder="其他原因" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							备注
						</div>
						<van-field id="JOB_BDCQK.FBZ" clearable placeholder="备注" />
					</van-cell-group>
				</van-tab>
				<van-tab title="权利人">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请人
						</div>
						<van-field id="JOB_SQRXXB.FSQRMC" clearable placeholder="申请人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>性别
						</div>
						<van-field id="JOB_SQRXXB.FXB" clearable placeholder="性别" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field id="JOB_SQRXXB.FZJZL" clearable placeholder="证件种类" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件号码
						</div>
						<van-field id="JOB_SQRXXB.FZJHM" clearable placeholder="证件号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							国家/地区
						</div>
						<van-field id="JOB_SQRXXB.FGJDQ" right-icon="arrow" disabled clickable placeholder="国家/地区"
							@click.native="actionsheetClicked('countryOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							联系电话
						</div>
						<van-field id="JOB_SQRXXB.FLXDH" clearable placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>共有情况
						</div>
						<van-field id="JOB_SQRXXB.FGYQK" clearable placeholder="共有情况" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field id="JOB_SQRXXB.FQLBL" clearable placeholder="权利比例" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info" @click.native="saveApplicant()">保存
						</van-button>
					</div>
					<div class="applicants">
						<div class="title">
							<div class="name">姓名</div>
							<div class="num">证件号码</div>
							<div class="handle">操作</div>
						</div>
						<div class="content">
							<van-cell-group class="applicants-group" v-for="(item, index) in 2">
								<div class="name">abc</div>
								<div class="num">abc</div>
								<div class="handle">
									<van-button plain round type="info" size="small"
										@click.native="editApplicant(item, index)">编辑</van-button>
								</div>
							</van-cell-group>
						</div>
					</div>
				</van-tab>
				<van-tab title="更正事项">
					<div style="padding: 15px;">提示：若更正类型涉及到权利人更正（如权利人名称、证件号码、证件类型等信息）， 请修改“权利人”相应信息，并将更正内容填写至“更正事项”， 若涉及到房屋信息更正，则只需将更正内容填入“更正事项”表。</div>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>修改内容
						</div>
						<van-field id="JOB_XGXXB.FXGSX" right-icon="arrow" disabled clearable placeholder="修改内容"
							@click.native="actionsheetClicked('contentOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>修改前
						</div>
						<van-field id="JOB_XGXXB.FXGQ" clearable placeholder="修改前" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>修改后
						</div>
						<van-field id="JOB_XGXXB.FXGH" clearable placeholder="修改后" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info">保存
						</van-button>
					</div>
					<div class="applicants">
						<div class="title">
							<div class="name">修改内容</div>
							<div class="num">修改后</div>
							<div class="handle">操作</div>
						</div>
						<div class="content">
							<van-cell-group class="applicants-group" v-for="(item, index) in 2">
								<div class="name">abc</div>
								<div class="num">abc</div>
								<div class="handle">
									<van-button plain round type="info" size="small">编辑</van-button>
								</div>
							</van-cell-group>
						</div>
					</div>
				</van-tab>
			</van-tabs>
			<div style="height: 50px;"></div>
			<div class="bottom-box">
				<van-button size="large" plain type="default">查看申请书</van-button>
				<van-button size="large" type="info" @click.native="nextStep()">下一步</van-button>
			</div>
			<van-actionsheet v-model="actionsheetShow" :actions="actions" cancel-text="取消" @select="onSelect">
			</van-actionsheet>
		</div>
	</div>
</template>

<script>
	//根据权利类型判断不动产类型
	function getBdcType(qllx) {
		var bdclx = "";
		if (qllx == "国有建设用地使用权" || qllx == "宅基地使用权" || qllx == "集体土地所有权" || qllx == "集体建设用地使用权") {
			bdclx = "土地";
		} else if (qllx == "国有建设用地使用权/房屋所有权" || qllx == "集体建设用地使用权/房屋所有权" || qllx == "宅基地使用权/房屋所有权") {
			bdclx = "土地和房屋";
		}
		return bdclx;
	}

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
		GET_BUSINESS_START_FROM,
		START_EXACT_BUSINNESS,
		SAVE_TASK_FORM_DATA,
		FILL_SUB_FORM_DATA,
		ADD_SUB_FORM_DATA,
		TEST
	} from '../../../constants/index.js';
	import {
		Toast
	} from 'vant';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {

				taskId: '',
				JOB_XGXXB: {}, // 更新事项 JOB_XGXXB_LINK.IXG

				itemOptions: [{
					name: '不动产权利证书更正登记'
				}], // 事项
				townshipOptions: [{
					name: '石岐区'
				}, {
					name: '东区'
				}, {
					name: '南区'
				}, {
					name: '西区'
				}, {
					name: '东升'
				}, {
					name: '板芙'
				}, {
					name: '三角'
				}, {
					name: '三乡'
				}, {
					name: '民众'
				}, {
					name: '横栏'
				}, {
					name: '阜沙'
				}, {
					name: '港口'
				}, {
					name: '沙溪'
				}, {
					name: '东凤'
				}, {
					name: '大涌'
				}, {
					name: '南朗'
				}, {
					name: '古镇'
				}, {
					name: '南头'
				}, {
					name: '五桂山'
				}, {
					name: '黄圃'
				}, {
					name: '火炬开发区'
				}, {
					name: '神湾'
				}, {
					name: '坦洲'
				}, {
					name: '小榄'
				}],
				estateOptions: [{
					name: '土地'
				}, {
					name: '房屋与土地'
				}], // 不动产类型
				reasonOptions: [{
					name: '更名更正'
				}, {
					name: '状态更正'
				}], // 登记原因
				countryOptions: [{
					name: '中华人民共和国'
				}], // 国家/地区
				contentOptions: [{
					name: '权利人名称'
				}, {
					name: '身份证明号码'
				}, {
					name: '土地用途'
				}, {
					name: '房屋用途'
				}, {
					name: '土地期限'
				}, {
					name: '土地补出让'
				}, {
					name: '土地界限调整'
				}, {
					name: '房产加建'
				}, {
					name: '地址'
				}, {
					name: '容积率'
				}], // 修改内容
				actions: [],
				actionsheetShow: false,
			}
		},
		methods: {
			actionsheetClicked: function (title) {
				this.actionsheetShow = true;
				this.actions = this.$data[title];
			},
			onSelect: function (val) {
				debugger;
			},
			onCancel: function () {
				this.actionsheetShow = false;
			},
			delApplicant: function () {
				this.$dialog.confirm({
					message: '确定要删除该申请人吗?'
				}).then(() => {
					console.log('删除');
					// on close
				}).catch(() => {
					// on cancel
					console.log('取消');
				});
			},
			saveApplicant: function () {
				debugger;
			},
			editApplicant: function (item, index) { // 编辑申请人
				debugger;
			},
			nextStep: function () {
				this.saveTaskFormData();
				return;
			},
			saveTaskFormData: function () {
				debugger;
				sessionStorage.setItem('formdata', JSON.stringify(this.valuesParams));
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				this.axios({
					url: SAVE_TASK_FORM_DATA + '?taskId=' + this.taskId + '&createType=2',
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
						path: '/onlineApplication/BDCQSZSGZDJ/attachment'
					});
				}).catch(error => {
					Toast.clear();
					Toast('请求出错!');
					console.log(error);
				});
			},
			fillSubFormData: function (title, params, showLoading = false) {
				var business = JSON.parse(sessionStorage.getItem('business'));
				var result = JSON.parse(business.result);
				console.log(result);
				var link = title.split('.')[0];
				var domains = title.split('_LINK')[0]
				var parentrid = result.data.values[link + '.RID'];
				var templateid = result.data.controls[title].linkTplId;
				console.log(result.data.values[link + '.RID']);
				console.log(result.data.controls[title].linkTplId);
				if (showLoading) {
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
				}
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					Toast.clear();
					console.log('FILL_SUB_FORM_DATA:', response);
				}).catch(error => {
					Toast.clear();
					console.log(error);
				});

			},
			startExactBusiness: function (rid, businessNumber) {
				sessionStorage.setItem('jid', businessNumber);
				this.$fetch(START_EXACT_BUSINNESS, {
						srcMark: '$bdcsjtq_cq:RID=' + rid + '&type=1',
						targetJid: businessNumber,
						configureName: '土地及房屋权属证书补换证提取房屋产权'
					}).then(response => {
						console.log(response);
						Toast.clear();
						debugger;
						var qllx = response["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FQLLX"]
						var bdclx = getBdcType(qllx);

						this.fillSubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ', response['JOB_GLQLXXB_LINK.OLD_IQLDJ']);
						this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', response['JOB_SQRXXB_LINK.IQLR']);

					})
					.catch(error => {
						Toast.clear();
						console.log(error);
					});
			}
		},
		mouthed() {

		},
		created() {
			var rid = sessionStorage.getItem('rid') || this.$route.query.cqxx.RID;
			console.log('cqxx:', this.$route.query.cqxx);
			var _this = this;
			Toast.loading({
				mask: true,
				message: '加载中...'
			});
			this
				.$fetch(GET_BUSINESS_START_FROM, {
					businessDefinitionId: _this.$route.query.businessDefinitionId // 业务ID
				})
				.then(function (response) {
					var businessNumber = response.businessNumber;
					_this.startExactBusiness(rid, businessNumber);
					var result = JSON.parse(response.result);
					var values = result.data.values;
					var taskId = response.taskId;
					sessionStorage.setItem('taskId', taskId);
					sessionStorage.setItem('business', JSON.stringify(response));
					_this.taskId = taskId;
					console.log('taskId:', _this.taskId);
				})
				.catch(function (error) {
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

</style>
