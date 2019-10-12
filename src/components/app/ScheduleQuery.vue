<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>
		<div class="search-div">
			<div class="Cdiv">
				<input placeholder="请输入业务登记号" v-model="djbh" type="text" class="Cinput"/>
			</div>
		</div>
		<div style="margin: 20px 0px">
			<van-button size="large" class="blueButton" @click="query">搜索</van-button>
		</div>
		<div v-if="isStartSearch">
			<div style="font-size:0.42rem;color:#252525;margin-top:0.3rem;margin-left: 0.5rem">查询结果</div>
			<hr style="width:9.5rem;border:none;border-bottom:1px solid #e5e5e5;margin-top: 0.35rem;margin-bottom: 0.35rem"/>
			<div v-show="!isShow" style="font-size:0.42rem;color:#999999;margin-left: 0.5rem">{{resultmsg}}</div>
			<div v-show="isShow" class="container" v-for="result in results" :key="result.id">
				<div>收件编号：{{result.jid}}</div>
				<div>业务类型：{{result.jtitle}}</div>
				<div>房地坐落：{{result.zl}}</div>
				<div class="redColor">业务状态：{{result.ywjd}}</div>
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
                isShow: false,
                results: {},
                djbh: '',
                checked: true,
                resultmsg: '未查询到结果',
				isStartSearch: false,
            }
        },
        methods: {
            query () {
                console.log("query")
                const that = this;
                if (that.djbh === '') {
					Toast('请输入业务登记号！');
					return;
				}

                request({
                    url: '/GetYWJD',
                    data: { strJson: JSON.stringify({ djbh: that.djbh }) },
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
	.blueButton {
		margin-top: 20px;
	}
</style>
