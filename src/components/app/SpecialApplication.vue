<template lang="html">
	<div class="box-body">
		<page-head title="预约申请"></page-head>
		<div class="title">
			<div class="borderLeft"></div>
			<p class="titlep">预约事项及预约时间</p>
		</div>
		<van-cell-group>
			<van-cell id="select1" :class="isDisabled" title="办理网点：" :value="select1Value" is-link center required @click="selectData" data-type="list" @change="updateData"/>
			<van-cell id="select2" :class="isDisabled" title="预约事项：" :value="select2Value" is-link center required @click="selectData" data-type="list"/>
			<van-cell id="select3" :class="isDisabled" title="预约日期：" :value="select3Value" is-link center required @click="selectData" data-type="time"/>
			<van-cell id="select4" :class="isDisabled" title="预约时段：" :value="select4Value" is-link center required @click="selectData" data-type="time"/>
			<van-field id="kyys" label="剩余预约数：" clearable readonly text-align="right" input-align="right" v-model="kyys"/>
			<van-field id="yysl" label="预约数量：" clearable style="display: none;" text-align="right" input-align="right" v-model="yysl"/>
		</van-cell-group>
		<div class="title">
			<div class="borderLeft borderLeftBlue"></div>
			<p class="titlep">预约人信息</p>
		</div>
		<van-cell-group>
			<van-field id="name" label="代理人名称：" clearable required text-align="right" input-align="right" v-model="name"/>
			<van-cell id="cerType" title="代理人证件种类：" :value="cerTypeValue" is-link center required @click="selectData"/>
			<van-field id="cerNumber" label="代理人证件号码：" clearable required text-align="right" input-align="right" v-model="cerNumber" type="text"/>
			<van-field id="phoNumber" label="手机号码：" clearable required text-align="right" input-align="right" v-model="phoNumber" type="tel"/>
			<van-field id="orginational" label="组织机构代码或营业执照：" clearable required text-align="right" input-align="right" v-model="orginational"/>
		</van-cell-group>
		<div class="tip">
			<p class="cp">提示：预约号当天有效。请申请人在预约成功当天，凭微信预约成功的信息到现场交件。</p>
		</div>
		<van-button size="large" class="blueButton" @click="check()">确认</van-button>
		<div style="height: 20px;"></div>
		<van-popup v-model="show" position="bottom" :overlay="false">
			<van-picker show-toolbar :columns="calcedData()" @confirm="confirmPicker" @cancel="show = false"/>
		</van-popup>
	</div>
</template>


<script>
	import Head from './head.vue'
	import  {Toast} from 'vant'
	import {request} from '../../utils/http'
	import { isWx } from '../../utils/ua'
	import Cookies from 'js-cookie'
	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				oselect:null,   //由于当前接口为一个接口获取三个数据，所以添加一个data接收。
				selectItemId:null, //当前点击选中项
				showData:[],  //当前下拉框需要展示的数据
				isDisabled:'disabled',
				show: false, //是否展示数据选择项
				select1Data: [],  //当前选中项
				select2Data: [],  //当前列表选中项数据
				select3Data: [],
				select4Data: [],
				/*       imgShow: false, */
				cerType: '',
				cerTypeValue: '', //当前选中的身份证类型
				select1Value: '', //当前选中id='select1'的数据
				select2Value: '', //预约事项选中项
				select3Value: '', //预约日期选中项
				select4Value: '', //预约时段选中项
				selShow1: true,
				selShow2: true,
				selShow3: true,
				name: '',       //预约人名称
				kyys: 0, // 可预约数
				isCanYY: true,	// 可不可预约时段
				yysl: 1,        // 预约数量
				yyfs:'2',       //预约方式
				cerNumber: '',  //当前输入的证件号码
				phoNumber: '',  //当前输入的手机号码
				orginational:'',
				cerTypeData: ['身份证','港澳台身份证','护照','户口簿','军官证（士兵证）']
			}
		},
		//计算属性
		computed:{

		},
		watch:{
			select1Value:function () {
				this.select1()
			},
			select2Value:function () {
				this.select2()
			},
			select3Value: function (newValue, oldValue) {
				// 当预约日期变更时，重新计算剩余预约数
				this.haveKyys(newValue);
				this.select3()
			},
		},
		methods: {
			updateData:function(){
				console.log("更新数据")
			},
			/**
			 * 确认下拉框选项
			 **/
			confirmPicker:function(value,index){
				if(this.selectItemId == 'select4'){
					this[this.selectItemId+"Value"] = value.text;
				}else {
					this[this.selectItemId+"Value"] = value;
				}
				this.show = !this.show;
			},
			setData:function(){
				if(this.selectItemId == null){
					return
				}
				else {

				}
			},
			/**
			 * 计算 数组数据
			 **/
			calcedData:function () {
				var resultArray = [];
				if(this.selectItemId == 'cerType'){
					resultArray = this.cerTypeData
				}else {
					var data = this[this.selectItemId+"Data"] || []
					// 如果data是一个单纯的数组，就直接返回。
					if(data.length !== undefined && data.length>0 && data[0] !== undefined && typeof data[0] !== 'object'){
						return data
					}
					var tmpArray = [];
					data = typeof  data=='object'? data[0]:data;
					if(data == undefined){
						return tmpArray;
					}
					tmpArray = data[Object.keys(data)[0]]
					for (let i = 0; i < tmpArray.length; i++) {
						let item = tmpArray[i];
						if(this.selectItemId == 'select4'){
							resultArray.push(item)
						}else {
							resultArray.push(item[Object.keys(item)[0]])
						}
					}
				}
				return resultArray
			},
			/**
			 * 为用户选择数据
			 * 1. 获取当前选中的id
			 * 2. 设置当前 picker的列表项
			 **/
			selectData() {
				// 非可预约时段
				if (!this.isCanYY) {
					Toast('当前时段不可预约！');
					return
				}
				// todo 如果点击了 span标记似乎会不太正确
				var idValue = event.target.id !=''? event.target.id : (event.target.parentElement.id!=''?event.target.parentElement.id:event.target.parentElement.parentElement.id);
				console.log(idValue)
				if(idValue == undefined || idValue == "") return;
				switch (idValue) {
					case "select1":
						this.showData = this.select1Data;
						break;
					case "select2":
						if(this.select1Value == ''){
							Toast('请选择办理网点');
							return
						}else {
							this.showData = this.select1Data;
						}
						break;
					case "select3":
						if(this.select2Value == ''){
							Toast('请选择预约事项');
							return
						}else {
							this.showData = this.select1Data;
						}
						break;
					case "select4":
						if(this.select3Value == ''){
							Toast('请选择预约日期');
							return
						}else {
							this.showData = this.select1Data;
						}
						break;
				}
				this.selectItemId = idValue;
				this.show = !this.show;
			},
			// 改变颜色
			changeColor(id) {
				const oid = document.getElementById(id)
				const prev = oid.previousElementSibling || oid.previousSibling
				const oprev = oid.parentNode.previousElementSibling || oid.parentNode.previousSibling
				if (id == 'certificate') {
					if (oid.value == '') {
						oprev.style.color = '#d7342e'
					} else {
						oprev.style.color = '#4ECD5D'
					}
				} else {
					if (oid.value == '') {
						prev.style.color = '#d7342e'
					} else {
						prev.style.color = '#4ECD5D'
					}
				}
			},
			/**
			 * 在id = select1 值改变的时候，获取select2的数据
			 */
			select1() {
				const _this = this;
				const param = {szwd: _this.select1Value, yyfs: '2'}
				request({
					url: '/GetTSYYRQSD',
					success(response) {
						_this.oselect = response.yyxxinfo;
						const arr = [];
						_this.select2Data = [];
						for (let i = 0; i < response.yyxxinfo.length; i++) {
							arr.push(response.yyxxinfo[i].YYSX)
						}
						_this.select2Data = Array.from(new Set(arr))
					},fail(error) {
					},
				})
			},
			// 当第二个选项改变的时候触发，目的是为了修改第三个。
			select2() {
				const that = this;
				that.select3Data = []
				const  arr =  [];
				for (const value of that.oselect) {
					if (value.YYSX.includes(that.select2Value)) {
						arr.push(value.YYRQ)
					}
				}
				that.select3Data = Array.from(new Set(arr))
			},
			select3() {
				const that = this;
				const param = {szwd: that.select1Value, yysx: that.select2Value, yyrq: that.select3Value, yyfs: '2'}
				request({
					url: '/GetTSYYRQSD',
					success(response) {
						that.select4Data = [];
						var tmparry = [];
						that.sel4 = '';
						for (const value of response.yyxxinfo) {
							if (value.YYSX.includes(that.select2Value) && value.YYRQ.includes(that.select3Value)) {
								const remark = value.SFYY == true ? '（已被预约）' : '';
								tmparry.push({
									text:`${value.YYSD}${remark}`,
									disabled: value.SFYY
								})
							}
						}
						that.select4Data.push({obj:tmparry})
						that.selShow3 = false;
					},
					fail(error) {
					},
				})
			},
			// todo 没有意义
			/*select4() {
			  document.getElementById('select4').style.color = '#4ECD5D';
			},*/
			resq() {
				var that = this;
				const openid = isWx() ? Cookies.get('openid') : ''
				const param = {
					szwd: this.select1Value,  //办理网点
					yysx: this.select2Value,  //预约事项
					yyrq: this.select3Value,  //预约日期
					yysd: this.select4Value,  //预约时段
					yyfs:this.yyfs,           //预约方式
					yyr: this.name,           //预约人名称
					zjlx: this.cerTypeValue,  //预约人证件种类
					zjhm: this.cerNumber,     //预约人证件号码
					sjhm: this.phoNumber,     //预约人手机号码
					dwzjjgdm: this.orginational, //机构代码或者营业执照
					yysl:this.yysl,             //预约数量
					zmh: '',                  //zmh未明字段
					openid
				}
				request({
					url: '/CheckYYRInfo',
					data: { strJson: JSON.stringify(param) },
					success(response) {
						console.log(response)
						if (response.resultcode == 1 || response.resultcode == "1") {
							that.$router.push({
								path: '/samsg',
								query: { response: JSON.stringify(param) },
							})
						} else {
							alert(response.resultmsg)
						}
					},
					fail(error) {
					},
				})
			},
			check() {
				if (this.yysl !== '' && this.name !== '' && this.cerNumber !== '' && this.phoNumber !== '' && this.orginational !== '' && this.select1Value != '' && this.select2Value != '' && this.select3Value != '' && this.select4Value != '') {
					// 可预约时段数为0
					if (this.kyys === 0) {
						Toast('当前时段不可预约！');
						return;
					}
					if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.phoNumber))) {
						Toast('手机号码格式不正确！')
					} else if (this.cerTypeValue == '身份证') {
						if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.cerNumber))) {
							Toast('身份证格式不正确！')
						} else {
							this.resq()
						}
					} else if (this.cerTypeValue == '护照') {
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cerNumber)) || !(/^(P\d{7})|(G\d{8})$/.test(this.cerNumber))) {
							Toast('护照号码格式不正确！')
						} else {
							this.resq()
						}
					} else if (this.cerTypeValue == '港澳台身份证') {
						const aomenreg = /^[157][0-9]{6}\([0-9]\)$/;	// 补充澳门身份证正则
						const taiwanreg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;	// 台湾身份证正则
						const GAReg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;	// 港澳身份证正则
						if (taiwanreg.test(this.cerNumber) || GAReg.test(this.cerNumber) || aomenreg.test(this.cerNumber)) {
							this.resq();
						} else {
							Toast('港澳台身份证号码格式不正确！');
							return;
						}
					} else if (this.cerTypeValue == '户口簿') {
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cerNumber))) {
							Toast('户口簿号码格式不正确！')
						} else {
							this.resq()
						}
					}
				} else {
					Toast('请完善个人信息！')
				}
			},
			haveKyys(selectedTimeFrame) {
				let kyys = 0;
				for (const value of this.oselect) {
					if (value.YYSX.includes(this.select2Value)) {
						if (value.YYRQ.includes(selectedTimeFrame)) {
							kyys = value.ZYYS - value.YYYS;
						}
					}
				}
				if (kyys === 0) {
					this.kyys = 0;
					Toast('当前时段可预约数量为0！');
					return
				} else {
					this.kyys = kyys;
				}
			}
		},
		// 挂载元素时自动触发
		mounted() {
			const that = this
			request({
				url: '/GetYYBSWD',
				success(response) {
					that.select1Data.push(response)
				},
				fail(error) {

				},
			});


			// 判断是否可预约
			request({
				url: '/GetTSYYRQSD',
				success(response) {
					const yyxxinfo = response.yyxxinfo
					// 不允许预约时段，不可预约
					if (yyxxinfo == null || yyxxinfo.length === 0) {
						// 不可预约，禁止用户点击
						that.isCanYY = false;
						Toast('非正常预约时段！')
						return
					}
				},
				fail(error) {
				},
			});
		},
	}
</script>

<style lang="css" scoped>

	.rightInput {
		text-align: right !important;
	}

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
