<template>
	<div class="container">
		<page-head title="不动产权利证书遗失（换证）登记"></page-head>
		<div class="box-body">
			<van-tabs>
				<van-tab title="基本信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产类型
						</div>
						<van-field v-model="application" right-icon="arrow" placeholder="请选择申请事项"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="applicationClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>镇区
						</div>
						<van-field v-model="township" right-icon="arrow" placeholder="请选择镇区"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="townshipClicked()" />
					</van-cell-group>
				</van-tab>
				<van-tab title="不动产信息">
					<van-cell-group>
						<div class="cell-title">
							不动产单元号
						</div>
						<van-field id="JOB_BDCQK.FBDCDYH" v-model="estateInfo['JOB_BDCQK.FBDCDYH']" placeholder="不动产单元号"
							clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							不动产类型
						</div>
						<van-field id="JOB_BDCQK.FBDCLX" right-icon="arrow" v-model="estateInfo['JOB_BDCQK.FBDCLX']"
							placeholder="不动产类型" disabled clickable @click.native="typeClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							坐落
						</div>
						<van-field id="JOB_BDCQK.FFDZL" v-model="estateInfo['JOB_BDCQK.FFDZL']" placeholder="坐落"
							clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							面积
						</div>
						<van-field id="JOB_BDCQK.FMJ" v-model="estateInfo['JOB_BDCQK.FMJ']" placeholder="面积"
							clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							用途
						</div>
						<van-field id="JOB_BDCQK.FYT" v-model="estateInfo['JOB_BDCQK.FYT']" placeholder="用途"
							clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							原不动产权证明
						</div>
						<van-field id="JOB_BDCQK.FYBDCQSZH" v-model="estateInfo['JOB_BDCQK.FYBDCQSZH']"
							placeholder="原不动产权证明" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							登记原因
						</div>
						<van-field id="JOB_BDCQK.FDJYY" v-model="estateInfo['JOB_BDCQK.FDJYY']" clearable
							placeholder="登记原因" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							备注
						</div>
						<van-field id="JOB_BDCQK.FBZ" v-model="estateInfo['JOB_BDCQK.FBZ']" clearable
							placeholder="备注" />
					</van-cell-group>
				</van-tab>
				<van-tab title="申请人信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请人
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FSQRMC']" clearable placeholder="申请人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>性别
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FXB']" clearable placeholder="性别" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FZJZL']" clearable placeholder="证件种类" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件号码
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FZJHM']" clearable placeholder="证件号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							国家/地区
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FGJDQ']" clearable placeholder="国家/地区" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							联系电话
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FLXDH']" clearable placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>共有情况
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FGYQK']" clearable placeholder="共有情况" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FQLBL']" clearable placeholder="权利比例" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info" @click.native="saveApplicant()">保存
						</van-button>
						<van-button class="info-btn" size="small" type="default" v-if="editApplicantState"
							@click.native="delApplicant()">删除申请人
						</van-button>
					</div>
					<div class="applicants">
						<div class="title">
							<div class="name">姓名</div>
							<div class="num">证件号码</div>
							<div class="handle">操作</div>
						</div>
						<div class="content">
							<van-cell-group class="applicants-group" v-for="(item, index) in applicants">
								<div class="name">{{ item['JOB_SQRXXB.FSQRMC'] || '' }}</div>
								<div class="num">{{ item['JOB_SQRXXB.FZJHM'] || '' }}</div>
								<div class="handle">
									<van-button plain round type="info" size="small"
										@click.native="editApplicant(item, index)">编辑</van-button>
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
			<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect">
				<!-- <p v-for="(action, index) in actions">{{ action.name }}</p> -->
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
	} from '../../../constants/index.js'
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				show: false,
				type: 0,
				application: "",
				township: "",
				estateInfo: { // 不动产信息 
					//此处需要更改信息字段保证与传递过来的数据字段一致,便于直接赋值见下面
					//created()方法
					'JOB_BDCQK.FBDCDYH': "", // 不动产单元号
					'JOB_BDCQK.FBDCLX': "", // 不动产类型
					'JOB_BDCQK.FFDZL': "", // 坐落
					'JOB_BDCQK.FMJ': "", // 面积
					'JOB_BDCQK.FYT': "", // 用途
					'JOB_BDCQK.FYBDCQSZH': "", // 原不动产权证明
					'JOB_BDCQK.FDJYY': "", // 登记原因
					'JOB_BDCQK.FBZ': "" // 备注
				},
				applicant: { // 申请人信息
					//此处需要更改信息字段保证与传递过来的数据字段一致,便于直接赋值见下面
					//created()方法
					'JOB_SQRXXB.FBZ': null,
					'JOB_SQRXXB.FDLJG': null,
					'JOB_SQRXXB.FDLRDH': null,
					'JOB_SQRXXB.FDLRMC': null,
					'JOB_SQRXXB.FDLRZJHM': null,
					'JOB_SQRXXB.FDWXZ': "",
					'JOB_SQRXXB.FDZYJ': null,
					'JOB_SQRXXB.FFRMC': null,
					'JOB_SQRXXB.FFRZJHM': null,
					'JOB_SQRXXB.FGJDQ': null,
					'JOB_SQRXXB.FGYQK': "",
					'JOB_SQRXXB.FGZDW': null,
					'JOB_SQRXXB.FHJSZSS': null,
					'JOB_SQRXXB.FLXDH': "",
					'JOB_SQRXXB.FLXR': null,
					'JOB_SQRXXB.FQLBL': null,
					'JOB_SQRXXB.FSQRLX': "",
					'JOB_SQRXXB.FSQRMC': "",
					'JOB_SQRXXB.FSSHY': null,
					'JOB_SQRXXB.FTXDZ': null,
					'JOB_SQRXXB.FXB': null,
					'JOB_SQRXXB.FXXQRZT': null,
					'JOB_SQRXXB.FYB': null,
					'JOB_SQRXXB.FZJHM': "",
					'JOB_SQRXXB.FZJZL': "",
					'JOB_SQRXXB.FZP': null,
					'JOB_SQRXXB.RID': "",
					'JOB_SQRXXB.SYS_MRID': "",
					'JOB_SQRXXB.XH': ""
				},
				applications: [{
						name: '不动产权利证书补证登记'
					},
					{
						name: '不动产权利证书换证登记'
					}
				],
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
					}
				],
				types: [{
					name: '土地'
				}, {
					name: '土地与房屋'
				}],
				actions: [],
				applicants: [],
				editApplicantState: false,
				applicantIndex: 0,
				taskId: '',
				valuesParams: {},
			}
		},
		methods: {
			onSelect: function (val) {
				console.log(val)
				this.show = false;
				if (this.type == 0) {
					this.application = val.name;
				} else if (this.type == 1) {
					this.township = val.name;
				} else {
					this.estateInfo['JOB_BDCQK.FBDCLX'] = val.name;
				}
			},
			onCancel: function () {
				this.show = false;
			},
			applicationClicked: function () {
				console.log(this.cqxx);
				this.show = true;
				this.type = 0;
				this.actions = this.applications;
			},
			townshipClicked: function () {
				this.show = true;
				this.type = 1;
				this.actions = this.townships;
			},
			typeClicked: function () {
				this.show = true;
				this.type = 2;
				this.actions = this.types;
			},
			delApplicant: function () {
				this.$dialog.confirm({
					message: '确定要删除该申请人吗?'
				}).then(() => {
					console.log('删除');
					this.applicants.splice(this.applicantIndex, 1);
					this.applicantIndex = 0;
					this.editApplicantState = false;
					// on close
				}).catch(() => {
					// on cancel
					console.log('取消');
				});
			},
			saveApplicant: function () {

				if (this.applicant['JOB_SQRXXB.SYS_MRID'].length == 0) {
					this.$toast('请选择申请人!');
				} else {

					this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', [this.applicant]);

/* 					var title = 'JOB_SQRXXB_LINK.IQLR';
					var business = JSON.parse(sessionStorage.getItem('business'));
					var result = JSON.parse(business.result);
					console.log(result);
					var link = title.split('.')[0];
					var domains = title.split('_LINK')[0]
					var parentrid = result.data.values[link + '.RID'];
					var templateid = result.data.controls[title].linkTplId;
					console.log(result.data.values[link + '.RID']);
					console.log(result.data.controls[title].linkTplId);

					this.axios({
						url: FILL_SUB_FORM_DATA + '?parentdomname=' + title + '&type=0' + '&parentrid=' + parentrid +
							'&templateid=' + templateid  + '&domains=' + domains +
							'&jid=' + sessionStorage.getItem('jid'),
						//'?jid=' + sessionStorage.getItem('jid') +
						//	'&parentdomname=' + title + '&parentrid=' + parentrid +
						//	'&templateid=' + templateid + '&mrid=' + this.applicant['JOB_SQRXXB.SYS_MRID'],
						method: 'post',
						data: this.applicant,
					}).then(response => {
						console.log('ADD_SUB_FORM_DATA:', response);
					}).catch(error => {
						console.log(error);
					}); */
				}

				/* 				if (this.editApplicantState) {  // 编辑状态
									this.applicants[this.applicantIndex] = this.applicant;
									this.applicant = cleanParams(this.applicant);
									this.applicantIndex = 0;
									this.editApplicantState = false;
								} else {  // 新增状态
									this.applicants.push(this.applicant);
									this.applicantIndex = 0;
									this.editApplicantState = false;
								} */
			},
			editApplicant: function (item, index) { // 编辑申请人
				// this.editApplicantState = true;
				this.applicantIndex = index;
				this.applicant = item;
			},
			nextStep: function () {
				this.saveTaskFormData();
				return;

			},
			saveTaskFormData: function () {
				this.valuesParams['JOB_BDCQK.FBDCDYH'] = this.estateInfo['JOB_BDCQK.FBDCDYH'];
				this.valuesParams['JOB_BDCQK.FBDCLX'] = this.estateInfo['JOB_BDCQK.FBDCLX'];
				this.valuesParams['JOB_BDCQK.FFDZL'] = this.estateInfo['JOB_BDCQK.FFDZL'];

				this.valuesParams['JOB_BDCQK.FMJ'] = this.estateInfo['JOB_BDCQK.FMJ'];
				this.valuesParams['JOB_BDCQK.FYT'] = this.estateInfo['JOB_BDCQK.FYT'];

				this.valuesParams['JOB_BDCQK.FYBDCQSZH'] = this.estateInfo['JOB_BDCQK.FYBDCQSZH'];
				this.valuesParams['JOB_BDCQK.FDJYY'] = this.estateInfo['JOB_BDCQK.FDJYY'];
				this.valuesParams['JOB_BDCQK.FBZ'] = this.estateInfo['JOB_BDCQK.FBZ'];
				this.valuesParams['JOB_SJDJB.FDJLX'] = this.application;
				this.valuesParams['JOB_SJDJB.FZQDM'] = this.township;

				sessionStorage.setItem('formdata', JSON.stringify(this.valuesParams));
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
					this.$router.push({
						path: '/onlineApplication/BDCQSZSYSDJ/attachment'
					});
				}).catch(error => {
					console.log(error);
				});
			},
			fillSubFormData: function (title, params) {
				var business = JSON.parse(sessionStorage.getItem('business'));
				var result = JSON.parse(business.result);
				console.log(result);
				var link = title.split('.')[0];
				var domains = title.split('_LINK')[0]
				var parentrid = result.data.values[link + '.RID'];
				var templateid = result.data.controls[title].linkTplId;
				console.log(result.data.values[link + '.RID']);
				console.log(result.data.controls[title].linkTplId);

				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					console.log('FILL_SUB_FORM_DATA:', response);
				}).catch(error => {
					console.log(error);
				});

			},
			startExactBusiness: function (rid, businessNumber) {
				console.log(rid);
				console.log(businessNumber);
				sessionStorage.setItem('jid', businessNumber);
				this.$fetch(START_EXACT_BUSINNESS, {
						srcMark: '$bdcsjtq_cq:RID=' + rid + '&type=1',
						targetJid: businessNumber,
						configureName: '土地及房屋权属证书补换证提取房屋产权'
					}).then(response => {
						console.log(response);

						this.estateInfo['JOB_BDCQK.FBDCDYH'] = response['JOB_BDCQK.FBDCDYH'];
						var qllx = response["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FQLLX"]
						var bdclx = getBdcType(qllx);
						this.estateInfo['JOB_BDCQK.FBDCLX'] = bdclx;
						this.estateInfo['JOB_BDCQK.FFDZL'] = response['JOB_BDCQK.FFDZL'];

						this.estateInfo['JOB_BDCQK.FMJ'] = response['JOB_BDCQK.FJZMJ'];
						this.estateInfo['JOB_BDCQK.FYT'] = response['JOB_BDCQK.FFWYT'];

						this.estateInfo['JOB_BDCQK.FYBDCQSZH'] = response['JOB_BDCQK.FYBDCQSZH'];
						this.estateInfo['JOB_BDCQK.FZDMJ'] = response['JOB_BDCQK.FZDMJ'];

						this.applicants = response['JOB_SQRXXB_LINK.IQLR'];

						this.fillSubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ', response['JOB_GLQLXXB_LINK.OLD_IQLDJ']);
						this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', response['JOB_SQRXXB_LINK.IQLR']);
					})
					.catch(error => {
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
			this.$fetch(GET_BUSINESS_START_FROM, {
					businessDefinitionId: '9ee6baf1-beef-4d08-9848-67f2d185da5a' // 业务ID
				}).then(function (response) {
					var businessNumber = response.businessNumber;
					_this.startExactBusiness(rid, businessNumber);
					var result = JSON.parse(response.result);
					var values = result.data.values;
					var taskId = response.taskId;
					sessionStorage.setItem('taskId', taskId);
					sessionStorage.setItem('business', JSON.stringify(response));
					_this.taskId = taskId;
					_this.valuesParams = values;
					console.log('result:', result);
					console.log('taskId:', _this.taskId);
				})
				.catch(function (error) {
					console.log(error);
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
