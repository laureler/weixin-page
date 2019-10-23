<!--
 * @Author: charls.fairy
 * @Motto: Your smile is my rainbow.
 * @Website: https://www.fairy520.top/
 * @Github: https://github.com/CharlsPrince
 * @Date: 2019-10-23 10:26:35
 * @LastEditors: charls.fairy
 * @LastEditTime: 2019-10-23 17:00:44
 * @Description: 房地产权（独幢、层、套、间房屋）变更登记
 -->
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
							placeholder="请选择申请事项" clickable @click.native="actionsheetClicked('itemOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>镇区
						</div>
						<van-field id="JOB_SJDJB.FZQDM" v-model="JOB_BDCQK['JOB_SJDJB.FZQDM']" right-icon="arrow"
							placeholder="请选择镇区" clickable @click.native="actionsheetClicked('townshipOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产单元号
						</div>
						<van-field id="JOB_FDCQXXB.FBDCDYH" class="disabled-field"
							v-model="JOB_BDCQK['JOB_FDCQXXB.FBDCDYH']" placeholder="不动产单元号" clickable disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产类型
						</div>
						<van-field id="JOB_FDCQXXB.FBDCLX" class="disabled-field"
							v-model="JOB_BDCQK['JOB_FDCQXXB.FBDCLX']" right-icon="arrow" placeholder="不动产类型" disabled
							clickable @click.native="actionsheetClicked('estateOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>坐落
						</div>
						<van-field id="JOB_FDCQXXB.FFDZL" class="disabled-field"
							v-model="JOB_BDCQK['JOB_FDCQXXB.FFDZL']" placeholder="坐落" clickable disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							面积
						</div>
						<van-field id="JOB_FDCQXXB.FJZMJ" class="disabled-field"
							v-model="JOB_BDCQK['JOB_FDCQXXB.FJZMJ']" placeholder="面积" clickable disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							用途
						</div>
						<van-field id="JOB_FDCQXXB.FGHYT" class="disabled-field"
							v-model="JOB_BDCQK['JOB_FDCQXXB.FGHYT']" placeholder="用途" clickable disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>原不动产权证号
						</div>
						<van-field id="JOB_FDCQXXB.FBDCQZH" class="disabled-field"
							v-model="JOB_BDCQK['JOB_FDCQXXB.FBDCQZH']" placeholder="原不动产权证号" clickable disabled />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>登记原因
						</div>
						<van-field id="JOB_FDCQXXB.FDJYY" v-model="JOB_BDCQK['JOB_FDCQXXB.FDJYY']" right-icon="arrow"
							clearable placeholder="登记原因" @click.native="actionsheetClicked('reasonOptions')" />
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
							clickable placeholder="证件种类" @click.native="actionsheetClicked('idTypeOptions')" />
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
							clickable placeholder="单位性质" @click.native="actionsheetClicked('companyTypeOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>国家/地区
						</div>
						<van-field id="JOB_SQRXXB.FGJDQ" v-model="applicant['JOB_SQRXXB.FGJDQ']" right-icon="arrow"
							clickable placeholder="国家/地区" @click.native="actionsheetClicked('countryOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							户籍所属省份
						</div>
						<van-field id="JOB_SQRXXB.FHJSZSS" v-model="applicant['JOB_SQRXXB.FHJSZSS']" right-icon="arrow"
							clickable placeholder="户籍所属省份" @click.native="actionsheetClicked('censusOptions')" />
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
							clickable placeholder="共有情况" @click.native="actionsheetClicked('commonOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field id="JOB_SQRXXB.FQLBL" v-model="applicant['JOB_SQRXXB.FQLBL']" clearable
							placeholder="权利比例" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info" @click.native="saveApplicant()"
							v-show="saveShow">保存
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
				<van-tab title="变更事项">
					<!-- <div style="padding: 15px;">提示：若更正类型涉及到权利人更正（如权利人名称、证件号码、证件类型等信息）， 请修改“权利人”相应信息，并将更正内容填写至“更正事项”，
						若涉及到房屋信息更正，则只需将更正内容填入“更正事项”表。</div> -->
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>变更事项
						</div>
						<van-field id="JOB_XGXXB.FXGSX" v-model="changeItem['JOB_XGXXB.FXGSX']" right-icon="arrow"
							clearable placeholder="变更事项" @click.native="actionsheetClicked('contentOptions')" />
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
						<van-button v-if="editChangeItemState" class="info-btn" size="small" type="danger"
							@click.native="delChangeItem()">删除
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
				<van-tab title="EMS寄件信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>快递寄材料
						</div>
						<van-field id="JOB_SJDJB.FSFKDJCL" v-model="JOB_BDCQK['JOB_SJDJB.FSFKDJCL']" right-icon="arrow"
							placeholder="请选择快递寄材料" clickable @click.native="actionsheetClicked('materialOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>快递寄证
						</div>
						<van-field id="JOB_SJDJB.FSFKDJZ" v-model="JOB_BDCQK['JOB_SJDJB.FSFKDJZ']" right-icon="arrow"
							placeholder="请选择快递寄证" clickable @click.native="actionsheetClicked('credentialOptions')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span" v-show="emsNecessary">*</span>联系人
						</div>
						<van-field id="JOB_SJDJB.FDXLXR" v-model="JOB_BDCQK['JOB_SJDJB.FDXLXR']" clearable
							placeholder="联系人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span" v-show="emsNecessary">*</span>联系电话
						</div>
						<van-field id="JOB_SJDJB.FDXTZDH" v-model="JOB_BDCQK['JOB_SJDJB.FDXTZDH']" clearable
							placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							身份证号码
						</div>
						<van-field id="JOB_SJDJB.FLXRSFZHM" v-model="JOB_BDCQK['JOB_SJDJB.FLXRSFZHM']" clearable
							placeholder="身份证号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							所在镇区
						</div>
						<van-field id="JOB_SJDJB.FZQ" v-model="JOB_BDCQK['JOB_SJDJB.FZQ']" right-icon="arrow"
							placeholder="请选择所在镇区" clickable @click.native="actionsheetClicked('township2Options')" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							单位
						</div>
						<van-field id="JOB_SJDJB.FDW" v-model="JOB_BDCQK['JOB_SJDJB.FDW']" clearable placeholder="单位" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span" v-show="emsNecessary">*</span>联系地址
						</div>
						<van-field id="JOB_SJDJB.FDZ" v-model="JOB_BDCQK['JOB_SJDJB.FDZ']" clearable
							placeholder="联系地址" />
					</van-cell-group>
				</van-tab>
			</van-tabs>
			<div style="height: 50px;"></div>
			<div class="bottom-box">
				<!-- <van-button size="large" plain type="default">查看申请书</van-button> -->
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
		DEL_SUB_FORM_DATA,
		TEST,
		exchangeZqdm,
		exchangeZqdmToZqmc
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
					name: '房地产权（独幢、层、套、间房屋）变更登记'
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
				township2Options: [{
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
					name: '状态变更'
				}, {
					name: '其他变更'
				}], // 登记原因
				countryOptions: [{
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
				companyTypeOptions: [{
					name: '个人'
				}],
				materialOptions: [{
						name: '是'
					},
					{
						name: '否'
					}
				],
				credentialOptions: [{
						name: '是'
					},
					{
						name: '否'
					}
				],
				actions: [],
				actionsheetShow: false,
				JOB_BDCQK: {
					'JOB_SJDJB.FSFKDJCL': '否',
					'JOB_SJDJB.FSFKDJZ': '否',
					'JOB_SJDJB.FDXLXR': '黄油成',
					'JOB_SJDJB.FDXTZDH': '13631330332',
					'JOB_SJDJB.FLXRSFZHM': '440981199301053238',
					'JOB_SJDJB.FZQ': '石岐区',
					'JOB_SJDJB.FDW': '南方数码',
					'JOB_SJDJB.FDZ': '天河区科韵路24-26号',
				}, // 主表
				'JOB_SQRXXB_LINK.IQLR': [], // 权利人
				applicant: {},
				applicantIndex: -1,
				'JOB_XGXXB_LINK.IXG': [], // 更改事项
				changeItem: {
					'JOB_XGXXB.FXGSX': '',
					'JOB_XGXXB.FXGQ': '',
					'JOB_XGXXB.FXGH': '',
				},
				changeItemIndex: -1,
				editChangeItemState: false,
				optionsTitle: '',
				qtyy: '',
				bz: '',
				goBack: false,
				emsNecessary: false,
				saveShow: false,
			}
		},
		methods: {
			actionsheetClicked: function (title) {
				this.actionsheetShow = true;
				this.actions = this.$data[title];
				this.optionsTitle = title;
			},
			onSelect: function (val) {
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
					this.applicant['JOB_SQRXXB.FGJDQ'] = val.name.replace('>', '');
				} else if (this.optionsTitle === 'censusOptions') { // 户籍所属省份
					this.applicant['JOB_SQRXXB.FHJSZSS'] = val.name;
				} else if (this.optionsTitle === 'commonOptions') { // 共有情况
					this.applicant['JOB_SQRXXB.FGYQK'] = val.name;
				} else if (this.optionsTitle === 'idTypeOptions') { // 证件类型
					this.applicant['JOB_SQRXXB.FZJZL'] = val.name;
				} else if (this.optionsTitle === 'contentOptions') { // 更改事项
					this.changeItem['JOB_XGXXB.FXGSX'] = val.name;
				} else if (this.optionsTitle === 'materialOptions') { // 是否寄件
					this.$data['JOB_BDCQK']['JOB_SJDJB.FSFKDJCL'] = val.name;
					if (val.name === '是' || this.$data['JOB_BDCQK']['JOB_SJDJB.FSFKDJZ'] === '是') {
						this.emsNecessary = true;
					} else {
						this.emsNecessary = false;
					}
				} else if (this.optionsTitle === 'credentialOptions') { // 是否寄证
					this.$data['JOB_BDCQK']['JOB_SJDJB.FSFKDJZ'] = val.name;
					if (val.name === '是' || this.$data['JOB_BDCQK']['JOB_SJDJB.FSFKDJCL'] === '是') {
						this.emsNecessary = true;
					} else {
						this.emsNecessary = false;
					}
				} else if (this.optionsTitle === 'township2Options') { // 镇区
					this.$data['JOB_BDCQK']['JOB_SJDJB.FZQ'] = val.name;
				}
				this.actionsheetShow = false;
			},
			onCancel: function () {
				this.actionsheetShow = false;
			},
			delApplicant: function () {
				Dialog.confirm({
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

				if (!this.applicant['JOB_SQRXXB.SYS_MRID'] || this.applicant['JOB_SQRXXB.SYS_MRID'].length == 0) {
					this.$toast('请选择权利人!');
				} else {
					var applicant = this.applicant;
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					var reg2 = /(^[1]+[3-9]+\d{9}$)/;
					if (!applicant['JOB_SQRXXB.FSQRMC'] || applicant['JOB_SQRXXB.FSQRMC'].length == 0) {
						Toast('请填写权利人!');
						return;
					} else if (!applicant['JOB_SQRXXB.FXB'] || applicant['JOB_SQRXXB.FXB'].length == 0) {
						Toast('请选择权利人性别!');
						return;
					} else if (!applicant['JOB_SQRXXB.FZJZL'] || applicant['JOB_SQRXXB.FZJZL'].length == 0) {
						Toast('请选择权利人证件种类!');
						return;
					} else if (!applicant['JOB_SQRXXB.FZJHM'] || applicant['JOB_SQRXXB.FZJHM'].length == 0) {
						Toast('请选择权利人证件号码!');
						return;
					} else if (applicant['JOB_SQRXXB.FZJZL'] === "身份证" && !reg.test(applicant['JOB_SQRXXB.FZJHM'])) {
						Toast('请填写权利人正确的证件号码!');
						return;
					} else if (!applicant['JOB_SQRXXB.FDWXZ'] || applicant['JOB_SQRXXB.FDWXZ'].length == 0) {
						Toast('请选择权利人单位性质!');
						return;
					} else if (!applicant['JOB_SQRXXB.FGJDQ'] || applicant['JOB_SQRXXB.FGJDQ'].length == 0) {
						Toast('请选择权利人国家/地区!');
						return;
					} 
					/* else if (!applicant['JOB_SQRXXB.FHJSZSS'] || applicant['JOB_SQRXXB.FHJSZSS'].length == 0) {
						Toast('请选择权利人户籍所属省份!');
						return;
					} */
					 else if (!applicant['JOB_SQRXXB.FLXDH'] || applicant['JOB_SQRXXB.FLXDH'].length == 0) {
						Toast('请填写权利人联系电话!');
						return;
					} else if (!reg2.test(applicant['JOB_SQRXXB.FLXDH'])) {
						Toast('请填写权利人正确的联系电话!');
						return;
					} else if (!applicant['JOB_SQRXXB.FGYQK'] || applicant['JOB_SQRXXB.FGYQK'].length == 0) {
						Toast('请选择权利人共有情况!');
						return;
					} else if (!applicant['JOB_SQRXXB.FQLBL'] || applicant['JOB_SQRXXB.FQLBL'].length == 0) {
						Toast('请填写权利人权利比例!');
						return;
					}

					this.fillSubFormData('JOB_SQRXXB_LINK.IQLR', [this.applicant], true, true);
				}
			},
			saveChangeItem: function () {
				if (!this.changeItem['JOB_XGXXB.FXGSX'] || this.changeItem['JOB_XGXXB.FXGSX'].length == 0) {
					this.$toast('请选择更改内容!');
					return;
				} else if (!this.changeItem['JOB_XGXXB.FXGQ'] || this.changeItem['JOB_XGXXB.FXGQ'].length == 0) {
					this.$toast('请填写更改前!');
					return;
				} else if (!this.changeItem['JOB_XGXXB.FXGH'] || this.changeItem['JOB_XGXXB.FXGH'].length == 0) {
					this.$toast('请填写更改后!');
					return;
				}
				if (!this.changeItem['JOB_XGXXB.SYS_MRID']) {
					this.$data['JOB_XGXXB_LINK.IXG'].push(this.changeItem);
				} else {
					this.$data['JOB_XGXXB_LINK.IXG'].splice(this.changeItemIndex, 1, this.changeItem);
				}
				this.fillSubFormData('JOB_XGXXB_LINK.IXG', this.$data['JOB_XGXXB_LINK.IXG'], true);
				this.editChangeItemState = false;
			},
			editApplicant: function (item, index) { // 编辑申请人
				this.applicant = item;
				this.applicantIndex = index;
				this.saveShow = true;
			},
			editChangeItem: function (item, index) { // 编辑申请人
				this.changeItem = item;
				this.changeItemIndex = index;
				this.editChangeItemState = true;
			},
			delChangeItem: function () {
				var _this = this;
				Dialog.confirm({
					message: '确定要删除该变更事项吗?'
				}).then(() => {
					console.log('删除');
					_this.delSubFormData('JOB_XGXXB_LINK.IXG', [_this.changeItem], true);
				}).catch(() => {
					console.log('取消');
				});
			},
			// 删除字表内容
			delSubFormData: function (title, params, showLoading = false) {
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
						duration: 0,
						mask: true,
						message: '加载中...'
					});
				}
				this.axios({
					url: DEL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					Toast.clear();
					console.log(response);
					if (response.data.code == 0 && title === 'JOB_XGXXB_LINK.IXG') { // 修改事项
						_this.$data['JOB_XGXXB_LINK.IXG'].splice(_this.changeItemIndex, 1);
						_this.changeItemIndex = -1;
						_this.changeItem = {};
						_this.editChangeItemState = false;
					}
				}).catch(error => {
					Toast.clear();
					console.log(error);
				});
			},
			nextStep: function () {

				var applicant = this.$data['JOB_SQRXXB_LINK.IQLR'][0];
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				var reg2 = /(^[1]+[3-9]+\d{9}$)/;
				if (!this.$data['JOB_BDCQK']['JOB_SJDJB.FDJLX'] || this.$data['JOB_BDCQK']['JOB_SJDJB.FDJLX'].length ==
					0) {
					Toast('请选择申请事项!');
					return;
				} else if (!this.$data['JOB_BDCQK']['JOB_SJDJB.FZQDM'] || this.$data['JOB_BDCQK']['JOB_SJDJB.FZQDM']
					.length == 0) {
					Toast('请选择镇区!');
					return;
				} else if (!this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBDCDYH'] || this.$data['JOB_BDCQK'][
						'JOB_FDCQXXB.FBDCDYH'
					].length == 0) {
					Toast('请填写不动产单元号!');
					return;
				} else if (!this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBDCLX'] || this.$data['JOB_BDCQK'][
						'JOB_FDCQXXB.FBDCLX'
					].length == 0) {
					Toast('请选择不动产类型!');
					return;
				} else if (!this.$data['JOB_BDCQK']['JOB_FDCQXXB.FFDZL'] || this.$data['JOB_BDCQK'][
						'JOB_FDCQXXB.FFDZL'
					].length == 0) {
					Toast('请填写坐落!');
					return;
				} else if (!this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBDCQZH'] || this.$data['JOB_BDCQK'][
						'JOB_FDCQXXB.FBDCQZH'
					].length == 0) {
					Toast('请填写原不动产权证号!');
					return;
				} else if (!this.$data['JOB_BDCQK']['JOB_FDCQXXB.FDJYY'] || this.$data['JOB_BDCQK'][
						'JOB_FDCQXXB.FDJYY'
					].length == 0) {
					Toast('请选择登记原因!');
					return;
				} else if (!applicant['JOB_SQRXXB.FSQRMC'] || applicant['JOB_SQRXXB.FSQRMC'].length == 0) {
					Toast('请填写权利人!');
					return;
				} else if (!applicant['JOB_SQRXXB.FXB'] || applicant['JOB_SQRXXB.FXB'].length == 0) {
					Toast('请选择权利人性别!');
					return;
				} else if (!applicant['JOB_SQRXXB.FZJZL'] || applicant['JOB_SQRXXB.FZJZL'].length == 0) {
					Toast('请选择权利人证件种类!');
					return;
				} else if (!applicant['JOB_SQRXXB.FZJHM'] || applicant['JOB_SQRXXB.FZJHM'].length == 0) {
					Toast('请选择权利人证件号码!');
					return;
				} else if (applicant['JOB_SQRXXB.FZJZL'] === "身份证" && !reg.test(applicant['JOB_SQRXXB.FZJHM'])) {
					Toast('请填写权利人正确的证件号码!');
					return;
				} else if (!applicant['JOB_SQRXXB.FDWXZ'] || applicant['JOB_SQRXXB.FDWXZ'].length == 0) {
					Toast('请选择权利人单位性质!');
					return;
				} else if (!applicant['JOB_SQRXXB.FGJDQ'] || applicant['JOB_SQRXXB.FGJDQ'].length == 0) {
					Toast('请选择权利人国家/地区!');
					return;
				} 
				/* else if (!applicant['JOB_SQRXXB.FHJSZSS'] || applicant['JOB_SQRXXB.FHJSZSS'].length == 0) {
					Toast('请选择权利人户籍所属省份!');
					return;
				} */
				 else if (!applicant['JOB_SQRXXB.FLXDH'] || applicant['JOB_SQRXXB.FLXDH'].length == 0) {
					Toast('请填写权利人联系电话!');
					return;
				} else if (!reg2.test(applicant['JOB_SQRXXB.FLXDH'])) {
					Toast('请填写权利人正确的联系电话!');
					return;
				} else if (!applicant['JOB_SQRXXB.FGYQK'] || applicant['JOB_SQRXXB.FGYQK'].length == 0) {
					Toast('请选择权利人共有情况!');
					return;
				} else if (!applicant['JOB_SQRXXB.FQLBL'] || applicant['JOB_SQRXXB.FQLBL'].length == 0) {
					Toast('请填写权利人权利比例!');
					return;
				} else if (!this.$data['JOB_XGXXB_LINK.IXG'] || this.$data['JOB_XGXXB_LINK.IXG'].length == 0) {
					Toast('请填写更正事项!');
					return;
				}

				if (this.saveShow) {
					Toast('权利人信息未保存!');
					return;
				}

				if (this.$data['JOB_BDCQK']['JOB_SJDJB.FSFKDJCL'] === '是' || this.$data['JOB_BDCQK'][
						'JOB_SJDJB.FSFKDJZ'
					] === '是') {
					if (!this.$data['JOB_BDCQK']['JOB_SJDJB.FDXLXR'] || this.$data['JOB_BDCQK']['JOB_SJDJB.FDXLXR']
						.length == 0) {
						Toast('请填写EMS寄件信息联系人!');
						return;
					} else if (!reg2.test(this.$data['JOB_BDCQK']['JOB_SJDJB.FDXTZDH'])) {
						Toast('请填写EMS寄件信息正确的联系电话!');
						return;
					} else if (this.$data['JOB_BDCQK']['JOB_SJDJB.FLXRSFZHM'].length > 0 && !reg.test(this.$data[
							'JOB_BDCQK']['JOB_SJDJB.FLXRSFZHM'])) {
						Toast('请填写EMS寄件信息正确的证件号码!');
						return;
					} else if (!this.$data['JOB_BDCQK']['JOB_SJDJB.FDZ'] || this.$data['JOB_BDCQK']['JOB_SJDJB.FDZ']
						.length == 0) {
						Toast('请填写EMS寄件信息联系地址!');
						return;
					}
				}

				console.log('主表:', this.$data['JOB_BDCQK']);
				console.log('权利人表:', this.$data['JOB_SQRXXB_LINK.IQLR']);
				console.log('修改项表:', this.$data['JOB_XGXXB_LINK.IXG']);
				this.saveTaskFormData();
			},
			saveTaskFormData: function (next) {
				this.$data['JOB_BDCQK']['JOB_FDCQXXB.FQTYY'] = this.qtyy;
				this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBZ'] = this.bz;
				console.log(this.$data['JOB_BDCQK']);

				sessionStorage.setItem('formdata', JSON.stringify(this.$data['JOB_BDCQK']));
				Toast.loading({
					duration: 0,
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
						if (title === 'JOB_SQRXXB_LINK.IQLR') { // 权利人
							_this.$data['JOB_SQRXXB_LINK.IQLR'] = response.rows;
							if (!response.rows || !showloading) return;
							_this.applicantIndex = 0;
							_this.applicant = response.rows[0];
						} else if (title === 'JOB_XGXXB_LINK.IXG') { // 修改事项
							_this.$data['JOB_XGXXB_LINK.IXG'] = response.rows;
							if (!response.rows || !showloading) return;
							_this.changeItemIndex = 0;
							_this.changeItem = response.rows[0];
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
				var _this = this;
				if (showLoading) {
					Toast.loading({
						duration: 0,
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
					if (saveTape) {
						this.saveShow = false;
					}
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

				var _this = this;
				//判断产权是否土地，是土地的提取土地的产权
				var configureName = '土地和房屋变更登记';
				this.$fetch(START_EXACT_BUSINNESS, {
						srcMark: '$bdcsjtq_cq:RID=' + rid + '&type=1',
						targetJid: businessNumber,
						configureName: configureName
					}).then(response => {
						console.log(response);
						sessionStorage.setItem('startExactBusiness',
							JSON.stringify(response));
						Toast.clear();
						//获取不动产类型
						var qllx = response["JOB_GLQLXXB_LINK.OLD_IQLDJ"][0]["JOB_GLQLXXB.FQLLX"]
						var bdclx = getBdcType(qllx);

						var sBdcdyh = response['JOB_FDCQXXB.FBDCDYH'];
						var zqdm = exchangeZqdm(sBdcdyh);
						var zqmc = exchangeZqdmToZqmc(zqdm);
						_this.$data['JOB_BDCQK']['JOB_SJDJB.FZQDM'] = zqmc;

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

						Toast.clear();

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
			} else {
				next();
			}
		},
		created() {
			var formdata = sessionStorage.getItem('formdata');
			if (formdata) { // 不过本地存在业务则不创建
				this.taskId = sessionStorage.getItem('taskId');
				this.$data['JOB_BDCQK'] = JSON.parse(formdata);
				this.qtyy = this.$data['JOB_BDCQK']['JOB_FDCQXXB.FQTYY'];
				this.bz = this.$data['JOB_BDCQK']['JOB_FDCQXXB.FBZ'];
				this.querySubFormData('JOB_SQRXXB_LINK.IQLR');
				this.querySubFormData('JOB_GLQLXXB_LINK.OLD_IQLDJ');
				this.querySubFormData('JOB_XGXXB_LINK.IXG');
				return;
			}
			var _this = this;
			console.log('this.$route.query:', this.$route.query);
			if (this.$route.query && this.$route.query.processInstanceId) {
				Toast.loading({
					duration: 0,
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
						sessionStorage.setItem('jid', businessNumber);
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
					duration: 0,
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
						sessionStorage.setItem('jid', businessNumber);
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

	.disabled-field {
		background-color: #E5E5E5;
		color: #333333;
	}

	.van-field__control:disabled {
		color: #000 !important;
	}

</style>
