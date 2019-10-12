<template>
	<div class="container">
		<page-head title="存量房转移登记"></page-head>
		<div class="box-body">
			<van-tabs>
				<van-tab title="基本信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请事项
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FDJLX']" right-icon="arrow" placeholder="请选择申请事项"
							clickable @click.native="applicationClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>镇区
						</div>
						<van-field v-model="valuesParams['JOB_SJDJB.FZQDM']" right-icon="arrow" placeholder="请选择镇区"
							clickable @click.native="townshipClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产单元号
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FBDCDYH']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产类型
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FBDCLX']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>坐落
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FFDZL']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地性质
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FQLXZ']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地用途
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FTDYT']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地使用面积
						</div>
						<div class="unFillText">
							<van-field style="flex:80%" class="field-background"
								v-model="valuesParams['JOB_FDCQXXB.FZDMJ']" disabled />
							<span class="unit">平方米</span>
						</div>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地使用起始时间
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FTDSYQSSJ']" @click="LUStartDrop($event)"
							placeholder="请选择土地使用起始时间" readonly />
						<transition name="fade">
							<div class="calendar-dropdown" :style="{'left':calendar.left+'px','top':calendar.top+'px'}"
								v-if="calendar.show">
								<calendar-view :zero="calendar.zero" :lunar="calendar.lunar" :value="calendar.value"
									:begin="calendar.begin" :end="calendar.end" @select="calendar.select" />
							</div>
						</transition>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							土地使用结束时间
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FTDSYJSSJ']" @click="LUEndDrop($event)"
							placeholder="请选择土地使用结束时间" readonly />
						<transition name="fade">
							<div class="calendar-dropdown"
								:style="{'left':calendar2.left+'px','top':calendar2.top+'px'}" v-if="calendar2.show">
								<calendar-view :zero="calendar2.zero" :lunar="calendar2.lunar" :value="calendar2.value"
									:begin="calendar2.begin" :end="calendar2.end" @select="calendar2.select" />
							</div>
						</transition>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							房屋结构
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FFWJG']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							房屋性质
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FFWXZ']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							房屋用途
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FFWYT']" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							建筑面积
						</div>
						<div class="unFillText">
							<van-field style="flex:80%" class="field-background"
								v-model="valuesParams['JOB_FDCQXXB.FJZMJ']" disabled />
							<span class="unit">平方米</span>
						</div>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							专有建筑面积
						</div>
						<div class="unFillText">
							<van-field style="flex:80%" class="field-background"
								v-model="valuesParams['JOB_FDCQXXB.FZYJZMJ']" disabled />
							<span class="unit">平方米</span>
						</div>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							分摊建筑面积
						</div>
						<div class="unFillText">
							<van-field style="flex:80%" class="field-background"
								v-model="valuesParams['JOB_FDCQXXB.FFTJZMJ']" disabled />
							<span class="unit">平方米</span>
						</div>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							合同号
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FHTBH']" clearable placeholder="合同号" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							取得价格
						</div>
						<div class="unFillText">
							<van-field style="flex:80%" v-model="valuesParams['JOB_FDCQXXB.FFDCJYJG']" clearable
								placeholder="取得价格" />
							<span class="unit">万元</span>
						</div>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							交易日期
						</div>
						<van-field v-model="valuesParams['JOB_FDCQXXB.FJYRQ']" @click="tradingDateDrop($event)"
							placeholder="请选择交易日期" readonly />
						<transition name="fade">
							<div class="calendar-dropdown"
								:style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
								<calendar-view :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value"
									:begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select" />
							</div>
						</transition>
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							产权来源
						</div>
						<van-field v-model="propertySource" right-icon="arrow" placeholder="请选择产权来源" disabled clickable
							@click.native="propertySourceClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>原不动产权证号
						</div>
						<van-field class="field-background" v-model="valuesParams['JOB_FDCQXXB.FBDCQZH']" disabled />
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
						<van-field v-model="applicant['JOB_SQRXXB.FXB']" right-icon="arrow" placeholder="请选择性别"
							clickable @click.native="sexClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FZJZL']" right-icon="arrow" placeholder="请选择证件种类"
							clickable @click.native="certificateClicked()" />
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
						<van-field v-model="applicant['JOB_SQRXXB.FDWXZ']" right-icon="arrow" placeholder="请选择单位性质"
							clickable @click.native="unitNatureClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>国家/地区
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FGJDQ']" right-icon="arrow" placeholder="请选择国家地区"
							clickable @click.native="countryClicked(0)" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>户籍所属省份
						</div>
						<van-field v-model="applicant['JOB_SQRXXB.FHJSZSS']" right-icon="arrow" placeholder="请选择户籍所属省份"
							clickable @click.native="provinceClicked(0)" />
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
							clickable @click.native="situationClicked()" />
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
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FXB']" right-icon="arrow" placeholder="请选择性别"
							clickable @click.native="sexAssignorClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FZJZL']" right-icon="arrow" placeholder="请选择证件种类"
							clickable @click.native="certificateAssignorClicked()" />
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
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FDWXZ']" right-icon="arrow" placeholder="请选择单位性质"
							class="field-background" disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>国家/地区
						</div>
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FGJDQ']" right-icon="arrow" placeholder="请选择国家地区"
							clickable @click.native="countryClicked(1)" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>户籍所属省份
						</div>
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FHJSZSS']" right-icon="arrow"
							placeholder="请选择户籍所属省份" clickable @click.native="provinceClicked(1)" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>联系电话
						</div>
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FLXDH']" clearable placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>共有情况
						</div>
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FGYQK']" right-icon="arrow" placeholder="请选择共有情况"
							clickable @click.native="situationAssignorClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field v-model="assignor['JOB_SQRXXB_OLD.FQLBL']" clearable placeholder="权利比例" />
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
								<div class="name">{{ item['JOB_SQRXXB_OLD.FSQRMC'] || '' }}</div>
								<div class="num">{{ item['JOB_SQRXXB_OLD.FZJHM'] || '' }}</div>
								<div class="handle">
									<van-button plain round type="info" size="small"
										@click.native="editApplicant(item, index, 1)">编辑</van-button>
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
				<van-button size="large" plain type="default">查看申请书</van-button>
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
		TEST
	} from '../../../constants/index.js';
	import AgmDatePicker from '../../calendar.vue'
	export default {
		components: {
			'page-head': Head,
			'calendar-view': AgmDatePicker
		},
		data() {
			return {
				calendar: {
					show: false,
					value: [], //默认日期
					zero: true,
					lunar: false, //显示农历
					select: (value) => {
						console.log('value', value);
						this.calendar.show = false;
						this.calendar.value = value;
						this.valuesParams['JOB_FDCQXXB.FTDSYQSSJ'] =
							value.join("/");
					}
				},
				calendar2: {
					show: false,
					value: [], //默认日期
					zero: true,
					lunar: false, //显示农历
					select: (value) => {
						console.log('value', value);
						this.calendar2.show = false;
						this.calendar2.value = value;
						this.valuesParams['JOB_FDCQXXB.FTDSYJSSJ'] =
							value.join("/");
					}
				},
				calendar3: {
					show: false,
					value: [], //默认日期
					zero: true,
					lunar: false, //显示农历
					select: (value) => {
						console.log('value', value);
						this.calendar3.show = false;
						this.calendar3.value = value;
						this.valuesParams['JOB_FDCQXXB.FJYRQ'] =
							value.join("/");
					}
				},
				taskId: '',
				show: false,
				type: 0,
				valuesParams: {}, // 主表
				person: '',
				idCard: '',
				propertySource: '',
				assignorPerson: '',
				assignorIdCard: '',
				currentDate: [],
				applicant: { // 受让人信息
					//此处需要更改信息字段保证与传递过来的数据字段一致,便于直接赋值见下面
					//created()方法
					'JOB_SQRXXB.FBZ': "",
					'JOB_SQRXXB.FDLJG': "",
					'JOB_SQRXXB.FDLRDH': "",
					'JOB_SQRXXB.FDLRMC': "",
					'JOB_SQRXXB.FDLRZJHM': "",
					'JOB_SQRXXB.FDWXZ': "",
					'JOB_SQRXXB.FDZYJ': "",
					'JOB_SQRXXB.FFRMC': "",
					'JOB_SQRXXB.FFRZJHM': "",
					'JOB_SQRXXB.FGJDQ': "",
					'JOB_SQRXXB.FGYQK': "",
					'JOB_SQRXXB.FGZDW': "",
					'JOB_SQRXXB.FHJSZSS': "",
					'JOB_SQRXXB.FLXDH': "",
					'JOB_SQRXXB.FLXR': "",
					'JOB_SQRXXB.FQLBL': "",
					'JOB_SQRXXB.FSQRLX': "",
					'JOB_SQRXXB.FSQRMC': "",
					'JOB_SQRXXB.FSSHY': "",
					'JOB_SQRXXB.FTXDZ': "",
					'JOB_SQRXXB.FXB': "",
					'JOB_SQRXXB.FXXQRZT': "",
					'JOB_SQRXXB.FYB': "",
					'JOB_SQRXXB.FZJHM': "",
					'JOB_SQRXXB.FZJZL': "",
					'JOB_SQRXXB.FZP': "",
					'JOB_SQRXXB.RID': "",
					'JOB_SQRXXB.SYS_MRID': "",
					'JOB_SQRXXB.XH': null,
				},
				assignor: { // 转让人信息
					//此处需要更改信息字段保证与传递过来的数据字段一致,便于直接赋值见下面
					//created()方法
					'JOB_SQRXXB_OLD.FBZ': null,
					'JOB_SQRXXB_OLD.FCQZH': null,
					'JOB_SQRXXB_OLD.FDLJG': null,
					'JOB_SQRXXB_OLD.FDLRDH': null,
					'JOB_SQRXXB_OLD.FDLRMC': null,
					'JOB_SQRXXB_OLD.FDLRZJHM': null,
					'JOB_SQRXXB_OLD.FDWXZ': "",
					'JOB_SQRXXB_OLD.FDZYJ': null,
					'JOB_SQRXXB_OLD.FFRMC': null,
					'JOB_SQRXXB_OLD.FFRZJHM': null,
					'JOB_SQRXXB_OLD.FGJDQ': null,
					'JOB_SQRXXB_OLD.FGYQK': "",
					'JOB_SQRXXB_OLD.FGZDW': null,
					'JOB_SQRXXB_OLD.FHJSZSS': null,
					'JOB_SQRXXB_OLD.FLXDH': "",
					'JOB_SQRXXB_OLD.FLXR': null,
					'JOB_SQRXXB_OLD.FQLBL': "",
					'JOB_SQRXXB_OLD.FSQRLX': "",
					'JOB_SQRXXB_OLD.FSQRMC': "",
					'JOB_SQRXXB_OLD.FSSHY': null,
					'JOB_SQRXXB_OLD.FTXDZ': null,
					'JOB_SQRXXB_OLD.FXB': null,
					'JOB_SQRXXB_OLD.FXXQRZT': null,
					'JOB_SQRXXB_OLD.FYB': null,
					'JOB_SQRXXB_OLD.FZJHM': "",
					'JOB_SQRXXB_OLD.FZJZL': "",
					'JOB_SQRXXB_OLD.FZP': null,
					'JOB_SQRXXB_OLD.RID': "",
					'JOB_SQRXXB_OLD.SYS_MRID': "",
					'JOB_SQRXXB_OLD.XH': "",
				},
				applications: [{
					name: '国有建设用地使用权及房屋所有权转移登记'
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
				propertySources: [{
					name: '买卖'
				}, {
					name: '赠与'
				}, {
					name: '作价出资(入股)'
				}, {
					name: '房改房'
				}],
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
				unitNatures: [{
						name: '个人'
					},
					{
						name: '企业'
					},
					{
						name: '事业单位'
					},
					{
						name: '国家机关'
					},
					{
						name: '其他'
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
				actions: [],
				actionsheetShow: false,
				applicants: [],
				assignors: [],
				editApplicantState: false,
				editAssignorState: false,
				applicantIndex: -1,
				assignorIndex: -1,
				countryType: '',
				provincesType: '',
				goBack: false,
				emsNecessary: false, //EMS是否显示星号
			}
		},
		methods: {
			LUStartDrop(e) {
				this.calendar.show = true;
				this.calendar.left = e.target.offsetLeft + 19;
				this.calendar.top = e.target.offsetTop + 70;

				e.stopPropagation();
				window.setTimeout(() => {
					document.addEventListener("click", (e) => {
						this.calendar.show = false;
						document.removeEventListener("click", () => {}, false);
					}, false);
				}, 1000)
			},
			LUEndDrop(e) {
				this.calendar2.show = true;
				this.calendar2.left = e.target.offsetLeft + 19;
				this.calendar2.top = e.target.offsetTop + 70;

				e.stopPropagation();
				window.setTimeout(() => {
					document.addEventListener("click", (e) => {
						this.calendar2.show = false;
						document.removeEventListener("click", () => {}, false);
					}, false);
				}, 1000)
			},
			tradingDateDrop(e) {
				this.calendar3.show = true;
				this.calendar3.left = e.target.offsetLeft + 19;
				this.calendar3.top = e.target.offsetTop + 70;

				e.stopPropagation();
				window.setTimeout(() => {
					document.addEventListener("click", (e) => {
						this.calendar3.show = false;
						document.removeEventListener("click", () => {}, false);
					}, false);
				}, 1000)
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
			countryClicked: function (type) {
				this.show = true;
				this.type = 2;
				this.actions = this.countries;
				this.countryType = type;
			},
			provinceClicked: function (type) {
				this.show = true;
				this.type = 3;
				this.actions = this.provinces;
				this.provincesType = type;
			},
			propertySourceClicked: function () {
				this.show = true;
				this.type = 4;
				this.actions = this.propertySources;
			},
			sexClicked: function () {
				this.show = true;
				this.type = 5;
				this.actions = this.sexs;
			},
			certificateClicked: function () {
				this.show = true;
				this.type = 6;
				this.actions = this.certificates;
			},
			unitNatureClicked: function () {
				this.show = true;
				this.type = 7;
				this.actions = this.unitNatures;
			},
			situationClicked: function () {
				this.show = true;
				this.type = 8;
				this.actions = this.situations;
			},
			sexAssignorClicked: function () {
				this.show = true;
				this.type = 9;
				this.actions = this.sexs;
			},
			certificateAssignorClicked: function () {
				this.show = true;
				this.type = 10;
				this.actions = this.certificates;
			},
			unitNatureAssignorClicked: function () {
				this.show = true;
				this.type = 11;
				this.actions = this.unitNatures;
			},
			situationAssignorClicked: function () {
				this.show = true;
				this.type = 12;
				this.actions = this.situations;
			},
			materialClicked: function () {
				this.show = true;
				this.type = 13;
				this.actions = this.materials;
			},
			credentialClicked: function () {
				this.show = true;
				this.type = 14;
				this.actions = this.credentials;
			},
			townShipEMSClicked: function () {
				this.show = true;
				this.type = 15;
				this.actions = this.townships;
			},
			onSelect: function (val) {
				console.log(val)
				this.show = false;
				if (this.type == 0) {
					this.valuesParams['JOB_SJDJB.FDJLX'] = val.name;
				} else if (this.type == 1) {
					this.valuesParams['JOB_SJDJB.FZQDM'] = val.name;
				} else if (this.type == 2) {
					if (this.countryType == 0) {
						//受让人
						this.applicant['JOB_SQRXXB.FGJDQ'] = val.name.replace('>', '');
					} else if (this.countryType == 1) {
						//转让人
						this.assignor['JOB_SQRXXB_OLD.FGJDQ'] = val.name;
					}
				} else if (this.type == 3) {
					if (this.provincesType == 0) {
						//受让人
						this.applicant['JOB_SQRXXB.FHJSZSS'] = val.name;
					} else if (this.provincesType == 1) {
						//转让人
						this.assignor['JOB_SQRXXB_OLD.FHJSZSS'] = val.name;
					}
				} else if (this.type == 4) {
					if (val.name == '买卖') {
						this.propertySource = val.name;
						this.valuesParams['JOB_FDCQXXB.FCQLY'] = 42;
					} else if (val.name == '赠与') {
						this.propertySource = val.name;
						this.valuesParams['JOB_FDCQXXB.FCQLY'] = 49;
					} else if (val.name == '作价出资(入股)') {
						this.propertySource = val.name;
						this.valuesParams['JOB_FDCQXXB.FCQLY'] = 50;
					} else if (val.name == '房改房') {
						this.propertySource = val.name;
						this.valuesParams['JOB_FDCQXXB.FCQLY'] = 64;
					}
				} else if (this.type == 5) {
					this.applicant['JOB_SQRXXB.FXB'] = val.name;
				} else if (this.type == 6) {
					this.applicant['JOB_SQRXXB.FZJZL'] = val.name;
				} else if (this.type == 7) {
					this.applicant['JOB_SQRXXB.FDWXZ'] = val.name;
				} else if (this.type == 8) {
					this.applicant['JOB_SQRXXB.FGYQK'] = val.name;
				} else if (this.type == 9) {
					this.assignor['JOB_SQRXXB_OLD.FXB'] = val.name;
				} else if (this.type == 10) {
					this.assignor['JOB_SQRXXB_OLD.FZJZL'] = val.name;
				} else if (this.type == 11) {
					this.assignor['JOB_SQRXXB_OLD.FDWXZ'] = val.name;
				} else if (this.type == 12) {
					this.assignor['JOB_SQRXXB_OLD.FGYQK'] = val.name;
				} else if (this.type == 13) {
					//快递寄材料或快递寄证为'是',显示星号,反之不显示
					this.valuesParams['JOB_SJDJB.FSFKDJCL'] = val.name;
					if (val.name == '是' ||
						this.valuesParams['JOB_SJDJB.FSFKDJZ'] == '是') {
						this.emsNecessary = true;
					} else {
						this.emsNecessary = false;
					}
				} else if (this.type == 14) {
					//快递寄材料或快递寄证为'是',显示星号,反之不显示
					this.valuesParams['JOB_SJDJB.FSFKDJZ'] = val.name;
					if (val.name == '是' ||
						this.valuesParams['JOB_SJDJB.FSFKDJCL'] == '是') {
						this.emsNecessary = true;
					} else {
						this.emsNecessary = false;
					}
				} else if (this.type == 15) {
					this.valuesParams['JOB_SJDJB.FZQ'] = val.name;
				}
			},
			onCancel: function () {
				this.show = false;
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
					} else if (type == 1) {
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
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var reg2 = /(^[1]+[3-9]+\d{9}$)/;
				if (type == 0) {
					//受让人
					this.applicant['JOB_SQRXXB.FSQRMC'] = this.person;
					this.applicant['JOB_SQRXXB.FZJHM'] = this.idCard;
					var _applicant = this.applicant;
					if (!_applicant['JOB_SQRXXB.FSQRMC'] || _applicant['JOB_SQRXXB.FSQRMC'].length == 0) {
						Toast('请填写受让人姓名!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FXB'] || _applicant['JOB_SQRXXB.FXB'].length == 0) {
						Toast('请选择受让人性别!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FZJZL'] || _applicant['JOB_SQRXXB.FZJZL'].length == 0) {
						Toast('请选择受让人证件种类!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FZJHM'] || _applicant['JOB_SQRXXB.FZJHM'].length == 0) {
						Toast('请填写受让人证件号码!');
						return;
					} else if (_applicant['JOB_SQRXXB.FZJZL'] === "身份证" && !reg.test(_applicant['JOB_SQRXXB.FZJHM'])) {
						Toast('请填写受让人正确的证件号码!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FDWXZ'] || _applicant['JOB_SQRXXB.FDWXZ'].length == 0) {
						Toast('请选择受让人单位性质!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FGJDQ'] || _applicant['JOB_SQRXXB.FGJDQ'].length == 0) {
						Toast('请选择受让人国家/地区!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FHJSZSS'] || _applicant['JOB_SQRXXB.FHJSZSS'].length == 0) {
						Toast('请选择受让人户籍所属省份!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FLXDH'] || _applicant['JOB_SQRXXB.FLXDH'].length == 0) {
						Toast('请填写受让人联系电话!');
						return;
					} else if (!reg2.test(_applicant['JOB_SQRXXB.FLXDH'])) {
						Toast('请填写受让人正确的联系电话!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FGYQK'] || _applicant['JOB_SQRXXB.FGYQK'].length == 0) {
						Toast('请选择受让人共有情况!');
						return;
					} else if (!_applicant['JOB_SQRXXB.FQLBL'] || _applicant['JOB_SQRXXB.FQLBL'].length == 0) {
						Toast('请填写受让人权利比例!');
						return;
					}
					//将当前数据保存至applicants数组用作遍历展示
					this.applicant['JOB_SQRXXB.FSQRLX'] = '房地产权利人';
					if (this.applicantIndex != -1) {
						this.applicant['JOB_SQRXXB.XH'] = this.applicantIndex + 1;
						this.applicants[this.applicantIndex] = this.applicant;
					} else {
						this.applicant['JOB_SQRXXB.XH'] = this.applicants.length + 1;
						this.applicants.push(this.applicant);
					}

					this.applicantIndex = -1;
					this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', [this.applicant], true);
					this.applicant = {};
					this.person = '';
					this.idCard = '';
				} else if (type == 1) {
					//转让人(义务人)
					this.assignor['JOB_SQRXXB_OLD.FSQRMC'] = this.assignorPerson;
					this.assignor['JOB_SQRXXB_OLD.FZJHM'] = this.assignorIdCard;
					var _assignor = this.assignor;
					if (!_assignor['JOB_SQRXXB_OLD.FSQRMC'] || _assignor['JOB_SQRXXB_OLD.FSQRMC'].length == 0) {
						Toast('请填写转让人姓名!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FXB'] || _assignor['JOB_SQRXXB_OLD.FXB'].length == 0) {
						Toast('请选择转让人性别!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FZJZL'] || _assignor['JOB_SQRXXB_OLD.FZJZL'].length == 0) {
						Toast('请选择转让人证件种类!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FZJHM'] || _assignor['JOB_SQRXXB_OLD.FZJHM'].length == 0) {
						Toast('请填写转让人证件号码!');
						return;
					} else if (_assignor['JOB_SQRXXB_OLD.FZJZL'] === "身份证" && !reg.test(_assignor[
							'JOB_SQRXXB_OLD.FZJHM'])) {
						Toast('请填写转让人正确的证件号码!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FDWXZ'] || _assignor['JOB_SQRXXB_OLD.FDWXZ'].length == 0) {
						Toast('请选择转让人单位性质!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FGJDQ'] || _assignor['JOB_SQRXXB_OLD.FGJDQ'].length == 0) {
						Toast('请选择转让人国家/地区!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FHJSZSS'] || _assignor['JOB_SQRXXB_OLD.FHJSZSS'].length ==
						0) {
						Toast('请选择转让人户籍所属省份!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FLXDH'] || _assignor['JOB_SQRXXB_OLD.FLXDH'].length == 0) {
						Toast('请填写转让人联系电话!');
						return;
					} else if (!reg2.test(_assignor['JOB_SQRXXB_OLD.FLXDH'])) {
						Toast('请填写转让人正确的联系电话!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FGYQK'] || _assignor['JOB_SQRXXB_OLD.FGYQK'].length == 0) {
						Toast('请选择转让人共有情况!');
						return;
					} else if (!_assignor['JOB_SQRXXB_OLD.FQLBL'] || _assignor['JOB_SQRXXB_OLD.FQLBL'].length == 0) {
						Toast('请填写转让人权利比例!');
						return;
					}
					//将当前数据保存至assignors数组用作遍历展示
					this.assignor['JOB_SQRXXB_OLD.FSQRLX'] = '权利转让人';
					if (this.assignorIndex != -1) {
						this.assignor['JOB_SQRXXB_OLD.XH'] = this.assignorIndex + 1;
						this.assignors[this.assignorIndex] = this.assignor;
					} else {
						this.assignor['JOB_SQRXXB_OLD.XH'] = this.assignors
							.length + 1;
						this.assignors.push(this.assignor);
					}
					this.assignorIndex = -1;
					this.fillSubFormData('JOB_SQRXXB_OLD_LINK.OLD_IQLR',
						[this.assignor], true);
					this.assignor = {};
					this.assignorPerson = '';
					this.assignorIdCard = '';
				}
			},
			editApplicant: function (item, index, type) {
				if (type == 0) {
					//受让人
					this.applicantIndex = index;
					this.applicant = item;
					this.person = item['JOB_SQRXXB.FSQRMC'];
					this.idCard = item['JOB_SQRXXB.FZJHM'];
				} else if (type == 1) {
					//转让人
					this.assignorIndex = index;
					this.assignor = item;
					this.assignorPerson = item['JOB_SQRXXB_OLD.FSQRMC'];
					this.assignorIdCard = item['JOB_SQRXXB_OLD.FZJHM'];
				}
				console.log("applicantIndex=" + this.applicantIndex);
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
				} else if (!this.valuesParams['JOB_FDCQXXB.FBDCDYH'] || this.valuesParams['JOB_FDCQXXB.FBDCDYH']
					.length == 0) {
					Toast('请填写不动产单元号!');
					return;
				} else if (!this.valuesParams['JOB_FDCQXXB.FBDCLX'] || this.valuesParams['JOB_FDCQXXB.FBDCLX']
					.length == 0) {
					Toast('请填写不动产类型!');
					return;
				} else if (!this.valuesParams['JOB_FDCQXXB.FFDZL'] || this.valuesParams['JOB_FDCQXXB.FFDZL'].length ==
					0) {
					Toast('请填写坐落!');
					return;
				} else if (!this.valuesParams['JOB_FDCQXXB.FBDCQZH'] || this.valuesParams['JOB_FDCQXXB.FBDCQZH']
					.length == 0) {
					Toast('请填原不动产权证号!');
					return;
				}
				//受让人内容判断未填项
				var _applicants = this.applicants;
				if (_applicants.length == 0) {
					Toast('受让人信息未保存!');
					return;
				}
				//转让人内容判断未填项
				var _assignors = this.assignors;
				if (_assignors.length == 0) {
					Toast('转让人信息未保存!');
					return;
				} else {
					for (var i = 0; i < this.assignors.length; i++) {
						if (!_assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] || _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'].length ==
							0) {
							Toast('请填写第' + i + '个转让人的姓名!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FXB'] || _assignors[i]['JOB_SQRXXB_OLD.FXB']
							.length == 0) {
							Toast('请选择转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的性别!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FZJZL'] || _assignors[i]['JOB_SQRXXB_OLD.FZJZL']
							.length == 0) {
							Toast('请选择转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的证件种类!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FZJHM'] || _assignors[i]['JOB_SQRXXB_OLD.FZJHM']
							.length == 0) {
							Toast('请填写转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的证件号码!');
							return;
						} else if (_assignors[i]['JOB_SQRXXB_OLD.FZJZL'] === "身份证" && !reg.test(_assignors[i][
								'JOB_SQRXXB_OLD.FZJHM'
							])) {
							Toast('请填写转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '正确的证件号码!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FDWXZ'] || _assignors[i]['JOB_SQRXXB_OLD.FDWXZ']
							.length == 0) {
							Toast('请选择转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的单位性质!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FGJDQ'] || _assignors[i]['JOB_SQRXXB_OLD.FGJDQ']
							.length == 0) {
							Toast('请选择转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的国家/地区!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FHJSZSS'] || _assignors[i]['JOB_SQRXXB_OLD.FHJSZSS']
							.length == 0) {
							Toast('请选择转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的户籍所属省份!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FLXDH'] || _assignors[i]['JOB_SQRXXB_OLD.FLXDH']
							.length == 0) {
							Toast('请填写转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的联系电话!');
							return;
						} else if (!reg2.test(_assignors[i]['JOB_SQRXXB_OLD.FLXDH'])) {
							Toast('请填写转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '正确的联系电话!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FGYQK'] || _assignors[i]['JOB_SQRXXB_OLD.FGYQK']
							.length == 0) {
							Toast('请选择转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的共有情况!');
							return;
						} else if (!_assignors[i]['JOB_SQRXXB_OLD.FQLBL'] || _assignors[i]['JOB_SQRXXB_OLD.FQLBL']
							.length == 0) {
							Toast('请填写转让人' + _assignors[i]['JOB_SQRXXB_OLD.FSQRMC'] + '的权利比例!');
							return;
						}
					}
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
						path: '/onlineApplication/CLFZYDJ/attachment'
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
						if (title === 'JOB_SQRXXB_OLD_LINK.OLD_IQLR') { // 转让人
							_this.assignors = response.rows;
						} else if (title === 'JOB_GLQLXXB_LINK.OLD_IQLDJ') {  // 权利信息
							
						}else if (title === 'JOB_SQRXXB_LINK.IQLR') { // 权利人
							_this.applicants = response.rows;
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
					if (response.data.code === 0) {
						sessionStorage.setItem(title, JSON.stringify(response.data.result));	
					}
				}).catch(error => {
					Toast.clear();
					console.log(error);
				});

			},
			startExactBusiness: function (rid, businessNumber) {
				sessionStorage.setItem('jid', businessNumber);
				console.log('businessNumber', businessNumber);
				var checkType = this.$route.query.checkType;
				var configureText = '';
				if (checkType == 0) {
					configureText = '存量房提取合同';
				} else if (checkType == 1) {
					configureText = '存量房提取产权';
				}
				this.$fetch(START_EXACT_BUSINNESS, {
						srcMark: '$bdcsjtq_cq:RID=' + rid + '&type=1',
						targetJid: businessNumber,
						configureName: configureText
					}).then(response => {
						console.log(response);
						Toast.clear();
						//不动产单元号
						this.valuesParams['JOB_FDCQXXB.FBDCDYH'] = response['JOB_FDCQXXB.FBDCDYH'];
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
						//不动产类型
						this.valuesParams['JOB_FDCQXXB.FBDCLX'] = bdclx;
						//坐落
						this.valuesParams['JOB_FDCQXXB.FFDZL'] = response['JOB_FDCQXXB.FFDZL'];
						//土地性质
						this.valuesParams['JOB_FDCQXXB.FQLXZ'] = response['JOB_FDCQXXB.FQLXZ'];
						//土地用途
						this.valuesParams['JOB_FDCQXXB.FTDYT'] = response['JOB_FDCQXXB.FTDYT'];
						//土地使用面积
						this.valuesParams['JOB_FDCQXXB.FZDMJ'] = response['JOB_FDCQXXB.FZDMJ'];
						//房屋结构
						this.valuesParams['JOB_FDCQXXB.FFWJG'] = response['JOB_FDCQXXB.FFWJG'];
						//房屋性质
						this.valuesParams['JOB_FDCQXXB.FFWXZ'] = response['JOB_FDCQXXB.FFWXZ'];
						//房屋用途
						this.valuesParams['JOB_FDCQXXB.FFWYT'] = response['JOB_FDCQXXB.FFWYT'];
						//建筑面积
						this.valuesParams['JOB_FDCQXXB.FJZMJ'] = response['JOB_FDCQXXB.FJZMJ'];
						//专有建筑面积
						this.valuesParams['JOB_FDCQXXB.FZYJZMJ'] = response['JOB_FDCQXXB.FZYJZMJ'];
						//分摊建筑面积
						this.valuesParams['JOB_FDCQXXB.FFTJZMJ'] = response['JOB_FDCQXXB.FFTJZMJ'];
						//合同号
						this.valuesParams['JOB_FDCQXXB.FHTBH'] = response['JOB_FDCQXXB.FHTBH'];
						//取得价格
						this.valuesParams['JOB_FDCQXXB.FFDCJYJG'] = response['JOB_FDCQXXB.FFDCJYJG'];
						// 原不动产权证明	
						this.valuesParams['JOB_FDCQXXB.FBDCQZH'] = response["JOB_FDCQXXB.FBDCQZH"];

						this.assignors = response['JOB_SQRXXB_OLD_LINK.OLD_IQLR'];
						for (var i = 0; i < this.assignors.length; i++) {
							this.assignors[i]['JOB_SQRXXB_OLD.XH'] = i + 1;
						}
						Toast.clear();
						this.fillSubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ', response['JOB_GLQLXXB_LINK.OLD_IQLDJ']);
						this.fillSubFormData('JOB_SQRXXB_OLD_LINK.OLD_IQLR', response['JOB_SQRXXB_OLD_LINK.OLD_IQLR']);

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
			if (to.path === '/onlineApplication/CLFZYDJ/bookIn') {
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
						// 提取权利信息
						_this.querySubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ');
						// 提取转让人
						_this.querySubFormData('JOB_SQRXXB_OLD_LINK.OLD_IQLR');
						// 提取受让人
						_this.querySubFormData('JOB_SQRXXB_LINK.IQLR');
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
				console.log('businessDefinitionId:', this.$route.query.businessDefinitionId);
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
					sessionStorage.setItem('taskId', taskId);
					sessionStorage.setItem('business', JSON.stringify(response));
					_this.taskId = taskId;
					console.log('taskId:', _this.taskId);
					_this.valuesParams = values;
					var ps = _this.valuesParams['JOB_FDCQXXB.FCQLY']
					if (ps == 42) {
						_this.propertySource = '买卖';
					} else if (ps == 49) {
						_this.propertySource = '赠与';
					} else if (ps == 50) {
						_this.propertySource = '作价出资(入股)';
					} else if (ps == 64) {
						_this.propertySource = '房改房';
					}
					console.log('>>>:', _this.valuesParams);
					sessionStorage.setItem('jid', businessNumber);
					_this.startExactBusiness(rid, businessNumber);
				}).catch(function (error) {
					console.log(error);
					Toast.clear();
				});
				var nowDate = new Date();
				var year = nowDate.getFullYear();
				var month = nowDate.getMonth() + 1;
				var date = nowDate.getDate();
				this.currentDate[0] = year;
				this.currentDate[1] = month;
				this.currentDate[2] = date;

				this.calendar.value = this.currentDate;
				this.calendar2.value = this.currentDate;
				this.calendar3.value = this.currentDate;
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
		color: #000;
	}

</style>
