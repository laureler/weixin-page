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

		<div style="font-size:0.42rem;color:#252525;margin-top:5rem;margin-left: 0.5rem">查询结果</div>
		<hr style="width:9.5rem;border:none;border-bottom:1px solid #e5e5e5;margin-top: 0.35rem;margin-bottom: 0.35rem"/>
		<div v-show="!isShow" style="font-size:0.42rem;color:#999999;margin-left: 0.5rem">{{resultmsg}}</div>
		<div v-show="isShow" class="container" v-for="result in results" :key="result.id">
			<div>收件编号：{{result.jid}}</div>
			<div>业务类型：{{result.jtitle}}</div>
			<div>房地坐落：{{result.zl}}</div>
			<div class="redColor">业务状态：{{result.ywjd}}</div>
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
                resultmsg: '未查询到结果',
                sqrxm: '',
                djbh: ''
            }
        },
        methods: {
            query () {
                const that = this
                request({
                    url: '/GetYWJD',
                    data: { strJson: JSON.stringify({ djbh: that.djbh, sqrxm: that.sqrxm }) },
                    success (response) {
                        if (Number(response.resultcode) === 1) {
                            that.isShow = !that.isShow;
                            that.results = response.result;
                        } else {
                            that.isShow = false;
                        }
                    },
                    fail (error) {
                        if(error.status == '404'){
                            Dialog.alert({
                                title: '错误提示：',
                                message: '找不到该接口！'
                            }).then(() => {
                                // on close
                            });
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
        position: fixed;
        top: 1.2rem;
        left: 0;
        background-color: #fff;
        padding-bottom: 5px;
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
</style>
