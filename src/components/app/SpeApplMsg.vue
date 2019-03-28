<template lang="html">
	<!-- 开发商预约信息提交页面 -->
	<div style="display:flex;flex-direction:column">
		<page-head title="开发商预约申请"></page-head>
		<div class=box-body>
			<div class="title">
				<div class="borderLeft"></div>
				<p class="titlep">预约事项及预约时间</p>
			</div>
			<van-cell-group>
				<van-cell id="select1" title="办理网点：" :value="item.szwd" center/>
				<van-cell id="select2" title="预约事项：" :value="item.yysx" center/>
				<van-cell id="select3" title="预约日期：" :value="item.yyrq" center/>
				<van-cell id="select4" title="预约时段：" :value="item.yysd" center/>
				<!-- 新增预约数量字段 yysl  -->
				<van-cell id="yysl" title="预约数量：" style="display: none;" :value="item.yysl" center/>

				<van-cell id="name" title="预约人名称：" :value="item.yyr" center/>
				<!--<van-cell id="cerType"   title="证件种类：" :value="cerType"  center  data-type="time"/>-->
				<van-cell id="cerNumber" title="证件号码：" :value="item.zjhm" center/>
				<van-cell id="phoNumber" title="手机号码：" :value="item.sjhm" center/>
				<van-cell id="dwzjjgdm" title="组织机构代码：" :value="item.dwzjjgdm" center/>

			</van-cell-group>
			<div style="height: 40px"></div>
			<van-button size="large" class="blueButton" @click="submit()">提交</van-button>
		</div>
	</div>
</template>

<script>
    import Head from './head.vue'

    import { request } from '../../utils/http'
    import { Dialog, Toast } from 'vant'
    import Vue from 'vue'

    Vue.use(Dialog)

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

            let response = this.$route.query.response
            var jsonResponse = JSON.parse(response)
            if (jsonResponse['yyfs'] == undefined) {
                jsonResponse['yyfs'] = 2
            }
            this.item = jsonResponse
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
            submitSure () {
                const that = this
                request({
                    url: '/SubmitTSYYInfo',
                    data: { strJson: JSON.stringify(that.item) },
                    success (response) {
                        console.log(that.item)
                        console.log(response)
                        if (response.resultcode == 1 || response.resultcode == '1') {
                            that.$router.push({
                                path: '/appr',
                                query: { response: JSON.stringify(response.yyinfo), key: 2 },
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

	@import "../../css/elem UI.css";

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
