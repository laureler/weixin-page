<template>
	<div id="certificateCheck" style="height: 100%;width: 100%">
		<van-tabs v-model="active">
			<van-tab title="证书查验">
				<van-cell-group>
					<van-field label="权利人" v-model="quanliren" placeholder="请填写权利人" />
					<van-cell title="证件类型" is-link :value="cardType" @click="selectType"/>
					<van-field label="证件号码" v-model="cardNumber"  placeholder="请填写证件号码" />

					<van-cell value="证书号" />
					<div style="display: flex;flex-direction: row;margin: 2px 14px; font-size: 16px;color: #989898">
						<div style="transform: translateY(0%)">
							<div @click="selectYear" style="display: inline">
								<span style="margin-right: 10px;">粤</span>
								<input type="text" v-model="year" style="border: 1px solid #989898;width: 78px;height: 40px;text-align: center">
							</div>
							<span style="margin: 0 10px;">中山市不第产权第</span>
							<input type="text" v-model="budongchanquanzheng_number" style="border: 1px solid #989898;width: 78px;height: 40px;text-align: center">
							<span style="margin: 0 10px;">号</span>
						</div>
					</div>
<!--					<van-field label="验证码"  placeholder="请输入验证码" />-->
<!--					<van-col span="12">-->
<!--						<img src="../../public/images/wechatstatic/bg_top.png" class="img"/>-->
<!--					</van-col>-->
					<van-cell value="" />
					<div style="color: #989898;">
						<div style="text-align: center">温馨提示：本网站只提供本级管辖区域内的不动产信息查询</div>
					</div>
					<div style="display: flex;flex-direction: row;justify-content: center;width: 80%;margin: 0 auto" class="buttonArea">
						<van-button type="info" @click="find_zhengshu">查询</van-button>
						<van-button type="default">重置</van-button>
					</div>

					<div class="successDiv" v-show="successDiv">
						<div style="transform: translateY(50%)">
							<img src="../../public/images/通过@2x.png" class="successImg"/>
							<span class="successSpan">检验通过</span>
						</div>
					</div>
					<div class="successDiv" v-show="failDiv">
						<div style="transform: translateY(50%)">
							<img src="../../public/images/不存在@2x.png" class="successImg"/>
							<span class="successSpan">检验通过</span>
						</div>
					</div>
				</van-cell-group>
			</van-tab>
			<van-tab title="证明查验">

			</van-tab>
		</van-tabs>
		<van-popup v-model="show" position="bottom" :overlay="false">
			<van-picker show-toolbar :columns="cardTypes" @confirm="confirmPicker" @change="onChange" @cancel="show = false"/>
		</van-popup>
		<van-popup v-model="yearSelect" position="bottom" :overlay="false">
			<van-picker show-toolbar :columns="years" @confirm="confirmPickerYear" @change="onChange" @cancel="show = false"/>
		</van-popup>
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
				currentDate: new Date(),
				yearSelect: false,
				show: false,
				successDiv: false,
				cardTypes: ['身份证', '港澳台身份证', '护照', '户口簿', '军官证（士兵证）'],
				year: '',
				budongchanquanzheng_number: '',
				years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', ],
				// 权利人
				quanliren: "",
				// 当前证件类型
				cardType: "",
				cardTypeNumber: "",
				cardNumber: "",
				active: 2,
				actions: [
					{
						name: '选项'
					},
					{
						name: '选项',
						subname: '描述信息'
					},
					{
						loading: true
					},
					{
						name: '禁用选项',
						disabled: true
					}
				]
			}
		},
		computed: {},
		watch: {},
		methods: {
			selectYear () {
				this.yearSelect = true;
			},
			find_zhengshu () {
				if (this.quanliren === null || this.quanliren === '') {
					Toast('请填写权利人');
					return;
				}
				if (this.cardType === null || this.cardType === '') {
					Toast('请选择证件类型');
					return;
				}
				if (this.cardNumber === null || this.cardNumber === '') {
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
				let params = {
					qlr: this.quanliren, // 权利人
					zjzl: this.cardTypeNumber, // 证件种类
					zjhm: this.cardNumber, // 证件号码
					cqzh: `粤 （${this.year}） 中山市 不动产权第 ${this.budongchanquanzheng_number} 号`, // 不动产权证号/不动产登记证明号
					zlx: "", // 正类型(1 不动产权证）（2 不动产登记证明）
				}
				var that = this;
				request({
					// http://bdcdj.zsfdc.gov.cn/WSYY/CheckCert?strJson={"username":"nfdj","password":"nfdj1234","qlr":"郑潮平","zjzl":"1","zjhm":"440582199108241557","cqzh":"粤（2017）中山市不动产权第0251548号","zlx":"1"}
					url: '/CheckCert',
					data: { strJson: JSON.stringify(params) },
					success (response) {
						if (response.resultcode == 0 || response.resultcode == "0") {
							Toast('不存在该产权证书，请确认输入信息是否准确');
							console.log('返回结果为0' + result.resultcode);
						} else if (response.resultcode == 0 || response.resultcode == "0") {
							if (response.result == "true" || response.resultcode == true) {
								that.successDiv = true;
							}
						}
					},
					fail (error) {
						Toast('不存在该产权证书，请确认输入信息是否准确');
						console.log(error);
					},
				});
				// todo 查询
			},
			formatter (type, value) {
				if (type === 'year') {
					return `${value}`;
				} else if (type === 'month') {
					return `${value}月`
				}
				return value;
			},
			// 选择证件类型
			selectType () {
				this.show = true;
			},
			confirmPickerYear (value, index) {
				this.yearSelect = false;
				this.year = value;
			},
			confirmPicker (value, index) {
				this.show = false;
				this.cardTypeNumber = index + 1;
				this.cardType = value;
			},
			onChange (picker, value, index) {
				// Toast(`当前值：${value}, 当前索引：${index}`);
			},
			onSelect (item) {
				// 点击选项时默认不会关闭菜单，可以手动关闭
				this.show = false;
				Toast(item.name);
			}
		},
		mounted: function () {

		},
	}
</script>

<style lang="less" scoped>
	.img{
		width: 30px;
		height: 30px;
	}
	.successImg {
		height: 14px;margin-top: -4px;margin-left: 10px
	}
	.successSpan {
		font-size: 14px;height: 22px;color: #00c058;margin-left: 10px;
	}
	.successDiv {
		background: #f0faec;height: 44px;
	}
	.failDiv {
		background: #f0faec;height: 44px;
	}
	.buttonArea button {
		margin: 20px;
		width: 120px;
		border-radius: 6px;
	}
	.van-cell__value >span {
		float: left;
	}
	.van-cell__value {
		color: black;
	}
	.van-cell:not(:last-child)::after {
		border-bottom: 0px;
	}
</style>
