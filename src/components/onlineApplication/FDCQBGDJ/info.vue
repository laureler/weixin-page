<template>
	<div class="container">
		<page-head title="房地产权（独幢、层、套、间房屋）变更登记"></page-head>
		<div class="box-body">
			<van-tabs>
				<van-tab title="基本信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请事项
						</div>
						<van-field id="JOB_SJDJB.FDJLX" v-model="JOB_BDCQK['JOB_SJDJB.FDJLX']" right-icon="arrow"
							placeholder="请选择申请事项" disabled clickable
							@click.native="actionsheetClicked('itemOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>镇区
						</div>
						<van-field id="JOB_SJDJB.FZQDM" v-model="JOB_BDCQK['JOB_SJDJB.FZQDM']" right-icon="arrow"
							placeholder="请选择镇区" disabled clickable
							@click.native="actionsheetClicked('townshipOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产单元号
						</div>
						<van-field id="JOB_FDCQXXB.FBDCDYH" v-model="JOB_BDCQK['JOB_FDCQXXB.FBDCDYH']"
							placeholder="不动产单元号" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产类型
						</div>
						<van-field id="JOB_FDCQXXB.FBDCLX" v-model="JOB_BDCQK['JOB_FDCQXXB.FBDCLX']" right-icon="arrow"
							placeholder="不动产类型" disabled clickable
							@click.native="actionsheetClicked('estateOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>坐落
						</div>
						<van-field id="JOB_FDCQXXB.FFDZL" v-model="JOB_BDCQK['JOB_FDCQXXB.FFDZL']" placeholder="坐落"
							clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							面积
						</div>
						<van-field id="JOB_FDCQXXB.FJZMJ" v-model="JOB_BDCQK['JOB_FDCQXXB.FJZMJ']" placeholder="面积"
							clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							用途
						</div>
						<van-field id="JOB_FDCQXXB.FGHYT" v-model="JOB_BDCQK['JOB_FDCQXXB.FGHYT']" placeholder="用途"
							clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>原不动产权证号
						</div>
						<van-field id="JOB_FDCQXXB.FBDCQZH" v-model="JOB_BDCQK['JOB_FDCQXXB.FBDCQZH']"
							placeholder="原不动产权证号" clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>登记原因
						</div>
						<van-field id="JOB_FDCQXXB.FDJYY" v-model="JOB_BDCQK['JOB_FDCQXXB.FDJYY']" right-icon="arrow"
							disabled clearable placeholder="登记原因" @click.native="actionsheetClicked('reasonOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							其他原因
						</div>
						<van-field id="JOB_FDCQXXB.FQTYY" v-model="qtyy" clearable placeholder="其他原因" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							备注
						</div>
						<van-field id="JOB_FDCQXXB.FBZ" v-model="bz" clearable placeholder="备注" />
					</van-cell-group>
				</van-tab>
				<van-tab title="权利人">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请人
						</div>
						<van-field id="JOB_SQRXXB.FSQRMC" v-model="applicant['JOB_SQRXXB.FSQRMC']" clearable
							placeholder="申请人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>性别
						</div>
						<van-field id="JOB_SQRXXB.FXB" v-model="applicant['JOB_SQRXXB.FXB']" right-icon="arrow" disabled
							clickable placeholder="性别" @click.native="actionsheetClicked('sexOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field id="JOB_SQRXXB.FZJZL" v-model="applicant['JOB_SQRXXB.FZJZL']" right-icon="arrow"
							disabled clickable placeholder="证件种类" @click.native="actionsheetClicked('idTypeOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件号码
						</div>
						<van-field id="JOB_SQRXXB.FZJHM" v-model="applicant['JOB_SQRXXB.FZJHM']" clearable
							placeholder="证件号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>单位性质
						</div>
						<van-field id="JOB_SQRXXB.FDWXZ" v-model="applicant['JOB_SQRXXB.FDWXZ']" right-icon="arrow"
							disabled clickable placeholder="单位性质"
							@click.native="actionsheetClicked('companyTypeOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>国家/地区
						</div>
						<van-field id="JOB_SQRXXB.FGJDQ" v-model="applicant['JOB_SQRXXB.FGJDQ']" right-icon="arrow"
							disabled clickable placeholder="国家/地区"
							@click.native="actionsheetClicked('countryOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>户籍所属省份
						</div>
						<van-field id="JOB_SQRXXB.FHJSZSS" v-model="applicant['JOB_SQRXXB.FHJSZSS']" right-icon="arrow"
							disabled clickable placeholder="户籍所属省份"
							@click.native="actionsheetClicked('censusOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>联系电话
						</div>
						<van-field id="JOB_SQRXXB.FLXDH" v-model="applicant['JOB_SQRXXB.FLXDH']" clearable
							placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>共有情况
						</div>
						<van-field id="JOB_SQRXXB.FGYQK" v-model="applicant['JOB_SQRXXB.FGYQK']" right-icon="arrow"
							disabled clickable placeholder="共有情况" @click.native="actionsheetClicked('commonOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field id="JOB_SQRXXB.FQLBL" v-model="applicant['JOB_SQRXXB.FQLBL']" clearable
							placeholder="权利比例" />
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
							<van-cell-group class="applicants-group"
								v-for="(item, index) in this.$data['JOB_SQRXXB_LINK.IQLR']" v-bind:key="index">
								<div class="name">{{ item['JOB_SQRXXB.FSQRMC'] }}</div>
								<div class="num">{{ item['JOB_SQRXXB.FZJHM'] }}</div>
								<div class="handle">
									<van-button plain round type="info" size="small"
										@click.native="editApplicant(item, index)">编辑</van-button>
								</div>
							</van-cell-group>
						</div>
					</div>
				</van-tab>
				<van-tab title="更正事项">
					<div style="padding: 15px;">提示：若更正类型涉及到权利人更正（如权利人名称、证件号码、证件类型等信息）， 请修改“权利人”相应信息，并将更正内容填写至“更正事项”，
						若涉及到房屋信息更正，则只需将更正内容填入“更正事项”表。</div>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>修改内容
						</div>
						<van-field id="JOB_XGXXB.FXGSX" v-model="changeItem['JOB_XGXXB.FXGSX']" right-icon="arrow"
							disabled clearable placeholder="修改内容"
							@click.native="actionsheetClicked('contentOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>修改前
						</div>
						<van-field id="JOB_XGXXB.FXGQ" v-model="changeItem['JOB_XGXXB.FXGQ']" clearable
							placeholder="修改前" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>修改后
						</div>
						<van-field id="JOB_XGXXB.FXGH" v-model="changeItem['JOB_XGXXB.FXGH']" clearable
							placeholder="修改后" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info" @click.native="saveChangeItem()">保存
						</van-button>
					</div>
					<div class="applicants">
						<div class="title">
							<div class="name">修改内容</div>
							<div class="num">修改后</div>
							<div class="handle">操作</div>
						</div>
						<div class="content">
							<van-cell-group class="applicants-group"
								v-for="(item, index) in this.$data['JOB_XGXXB_LINK.IXG']" v-bind:key="index">
								<div class="name">{{ item['JOB_XGXXB.FXGSX'] }}</div>
								<div class="num">{{ item['JOB_XGXXB.FXGH'] }}</div>
								<div class="handle">
									<van-button plain round type="info" size="small"
										@click.native="editChangeItem(item, index)">编辑</van-button>
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
		Toast,
		Dialog
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
					name: '建设用地使用权、宅基地使用权变更登记'
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
					name: '更名变更'
				}, {
					name: '状态更正'
				}, {
					name: '其他变更'
				}], // 登记原因
				countryOptions: [{
					name: '中华人民共和国'
				}, {
					name: '加拿大'
				}, {
					name: '美国'
				}, {
					name: '韩国'
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
				censusOptions: [{
					name: '广东'
				}],
				commonOptions: [{
					name: '单独所有'
				}, {
					name: '共同所有'
				}, {
					name: '按份所有'
				}, {
					name: '其他共有'
				}],
				sexOptions: [{
					name: '男性'
				}, {
					name: '女性'
				}, {
					name: '不详'
				}],
				idTypeOptions: [{
					name: '身份证'
				}],
				companyTypeOptions: [{
					name: '个人'
				}, {
					name: '企业'
				}, {
					name: '事业单位'
				}, {
					name: '国家单位'
				}, {
					name: '其他'
				}],
				actions: [],
				actionsheetShow: false,
				JOB_BDCQK: {}, // 主表
				'JOB_SQRXXB_LINK.IQLR': [], // 权利人
				applicant: {},
				applicantIndex: -1,
				'JOB_XGXXB_LINK.IXG': [], // 更改事项
				changeItem: {},
				changeItemIndex: -1,
				optionsTitle: '',
				qtyy: '',
				bz: '',
				goBack: false,
			}
		},
		methods: {
			actionsheetClicked: function (title) {
				this.actionsheetShow = true;
				this.actions = this.$data[title];
				this.optionsTitle = title;
			},
			onSelect: function (val) {
				// debugger;
				if (this.optionsTitle === 'itemOptions') { // 申请事项
					this.$data['JOB_BDCQK']['JOB_SJDJB.FDJLX'] = val.name;
				} else if (this.optionsTitle === 'townshipOptions') { // 镇区
					this.$data['JOB_BDCQK']['JOB_SJDJB.FZQDM'] = val.name;
				} else if (this.optionsTitle === 'estateOptions') { // 不动产类型
					this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBDCLX'] = val.name;
				} else if (this.optionsTitle === 'reasonOptions') { // 登记原因
					this.$data['JOB_BDCQK']['JOB_FDCQXXB.FDJYY'] = val.name;
				} else if (this.optionsTitle === 'sexOptions') { // 性别
					this.applicant['JOB_SQRXXB.FXB'] = val.name;
				} else if (this.optionsTitle === 'companyTypeOptions') { // 单位性质
					this.applicant['JOB_SQRXXB.FDWXZ'] = val.name;
				} else if (this.optionsTitle === 'countryOptions') { // 国家
					this.applicant['JOB_SQRXXB.FGJDQ'] = val.name;
				} else if (this.optionsTitle === 'censusOptions') { // 户籍所属省份
					this.applicant['JOB_SQRXXB.FHJSZSS'] = val.name;
				} else if (this.optionsTitle === 'commonOptions') { // 共有情况
					this.applicant['JOB_SQRXXB.FGYQK'] = val.name;
				} else if (this.optionsTitle === 'idTypeOptions') { // 证件类型
					this.applicant['JOB_SQRXXB.FZJZL'] = val.name;
				} else if (this.optionsTitle === 'contentOptions') { // 更改事项
					this.changeItem['JOB_XGXXB.FXGSX'] = val.name;
				}
				this.actionsheetShow = false;
				// debugger;
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
				if (this.applicant['JOB_SQRXXB.SYS_MRID'].length == 0) {
					this.$toast('请选择权利人!');
				} else {
					this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', [this.applicant], true);
				}
			},
			saveChangeItem: function () {
				if (!this.changeItem['JOB_XGXXB.FXGH']) {
					this.$toast('请填写更改事项!');
					return;
				}
				if (!this.changeItem['JOB_XGXXB.SYS_MRID']) {
					this.$data['JOB_XGXXB_LINK.IXG'].push(this.changeItem);
				} else {
					this.$data['JOB_XGXXB_LINK.IXG'].splice(this.changeItemIndex, 1, this.changeItem);
				}
				this.fillSubFormData('JOB_XGXXB_LINK.IXG', this.$data['JOB_XGXXB_LINK.IXG'], true);

			},
			editApplicant: function (item, index) { // 编辑申请人
				this.applicant = item;
				this.applicantIndex = index;
			},
			editChangeItem: function (item, index) { // 编辑申请人
				this.changeItem = item;
				this.changeItemIndex = index;
			},
			nextStep: function () {
				this.saveTaskFormData();
				return;
			},
			saveTaskFormData: function (next) {
				this.$data['JOB_BDCQK']['JOB_FDCQXXB.FQTYY'] = this.qtyy;
				this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBZ'] = this.bz;
				console.log(this.$data['JOB_BDCQK']);

				sessionStorage.setItem('formdata', JSON.stringify(this.$data['JOB_BDCQK']));
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				var _this = this;
				this.axios({
					url: SAVE_TASK_FORM_DATA + '?taskId=' + this.taskId + '&createType=2',
					method: 'post',
					data: this.$data['JOB_BDCQK'],
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
					if (_this.goBack) {
						_this.goBack = false;
						next();
						return;
					}
					this.$router.push({
						path: '/onlineApplication/FDCQBGDJ/attachment'
					});
				}).catch(error => {
					Toast.clear();
					Toast('请求出错!');
					console.log(error);
				});
			},
			// 查询子表单
			querySubFormData: function (title, showLoading = false) {
				var business = JSON.parse(sessionStorage.getItem('business'));
				var result = JSON.parse(business.result);
				console.log(result);
				var link = title.split('.')[0];
				var domains = title.split('_LINK')[0]
				var parentrid = result.data.values[link + '.RID'];
				var templateid = result.data.controls[title].linkTplId;
				var _this = this;
				this
					.$fetch('/formengineWebService/querySubFormData' + '?parentdomname=' + title + '&parentrid=' +
						parentrid + '&doms=' + domains + '&templateid=' + templateid + '&random=19')
					.then(response => {
						console.log('response:', response);
						debugger;
						if (title === 'JOB_SQRXXB_LINK.IQLR') { // 权利人
							_this.$data['JOB_SQRXXB_LINK.IQLR'] = response.rows;
							if (!response.rows) return;
							_this.applicantIndex = 0;
							_this.applicant = response.rows[0];
						} else if (title === 'JOB_XGXXB_LINK.IXG') { // 修改事项
							_this.$data['JOB_XGXXB_LINK.IXG'] = response.rows;
							if (!response.rows) return;
							_this.changeItemIndex = 0;
							_this.changeItem = response.rows[0];
						}
					})
					.catch(error => {
						console.log('error:', error);
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
				var _this = this;
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
					console.log(response);
					console.log('FILL_SUB_FORM_DATA:', response);
					if (title === 'JOB_SQRXXB_LINK.IQLR') { // 权利人
						_this.$data['JOB_SQRXXB_LINK.IQLR'] = response.data.result;
						_this.applicantIndex = -1;
						_this.applicant = {};
					} else if (title === 'JOB_XGXXB_LINK.IXG') { // 修改事项
						_this.$data['JOB_XGXXB_LINK.IXG'] = response.data.result;
						_this.changeItemIndex = -1;
						_this.changeItem = {};
					}
				}).catch(error => {
					Toast.clear();
					console.log(error);
				});

			},
			startExactBusiness: function (rid, businessNumber) {
				sessionStorage.setItem('jid', businessNumber);
				var _this = this;
				//判断产权是否土地，是土地的提取土地的产权
				var configureName = '土地和房屋变更登记';
				this.$fetch(START_EXACT_BUSINNESS, {
						srcMark: '$bdcsjtq_cq:RID=' + rid + '&type=1',
						targetJid: businessNumber,
						configureName: configureName
					}).then(response => {
						console.log(response);
						Toast.clear();
						//获取不动产类型
						var qllx = response["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FQLLX"]
						var bdclx = getBdcType(qllx);
						//补充权利人信息
						for (var key in response) {
							if (key == "JOB_SQRXXB_LINK.IQLR") {
								var rows = response[key];
								for (var inx = 0; inx < rows.length; ++inx) {
									rows[inx]["JOB_SQRXXB.XH"] = inx + 1;
									if (bdclx == "土地和房屋") {
										rows[inx]["JOB_SQRXXB.FSQRLX"] = "房地产权利人";
									} else if (qllx == "国有建设用地使用权" || qllx == "集体建设用地使用权") {
										rows[inx]["JOB_SQRXXB.FSQRLX"] = "建设用地使用权人";
									} else if (qllx == "宅基地使用权") {
										rows[inx]["JOB_SQRXXB.FSQRLX"] = "宅基地使用权人";
									}
									rows[inx]["JOB_SQRXXB.FDWXZ"] = "个人";
									if (rows.length == 1) {
										rows[inx]["JOB_SQRXXB.FGYQK"] = "单独所有";
										rows[inx]["JOB_SQRXXB.FQLBL"] = "全部";
									}
								}
							}
						}

						_this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBDCLX'] = bdclx;
						_this.$data['JOB_BDCQK']['JOB_FDCQXXB.FQTYY'] = '';
						_this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBZ'] = '';
						var masterList = response;
						for (const key in masterList) {
							if (masterList.hasOwnProperty(key)) {
								//if (Object.prototype.toString.call(masterList[key]) !== '[object Object]') {
								if (!(masterList[key] instanceof Object)) {
									_this.$data['JOB_BDCQK'][key] = masterList[key]
								}
							}
						}



						_this.$data['JOB_SQRXXB_LINK.IQLR'] = response['JOB_SQRXXB_LINK.IQLR'];
						_this.applicant = response['JOB_SQRXXB_LINK.IQLR'][0];
						_this.applicantIndex = 0;
						// _this.$data['JOB_SQRXXB_LINK.IQLR']['JOB_FDCQXXB.FBDCLX'] = bdclx;

						_this.fillSubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ', response[
							'JOB_GLQLXXB_LINK.OLD_IQLDJ']);
						_this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', response['JOB_SQRXXB_LINK.IQLR']);

					})
					.catch(error => {
						Toast.clear();
						console.log(error);
					});
			}
		},
		mouthed() {

		},
		beforeRouteLeave(to, from, next) {
			var _this = this;
			if (to.path === '/onlineApplication/FDCQBGDJ/bookIn') {
				Dialog.confirm({
					title: '提示',
					message: '是否保存表单?'
				}).then(() => {
					_this.goBack = true;
					_this.saveTaskFormData(next);
				}).catch(() => {
					next();
				});
			}
		},
		created() {
			var _this = this;
			console.log('this.$route.query:', this.$route.query);

			if (this.$route.query && this.$route.query.processInstanceId) {
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				// 查询首环节？
				this.$fetch('/workflowWebService/getFirstLinkInfoByProcessInstanceId', {
					processInstanceId: this.$route.query.processInstanceId
				}).then(res => {
					console.log('res:', res);

					var _taskId = res.taskId;

					_this.$fetch('/workflowWebService/renderFormByTaskId', {
						taskId: _taskId
					}).then(response => {
						var businessNumber = response.businessNumber;
						var result = JSON.parse(response.result);
						var values = result.data.values;
						var taskId = response.taskId;
						sessionStorage.setItem('taskId', taskId);
						sessionStorage.setItem('business', JSON.stringify(response));
						_this.taskId = taskId;
						console.log('taskId:', _this.taskId);
						_this.$data['JOB_BDCQK'] = values;
						console.log('>>>:', _this.$data['JOB_BDCQK']);
						_this.qtyy = _this.$data['JOB_BDCQK']['JOB_FDCQXXB.FQTYY'];
						_this.bz = _this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBZ'];

						_this.querySubFormData('JOB_SQRXXB_LINK.IQLR');
						_this.querySubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ');
						_this.querySubFormData('JOB_XGXXB_LINK.IXG');


						//_this.startExactBusiness(rid, businessNumber);
					}).catch(err => {
						console.log('err:', err);
						Toast.clear();
					});
				}).catch(err => {
					console.log('err:', err);
					Toast.clear();
				});

			} else {
				var rid = sessionStorage.getItem('rid') || this.$route.query.cqxx.RID;
				console.log('cqxx:', this.$route.query.cqxx);

				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				this
					.$fetch(GET_BUSINESS_START_FROM, {
						businessDefinitionId: sessionStorage.getItem('businessDefinitionId') // 业务ID
					})
					.then(function (response) {
						var businessNumber = response.businessNumber;
						var result = JSON.parse(response.result);
						var values = result.data.values;
						var taskId = response.taskId;
						sessionStorage.setItem('taskId', taskId);
						sessionStorage.setItem('business', JSON.stringify(response));
						_this.taskId = taskId;
						console.log('taskId:', _this.taskId);
						_this.$data['JOB_BDCQK'] = values;
						console.log('>>>:', _this.$data['JOB_BDCQK']);
						debugger;
						_this.startExactBusiness(rid, businessNumber);
					})
					.catch(function (error) {
						console.log(error);
						Toast.clear();
					});
			}


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
