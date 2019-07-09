<template lang="html">
	<div style="display:flex; flex-direction:column;height:100%;background: #f0f5f8">
		<page-head title="排队取号"></page-head>
		<div class="title">
			<div class="borderLeft"></div>
			<p class="titlep">排队取号<span style="color: red">&nbsp;(请填写有效的身份证点击取号)</span></p>
		</div>
		<div style="font-size:0.375rem;background: white">
			<van-cell-group>
				<van-field
					label="身份证号："
					v-model="form.sfzh"
					input-align="right"
					oninput="if(value.length>18)value=value.slice(0,18)"
					onafterpaste="this.value=this.value.replace(/\D/g,'')"
				></van-field>
			</van-cell-group>
		</div>
		<div style="height: 40px"></div>
		<van-button size="large" class="blueButton" @click="submit()">取号</van-button>
		<div style="height: 20px"></div>
	</div>
</template>

<script>
    import Head from './head.vue'

    import { request } from '../../utils/http'
    import { isWx } from '../../utils/ua'
    import Cookies from 'js-cookie'

    import { Dialog, Toast } from 'vant'
    import Vue from 'vue'

    Vue.use(Dialog).use(Toast)

    export default {
        components: {
            'page-head': Head,
        },
        data () {
            return {
            	// 当前取号 默认为空字符
	            queueNumber:'',
                success: false,
                showTip: 1,
                result: '',
                form: {
                    sfzh: '',
                },
            }
        },
        methods: {
            submit () {
                const that = this
                const openid = isWx() ? Cookies.get('openid') : ''
                if (that.form.sfzh !== '') {
                    // if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(that.form.sfzh))) {
                    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.form.sfzh))) {
                        Toast('身份证格式不正确!')
                    } else {
                        that.form = { ...that.form, wxh: openid }
                        that.$nextTick(() => {
                            that.pushForm(that.form)
                        })
                    }
                } else {
                    Toast('请输入身份证号码')
                }
            },
            pushForm (params) {
                const that = this
                request({
                    url: '/SubmitQHInfo',
                    data: { strJson: JSON.stringify(params) },
                    success (data) {
                        console.log(data)
                        if (data.resultcode == 1 || data.resultcode == '1') {
                            let result = '<div style=\'text-align: center\'>您的取号是：' + data.noInfo[0].deal_no + '</div>'
	                        that.queueNumber = data.resultmsg;
                            let button = '查看进度'
                            Dialog.alert({
                                message: result,
                                confirmButtonText: button
                            }).then(() => {
                                that.toSche()
                            })
                        } else {
                            if (data.resultmsg == '身份证格式不正确!') {
                                Toast(data.resultmsg)
                            } else {
                                let result = '<div style=\'text-align: center\'>您的取号是：' + data.resultmsg + '</div>'
	                            that.queueNumber = data.resultmsg;
                                let button = '查看进度'
                                Dialog.alert({
                                    message: result,
                                    confirmButtonText: button
                                }).then(() => {
                                    that.toSche()
                                })
                            }
                        }
                    },
                    fail (error) {
                    },
                })
            },
	        // 跳转到 排队状态查询
            toSche () {
                const that = this
                that.$router.push({
                    path: '/qupr',
	                query: { queueNumber: that.queueNumber }
                })
            },
        },
        mounted () {
            this.showTip = this.$route.query.response
        },
    }
</script>

<style lang="css" scoped>

	.olabel {
		font-size: 0.375rem;
		width: 30%;
	}

	.take {
		padding: 0 0.3rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.cdiv {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.borderLeft {
		border-left: 4px solid #f77f5a;
		float: left;
		height: 15px;
	}

	.takeinput {
		border: none;
		outline: none;
		font-size: 0.375rem;
		width: 69%;
		margin-left: 0.15rem;
	}

	.otips {
		line-height: 1.2rem;
		font-size: 0.375rem;
		color: red;
	}

	.osubmit {
		margin: 0.3rem 0.3rem 0;
	}

	.schedule {
		width: 100%;
	}

	.result {
		margin: 0.3rem 0.3rem 0;
		font-size: 0.375rem;
		text-align: center;
		line-height: 0.6rem;
	}

	.title {
		height: 40px;
		padding: 10px 10px;
		font-weight: bold;
		color: #252525;
		letter-spacing: 1px;
		background: white;
		margin-top: 0.2rem;
	}

	.titlep {
		margin-top: 0;
		margin-left: 0.225rem;
		font-size: 16px;
		line-height: 16px;
	}

	.take-tip {
		margin: 0.45rem 0.45rem 0;
		font-size: 0.375rem;
		text-align: center;
		line-height: 0.6rem;
		font-weight: 600;
	}

	.cresult {
		color: red;
	}
</style>
