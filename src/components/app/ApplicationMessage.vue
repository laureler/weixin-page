<template lang="html">
	<!-- 预约确认页面 -->
	<div style="display:flex;flex-direction:column">
		<page-head title="预约申请"></page-head>
		<div class=box-body>
			<div class="title">
				<div class="borderLeft"></div>
				<p class="titlep">预约事项及预约时间</p>
			</div>
			<van-cell-group>
				<van-cell id="select1" title="办理网点：" :value="item.szwd" center data-type="list"/>
				<van-cell id="select2" title="预约事项：" :value="item.yysx" center data-type="list"/>
				<van-cell id="select3" title="预约日期：" :value="item.yyrq" center data-type="time"/>
				<van-cell id="select4" title="预约时段：" :value="item.yysd" center data-type="time"/>

				<van-cell id="name" title="预约人名称：" :value="item.yyr" center data-type="time"/>
				<!--<van-cell id="cerType"   title="证件种类：" :value="cerType"  center  data-type="time"/>-->
				<van-cell id="cerNumber" title="证件号码：" :value="item.zjhm" center data-type="time"/>
				<van-cell id="phoNumber" title="手机号码：" :value="item.sjhm" center data-type="time"/>

			</van-cell-group>
			<div style="height: 40px"></div>
			<van-button size="large" class="blueButton" @click="submit()">提交</van-button>
			<div style="height: 20px"></div>
		</div>
		<van-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="70%">

			<span>确定提交？</span>
			<span slot="footer" class="dialog-footer">
				<van-button @click="dialogVisible = false">取 消</van-button>
				<van-button type="primary" @click="submitSure()">确 定</van-button>
		  </span>
		</van-dialog>
	</div>
</template>

<script>
    import Head from './head.vue'
    import { Dialog, Toast } from 'vant'
    import Vue from 'vue'
    import { request } from '../../utils/http'
    import { isWx } from '../../utils/ua'

    import Cookies from 'js-cookie'

    export default {
        components: {
            'page-head': Head,
        },
        data () {
            return {
                item: {},
                dialogVisible: false,
            }
        },
        mounted () {
            Vue.use(Dialog)
            console.log(this.$route.query.response)
            this.item = JSON.parse(this.$route.query.response)
        },
        methods: {
            submit () {
                const that = this
                Dialog.confirm({
                    title: '提示',
                    message: '确定提交?'
                }).then(() => {
                    that.submitSure()
                }).catch(() => {

                })
            },
            /**
             * 提交按钮
             */
            submitSure () {
                const that = this
                let i
                let value
                const openid = isWx() ? Cookies.get('openid') : ''
	            cnsole.log("无法获取到openid,取值：");
	            console.log(JSON.stringify(this.item));
	            if (openid === '') {
	            	openid = this.item.zjhm;
	            }
	            console.log("当前的openid赋值为:" + this.item.zjhm);
	            console.log(openid);
	            // yyfs 预约方式
                if (isWx()) {
                    i = '2'
                    value = Object.assign(that.item, { yyfs: i, openid })
                } else {
                    i = '1'
                    value = Object.assign(that.item, { yyfs: i, openid })
                }
                request({
                    url: '/SubmitYYInfo',
                    data: { strJson: JSON.stringify(value) },
                    success (response) {
                        console.log(value)
                        console.log(response)
                        if (response.resultcode == 1 || response.resultcode == '1') {
                            that.$router.push({
                                path: '/appr',
                                query: { response: JSON.stringify(response.yyinfo), key: 1 },
                            })
                        } else {
                            alert(response.resultmsg)
                        }
                    },
                    fail (error) {
                    },
                })
                that.dialogVisible = false
            },
        },
    }
</script>

<style lang="css" scoped>

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

	.box-body {
		width: 100%;
		font-size: 16px;
		display: flex;
		flex-direction: column;
	}

	.box-card .contentTip {
		font-size: 0.375rem;
		line-height: 0.645rem;
	}

	.van-cell__value > span {
		color: red;
	}

	.box-card .content .text {
		margin-bottom: 0.075rem;
		font-size: 0.375rem;
	}

	.box-card .contentTip span {
		color: red;
	}
</style>
