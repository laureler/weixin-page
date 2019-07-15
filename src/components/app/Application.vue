<template lang="html">
	<div class="box-body">
		<page-head title="预约申请"></page-head>
		<div class="space_between"></div>
		<div class="title">
			<div class="borderLeft"></div>
			<p class="titlep">预约事项及预约时间</p>
		</div>
		<van-cell-group>
			<van-cell id="select1" :class="isDisabled" title="办理网点：" :value="select1Value" is-link center required
					  @click="selectData" data-type="list" @change="updateData"/>
			<van-cell id="select2" :class="isDisabled" title="预约事项：" :value="select2Value" is-link center required
					  @click="selectData" data-type="list"/>
			<van-cell id="select3" :class="isDisabled" title="预约日期：" :value="select3Value" is-link center required
					  @click="selectData" data-type="time"/>
			<van-cell id="select4" :class="isDisabled" title="预约时段：" :value="select4Value" is-link center required
					  @click="selectData" data-type="time"/>
		</van-cell-group>
		<div class="space_between"></div>
		<div class="title">
			<div class="borderLeft borderLeftBlue"></div>
			<p class="titlep">预约人信息</p>
		</div>
		<van-cell-group>
			<van-field id="name" label="预约人名称：" clearable required text-align="right" input-align="right"
					   v-model="name"/>
			<van-cell id="cerType" title="证件种类：" :value="cerTypeValue" is-link center required @click="selectData"/>
			<van-field id="cerNumber" label="证件号码：" clearable required text-align="right" input-align="right"
					   v-model="cerNumber" type="text"/>
			<van-field id="phoNumber" label="手机号码：" clearable required text-align="right" input-align="right"
					   v-model="phoNumber" type="tel"/>
		</van-cell-group>
		<div class="tip">
			<p class="cp">提示：请申请人在预约时段内，凭手机取号信息到办事大厅扫描预约二维码进行确认，并等待叫号（扫码确认必须到现场，请勿提前扫码，过号不办理）</p>
		</div>
		<van-button size="large" class="blueButton" @click="check()">确认</van-button>
		<div style="height: 20px"></div>
		<van-popup v-model="show" position="bottom" :overlay="false">
			<van-picker show-toolbar :columns="calcedData()" @confirm="confirmPicker" @cancel="show = false"/>
		</van-popup>
	</div>
</template>


<script>
	import Head from './head.vue';
	import { Toast } from 'vant';
	import { request } from '../../utils/http';

	export default {
		components: {
			'page-head': Head,
		},
		data () {
			return {
				selectItemId: null, //当前点击选中项
				showData: [],  //当前下拉框需要展示的数据
				isDisabled: 'disabled',
				show: false, //是否展示数据选择项
				select1Data: [],  //当前选中项
				select2Data: [],
				select3Data: [],
				select4Data: [],
				/* imgShow: false, */
				cerType: '',
				cerTypeValue: '', //当前选中的身份证类型
				select1Value: '', //当前选中id='select1'的数据
				select2Value: '', //预约事项选中项
				select3Value: '', //预约日期选中项
				select4Value: '', //预约时段选中项
				yyfs: '2',
				selShow1: true,
				selShow2: true,
				selShow3: true,
				name: '',       //预约人名称
				cerNumber: '',  //当前输入的证件号码
				phoNumber: '',  //当前输入的手机号码
				cerTypeData: ['身份证', '港澳台身份证', '护照', '户口簿', '军官证（士兵证）']
			};
		},
		//计算属性
		computed: {},
		watch: {
			select1Value: function (newValue, oldValue) {
				// console.log('监听到select1Value变化',oldValue,newValue)
				this.select1();
			},
			select2Value: function () {
				this.select2();
			},
			select3Value: function () {
				this.select3();
			},
			select4Value: function () {

			}
		},
		methods: {
			updateData: function () {
				console.log('更新数据');
			},
			/**
			 * 确认下拉框选项
			 **/
			confirmPicker: function (value, index) {
				if (this.selectItemId == 'select4') {
					// 10:00-11:00 （剩5个） 中间空格分开
					this[this.selectItemId + 'Value'] = value.text.split(' ')[0];
				} else {
					this[this.selectItemId + 'Value'] = value;
				}
				this.show = !this.show;
			},
			setData: function () {
				if (this.selectItemId == null) {
					return;
				}
				else {

				}
			},
			/**
			 * 计算 数组数据
			 **/
			calcedData: function () {
				var resultArray = [];
				if (this.selectItemId == 'cerType') {
					resultArray = this.cerTypeData;
				} else {
					var data = this[this.selectItemId + 'Data'] || [];
					var tmpArray = [];
					data = typeof  data == 'object' ? data[0] : data;
					if (data == undefined) {
						return tmpArray;
					}
					tmpArray = data[Object.keys(data)[0]];
					for (let i = 0; i < tmpArray.length; i++) {
						let item = tmpArray[i];
						if (this.selectItemId == 'select4') {
							resultArray.push(item);
						} else {
							resultArray.push(item[Object.keys(item)[0]]);
						}
					}
				}
				return resultArray;
			},
			/**
			 * 为用户选择数据
			 * 1. 获取当前选中的id
			 * 2. 设置当前 picker的列表项
			 **/
			selectData () {
				// todo 如果点击了 span标记似乎会不太正确
				var idValue = event.target.id != '' ? event.target.id : (event.target.parentElement.id != '' ? event.target.parentElement.id : event.target.parentElement.parentElement.id);
				console.log(idValue);
				if (idValue == undefined || idValue == '') return;
				switch (idValue) {
					case 'select1':
						this.showData = this.select1Data;
						break;
					case 'select2':
						if (this.select1Value == '') {
							Toast('请选择办理网点');
							return;
						} else {
							this.showData = this.select1Data;
						}
						break;
					case 'select3':
						if (this.select2Value == '') {
							Toast('请选择预约事项');
							return;
						} else {
							this.showData = this.select1Data;
						}
						break;
					case 'select4':
						if (this.select3Value == '') {
							Toast('请选择预约日期');
							return;
						} else {
							this.showData = this.select1Data;
						}
						break;
				}
				this.selectItemId = idValue;
				this.show = !this.show;
			},
			// 禁止默认事件
			/*stopPropagation(e) {
			  const ev = e || window.event;
			  if (ev.stopPropagation) {
				ev.stopPropagation();
			  } else if (window.event) {
				window.event.cancelBubble = true;
			  }
			},*/
			// 信息提示
			/*remind(a) {
			  if (this.select1Value == '') {
				Toast('请先选择办理网点')
			  } else if (this.select2Value == '' && a > 2) {
				Toast('请先选择预约事项')
			  } else if (this.select3Value == '' && a > 3) {
				Toast('请先选择预约日期')
			  }
			},*/
			// 改变颜色
			changeColor (id) {
				const oid = document.getElementById(id);
				const prev = oid.previousElementSibling || oid.previousSibling;
				const oprev = oid.parentNode.previousElementSibling || oid.parentNode.previousSibling;
				if (id == 'certificate') {
					if (oid.value == '') {
						oprev.style.color = '#d7342e';
					} else {
						oprev.style.color = '#4ECD5D';
					}
				} else {
					if (oid.value == '') {
						prev.style.color = '#d7342e';
					} else {
						prev.style.color = '#4ECD5D';
					}
				}
			},
			/**
			 * 在id = select1 值改变的时候，获取select2的数据
			 */
			select1 () {
				const that = this;
				const param = { szwd: that.select1Value, yyfs: '2' };
				request({
					url: '/GetYYSX',
					data: { strJson: JSON.stringify(param) },
					success (response) {
						that.select2Data = [];
						that.select2Value = '';
						that.select3Value = '';
						that.select4Value = '';
						that.select2Data.push(response);
						that.selShow1 = false;
					},
					fail (error) {
					},
				});
			},
			select2 () {
				const that = this;
				const param = { szwd: that.select1Value, yyfs: '2' };
				request({
					url: '/GetYYRQ',
					data: { strJson: JSON.stringify(param) },
					success (response) {
						that.select3Data = [];
						that.select3Value = '';
						that.select4Value = '';
						that.select3Data.push(response);
						that.showData = that.select3Data;
						that.selShow2 = false;
					},
					fail (error) {
					},
				});
			},
			select3 () {
				const that = this;
				const param = { szwd: that.select1Value, yysx: that.select2Value, yyrq: that.select3Value, yyfs: '2' };
				request({
					url: '/GetYYSD',
					data: { strJson: JSON.stringify(param) },
					success (response) {
						that.select4Data = [];
						var tmpData = [];
						that.select4Value = '';
						const result = response.yysdinfo;
						for (let i = 0; i < result.length; i++) {
							const count = result[i].zhs - result[i].yyys;
							const disableAtrr = count == 0;
							const remark = count == 0 ? '（已约满）' : '（剩' + count + '个）';
							tmpData.push({
								text: `${result[i].yysd} ${remark}`,
								disabled: disableAtrr,
							});
						}
						that.select4Data.push({
							tmpData
						});
						that.selShow3 = false;
					},
					fail (error) {
					},
				});
			},
			resq () {
				var that = this;
				const param = {
					yyr: this.name,
					zjhm: this.cerNumber,
					sjhm: this.phoNumber,
					zmh: '',
					yyfs: '2',
				};
				const paramData = {
					szwd: this.select1Value,  //办理网点
					yysx: this.select2Value,  //预约事项
					yyrq: this.select3Value,  //预约日期
					yysd: this.select4Value,  //预约时段
					yyr: this.name,           //预约人名称
					yyfs: this.yyfs,          //预约方式
					zjlx: this.cerTypeValue,  //预约人证件种类
					zjhm: this.cerNumber,     //预约人证件号码
					sjhm: this.phoNumber,     //预约人手机号码
					zmh: '',                  //zmh未明字段
				};
				request({
					url: '/CheckYYRInfo',
					data: { strJson: JSON.stringify(param) },
					success (response) {
						console.log(response);
						if (response.resultcode == 1) {
							that.$router.push({
								path: '/appm',
								query: { response: JSON.stringify(paramData) },
							});
						} else {
							alert(response.resultmsg);
						}
					},
					fail (error) {
					},
				});
			},
			check () {
				if (this.name !== '' && this.cerNumber !== '' && this.phoNumber !== '' && this.select1Value != '' && this.select2Value != '' && this.select3Value != '' && this.select4Value != '') {
					let cerType = this.cerTypeValue;
					if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phoNumber))) {
						Toast('手机号码格式不正确！');
					} else if (cerType == '身份证') {
						if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.cerNumber))) {
							Toast('身份证格式不正确！');
						} else {
							this.resq();
						}
					} else if (cerType == '护照') {
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cerNumber)) || !(/^(P\d{7})|(G\d{8})$/.test(this.cerNumber))) {
							Toast('护照号码格式不正确！');
						} else {
							this.resq();
						}
					} else if (cerType == '港澳台身份证') {
						const aomenreg = /^[157][0-9]{6}\([0-9]\)$/;	// 补充澳门身份证正则
						const taiwanreg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;	// 台湾身份证正则
						const GAReg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;	// 港澳身份证正则
						if (taiwanreg.test(this.cerNumber) || GAReg.test(this.cerNumber) || aomenreg.test(this.cerNumber)) {
							this.resq();
						} else {
							Toast('港澳台身份证号码格式不正确！');
							return;
						}
					} else if (cerType == '户口簿') {
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cerNumber))) {
							Toast('户口簿号码格式不正确！');
						} else {
							this.resq();
						}
					}
				} else {
					Toast('请完善个人信息！');
				}
			},
		},
		// 挂载元素时自动触发
		mounted () {
			const that = this;
			request({
				url: '/GetYYBSWD',
				success (response) {
					that.select1Data.push(response);
				},
				fail (error) {

				},
			});
		},
	};
</script>
<style lang="css" scoped>

	.cinput b {
		color: #d7342e;
		font-size: 0.3rem
	}

	.title {
		height: 40px;
		padding: 10px 10px;
		font-weight: bold;
		color: #252525;
		letter-spacing: 1px;
	}

	.space_between {
		background-color: #eff7f7;
		height: 8px;
		margin: 0px;
	}

	.titlep {
		margin-top: 0;
		margin-left: 0.225rem;
		font-size: 16px;
		line-height: 16px;
	}

	.borderLeft {
		border-left: 4px solid #f77f5a;
		float: left;
		height: 15px;
	}

	.borderLeftBlue {
		border-left: 4px solid #5aa8f7;
	}

	.tip {
		font-size: 14px;
		color: #f77f5a;
		margin: 0 auto;
		padding: 20px 10px 20px 20px;
	}

	.box-body {
		width: 100%;
		font-size: 16px;
		display: flex;
		flex-direction: column;
	}
</style>
