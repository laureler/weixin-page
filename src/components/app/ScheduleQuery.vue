<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>
		<div class="search-div">
			<div class="Cdiv">
				<input placeholder="请输入业务登记号" v-model="djbh" type="text" class="Cinput"/>
				<van-icon name="search" size="20px" color="#6cccff" v-on:click="query" class="schequery" ></van-icon>
			</div>
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

	.schequery {
		padding: 10px 15px;
	}

	.schequery:focus {
		background: white;
	}

	.schequery:hover {
		background: white;
	}

	.reg {
		width: 30%
	}

	.Ocheckbox {
		padding: 0.3rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.cContent {
		font-size: 0.375rem;
		padding: 0.3rem;
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
		width: 85%;
		border: none;
		font-size: 0.375rem;
		outline: none;
		border-right: 1px solid #e5e5e5;
		height: 1rem;
		margin-right: 0.31rem;
	}
</style>
