<template>
	<div class="container">
		<page-head title="建设用地使用权、宅基地使用权转移登记"></page-head>
		<div class="box-body">
			<van-tabs>
				<van-tab title="基本信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请事项
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
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产单元号
						</div>
						<van-field class="field-background" id="JOB_BDCQK.FBDCDYH" v-model="estateInfo['JOB_BDCQK.FBDCDYH']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产类型
						</div>
						<van-field class="field-background" id="JOB_BDCQK.FBDCLX" v-model="estateInfo['JOB_BDCQK.FBDCLX']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>坐落
						</div>
						<van-field class="field-background" id="JOB_BDCQK.FFDZL" v-model="estateInfo['JOB_BDCQK.FFDZL']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							面积
						</div>
						<van-field class="field-background" id="JOB_BDCQK.FMJ" v-model="estateInfo['JOB_BDCQK.FMJ']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							用途
						</div>
						<van-field class="field-background" id="JOB_BDCQK.FYT" v-model="estateInfo['JOB_BDCQK.FYT']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>原不动产权证号
						</div>
						<van-field class="field-background" id="JOB_BDCQK.FYBDCQSZH" v-model="estateInfo['JOB_BDCQK.FYBDCQSZH']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>登记原因
						</div>
						<van-field v-model="registerReason" right-icon="arrow" placeholder="请选择登记原因"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="registerReasonClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							其他原因
						</div>
						<van-field id="JOB_JSYDCQXXB.FQTYY" v-model="estateInfo['JOB_JSYDCQXXB.FQTYY']" clearable
							placeholder="其他原因" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							备注
						</div>
						<van-field id="JOB_BDCQK.FBZ" v-model="estateInfo['JOB_BDCQK.FBZ']" clearable
							placeholder="备注" />
					</van-cell-group>
				</van-tab>
				<van-tab title="受让人">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请人
						</div>
						<van-field v-model="person" clearable placeholder="申请人" />
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
						<van-field v-model="idCard" clearable placeholder="证件号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>单位性质
						</div>
						<van-field class="field-background" v-model="applicant['JOB_SQRXXB.FDWXZ']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>国家/地区
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FGJDQ']" right-icon="arrow" placeholder="请选择国家地区"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="countryClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>户籍所属省份
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FHJSZSS']" right-icon="arrow" placeholder="请选择户籍所属省份"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="provinceClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>联系电话
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
						<van-button class="info-btn" size="small" type="info" @click.native="saveApplicant(0)">保存
						</van-button>
						<van-button class="info-btn" size="small" type="default" v-if="editApplicantState"
							@click.native="delApplicant(0)">删除申请人
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
										@click.native="editApplicant(item, index, 0)">编辑</van-button>
								</div>
							</van-cell-group>
						</div>
					</div>
				</van-tab>
				<van-tab title="转让人">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请人
						</div>
						<van-field v-model="assignorPerson" clearable placeholder="申请人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>性别
						</div>
						<van-field v-model="assignor['JOB_SQRXXB.FXB']" clearable placeholder="性别" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field v-model="assignor['JOB_SQRXXB.FZJZL']" clearable placeholder="证件种类" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件号码
						</div>
						<van-field v-model="assignorIdCard" clearable placeholder="证件号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>单位性质
						</div>
						<van-field class="field-background" v-model="assignor['JOB_SQRXXB.FDWXZ']" disabled/>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>国家/地区
						</div>
						<van-field v-model="assignor['JOB_SQRXXB.FGJDQ']" right-icon="arrow" placeholder="请选择国家地区"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="countryClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>户籍所属省份
						</div>
						<van-field v-model="assignor['JOB_SQRXXB.FHJSZSS']" right-icon="arrow" placeholder="请选择户籍所属省份"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="provinceClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>联系电话
						</div>
						<van-field v-model="assignor['JOB_SQRXXB.FLXDH']" clearable placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>共有情况
						</div>
						<van-field v-model="assignor['JOB_SQRXXB.FGYQK']" clearable placeholder="共有情况" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field v-model="assignor['JOB_SQRXXB.FQLBL']" clearable placeholder="权利比例" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info" @click.native="saveApplicant(1)">保存
						</van-button>
						<van-button class="info-btn" size="small" type="default" v-if="editAssignorState"
							@click.native="delApplicant(1)">删除申请人
						</van-button>
					</div>
					<div class="applicants">
						<div class="title">
							<div class="name">姓名</div>
							<div class="num">证件号码</div>
							<div class="handle">操作</div>
						</div>
						<div class="content">
							<van-cell-group class="applicants-group" v-for="(item, index) in assignors">
								<div class="name">{{ item['JOB_SQRXXB.FSQRMC'] || '' }}</div>
								<div class="num">{{ item['JOB_SQRXXB.FZJHM'] || '' }}</div>
								<div class="handle">
									<van-button plain round type="info" size="small"
										@click.native="editApplicant(item, index, 1)">编辑</van-button>
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
		Toast
	} from 'vant';
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
					'JOB_JSYDCQXXB.FQTYY': "", //其他原因
					'JOB_BDCQK.FBZ': "" // 备注
				},
				applicant: { // 受让人信息
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
				assignor: { // 转让人信息
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
				actions: [],
				applicants: [],
				assignors:[],
				editApplicantState: false,
				editAssignorState: false,
				applicantIndex: -1,
				assignorIndex: -1,
				taskId: '',
				valuesParams: {},
				registerReason: '',
				registerReasons:[{
						name: ''
					}
				],
				countries:[{
					name: '中华人民共和国'
				}],
				provinces: [{
					name: '广东'
				}],
				person:'',
				idCard:'',
				assignorPerson:'',
				assignorIdCard:'',
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
				} else if (this.type == 2) {
					this.registerReason = val.name;
				} else if (this.type == 3) {
					this.applicant['JOB_SQRXXB.FGJDQ'] = val.name;
				} else if (this.type == 4) {
					this.applicant['JOB_SQRXXB.FHJSZSS']= val.name;
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
			registerReasonClicked: function(){
				this.show = true;
				this.type = 2;
				this.actions = this.registerReasons;
			},
			countryClicked:function(){
				this.show = true;
				this.type = 3;
				this.actions = this.countries;
			},
			provinceClicked: function(){
				this.show = true;
				this.type = 4;
				this.actions = this.provinces;
			},
			delApplicant: function (type) {
				this.$dialog.confirm({
					message: '确定要删除该申请人吗?'
				}).then(() => {
					console.log('删除');
					if (type == 0) {
						//受让人
						this.applicants.splice(this.applicantIndex, 1);
						this.applicantIndex = -1;
						this.editApplicantState = false;
					}else if (type == 1) {
						//转让人
						this.assignors.splice(this.assignorIndex, 1);
						this.assignorIndex = -1;
						this.editAssignorState = false;
					}
					// on close
				}).catch(() => {
					// on cancel
					console.log('取消');
				});
			},
			saveApplicant: function (type) {
				if (type == 0) {
					//受让人
					//将当前数据保存至applicants数组用作遍历展示
					this.applicant['JOB_SQRXXB.FSQRMC'] = this.person;
					this.applicant['JOB_SQRXXB.FZJHM'] = this.idCard;
					if (this.applicantIndex != -1) {
						this.applicants[this.applicantIndex] = this.applicant;
					}else {
						this.applicants.push(this.applicant);
					}

					this.applicantIndex = -1;
					this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', [this.applicant]);
					this.applicant = {};
					this.person = '';
					this.idCard = '';
				}else if (type == 1) {
					//转让人(义务人)
					//将当前数据保存至assignors数组用作遍历展示
					this.assignor['JOB_SQRXXB.FSQRMC'] = this.assignorPerson;
					this.assignor['JOB_SQRXXB.FZJHM'] = this.assignorIdCard;
					if (this.assignorIndex != -1) {
						this.assignors[this.assignorIndex] = this.assignor;
					}else {
						this.assignors.push(this.assignor);
					}
					this.assignorIndex = -1;
					this.fillSubFormData('JOB_SQRXXB_OLD_LINK.OLD_IQLR', [this.assignor]);
					this.assignor = {};
					this.assignorPerson = '';
					this.assignorIdCard = '';
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
			editApplicant: function (item, index, type) {
				// this.editApplicantState = true;
				if (type == 0) {
					//受让人
					this.applicantIndex = index;
					this.applicant = item;
					this.person = item['JOB_SQRXXB.FSQRMC'];
					this.idCard = item['JOB_SQRXXB.FZJHM'];
				}else if (type == 1) {
					//转让人
					this.assignorIndex = index;
					this.assignor = item;
					this.assignorPerson = item['JOB_SQRXXB.FSQRMC'];
					this.assignorIdCard = item['JOB_SQRXXB.FZJHM'];
				}
				console.log("applicantIndex="+this.applicantIndex);
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
				this.valuesParams['JOB_JSYDCQXXB.FQTYY'] = this.estateInfo['JOB_JSYDCQXXB.FQTYY'];

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
						path: '/onlineApplication/JSYDSYQZYDJ/attachment'
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

						this.estateInfo['JOB_BDCQK.FYBDCQSZH'] = response["JOB_BDCQK.FYBDCQSZH"];
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

	.field-background{
		background-color: #E5E5E5;
		color: #333333;
	}
</style>
