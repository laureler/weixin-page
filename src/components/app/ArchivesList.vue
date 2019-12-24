<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head :title="title"></page-head>
        <div style="background: #F0F5F8;width: 100%;height: 10px;border-bottom: 1px solid #E5E5E5;"></div>

<!--		<div v-if="results.length === 0" style="width: 100%;height: 24px;background-color: #ff976a;text-align: center;font-size: 11px;color: #FFF;line-height: 24px;">共 {{results.length}} 条记录</div>-->
		<div v-if="results.length === 0" style="width: 100%;height: 24px;background-color: #1989fa;text-align: center;font-size: 11px;color: #FFF;line-height: 24px;">共 {{results.length}} 条记录</div>

        <div class="content">
            <div v-show="!isShow" style="font-size:0.42rem;color:#999999;margin-left: 0.5rem">{{resultmsg}}</div>
            <div v-show="isShow" class="container" v-for="result in results" :key="result.id">
                <div>权利人：{{result.qlrmc}}</div>
                <van-button  type="info" slot="button" size="small" plain @click="queryArchives(result.rid,result.jid,result.cqzh,result.bdcdyh,result.qlrmc,result.zjh)" class="query-btn">查档</van-button>
                <div style="width:78%;white-space:wrap;">坐落：{{result.zl}}</div>
                <div>用途：{{result.yt}}</div>
                <div>面积：{{result.mj}}</div>
                <div>证件号码：{{result.zjhm}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Head from './head.vue'
    import { Toast } from 'vant'
    import Cookies from 'js-cookie';
    import { request } from '../../utils/http.js'

    export default {
        components: {
            'page-head': Head
        },
        data () {
            return {
                isShow:false,
                results:[],
                resultmsg: '未查询到结果',
                title: '',
                //查询条件
                strJson: '',
                //档案查询接口
                archiveInter: '/getArchiveDataInfo'
            }
        },

        methods: {
            //查档按钮点击事件
            queryArchives(rid,jid,cqzh,bdcdyh,qlrmc,zjh){
	            console.log(qlrmc);
	            console.log(qlrmc);
	            let filter = {
	            	strJson: JSON.stringify({

                        openId: Cookies.get('openid'),
			            // 人脸核身 身份证 姓名
                        // qlr: this.$store.getters.getPersonCardInfo.cardName,
			            // 人脸核身 身份证 号码
                    	// zjhm: this.$store.getters.getPersonCardInfo.cardCode,

			            // 返回数据取值
			            // rid 唯一标识字段
			            rid: rid,
			            // jid
			            jid:jid,
			            // 产权证号
			            cqzh:cqzh,
			            // 不动产单元号
			            bdcdyh:bdcdyh,
			            //权利人名称
			            qlr:qlrmc,
			            // 证件号码（取用证件号）
			            zjhm:zjh,
	            	})
	            };
	            this.$router.push({
                    path: '/arcd',
                    query: {filter: filter,title:this.title + '结果',inter: this.archiveInter}
                });
            }
        },
        created(){
            this.title = this.$route.query.title;
            this.inter = this.$route.query.inter;
            this.strJson = this.$route.query.strJson;
        },
        mounted(){
            const that = this;
            request({
                url: that.inter,
                data: {strJson:that.strJson},
                success(data){
                    if (Number(data.resultcode) === 1) {
                        that.isShow = !that.isShow;
                        that.results = data.result;
                    } else {
                        that.isShow = false;
                    }
                    that.results = data.result;
                },
                fail(error){
                    if(error.status == '404'){
                        Toast("找不到该接口！");
                        return;
                    }
                }
            });
        }
    }
</script>

<style lang="css" scoped>
    .content{
        position: absolute;
        top: calc(1.2rem + 34px);;
        width: 100%;
        height: calc(100% - 1.2rem - 34px);
        left: 0;
        overflow-y: auto;
    }

	.container {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.15rem;
		font-size: 16px;
		padding-top: 0.15rem;
		padding-left: 0.45rem;
		padding-bottom: 0.3rem;
	}

    .query-btn{
        /*width: 55px;*/
        /*height: 35px;*/
        /*border-radius: 5px;*/
        /*background: linear-gradient(to right, #2db6ff, #2edbfd) !important;*/
        /*color: #4d9ed7;*/
        font-size: 14px;
        float: right;
        right: 10px;
        bottom: -18px;
    }
</style>
