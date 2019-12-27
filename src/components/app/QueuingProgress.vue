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
					<template v-if="success === 1">
					<van-cell title="我的取号:" class="myself">
						<span >{{myself}}</span>
					</van-cell>
					<van-cell title="正在受理号：">
						<div><span class="cell-content">{{result}}</span><span></span></div>
					</van-cell>
					</template>
					<van-cell v-if="nowechat === 1" title="排队等候人数：">
						<div><span class="cell-content">{{number-1}}</span><span>人</span></div>
					</van-cell>
					<van-cell v-if="success === 2" :title="error" class="cell-error" text-align="right"/>
				</van-cell-group>
				<div style="height: 40px"></div>
				<van-button size="large" class="blueButton" @click="getProgressInfo()">查询</van-button>
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
				// success 默认为0 若为1则为成功
                success: 0,
                error: '',
				// 正在受理号
                result: null,
				// 当前排队等候人数
                number: '',
                wait: '',
                // 我的取号
                myself: '暂未找到',
                wechat: 0,
				// 微信验证不通过 则为1
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
                        if (Number(data.resultcode) === 1) {
                            that.success = 1
                            let noInfo = data.noInfo;
                            let tempArr = [];
                            for (let i = 0; i < noInfo.length; i++) {
                                const noInfoElement = noInfo[i];
								if (noInfoElement.state === "正在处理") {
									tempArr.push(noInfoElement.deal_no);
								}
                            }
                            that.result = noInfo[0].deal_no;
                            if (noInfo.length !== 0) {
                                that.result = tempArr.toString();
							}
                            that.number = noInfo.length
                            if (isWx()) {
                                let flag = 0
                                for (let i = 0; i < noInfo.length; i++) {
                                    if (openid == noInfo[i].openid) {
                                        flag = 1;
                                        that.wait = i;
                                        that.myself = noInfo[i].deal_no;
                                        that.nowechat = 0;
                                        that.wechat = 1;
                                        break;
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
.myself .van-cell__title{
		font-weight: bolder;
}
</style>
