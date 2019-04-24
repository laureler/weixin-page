<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>
		<div class="space_between"></div>
        <div class="search-div">
            <van-cell-group>
                <van-field v-model="djbh" :value="djbh" type="text" clearable placeholder="请输入业务受理号"/>
                <van-field v-model="sqrxm" :value="sqrxm" type="text" clearable placeholder="请输入申请人姓名"/>
            </van-cell-group>
            <div style="height: 20px"></div>
		    <van-button size="large" class="blueButton" @click="query()">查询</van-button>
        </div>

		<div v-show="!isShow">
			<div class="content-title">查询结果</div>
			<div class="error-message-hint">{{resultmsg}}</div>
		</div>
		<div v-show="isShow">
			<div class="business-content" v-for="result in results" :key="result.id">
				<div class="business-info-title">
					业务状态：<span>{{ result.ywjd }}</span>
				</div>
				<van-cell-group :border="false" style="font-size: 14px;">
					<van-field :value="'收件编号：'+result.jid" :border="false" disabled/>
					<van-field :value="'业务类型：'+result.jtitle" :border="false" disabled/>
					<van-field :value="'房地坐落：'+result.zl" :border="false" disabled/>
				</van-cell-group>
			</div>
			<div v-if="isShowLogisticsInfo">
				<div class="space_between"></div>
				<div class="business-info-title">
					物流查询：
				</div>
				<van-steps
					direction="vertical"
					:active="0"
					active-color="#619DE0"
				>
					<template v-for="logistics in logisticsData">
						<van-step>
							<p style="font-size: 16px;">{{ logistics.description }}</p>
							<p>{{ logistics.procdatetime }}</p>
						</van-step>
					</template>
				</van-steps>
			</div>
		</div>
	</div>
</template>

<script>
    import Head from './head.vue'
    import { Toast, Dialog } from 'vant'
    import { request } from '../../utils/http.js'

    export default {
        components: {
            'page-head': Head,
        },
        data () {
            return {
                isShow: false,
                results: {},
                resultmsg: '',
                sqrxm: '',
                djbh: '',

				isShowLogisticsInfo: false,
				logisticsNumber: '',	// 物流编号
				logisticsData: [],	// 物流信息

            }
        },
        methods: {
        	// 查询物流信息
			searchLogistics() {
				const _this = this;

				request({
					url: '/queryMail',
					data: { strJson: JSON.stringify({ receiptNo: _this.logisticsNumber})},
					success(response) {
						if (Number(response.resultcode) === 1) {
							_this.logisticsData = response.result;
							_this.isShowLogisticsInfo = true;
						} else {
							_this.dialogAlert('错误提示', response.resultmsg);
						}
					},
					fail(error) {
						_this.dialogAlert('错误提示', error);
					}
				})
			},
			dialogAlert(title, message) {
				Dialog.alert({
					title: title,
					message: message
				}).then(() => {
				});
			},
			// 查询业务进度
            query () {
                const that = this;

                if (that.djbh === '' || that.sqrxm === '') {
					Toast('请完善输入信息！');
					return;
				}

				that.isShowLogisticsInfo = false;

                request({
                    url: '/GetYWJD',
                    data: { strJson: JSON.stringify({ djbh: that.djbh, sqrxm: that.sqrxm }) },
                    success (response) {
                        if (Number(response.resultcode) === 1) {
                            that.isShow = true;
                            that.results = response.result;

                            // 如果业务进度是已寄证，则获取物流编号
                            if (response.result[0].ywjd === '已寄证') {
                            	request({
									url: '/GetMailNo',
									data: { strJson: JSON.stringify({ jid: that.djbh }) },
									success(response) {
										if (Number(response.resultcode) === 1) {
											that.logisticsNumber = response.result;

											that.searchLogistics();
										} else {
											that.dialogAlert('错误提示', response.resultmsg);
										}
									},
									fail(error) {
										that.dialogAlert('错误提示', error);
									}
								})
							}
                        } else {
                            that.isShow = false;
                            that.resultmsg = response.resultmsg || '未查询到结果';
                        }
                    },
                    fail (error) {
                        if(error.status == '404'){
							that.dialogAlert('错误提示：', '找不到该接口！');
                            return;
                        }
                    },
                })
            },
        },
		mounted() {
		}
    }
</script>

<style lang="css" scoped>
	.search-div {
        width: 100%;
        top: 1.2rem;
        left: 0;
        background-color: #fff;
        padding-bottom: 5px;
    }

	.space_between {
		background-color: #eff7f7;
		height: 8px;
		margin: 0;
	}

	.error-message-hint {
		font-size: 16px;
		color: #999999;
		margin: 15px;
	}

	.content-title {
		font-size:16px;
		color:#252525;
		padding: 10px 15px;
		border-bottom: 1px solid #ebedf0;
	}

	.logistics-label-cell {
		font-size: 14px;
	}

	.logistics-value-cell {
		text-align: left;
		font-size: 14px;
	}

	/*使用deep深入覆盖vant样式*/
	.business-content /deep/ .van-cell__title {
		max-width: 70px !important;
	}

	.business-content /deep/ .van-cell {
		font-size: 14px !important;
	}

	.business-info-title {
		font-size: 16px;
		padding: 10px 15px;
		border-bottom: 1px solid #ebedf0;
	 }

	.business-info-title span {
		color: #619DE0;
	}

</style>
