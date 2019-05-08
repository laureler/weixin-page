<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>
		<div class="space_between"></div>
        <div class="search-div">
            <van-cell-group>
                <van-field v-model="djbh" :value="djbh" type="text" clearable placeholder="请输入业务受理号"/>
                <van-field v-model="sqrxm" :value="sqrxm" type="text" clearable placeholder="请输入申请人姓名"/>
            </van-cell-group>
            <div style="margin-top: 20px">
				<van-button size="large" class="blueButton" @click="scheduleQuery()">查询</van-button>
			</div>
        </div>

		<div v-if="isStartSearch">
			<div v-show="!isShow">
				<div class="content-title">查询结果</div>
				<div class="error-message-hint">{{resultmsg}}</div>
			</div>
			<div v-show="isShow">
				<div class="business-content" v-for="result in results" :key="result.id">
					<div class="business-info-title">
						业务状态：<span>{{ result.ywjd }}</span>
						<van-button v-if="isShowLogisticsBtn" size="small" class="search-btn first-btn" @click="searchLogistics">物流查询</van-button>
						<van-button v-if="isShowPayBtn" size="small" class="search-btn" @click="gotoPayPage">缴费</van-button>
					</div>
					<div style="border-bottom: 1px solid #ebedf0;"></div>
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

				isStartSearch: false,

				isShowLogisticsInfo: false,
				isShowLogisticsBtn: false,	// 显示物流按钮？
				logisticsNumber: '',	// 物流编号
				logisticsData: [],	// 物流信息

				isShowPayBtn: false,	// 显示缴费按钮？
				payUrl: 'http://vx.todaytech.com.cn/zsjfpt/index.html#/qrcoderequest?upn=',	// 缴费地址，绝对路径

            }
        },
        methods: {
			gotoPayPage() {
				window.location.href = this.payUrl;
			},
        	// 查询物流信息
			searchLogistics() {
				const _this = this;

				_this.isShowLogisticsInfo = false;

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
            scheduleQuery () {
                const that = this;

				that.isShow = false;

                if (that.djbh === '' || that.sqrxm === '') {
					Toast('请完善输入信息！');
					return;
				}

				that.isShowLogisticsInfo = false;

                request({
                    url: '/GetYWJD2',
                    data: { strJson: JSON.stringify({ djbh: that.djbh, sqrxm: that.sqrxm }) },
                    success (response) {
                    	that.isStartSearch = true;
                        if (Number(response.resultcode) === 1) {
                            that.isShow = true;
                            that.results = response.result;

                            // 如果有物流信息
                            if (response.result[0].jzwlxx && response.result[0].jzwlxx.wlbh) {
								that.isShowLogisticsBtn = true;
                            	request({
									url: '/GetMailNo',
									data: { strJson: JSON.stringify({ jid: that.djbh }) },
									success(response) {
										if (Number(response.resultcode) === 1) {
											that.logisticsNumber = response.result;
										} else {
											that.dialogAlert('错误提示', response.resultmsg);
										}
									},
									fail(error) {
										that.dialogAlert('错误提示', error);
									}
								})
							} else {
								that.isShowLogisticsBtn = false;
							}
							// 如果有缴费信息
							let jfxx = response.result[0].jfxx
							if (jfxx && jfxx.jftzsh !== '') {
								that.isShowPayBtn = true;	// 有缴费信息，显示缴费按钮
								let jftzsh = jfxx.jftzsh;	// 缴费通知书号
								let zsdwbm = jfxx.zsdwbm;	// 执收单位编码
								that.$fetch('/pubWeb/pub/public/getBaseCode?plainTextData=' + jftzsh + '|' + zsdwbm).then(response => {
									if (response) {
										response = response.data;

										that.payUrl += response;
									} else {
										console.log('服务出错！')
									}
								}).catch(error => {
									console.log(error);
								});
							} else {
								that.isShowPayBtn = false;
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

	/*使用deep深入覆盖vant样式*/
	.business-content /deep/ .van-cell__title {
		max-width: 70px !important;
	}

	.business-content /deep/ .van-cell {
		font-size: 14px !important;
	}

	.business-info-title {
		font-size: 16px;
		padding: 0 15px;
		height: 30px;
		margin: 8px 0;
		line-height: 30px;
	 }

	.business-info-title span {
		color: #619DE0;
	}

	.search-btn {
		margin: 0 5px;
		float: right;
		border-radius: 5px;
	}

</style>
