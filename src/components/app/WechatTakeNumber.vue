<template lang="html">
	<div v-if="inited" style="display:flex; flex-direction:column; padding: 0 0 0.45rem; align-items: center;">
		<page-head title="排队取号"></page-head>
		<div style="position: relative; height: 150px">
			<img src="../../../public/images/wechatstatic/bg_top.png" class="img"/>
			<span class="title_name">{{getTitleValue()}}</span>
		</div>
		<div v-if="!timeout">
			<div class="box-card new-card">
				<div slot="header" class="new-clearfix">
					<span>预约人信息</span>
				</div>
				<div class="new-content">
					<p class="text">预约人：{{ item.yyr }}</p>
					<p class="text">预约号：{{ item.yyh }}</p>
					<!-- <p class="text" v-if="item.zmh">证明(书)号：{{ item.zmh }}</p> -->
					<p class="text">证件号码：{{ item.zjhm }}</p>
				</div>
			</div>
			<div class="box-card new-card">
				<div slot="header" class="new-clearfix">
					<span>预约事项及预约时间</span>
				</div>
				<div class="new-content">
					<p class="text">预约日期：{{ item.yyrq }}</p>
					<p class="text">预约时段：{{ item.yysd }}</p>
					<p class="text">预约事项：{{ item.yysx }}</p>
					<p class="text">所在网点：{{ item.szwd }}</p>
					<p class="text">办理状态：{{ item.zt }}</p>
				</div>
			</div>
		</div>
		<div class="takeText" v-if="byTouch">
			您必须到现场扫描二维码取号！
		</div>
		<div class="timeoutText" v-if="timeout">
			{{timeout_text}}
		</div>
		<van-button @click="pushForm" type="info" class="osubmit" v-if="byURL" :disabled="success">取号</van-button>
		<div v-if="isSuccess" class="result">
			<p>取号结果</p>
			<p class="cresult">{{ result }}</p>
			<van-button @click="toSche" type="info" class="schedule">查看进度</van-button>
		</div>
	</div>
</template>

<script>
    import Head from './head.vue'

    import { request } from '../../utils/http'
    import { isWx } from '../../utils/ua'

    import Cookies from 'js-cookie'

    export default {
        components: {
            'page-head': Head,
        },
        data () {
            return {
				isSuccess: false,
                // 整体页面是否显示
                inited: false,
                item: '',
                byTouch: false,
                // 显示取号按钮
                byURL: false,
                // 控制是否显示超时日志
                timeout: false,
                timeout_text: '',
                openid: '',
                result: ''
            }
        },
        mounted () {
            this.searchAppointment()
        },
        methods: {
            //轮询公众号名称
            getTitleValue () {
                var newVar = window.titleValue === undefined ? '不动产登记中心' : window.titleValue;
                var timeNumber = setInterval(function () {
                    // flash data
                    if (newVar !== '不动产登记中心') {
                        clearInterval(timeNumber);
                    }
                    else {
                        newVar = window.titleValue === undefined ? '不动产登记中心' : window.titleValue;
                    }
                }, 300);
                return newVar;
            },
            searchAppointment () {
                const that = this;
                var openid = isWx() ? Cookies.get('openid') : '';
                this.openid = openid;
                if (openid == undefined) {
                    console.log('openid:' + openid);
                }
                if (isWx()) {
                    request({
                        url: '/SearchYYInfoByOpenId',
                        data: {
                            strJson: JSON.stringify({
                                openid,
                                // checkcode:uiScript.getParam('checkcode') || ''
                            })
                        },
                        success (data) {
                            console.log(data)
                            // 0 的时候，且 checkoppoint =1的时候，就错误日志
                            if (data.resultcode == 0 || data.resultcode == '0') {
                                var checkoppoint = uiScript.getParam('checkoppoint') || ''
                                if (checkoppoint == '1' || checkoppoint == 1) {
                                    that.inited = true;
                                    that.timeout = true;
                                    that.timeout_text = data.resultmsg;
                                }
                                // 排队取号界面
                                else if (checkoppoint == '' || checkoppoint == undefined || checkoppoint == 0 || checkoppoint == '0') {
                                    that.$router.replace('/tnum');
                                }
                            }
                            // 当 1 的时候，正确显示界面
                            else if (data.resultcode == 1 || data.resultcode == '1') {
                                that.inited = true;
                                that.item = data.yyinfo[0];
                                //显示取号界面
                                that.byURL = true;
                                that.byTouch = false;
                            }
                            // 返回值为2 的时候 无论如何都展示错误信息界面
                            else if (data.resultcode == 2 || data.resultcode == '2') {
                                that.inited = true;
                                that.timeout = true;
                                that.timeout_text = data.resultmsg;
                            }
                            // 否则就只剩下 返回值0 且 checkoppoint 没有的情况了，跳转过去
                            else {
                                that.$router.replace({ path: '/tnum', query: { response: 1 } });
                            }
                        },
                        fail (error) {
                            console.log('服务器出错！');
                        },
                    })
                } else {
                    console.log('未判断出是微信项目');
                    that.$router.replace('/tnum');
                }
            },
            pushForm () {
                const that = this;
                request({
                    url: '/SubmitQHInfo',
                    data: { strJson: JSON.stringify({ wxh: that.openid === undefined?"":that.openid, sfzh: '' }) },
                    success (data) {
                        console.log(data);
						that.isSuccess = true;
                        if (Number(data.resultcode) === 1) {
                            that.result = data.noInfo[0].deal_no;
                        } else {
                            that.result = data.resultmsg;
                        }
                    },
                    fail (error) {
                    },
                })
            },
            toSche () {
                const that = this;
                that.$router.push({ path: '/qupr' })
            },
        },
    }
</script>

<style lang="css" scoped>

	span.title_name {
		position: absolute;
		font-size: 26px;
		font-weight: 500;
		font-family: STXingkai, serif;
		color: #ffffff;
		top: calc(50% - 13px);
		left: 0;
		width: 100%;
		text-align: center;
	}

	.img {
		float: left;
		display: block;
		width: 100%;
	}

	.box-card {
		width: 100%;
		margin: 0 auto;
		margin-top: 0.15rem;
	}

	.new-card {
		border: 1px solid #ebeef5;
		background-color: #fff;
		overflow: hidden;
		color: #303133;
		transition: .3s;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	}

	.box-card .new-content {
		padding: 11px;
	}

	.box-card .new-content .text {
		margin-bottom: 0.075rem;
		font-size: 0.375rem;
	}

	.new-clearfix {
		font-size: 0.45rem;
		color: #90CC4B;
		padding: 11px;
		padding-bottom: 10px;
		border-bottom: 1px solid #EBEEF5;
	}

	.takeText {
		text-align: center;
		font-size: 0.375rem;
		color: red;
		padding: 0.3rem 0;
		font-weight: bold;
	}

	.timeoutText {
		width: 84%;
		font-size: 0.375rem;
		color: black;
		padding: 0.3rem 0;
		font-weight: bold;
		line-height: 0.525rem;
		margin:0 auto;
		text-align:center;
	}

	.osubmit {
		width: 90%;
		margin: 0.3rem auto 0;
		border-radius: 5px;
	}

	.result {
		font-size: 0.375rem;
		text-align: center;
		padding-bottom: 1.5rem;
		line-height: 0.75rem;
	}

	.cresult {
		color: red;
	}

	.schedule {
		width: 90%;
	}
</style>
