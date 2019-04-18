<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>
		<!--<div>-->
		<!--<img src="../../../public/images/wechatstatic/bg_top1.png" style="width:100%"></img>-->
		<!--</div>-->
		<!--<el-checkbox class="Ocheckbox" v-model="checked" label="通过登记号" disabled></el-checkbox>-->

		<!-- 弹出层开始 -->
		<van-popup v-model="showPopup" position="right" :overlay="false" style="height: 100%;width: 100%;background-color: #8d99ab">
			<van-icon name="close" /> 支付确认
			<br>
			支付金额： 560元
			<br>
			交款单位/个人： 张三
			<van-button slot="button" size="small" plain type="danger" @click="startPay" style="margin-left: 40px">立即支付</van-button>
		</van-popup>
		<!-- 弹出层结束 -->
		<div class="search-div">
			<div class="Cdiv">
				<!--<div class="reg">业务登记号：</div>-->
				<input placeholder="请输入业务登记号" v-model="djbh" type="text" class="Cinput"/>
				<el-button v-on:click="query" class="schequery" icon="el-icon-search"></el-button>
			</div>
		</div>
		<div class="search-div" style="margin-top: 0px">
			<div class="Cdiv">
				<input placeholder="请输入姓名" v-model="sqrxm" type="text" class="Cinput2"/>
			</div>
		</div>

		<div style="font-size:0.42rem;color:#252525;margin-top:0.3rem;margin-left: 0.5rem">查询结果</div>
		<hr style="width:9.5rem;border:none;border-bottom:1px solid #e5e5e5;margin-top: 0.35rem;margin-bottom: 0.35rem"/>
		<div v-show="!isShow" style="font-size:0.42rem;color:#999999;margin-left: 0.5rem">{{resultmsg}}</div>
		<div v-show="isShow" class="container" v-for="result in results" :key="result.id">
			<div>收件编号：{{result.jid}}</div>
			<div>业务类型：{{result.jtitle}}</div>
			<div>房地坐落：{{result.zl}}</div>
			<template v-if="result.ywjd === '待缴费'">
				<div class="redColor">待缴费：{{result.ywjd}}
					<van-button slot="button" size="small" plain type="danger" @click="startPay" style="margin-left: 40px">缴费</van-button>
				</div>

				<!--<a-button type="primary">Primary</a-button>-->
			</template>
			<template v-else>
				<div class="redColor">业务状态：{{result.ywjd}}</div>
			</template>
		</div>
	</div>
</template>

<script>
    import Head from './head.vue'
    import { Toast } from 'vant';
    import { request } from '../../utils/http.js'

    export default {
        components: {
            'page-head': Head,
        },
        data () {
            return {
            	// 申请人姓名
	            sqrxm:"",
            	// 是否展示支付弹出层
	            showPopup:false,
                isShow: false,
                results: {},
                djbh: '',
                checked: true,
                resultmsg: '未查询到结果',
            }
        },
        methods: {
        	startPay(){
        		const that = this;
		        Toast('缴费功能等待接口开发中...');
	        },
            query () {
                const that = this
                request({
                    url: '/GetYWJD',
	                // sqrxm 申请人姓名
	                // djbh  业务受理号
                    data: { strJson: JSON.stringify({
		                    djbh: that.djbh,
		                    sqrxm: that.sqrxm
                    }) },
                    success (response) {
                        console.log(response)
                        if (Number(response.resultcode) === 1) {
                            that.isShow = !that.isShow;
                            that.results = response.result;
                        } else {
                            that.isShow = false;
                            // that.resultmsg = '获取失败！'
                        }
                    },
                    fail (error) {

                    },
                })
            },
        },
    }
</script>

<style lang="css" scoped>

	.search-div {
		background: #f0f5f8;
		height: 2rem;
	}

	.schequery {
		margin: 0 auto;
		border: none;
		color: #6cccff;
		margin-top: -0.1rem;
		padding-left: 0.1rem;
		height: 1rem;
	}

	.schequery:focus {
		background: white;
	}

	.schequery:hover {
		background: white;
	}

	.reg {
		width: 30%
	}

	.Ocheckbox {
		padding: 0.3rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.cContent {
		font-size: 0.375rem;
		padding: 0.3rem;
	}

	.container {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.15rem;
		font-size: 0.375rem;
		padding-top: 0.15rem;
		padding-left: 0.45rem;
		padding-bottom: 0.3rem;
	}

	.redColor {
		color: red
	}

	.Cdiv {
		padding: 0.3rem 0rem 0.3rem 0.3rem;
		display: flex;
		font-size: 0.375rem;
		margin: 0.25rem 0.25rem 0.25rem 0.25rem;
		background-color: #ffffff;
		height: 1.5rem;
	}

	.Cinput {
		width: 85%;
		border: none;
		font-size: 0.375rem;
		outline: none;
		border-right: 1px solid #e5e5e5;
		height: 1rem;
		margin-right: 0.31rem;
	}
	.Cinput2 {
		width: 100%;
		border: none;
		font-size: 0.375rem;
		outline: none;
		height: 1rem;
		margin-right: 0.31rem;
	}
</style>
