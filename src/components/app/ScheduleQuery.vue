<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>

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
				<input placeholder="请输入业务登记号" v-model="djbh" type="text" class="Cinput"/>
			</div>
		</div>
		<div style="margin: 20px 0px">
			<van-button size="large" class="blueButton" @click="query">查询</van-button>
		</div>
		<div v-if="isStartSearch">
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
				</template>
				<template v-else>
					<div class="redColor">业务状态：{{result.ywjd}}</div>
				</template>
			</div>
		</div>

	</div>
</template>

<script>
    import Head from './head.vue'

    import { request } from '../../utils/http.js'
	import { Toast } from 'vant'

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
				isStartSearch: false,
            }
        },
        methods: {
        	startPay(){
        		const that = this;
		        Toast('缴费功能等待接口开发中...');
	        },
            query () {
                console.log("query")
                const that = this;
                if (that.djbh === '') {
					Toast('请输入业务登记号！');
					return;
				}

                request({
                    url: '/GetYWJD',
	                // sqrxm 申请人姓名
	                // djbh  业务受理号
                    data: { strJson: JSON.stringify({
		                    djbh: that.djbh,
		                    sqrxm: that.sqrxm
                    }) },
                    success (response) {
						that.isStartSearch = true;
                        if (Number(response.resultcode) === 1) {
                            that.isShow = !that.isShow;
                            that.results = response.result;
                        } else {
                            that.isShow = false;
                            that.resultmsg = response.resultmsg;
                        }
                    },
                    fail (error) {
						console.log(error);
                    },
                });
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
		padding: 10px 15px;
	}

	.schequery:focus {
		background: white;
	}

	.schequery:hover {
		background: white;
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
		width: 100%;
		border: none;
		font-size: 14px;
		outline: none;
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
	.blueButton {
		margin-top: 20px;
	}
</style>
