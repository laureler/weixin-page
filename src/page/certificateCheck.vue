<template>
	<div id="certificateCheck" style="height: 100%;width: 100%">

		<van-tabs v-model="active" @change="changeTab">
			<van-tab title="证书查验">
				<van-cell-group>
					<van-cell value="权利人"/>
					<van-field class="lineBox" v-model="quanliren" placeholder="请填写权利人"/>
					<van-cell value="证件类型"/>
					<van-cell class="lineBox" is-link :value="cardType" @click="selectType" :class="selectedValue"/>
					<van-cell value="证件号码"/>
					<van-field class="lineBox" v-model="cardNumber" placeholder="请填写证件号码"/>
					<van-cell value="证书号"/>
					<div style="display: flex;flex-direction: row;margin: 2px 14px; font-size: 16px;color: #989898">
						<div style="transform: translateY(0%)">
							<div @click="selectYear" style="display: inline">
								<span style="margin-right: 10px;">粤</span>
								<input type="text" v-model="year" disabled
								       style="border: 1px solid #989898;width: 78px;height: 40px;text-align: left;background: white;padding-left: 5px !important">
								<i data-v-03a2a6a8="" style="margin-left: -20px" class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
							</div>
							<span style="margin: 0 6px;">中山市不动产权第</span>
							<input type="text" v-model="budongchanquanzheng_number"
							       style="border: 1px solid #989898;width: 78px;height: 40px;text-align: left;padding-left: 5px !important;">
							<span style="margin: 0 10px;">号</span>
						</div>
					</div>
					<!--					<van-field class="lineBox" label="验证码"  placeholder="请输入验证码" />-->
					<!--					<van-col span="12">-->
					<!--						<img src="../../public/images/wechatstatic/bg_top.png" class="img"/>-->
					<!--					</van-col>-->
<!--					<van-cell value=""/>-->
					<!--<div style="color: #989898;">
						<div style="text-align: center">温馨提示：本网站只提供本级管辖区域内的不动产信息查询</div>
					</div>-->
					<div style="display: flex;flex-direction: row;justify-content: center;width: 80%;margin: 0 auto"
					     class="buttonArea">
						<van-button :loading="loading" type="info" @click="find_zhengshu">查询</van-button>
						<van-button type="default" @click="resetValue(0)">重置</van-button>
					</div>

					<div class="successDiv" v-show="successDiv">
						<div style="transform: translateY(50%)">
							<img src="../../public/images/通过@2x.png" class="successImg"/>
							<span class="successSpan">检验通过</span>
						</div>
					</div>
					<div class="failDiv" v-show="failDiv">
						<div style="transform: translateY(50%)">
							<img src="../../public/images/不存在@2x.png" class="successImg"/>
							<span class="failSpan">不存在该产权证书，请确认输入信息是否准确</span>
						</div>
					</div>
				</van-cell-group>
				<van-popup v-model="show" position="bottom" :overlay="false">
					<van-picker show-toolbar :columns="cardTypes" @confirm="confirmPicker"
					            @cancel="show = false"/>
				</van-popup>
				<van-popup v-model="yearSelect" position="bottom" :overlay="false">
					<van-picker show-toolbar :columns="years" @confirm="confirmPickerYear"
					            @cancel="yearSelect = false"/>
				</van-popup>
			</van-tab>
			<van-tab title="证明查验">
				<van-cell-group>
					<van-cell value="权利人"/>
					<van-field class="lineBox" v-model="quanliren2" placeholder="请填写权利人"/>
					<van-cell value="证件类型"/>
					<van-cell class="lineBox" is-link :value="cardType2" @click="selectType2" :class="selectedValue2"/>
					<van-cell value="证件号码"/>
					<van-field class="lineBox" v-model="cardNumber2" placeholder="请填写证件号码"/>
					<van-cell value="证明号"/>
					<div style="display: flex;flex-direction: row;margin: 2px 14px; font-size: 16px;color: #989898">
						<div style="transform: translateY(0%)">
							<div @click="selectYear2" style="display: inline">
								<span style="margin-right: 2px;">粤</span>
								<input type="text" v-model="year2"
								       style="border: 1px solid #989898;width: 78px;height: 40px;text-align: left;background: white;padding-left: 5px !important">
								<i data-v-03a2a6a8="" style="margin-left: -20px" class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
							</div>
							<span style="margin: 0 4px;">中山市不动产证明第</span>
							<input type="text" v-model="budongchanquanzheng_number2"
							       style="border: 1px solid #989898;width: 78px;height: 40px;text-align: center">
							<span style="margin: 0 2px;">号</span>
						</div>
					</div>
					<!--					<van-field class="lineBox" label="验证码"  placeholder="请输入验证码" />-->
					<!--					<van-col span="12">-->
					<!--						<img src="../../public/images/wechatstatic/bg_top.png" class="img"/>-->
					<!--					</van-col>-->
<!--					<van-cell value=""/>-->
					<!--<div style="color: #989898;">
						<div style="text-align: center">温馨提示：本网站只提供本级管辖区域内的不动产信息查询</div>
					</div>-->
					<div style="display: flex;flex-direction: row;justify-content: center;width: 80%;margin: 0 auto"
					     class="buttonArea">
						<!--<van-loading />-->
						<van-button :loading="loading" type="info" @click="find_zhengshu2">查询</van-button>
						<van-button type="default" @click="resetValue(1)">重置</van-button>
					</div>

					<div class="successDiv" v-show="successDiv">
						<div style="transform: translateY(50%)">
							<img src="../../public/images/通过@2x.png" class="successImg"/>
							<span class="successSpan">检验通过</span>
						</div>
					</div>
					<div class="failDiv" v-show="failDiv">
						<div style="transform: translateY(50%)">
							<img src="../../public/images/不存在@2x.png" class="successImg"/>
							<span class="failSpan">不存在该登记证明，请确认输入信息是否准确</span>
						</div>
					</div>
				</van-cell-group>
				<van-popup v-model="show" position="bottom" :overlay="false">
					<van-picker show-toolbar :columns="cardTypes" @confirm="confirmPicker2"
					            @cancel="show = false"/>
				</van-popup>
				<van-popup v-model="yearSelect" position="bottom" :overlay="false">
					<van-picker show-toolbar :columns="years" @confirm="confirmPickerYear2"
					            @cancel="yearSelect = false"/>
				</van-popup>
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	import { Toast } from 'vant';
	import { request } from '../utils/http.js'
	// 证书查验
	export default {
		name: 'certificateCheck',
		props: {},
		data: function () {
			return {
				// tab焦点
				active: 0,
				yearSelect: false,
				show: false,
				successDiv: false,
				loading: false,
				failDiv: false,
				cardTypes: ['身份证', '港澳台身份证', '护照', '户口簿', '军官证（士兵证）', '组织机构代码', '营业执照', '其他'],
				years: ['2015', '2016', '2017', '2018', '2019'],
				year: '',
				year2: '',
				budongchanquanzheng_number: '',
				budongchanquanzheng_number2: '',
				// 权利人
				quanliren: "",
				quanliren2: "",
				// 当前证件类型
				cardType: "请选择证件类型",
				cardType2: "请选择证件类型",
				// 当前证件类型数字
				cardTypeNumber: "",
				cardTypeNumber2: "",
				// 证件号码
				cardNumber: "",
				cardNumber2: "",

			}
		},
		computed: {
			selectedValue: function () {
				if (this.cardType !== '请选择证件类型' && this.cardType !== null) {
					return 'selectedValue';
				} else {
					return 'unselectedValue';
				}
			},
			selectedValue2: function () {
				if (this.cardType2 !== '请选择证件类型' && this.cardType2 !== null) {
					return 'selectedValue';
				} else {
					return 'unselectedValue';
				}
			}
		},
		watch: {
			active: function (newval, oldval) {
				this.successDiv = false;
				this.failDiv = false;
				// this.resetValue(newval);
			}
		},
		methods: {
			changeTab () {
				this.yearSelect = false;
				this.show = false;
			},
			resetValue (clearIndex) {
				if (clearIndex == 0) {
					this.quanliren = '';
					this.cardType = '请选择证件类型';
					this.cardTypeNumber = '';
					this.cardNumber = '';
					this.year = '';
					this.budongchanquanzheng_number = '';
					this.successDiv = false;
					this.failDiv = false;
				}
				if (clearIndex == 1) {
					this.quanliren2 = '';
					this.cardType2 = '请选择证件类型';
					this.cardTypeNumber2 = '';
					this.cardNumber2 = '';
					this.year2 = '';
					this.budongchanquanzheng_number2 = '';
					this.successDiv = false;
					this.failDiv = false;
				}
			},
			selectYear () {
				this.show = false;
				this.yearSelect = true;
			},
			selectYear2 () {
				this.show = false;
				this.yearSelect = true;
			},
			find_zhengshu () {
				if (this.loading === true) {
					return;
				}
				this.successDiv = false;
				this.failDiv = false;
				if (this.quanliren === null || this.quanliren === '') {
					Toast('请填写权利人');
					return;
				}
				if (this.cardType === null || this.cardType === '请选择证件类型') {
					Toast('请选择证件类型');
					return;
				}
				if (this.cardNumber === null || this.cardNumber === '' || this.cardType == null || this.cardType == '请选择证件类型') {
					Toast('请填写证件号码');
					return;
				}
				if (this.year === null || this.year === '') {
					Toast('请填写不动产权证号1');
					return;
				}
				if (this.budongchanquanzheng_number === null || this.budongchanquanzheng_number === '') {
					Toast('请填写不动产权证号2');
					return;
				}

				/* if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phoNumber))) {
					Toast('手机号码格式不正确！')
				} */
				switch (this.cardType) {
					case "组织机构代码":
						// 验证组织机构代码 或 营业执照 是否符合格式
						if (!(/^([0-9a-zA-Z]{18}$|\d{15}$)/.test(this.cardNumber))) {
							Toast('组织机构代码或营业执照格式不正确！')
							return;
						}
						break;
					case "营业执照":
						// 验证组织机构代码 或 营业执照 是否符合格式
						if (!(/^([0-9a-zA-Z]{18}$|\d{15}$)/.test(this.cardNumber))) {
							Toast('组织机构代码或营业执照格式不正确！')
							return;
						}
						break;
					case "其他":
						break;
					case "身份证":
						if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.cardNumber))) {
							Toast('身份证格式不正确！')
							return;
						}
						break;
					case "护照":
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cardNumber)) || !(/^(P\d{7})|(G\d{8})$/.test(this.cardNumber))) {
							Toast('护照号码格式不正确！')
							return;
						}
						break;
					case "港澳台身份证":
						const aomenreg = /^[157][0-9]{6}\([0-9]\)$/;	// 补充澳门身份证正则
						const taiwanreg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;	// 台湾身份证正则
						const GAReg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;	// 港澳身份证正则
						if (taiwanreg.test(this.cardNumber) || GAReg.test(this.cardNumber) || aomenreg.test(this.cardNumber)) {} else {
							Toast('港澳台身份证号码格式不正确！');
							return;
						}
						break;
					case "户口簿":
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cardNumber))) {
							Toast('户口簿号码格式不正确！')
							return;
						}
						break;
				}
				// 准备网络请求
				let strJson = {
					qlr: this.quanliren, // 权利人
					zjzl: this.cardTypeNumber, // 证件种类
					zjhm: this.cardNumber, // 证件号码
					cqzh: `粤（${this.year}）中山市不动产权第${this.budongchanquanzheng_number}号`, //不动产权证号/不动产登记证明号
					zlx: this.active + 1, // 正类型(1不动产权证）（2不动产登记证明）
				}
				if (this.active == 1) {
					strJson.cqzh = `粤（${this.year}）中山市不动产证明第${this.budongchanquanzheng_number}号`; //不动产权证号/不动产登记证明号
				}
				// 最后一位 是其他
				if (this.cardTypeNumber == 8) {
					strJson.zjhm = 8;
				}
				var that = this;
				this.loading = true;
				request({
					// http://bdcdj.zsfdc.gov.cn/WSYY/CheckCert?strJson={"username":"nfdj","password":"nfdj1234","qlr":"郑潮平","zjzl":"1","zjhm":"440582199108241557","cqzh":"粤（2017）中山市不动产权第 0251548号","zlx":"1"}
					url: '/CheckCert',
					data: { strJson: JSON.stringify(strJson) },
					success (response) {
						that.loading = false;
						if (response.resultcode == 0 || response.resultcode == "0") {
							// Toast('不存在该产权证书，请确认输入信息是否准确');
							that.failDiv = true;
							console.log('返回结果为0' + response.resultcode);
						} else if (response.resultcode == 1 || response.resultcode == "1") {
							if (response.result == "true" || response.resultcode == true) {
								that.successDiv = true;
							}
						}
					},
					fail (error) {
						that.loading = false;
						Toast('不存在该产权证书，请确认输入信息是否准确');
						console.error(error);
						console.error(error);
						console.error(error);
					},
				});
			},
			find_zhengshu2 () {
				if (this.loading === true) {
					return;
				}
				this.successDiv = false;
				this.failDiv = false;
				if (this.quanliren2 === null || this.quanliren2 === '') {
					Toast('请填写权利人');
					return;
				}
				if (this.cardType2 === null || this.cardType2 === '请选择证件类型') {
					Toast('请选择证件类型');
					return;
				}
				let cardNumber2 = this.cardNumber2;
				if (cardNumber2 === null || cardNumber2 === '' || this.cardType2 == null || this.cardType2 == '请选择证件类型') {
					Toast('请填写证件号码');
					return;
				}
				if (this.year2 === null || this.year2 === '') {
					Toast('请填写不动产权证号1');
					return;
				}
				if (this.budongchanquanzheng_number2 === null || this.budongchanquanzheng_number2 === '') {
					Toast('请填写不动产权证号2');
					return;
				}

				let cardNumber2_string = cardNumber2;
				switch (this.cardType2) {
					case "组织机构代码":
						// 验证组织机构代码 或 营业执照 是否符合格式
						if (!(/^([0-9a-zA-Z]{18}$|\d{15}$)/.test(cardNumber2))) {
							Toast('组织机构代码或营业执照格式不正确！')
							return;
						}
						break;
					case "营业执照":
						// 验证组织机构代码 或 营业执照 是否符合格式
						if (!(/^([0-9a-zA-Z]{18}$|\d{15}$)/.test(cardNumber2))) {
							Toast('组织机构代码或营业执照格式不正确！')
							return;
						}
						break;
					case "其他":
						break;
					case "身份证":
						if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(cardNumber2))) {
							Toast('身份证格式不正确！')
							return;
						}
						break;
					case "护照":
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(cardNumber2)) || !(/^(P\d{7})|(G\d{8})$/.test(cardNumber2))) {
							Toast('护照号码格式不正确！')
							return;
						}
						break;
					case "港澳台身份证":
						const aomenreg = /^[157][0-9]{6}\([0-9]\)$/;	// 补充澳门身份证正则
						const taiwanreg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;	// 台湾身份证正则
						const GAReg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;	// 港澳身份证正则
						if (taiwanreg.test(cardNumber2_string) || GAReg.test(cardNumber2_string) || aomenreg.test(cardNumber2_string)) {} else {
							Toast('港澳台身份证号码格式不正确！');
							return;
						}
						break;
					case "户口簿":
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(cardNumber2_string))) {
							Toast('户口簿号码格式不正确！')
							return;
						}
						break;
				}
				// 准备网络请求
				let budongchanquanzhengNumber = this.budongchanquanzheng_number2;
				let strJson = {
					qlr: this.quanliren2, // 权利人
					zjzl: this.cardTypeNumber2, // 证件种类
					zjhm: cardNumber2_string, // 证件号码
					cqzh: `粤（${this.year2}）中山市不动产权第 ${budongchanquanzhengNumber}号`, //不动产权证号/不动产登记证明号
					zlx: this.active + 1, // 正类型(1不动产权证）（2不动产登记证明）
				}
				if (this.active == 1) {
					strJson.cqzh = `粤（${this.year2}）中山市不动产证明第 ${budongchanquanzhengNumber}号`; //不动产权证号/不动产登记证明号
				}
				// 最后一位 是其他
				if (this.cardTypeNumber == 8) {
					strJson.zjhm = 8;
				}
				var that = this;
				this.loading = true;
				request({
					url: '/CheckCert',
					data: { strJson: JSON.stringify(strJson) },
					success (response) {
						that.loading = false;
						if (response.resultcode == 0 || response.resultcode == "0") {
							// Toast('不存在该产权证书，请确认输入信息是否准确');
							that.failDiv = true;
							console.log('返回结果为0' + response.resultcode);
						} else if (response.resultcode == 1 || response.resultcode == "1") {
							if (response.result == "true" || response.resultcode == true) {
								that.successDiv = true;
							}
						}
					},
					fail (error) {
						that.loading = false;
						Toast('不存在该产权证书，请确认输入信息是否准确');
						console.error(error);
						console.error(error);
						console.error(error);
					},
				});
			},
			// 选择证件类型
			selectType () {
				this.yearSelect = false;
				this.show = true;
			},
			selectType2 () {
				this.yearSelect2 = false;
				this.show = true;
			},
			confirmPickerYear (value, index) {
				this.yearSelect = false;
				this.year = value;
			},
			confirmPickerYear2 (value, index) {
				this.yearSelect = false;
				this.year2 = value;
			},
			confirmPicker (value, index) {
				this.show = false;
				this.cardTypeNumber = index + 1;
				this.cardType = value;
			},
			confirmPicker2 (value, index) {
				this.show = false;
				this.cardTypeNumber2 = index + 1;
				this.cardType2 = value;
			}
		},
		mounted: function () {

		},
	}
</script>

<style lang="less" scoped>
	.img {
		width: 30px;
		height: 30px;
	}

	.successImg {
		height: 14px;
		margin-top: -4px;
		margin-left: 10px
	}

	.successSpan {
		font-size: 14px;
		height: 22px;
		color: #00c058;
		margin-left: 10px;
	}

	.successDiv {
		background: #f0faec;
		height: 44px;
	}

	.failDiv {
		background: #ffe7e7;
		height: 44px;
	}

	.buttonArea button {
		margin: 20px;
		width: 120px;
		border-radius: 6px;
	}

	.van-cell__value > span {
		float: left;
	}
	.unselectedValue  .van-cell__value--alone {
		color: #969799;
	}
	.selectedValue {
		color: black;
	}

	.van-cell:not(:last-child)::after {
		border-bottom: 0px;
	}
	.failSpan {
		font-size: 14px;
		height: 22px;
		margin-left: 10px;
		color: #ff4064;
	}
	.lineBox {
		border: 1px solid #d1d1d1;
		width: auto;
		margin: 0px 14px;
	}
</style>
