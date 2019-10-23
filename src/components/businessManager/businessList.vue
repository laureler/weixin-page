<template>
    <div style="width:100%">
        <page-head title="个人业务列表"></page-head>
        <div class="list-box">
            <div class="list" v-for="(dataRow,index) in resultData" :key="index">
                <table>
                    <tr>
                        <td class="title">申请编号</td>
                        <td class="count">{{dataRow.ywbh}}</td>
                    </tr>
                    <tr>
                        <td class="title">合同号</td>
                        <td class="count">{{dataRow.hth}}</td>
                    </tr>
                    <tr>
                        <td class="title">坐落</td>
                        <td class="count">{{dataRow.zl}}</td>
                    </tr>
                    <tr>
                        <td class="title">是否按揭</td>
                        <td class="count">{{dataRow.ajf}}</td>
                    </tr>
                    <tr>
                        <td class="title">进度</td>
                        <td class="count">{{dataRow.jd}}</td>
                    </tr>
                    <tr>
                        <td class="title">操作</td>
                        <td class="count">
                            <van-button @click="showBusiness(1)" v-if="dataRow.jd=='待申请'" type="default" size="small" class="blue-button">申请</van-button>
                            <van-button @click="showBusiness(0)" v-else type="default" size="small" class="blue-button">查看</van-button>
                        </td>
                    </tr>
                </table>
                <div class="spilt"><div></div></div>
            </div>
        </div>
    </div>
</template>
<script>
import Head from '@/components/app/head.vue';
export default {
    name:"businessList",
    data(){
        return{
            resultData:[{"ywbh":"","hth":"1231231","zl":"东莞市某某镇某某街","ajf":"是","jd":"待申请"},
                {"ywbh":"212253345","hth":"1231231","zl":"东莞市某某镇某某街","ajf":"是","jd":"已出证"},
                {"ywbh":"2133453","hth":"1231231","zl":"东莞市某某镇某某街","ajf":"是","jd":"已出证"},
                {"ywbh":"","hth":"1231231","zl":"东莞市某某镇某某街","ajf":"是","jd":"待申请"}],
            cardCode:null,
            userName:null
        }
    },
    components: {
			'page-head': Head,
    },
    mounted(){
        let _this=this;
        _this.cardCode=_this.$route.query.cardCode;
        _this.userName=_this.$route.query.userName;
        if(!_this.cardCode || !_this.userName){
            this.$router.push({
					path: '/preApprovenew',
					query: {
						callbackUrl: '/businessList'
					}
				})
        }
    },
    methods:{
        showBusiness(type){
            let _this=this;
            this.$router.push({
                                path: '/businessView',
                                query: { code: "", viewType: type },
                            })
        }
    }
}
</script>
<style scoped>
    .list-box {
        width: 100%;
        padding-left: .1rem;
        padding-right: .1rem;
        padding-bottom: .5rem
    }
    .list-box .list{
        width: 100%;
    }
    .list-box .list .spilt{
        height: .7rem;
        width: 100%
    }
    .list-box .list .spilt div{
        height: .4rem;
        width: 100%;
        border-bottom: .1rem #7be9ff solid
    }
    .list-box .list table{
        width: 100%;
        border-bottom: 1px solid #bbb
    }
     .list-box .list table tr{
         border-top: 1px solid #bbb;
         height: .8rem;
    }
    .list-box .list table tr td{
        font-size: .5rem;
    }
    .list-box .list .title{
        border-right:  1px solid #bbb;
        text-align: center;
        width: 2.3rem;
    }
    .list-box .list .count{
        padding-left: .2rem
    }
    .blue-button{
        background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
        color: #ffffff !important;
    }
</style>