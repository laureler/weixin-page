	<template>
	<div class="container">
		<page-head title="房地产权（独幢、层、套、间房屋）首次登记"></page-head>
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
							<span class="required-span">*</span>图纸编号
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FTZBH']" clearable placeholder="图纸编号" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							产权来源
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FCQLY']" right-icon="arrow" placeholder="请选择产权来源"
							 clickable
							@click.native="propertySourceClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>房屋坐落
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FFDZL']" clearable placeholder="房屋坐落" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地性质
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FQLXZ']" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地用途
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FTDYT']" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							房屋性质
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FFWXZ']" right-icon="arrow" placeholder="请选择房屋性质" 
							 clickable
							@click.native="housePropertyClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							房屋用途
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FFWYT']" right-icon="arrow" placeholder="请选择房屋用途"
							 clickable
							@click.native="houseUseClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地使用面积
						</div>
						<div class="unFillText">
							<van-field style="flex:80%" class="field-background"
								v-model="valuesParams['JOB_FDCQXXB.FZDMJ']" />
							<span class="unit">平方米</span>
						</div>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							建筑面积
						</div>
						<div class="unFillText">
							<van-field style="flex:80%" v-model="valuesParams['JOB_FDCQXXB.FJZMJ']" clearable
								placeholder="建筑面积" />
							<span class="unit">平方米</span>
						</div>
					</van-cell-group>
				</van-tab>
				<van-tab title="申请人">
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
						<van-field v-model="applicant['JOB_SQRXXB.FXB']" right-icon="arrow" placeholder="请选择性别"
							 clickable @click.native="sexClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FZJZL']" right-icon="arrow" placeholder="请选择证件种类"
							  clickable 
							@click.native="certificateClicked()" />
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
						<van-field v-model="applicant['JOB_SQRXXB.FDWXZ']" right-icon="arrow" placeholder="请选择单位性质" clickable @click.native="unitNatureClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>国家/地区
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FGJDQ']" right-icon="arrow" placeholder="请选择国家地区"
							  clickable @click.native="countryClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>户籍所属省份
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FHJSZSS']" right-icon="arrow" placeholder="请选择户籍所属省份"
							  clickable @click.native="provinceClicked()" />
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
						<van-field v-model="applicant['JOB_SQRXXB.FGYQK']" right-icon="arrow" placeholder="请选择共有情况"
							  clickable 
							@click.native="situationClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FQLBL']" clearable placeholder="权利比例" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info" 
							@click.native="saveApplicant()" v-show="saveShow">保存
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
				<van-tab title="EMS寄件信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>快递寄材料
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FSFKDJCL']" right-icon="arrow"
							placeholder="请选择快递寄材料" clickable @click.native="materialClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>快递寄证
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FSFKDJZ']" right-icon="arrow" placeholder="请选择快递寄证"
							clickable @click.native="credentialClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span" v-show="emsNecessary">*</span>联系人
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FDXLXR']" clearable placeholder="联系人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span" v-show="emsNecessary">*</span>联系电话
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FDXTZDH']" clearable placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							身份证号码
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FLXRSFZHM']" clearable placeholder="身份证号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							所在镇区
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FZQ']" right-icon="arrow" placeholder="请选择所在镇区"
							clickable @click.native="townShipEMSClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							单位
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FDW']" clearable placeholder="单位" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span" v-show="emsNecessary">*</span>联系地址
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FDZ']" clearable placeholder="联系地址" />
					</van-cell-group>
				</van-tab>
			</van-tabs>
			<div style="height: 50px;"></div>
			<div class="bottom-box">
				<!-- <van-button size="large" plain type="default">查看申请书</van-button> -->
				<van-button size="large" type="info" @click.native="nextStep()">下一步</van-button>
			</div>
			<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect">
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
		Toast,
		Dialog
	} from 'vant';
	import {
		GET_BUSINESS_START_FROM,
		START_EXACT_BUSINNESS,
		SAVE_TASK_FORM_DATA,
		FILL_SUB_FORM_DATA,
		ADD_SUB_FORM_DATA,
		TEST,
		exchangeZqdm,
    exchangeZqdmToZqmc
	} from '../../../constants/index.js';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				taskId: '',
				show: false,
				type: 0,
				application: '',
				township: '',
				person: '',
				idCard: '',
				houseProperty: '',
				houseUse: '',
				applicant: { // 受让人信息 受让人 = 权利人
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
					'JOB_SQRXXB.FGJDQ': "",
					'JOB_SQRXXB.FGYQK': "",
					'JOB_SQRXXB.FGZDW': null,
					'JOB_SQRXXB.FHJSZSS': null,
					'JOB_SQRXXB.FLXDH': "",
					'JOB_SQRXXB.FLXR': null,
					'JOB_SQRXXB.FQLBL': "",
					'JOB_SQRXXB.FSQRLX': "",
					'JOB_SQRXXB.FSQRMC': "",
					'JOB_SQRXXB.FSSHY': null,
					'JOB_SQRXXB.FTXDZ': null,
					'JOB_SQRXXB.FXB': "",
					'JOB_SQRXXB.FXXQRZT': null,
					'JOB_SQRXXB.FYB': null,
					'JOB_SQRXXB.FZJHM': "",
					'JOB_SQRXXB.FZJZL': "",
					'JOB_SQRXXB.FZP': null,
					'JOB_SQRXXB.RID': "",
					'JOB_SQRXXB.SYS_MRID': "",
					'JOB_SQRXXB.XH': "1",
				},
				applications: [{
					name: '房地产权（独幢、层、套、间房屋）首次登记'
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
				propertySources: [],
				housePropertys: [{
						name: '商品房'
					},
					{
						name: '动迁房'
					},
					{
						name: '廉租住房'
					},
					{
						name: '经济适用住房'
					},
					{
						name: '集资建房'
					},
					{
						name: '福利房'
					},
					{
						name: '保障性住房'
					},
					{
						name: '房改房'
					},
					{
						name: '自建房'
					},
					{
						name: '定销商品房'
					},
					{
						name: '限价普通商品住房'
					},
					{
						name: '配套商品房'
					},
					{
						name: '公共租赁住房'
					},
				],
				houseUses: [{
						name: '住宅'
					},
					{
						name: '成套住宅'
					},
					{
						name: '别墅'
					},
					{
						name: '高档公寓'
					},
					{
						name: '非成套住宅'
					},
					{
						name: '集体宿舍'
					},
					{
						name: '工业'
					},
					{
						name: '公共设施'
					},
					{
						name: '铁路'
					},
					{
						name: '民航'
					},
					{
						name: '航运'
					},
					{
						name: '公共运输'
					},
					{
						name: '仓储'
					},
					{
						name: '商业服务'
					},
					{
						name: '经营'
					},
					{
						name: '旅游'
					},
					{
						name: '金融保险'
					},
					{
						name: '电讯信息'
					},
					{
						name: '教育'
					},
					{
						name: '医疗卫生'
					},
					{
						name: '科研'
					},
					{
						name: '文化'
					},
					{
						name: '新闻'
					},
					{
						name: '娱乐'
					},
					{
						name: '园林绿化'
					},
					{
						name: '体育'
					},
					{
						name: '办公'
					},
					{
						name: '军事'
					},
					{
						name: '其他'
					},
					{
						name: '涉外'
					},
					{
						name: '宗教'
					},
					{
						name: '监狱'
					},
					{
						name: '物管用房'
					},
					{
						name: '车库/车位'
					}
				],
				countries: [{
					name: '中华人民共和国'
				}, {
					name: '>香港特别行政区'
				}, {
					name: '>澳门特别行政区'
				}, {
					name: '>台湾省'
				}, {
					name: '加拿大'
				}, {
					name: '美国'
				}, {
					name: '韩国'
				}, {
					name: '巴西'
				}], // 国家/地区
				provinces: [{
					name: '北京'
				}, {
					name: '天津'
				}, {
					name: '河北'
				}, {
					name: '山西'
				}, {
					name: '内蒙古'
				}, {
					name: '辽宁'
				}, {
					name: '吉林'
				}, {
					name: '黑龙江'
				}, {
					name: '上海'
				}, {
					name: '江苏'
				}, {
					name: '浙江'
				}, {
					name: '安徽'
				}, {
					name: '福建'
				}, {
					name: '江西'
				}, {
					name: '山东'
				}, {
					name: '河南'
				}, {
					name: '湖北'
				}, {
					name: '湖南'
				}, {
					name: '广东'
				}, {
					name: '广西'
				}, {
					name: '海南'
				}, {
					name: '重庆'
				}, {
					name: '四川'
				}, {
					name: '贵州'
				}, {
					name: '云南'
				}, {
					name: '西藏'
				}, {
					name: '陕西'
				}, {
					name: '甘肃'
				}, {
					name: '青海'
				}, {
					name: '宁夏'
				}, {
					name: '新疆'
				}, {
					name: '台湾'
				}, {
					name: '香港'
				}, {
					name: '澳门'
				}], // 省市
				materials: [{
						name: '是'
					},
					{
						name: '否'
					}
				],
				credentials: [{
						name: '是'
					},
					{
						name: '否'
					}
				],
				sexs: [{
						name: '男性'
					},
					{
						name: '女性'
					},
					{
						name: '不详'
					}
				],
				certificates: [{
					name: '身份证'
				},{
					name: '港澳台身份证'
				},{
					name: '护照'
				},{
					name: '户口簿'
				},{
					name: '军官证（士兵证）'
				},{
					name: '组织机构代码'
				},{
					name: '营业执照'
				},{
					name: '其他'
				}],
				unitNatures: [
					{
						name: '个人'
					}
				],
				situations: [{
						name: '单独所有'
					},
					{
						name: '共同共有'
					},
					{
						name: '按份共有'
					},
					{
						name: '其他共有'
					}
				],
				actions: [],
				actionsheetShow: false,
				applicants: [],
				applicantIndex: -1,
				valuesParams: {}, // 主表
				emsNecessary: false, //EMS是否显示星号
				saveShow: false,
				goBack: false,
			}
		},
		methods: {
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
			countryClicked: function () {
				this.show = true;
				this.type = 2;
				this.actions = this.countries;
			},
			provinceClicked: function () {
				this.show = true;
				this.type = 3;
				this.actions = this.provinces;
			},
			propertySourceClicked: function () {
				this.show = true;
				this.type = 4;
				this.actions = this.propertySources;
			},
			housePropertyClicked: function () {
				this.show = true;
				this.type = 5;
				this.actions = this.housePropertys;
			},
			houseUseClicked: function () {
				this.show = true;
				this.type = 6;
				this.actions = this.houseUses;
			},
			materialClicked: function () {
				this.show = true;
				this.type = 7;
				this.actions = this.materials;
			},
			credentialClicked: function () {
				this.show = true;
				this.type = 8;
				this.actions = this.credentials;
			},
			townShipEMSClicked: function () {
				this.show = true;
				this.type = 9;
				this.actions = this.townships;
			},
			sexClicked: function () {
				this.show = true;
				this.type = 10;
				this.actions = this.sexs;
			},
			certificateClicked: function () {
				this.show = true;
				this.type = 11;
				this.actions = this.certificates;
			},
			unitNatureClicked: function () {
				this.show = true;
				this.type = 12;
				this.actions = this.unitNatures;
			},
			situationClicked: function () {
				this.show = true;
				this.type = 13;
				this.actions = this.situations;
			},
			onSelect: function (val) {
				console.log(val)
				this.show = false;
				if (this.type == 0) {
					this.valuesParams['JOB_SJDJB.FDJLX'] = val.name;
				} else if (this.type == 1) {
					this.valuesParams['JOB_SJDJB.FZQDM'] = val.name;
				} else if (this.type == 2) {
					this.applicant['JOB_SQRXXB.FGJDQ'] = val.name.replace('>', '');
				} else if (this.type == 3) {
					this.applicant['JOB_SQRXXB.FHJSZSS'] = val.name;
				} else if (this.type == 4) {
					this.valuesParams['JOB_FDCQXXB.FCQLY'] = val.name;
				} else if (this.type == 5) {
					this.valuesParams['JOB_FDCQXXB.FFWXZ'] = val.name;
				} else if (this.type == 6) {
					this.valuesParams['JOB_FDCQXXB.FFWYT'] = val.name;
				} else if (this.type == 7) {
					//快递寄材料或快递寄证为'是',显示星号,反之不显示
					this.valuesParams['JOB_SJDJB.FSFKDJCL'] = val.name;
					if (val.name == '是' ||
						this.valuesParams['JOB_SJDJB.FSFKDJZ'] == '是') {
						this.emsNecessary = true;
					} else {
						this.emsNecessary = false;
					}
				} else if (this.type == 8) {
					//快递寄材料或快递寄证为'是',显示星号,反之不显示
					this.valuesParams['JOB_SJDJB.FSFKDJZ'] = val.name;
					if (val.name == '是' ||
						this.valuesParams['JOB_SJDJB.FSFKDJCL'] == '是') {
						this.emsNecessary = true;
					} else {
						this.emsNecessary = false;
					}
				} else if (this.type == 9) {
					this.valuesParams['JOB_SJDJB.FZQ'] = val.name;
				} else if (this.type == 10) {
					this.applicant['JOB_SQRXXB.FXB'] = val.name;
				} else if (this.type == 11) {
					this.applicant['JOB_SQRXXB.FZJZL'] = val.name;
				} else if (this.type == 12) {
					this.applicant['JOB_SQRXXB.FDWXZ'] = val.name;
				} else if (this.type == 13) {
					this.applicant['JOB_SQRXXB.FGYQK'] = val.name;
				}
			},
			onCancel: function () {
				this.show = false;
			},
			saveApplicant: function () {
				//受让人
				//将当前数据保存至applicants数组用作遍历展示
				this.applicant['JOB_SQRXXB.FSQRMC'] = this.person;
				this.applicant['JOB_SQRXXB.FZJHM'] = this.idCard;
				var _applicant = this.applicant;
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var reg2 = /(^[1]+[3-9]+\d{9}$)/;
				if (!_applicant['JOB_SQRXXB.FSQRMC'] || _applicant['JOB_SQRXXB.FSQRMC'].length == 0) {
					Toast('请填写申请人姓名!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FXB'] || _applicant['JOB_SQRXXB.FXB'].length == 0) {
					Toast('请选择申请人性别!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FZJZL'] || _applicant['JOB_SQRXXB.FZJZL'].length == 0) {
					Toast('请选择申请人证件种类!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FZJHM'] || _applicant['JOB_SQRXXB.FZJHM'].length == 0) {
					Toast('请选择申请人证件号码!');
					return;
				} else if (_applicant['JOB_SQRXXB.FZJZL'] === "身份证" && !reg.test(_applicant['JOB_SQRXXB.FZJHM'])) {
					Toast('请填写申请人正确的证件号码!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FDWXZ'] || _applicant['JOB_SQRXXB.FDWXZ'].length == 0) {
					Toast('请选择申请人单位性质!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FGJDQ'] || _applicant['JOB_SQRXXB.FGJDQ'].length == 0) {
					Toast('请选择申请人国家/地区!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FHJSZSS'] || _applicant['JOB_SQRXXB.FHJSZSS'].length == 0) {
					Toast('请选择申请人户籍所属省份!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FLXDH'] || _applicant['JOB_SQRXXB.FLXDH'].length == 0) {
					Toast('请填写申请人联系电话!');
					return;
				} else if (!reg2.test(_applicant['JOB_SQRXXB.FLXDH'])) {
					Toast('请填写申请人正确的联系电话!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FGYQK'] || _applicant['JOB_SQRXXB.FGYQK'].length == 0) {
					Toast('请选择申请人共有情况!');
					return;
				} else if (!_applicant['JOB_SQRXXB.FQLBL'] || _applicant['JOB_SQRXXB.FQLBL'].length == 0) {
					Toast('请填写申请人权利比例!');
					return;
				}
				this.applicant['JOB_SQRXXB.FSQRLX'] = '建设用地使用权人';
				if (this.applicantIndex != -1) {
					this.applicant['JOB_SQRXXB.XH'] = this.applicantIndex + 1;
					this.applicants[this.applicantIndex] = this.applicant;
				} else {
					this.applicant['JOB_SQRXXB.XH'] = this.applicants.length + 1;
					this.applicants.push(this.applicant);
				}

				this.applicantIndex = -1;
				this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', [this.applicant], true, true);
				this.applicant = {};
				this.person = '';
				this.idCard = '';

			},
			editApplicant: function (item, index) {
				//受让人
				this.applicantIndex = index;
				this.applicant = item;
				this.person = item['JOB_SQRXXB.FSQRMC'];
				this.idCard = item['JOB_SQRXXB.FZJHM'];
				this.saveShow = true;
				console.log("applicantIndex=" + this.applicantIndex);
			},
			nextStep: function () {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var reg2 = /(^[1]+[3-9]+\d{9}$)/;
				//基本信息内容判断未填项
				if (!this.valuesParams['JOB_SJDJB.FDJLX'] || this.valuesParams['JOB_SJDJB.FDJLX'].length == 0) {
					Toast('请选择申请事项!');
					return;
				} else if (!this.valuesParams['JOB_SJDJB.FZQDM'] || this.valuesParams['JOB_SJDJB.FZQDM']
					.length == 0) {
					Toast('请选择镇区!');
					return;
				} else if (!this.valuesParams['JOB_FDCQXXB.FTZBH'] || this.valuesParams['JOB_FDCQXXB.FTZBH']
					.length == 0) {
					Toast('请填写图纸编号!');
					return;
				} else if (!this.valuesParams['JOB_FDCQXXB.FFDZL'] || this.valuesParams[
						'JOB_FDCQXXB.FFDZL'].length == 0) {
					Toast('请填写坐落!');
					return;
				}
				//申请人内容判断未填项
				var _applicants = this.applicants;
				if (_applicants.length == 0) {
					Toast('申请人信息未保存!');
					return;
				}else {
					for (var i = 0; i < this.applicants.length; i++) {
						if (!_applicants[i]['JOB_SQRXXB.FSQRMC'] || _applicants[i]['JOB_SQRXXB.FSQRMC'].length == 0) {
							Toast('请填写第' + i + '个申请人的姓名!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FXB'] || _applicants[i]['JOB_SQRXXB.FXB']
							.length == 0) {
							Toast('请选择申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的性别!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FZJZL'] || _applicants[i]['JOB_SQRXXB.FZJZL'].length == 0) {
							Toast('请选择申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的证件种类!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FZJHM'] || _applicants[i]['JOB_SQRXXB.FZJHM'].length == 0) {
							Toast('请填写申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的证件号码!');
							return;
						} else if (_applicants[i]['JOB_SQRXXB.FZJZL'] === "身份证" && !reg.test(_applicants[i]['JOB_SQRXXB.FZJHM'])) {
							Toast('请填写申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '正确的证件号码!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FDWXZ'] || _applicants[i]['JOB_SQRXXB.FDWXZ'].length == 0) {
							Toast('请选择申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的单位性质!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FGJDQ'] || _applicants[i]['JOB_SQRXXB.FGJDQ'].length == 0) {
							Toast('请选择申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的国家/地区!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FHJSZSS'] || _applicants[i]['JOB_SQRXXB.FHJSZSS'].length == 0) {
							Toast('请选择申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的户籍所属省份!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FLXDH'] || _applicants[i]['JOB_SQRXXB.FLXDH'].length == 0) {
							Toast('请填写申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的联系电话!');
							return;
						} else if (!reg2.test(_applicants[i]['JOB_SQRXXB.FLXDH'])) {
							Toast('请填写申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '正确的联系电话!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FGYQK'] || _applicants[i]['JOB_SQRXXB.FGYQK'].length == 0) {
							Toast('请选择申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的共有情况!');
							return;
						} else if (!_applicants[i]['JOB_SQRXXB.FQLBL'] || _applicants[i]['JOB_SQRXXB.FQLBL'].length == 0) {
							Toast('请填写申请人' + _applicants[i]['JOB_SQRXXB.FSQRMC'] + '的权利比例!');
							return;
						}
					}
				}
				if (this.saveShow) {
					Toast('请填写申请人信息未保存!');
					return;
				}
				//EMS内容判断未填项
				if (this.valuesParams['JOB_SJDJB.FSFKDJCL'] === '是' || this.valuesParams['JOB_SJDJB.FSFKDJZ'] ===
					'是') {
					if (!this.valuesParams['JOB_SJDJB.FDXLXR'] || this.valuesParams['JOB_SJDJB.FDXLXR'].length == 0) {
						Toast('请填写EMS寄件信息联系人!');
						return;
					} else if (!reg2.test(this.valuesParams['JOB_SJDJB.FDXTZDH'])) {
						Toast('请填写EMS寄件信息正确的联系电话!');
						return;
					} else if (this.valuesParams['JOB_SJDJB.FLXRSFZHM'].length > 0 && !reg.test(this.valuesParams[
							'JOB_SJDJB.FLXRSFZHM'])) {
						Toast('请填写EMS寄件信息正确的证件号码!');
						return;
					} else if (!this.valuesParams['JOB_SJDJB.FDZ'] || this.valuesParams['JOB_SJDJB.FDZ'].length == 0) {
						Toast('请填写EMS寄件信息联系地址!');
						return;
					}
				}
				this.saveTaskFormData();
				return;
			},
			saveTaskFormData: function (next) {
				sessionStorage.setItem('formdata', JSON.stringify(this.valuesParams));
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				var _this = this;
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
					if (_this.goBack) {
						_this.goBack = false;
						next();
						return;
					}
					this.$router.push({
						path: '/onlineApplication/FDCQSCDJ/attachment'
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
						if (title === 'JOB_GLQLXXB_LINK.OLD_IQLDJ') {  // 权利信息
							
						}else if (title === 'JOB_SQRXXB_LINK.IQLR') { // 权利人
							_this.applicants = response.rows;
						}
					})
					.catch(error => {
						console.log('error:', error);
					});
			},
			fillSubFormData: function (title, params, showLoading = false, saveTape = false) {
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
					if (saveTape) {
						this.saveShow = false;
					}
					console.log('FILL_SUB_FORM_DATA:', response);
				}).catch(error => {
					Toast.clear();
					console.log(error);
				});

			},
			startExactBusiness: function (rid, businessNumber) {
				sessionStorage.setItem('jid', businessNumber);
				console.log('businessNumber', businessNumber);
				this.$fetch(START_EXACT_BUSINNESS, {
						srcMark: '$bdcsjtq_cq:RID=' + rid + '&type=1',
						targetJid: businessNumber,
						configureName: '个人房屋首次提取土地'
					}).then(response => {
						console.log('startExactBusiness', response);

						//获取不动产类型
						var qllx = response["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FQLLX"]
						var bdclx = getBdcType(qllx);

						var sBdcdyh = this.$route.query.sBdcdyh;
						var zqdm = exchangeZqdm(sBdcdyh);
						var zqmc = exchangeZqdmToZqmc(zqdm);
						this.valuesParams['JOB_SJDJB.FZQDM'] = zqmc;

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

						//坐落
						this.valuesParams['JOB_FDCQXXB.FFDZL'] = response['JOB_GLQLXXB_LINK.OLD_IQLDJ'][0][
							'JOB_GLQLXXB.FZL'
						];
						//土地性质
						this.valuesParams['JOB_FDCQXXB.FQLXZ'] = response['JOB_GLQLXXB_LINK.OLD_IQLDJ'][0][
							'JOB_GLQLXXB.FQLXZ'
						];
						//土地用途
						this.valuesParams['JOB_FDCQXXB.FTDYT'] = response['JOB_GLQLXXB_LINK.OLD_IQLDJ'][0][
							'JOB_GLQLXXB.FYT'
						];
						//土地使用面积
						this.valuesParams['JOB_FDCQXXB.FZDMJ'] = response['JOB_GLQLXXB_LINK.OLD_IQLDJ'][0][
							'JOB_GLQLXXB.FBDCDYMJ'
						];
						this.applicants = response['JOB_SQRXXB_LINK.IQLR'];
						Toast.clear();
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
		beforeRouteLeave(to, from, next) {
			var _this = this;
			if (to.path === '/onlineApplication/FDCQSCDJ/bookIn') {
				Dialog.confirm({
					title: '提示',
					message: '是否保存表单?'
				}).then(() => {
					_this.goBack = true;
					_this.saveTaskFormData(next);
				}).catch(() => {
					next();
				});
			} else {
				next();
			}
		},
		created() {
			if (this.$route.query && this.$route.query.processInstanceId) {
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				// 查询首环节？
				var _this = this;
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
						_this.valuesParams = values;
						console.log('>>>:', _this.valuesParams);
						sessionStorage.setItem('jid', businessNumber);
						console.log('taskId:', _this.taskId);
						
						// _this.startExactBusiness(rid, businessNumber);
						_this.querySubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ');
						_this.querySubFormData('JOB_SQRXXB_LINK.IQLR');
						Toast.clear();
					}).catch(err => {
						console.log('err:', err);
						Toast.clear();
					});
				}).catch(err => {
					console.log('err:', err);
					Toast.clear();
				});
			}else {
				var rid = sessionStorage.getItem('rid') || this.$route.query.cqxx.RID;
				console.log('cqxx:', this.$route.query.cqxx);
				console.log('businessDefinitionId:',
					this.$route.query.businessDefinitionId);
				var _this = this;
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				this.$fetch(GET_BUSINESS_START_FROM, {
					businessDefinitionId: sessionStorage.getItem('businessDefinitionId') // 业务ID
				}).then(function (response) {
					var businessNumber = response.businessNumber;
					var result = JSON.parse(response.result);
					var values = result.data.values;
					var taskId = response.taskId;
					
					var map = result.data.controls['JOB_FDCQXXB.FCQLY']['dicTreeMap'];
					for(var i = 0;i < map.length; i ++){
						var obj = new Object();
						obj.name = map[i].text;
						_this.propertySources.push(obj);
					}

					sessionStorage.setItem('taskId', taskId);
					sessionStorage.setItem('business', JSON.stringify(response));
					_this.taskId = taskId;
					console.log('taskId:', _this.taskId);
					_this.valuesParams = values;
					console.log('>>>:', _this.valuesParams);
					sessionStorage.setItem('jid', businessNumber);
					_this.startExactBusiness(rid, businessNumber);
				}).catch(function (error) {
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

	.field-background {
		background-color: #E5E5E5;
		color: #333333;
	}

	.unFillText {
		display: flex;
		align-items: center;
	}

	.unit {
		flex: 20%;
		margin-left: 10px;
	}

	/*下拉框*/
	.calendar-dropdown {
		background: #fff;
		left: 0;
		top: 0;
		margin-top: 10px;
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 20px;
		border: 1px solid #eee;
		border-radius: 2px;
	}

	.van-field__control:disabled {
		color: #000 !important;
	}

	.van-field__control {
		border: 5px;
	}
</style>
