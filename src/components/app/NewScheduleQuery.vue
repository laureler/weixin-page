<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>
        <div class="search-div">
            <van-cell-group>
                <van-field v-model="djbh" :value="djbh" type="text" clearable placeholder="请输入业务受理号"/>
                <van-field v-model="sqrxm" :value="sqrxm" type="text" clearable placeholder="请输入申请人姓名"/>
            </van-cell-group>
            <div style="height: 20px"></div>
		    <van-button size="large" class="blueButton" @click="query()">查询</van-button>
        </div>

		<div class="content-title">查询结果</div>
		<div v-show="!isShow" class="error-message-hint">{{resultmsg}}</div>
		<div v-show="isShow" class="container" v-for="result in results" :key="result.id">
			<div>收件编号：{{result.jid}}</div>
			<div>业务类型：{{result.jtitle}}</div>
			<div>房地坐落：{{result.zl}}</div>
			<div class="redColor">
				业务状态：{{result.ywjd}}
				<van-button v-if="isShowLogisticsBtn" size="small" class="search-logistics-btn" @click="searchLogistics">查询物流</van-button>
			</div>
		</div>
		<div v-show="isShowLogisticsInfo">
			<div class="content-title">物流进度</div>
			<van-cell-group :border="false">
				<div v-for="logistics in logisticsData">
					<van-cell :title="logistics.procdatetime" :value="logistics.description" :border="false" value-class="logistics-new-cell" />
				</div>
			</van-cell-group>
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
                checked: true,
                resultmsg: '',
                sqrxm: '',
                djbh: '',

				isShowLogisticsBtn: false,
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

				that.isShow = false;
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

    .container {
		margin-top: 0.15rem;
		font-size: 0.375rem;
		padding-top: 0.15rem;
		padding-left: 0.45rem;
		padding-bottom: 0.3rem;
	}

	.redColor {
		color: red
	}

	.error-message-hint {
		font-size: 16px;
		color: #999999;
		margin: 15px;
	}

	.search-logistics-btn {
		margin-left: 50px;
		border-radius: 5px;
	}

	.content-title {
		font-size:16px;
		color:#252525;
		padding: 10px 15px;
		border-bottom: 1px solid #ebedf0;
	}

	.logistics-new-cell {
		text-align: left;
	}

</style>
