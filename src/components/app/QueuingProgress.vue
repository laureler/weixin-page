<template lang="html">
	<div style="display:flex; flex-direction:column;height:100%;background: #f0f5f8">
		<page-head title="排队状态查询"></page-head>
		<div style="margin-top: 0.3rem">
			<div class="box-body">
				<div class="title">
					<div class="borderLeft"></div>
					<p class="titlep">排队信息</p>
				</div>
				<van-cell-group>
					<van-cell v-if="success===1" title="正在受理号：">
						<div><span class="cell-content">{{result}}</span><span>号</span></div>
					</van-cell>
					<van-cell v-if="nowechat === 1" title="排队等候人数：">
						<div><span class="cell-content">{{number-1}}</span><span>人</span></div>
					</van-cell>
					<van-cell v-if="success === 2" :title="error" class="cell-error" text-align="right"/>
				</van-cell-group>
				<div style="height: 40px"></div>
				<van-button size="large" class="blueButton" @click="getProgressInfo()">刷新排队状态</van-button>
				<div style="height: 20px"></div>
			</div>
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
                success: 0,
                error: '',
                result: null,
                number: '',
                wait: '',
                myself: '',
                wechat: 0,
                nowechat: 0,
            }
        },
        beforeMount () {
            this.getProgressInfo()
        },
        methods: {
            getProgressInfo () {
                const that = this
                const openid = isWx() ? Cookies.get('openid') : ''
                request({
                    url: '/GetAllNo',
                    success (data) {
                        console.log(data)
                        if (Number(data.resultcode) === 1) {
                            that.success = 1
                            that.result = data.noInfo[0].deal_no
                            that.number = data.noInfo.length
                            if (isWx()) {
                                let flag = 0
                                for (let i = 0; i < data.noInfo.length; i++) {
                                    if (openid == data.noInfo[i].openid) {
                                        flag = 1
                                        that.wait = i
                                        that.myself = data.noInfo[i].deal_no
                                        that.nowechat = 0
                                        that.wechat = 1
                                        break
                                    }
                                }
                                if (!flag) {
                                    that.wechat = 0
                                    that.nowechat = 1
                                }
                            } else {
                                that.wechat = 0
                                that.nowechat = 1
                            }
                        } else {
                            that.success = 2
                            that.error = data.resultmsg
                        }
                    },
                    fail (error) {
                        that.success = 2
                        that.error = error.msg
                    },
                })
            },
        },
    }
</script>

<style lang="css" scoped>

	.box-body {
		width: 100%;
		font-size: 16px;
		display: flex;
		flex-direction: column;
		margin-top: 0.2rem;
	}

	.title {
		height: 40px;
		padding: 10px 10px;
		font-weight: bold;
		color: #252525;
		letter-spacing: 1px;
		background: white;
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

	.cell-content {
		color: #f77f5a;
	}

	.cell-error {
		color: #f77f5a;
	}

</style>
