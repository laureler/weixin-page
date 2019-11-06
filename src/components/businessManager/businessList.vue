<template>
    <div style="width:100%">
        <page-head title="个人业务列表"></page-head>
        <div class="list-box">
            <div class="list" v-for="(dataRow,index) in resultData" :key="index">
                <table>
                    <tr>
                        <td class="title">申请编号</td>
                        <td class="count">{{dataRow.SQBH}}</td>
                    </tr>
                    <tr>
                        <td class="title">合同号</td>
                        <td class="count">{{dataRow.HTBH}}</td>
                    </tr>
                    <tr>
                        <td class="title">坐落</td>
                        <td class="count">{{dataRow.BDCZL}}</td>
                    </tr>
                    <tr>
                        <td class="title">是否按揭</td>
                        <td class="count">{{dataRow.SFAJ == 1?"是":"否"}}</td>
                    </tr>
                    <tr>
                        <td class="title">进度</td>
                        <td class="count">{{dataRow.YWJD}}</td>
                    </tr>
                    <tr>
                        <td class="title">操作</td>
                        <td class="count">
                            <van-button @click="showBusiness(1,dataRow.HTBH)" v-if="dataRow.YWJD=='待申请' || dataRow.YWJD=='预受理' || dataRow.YWJD==''" type="default" size="small" class="blue-button">申请</van-button>
                            <van-button @click="showBusiness(0,dataRow.HTBH)" v-else type="default" size="small" class="blue-button">查看</van-button>
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
import { Toast, Dialog } from 'vant';
export default {
    name:"businessList",
    data(){
        return{
            resultData:[{"ywbh":"","hth":"","zl":"","ajf":"","jd":""}],
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
        //_this.userName="蒲秀蓉";
       // _this.cardCode="512921197609094225";
        if(_this.cardCode && _this.userName){
            Toast.loading({
                duration:0,
                mask: true,
                message: '加载中...'
            });
            // 获取数据
            this.$fetch('/gdbdcWebService/public/personalBusiness/findInformation?buyerName=' + _this.userName + '&idNumber=' + _this.cardCode)
                .then(response => {
                    if (response.code==1) {
                        // 短信发送成功
                        _this.resultData=response.data;
                    Toast.clear();
                    } else {
                    Toast.clear();
                        Toast('数据加载失败!');
                    }
                })
                .catch(error => {
                    Toast.clear();
                    Toast('服务器请求错误!');
                    console.log(error);
                });
        }else{
             this.$router.push({
					path: '/preApprovenew',
					query: {
						callbackUrl: '/businessList'
					}
				})
        }
    },
    methods:{
        showBusiness(type,htbh){
            let _this=this;
            Toast.loading({
                duration:0,
                mask: true,
                message: '加载中...'
            });
             this.$fetch('/workflowWebService/public/getBusiness?code=4000101-02&contractNumber=' +htbh + '&createType=2')
                .then(response => {
                    if (response.code==1) {
                        Toast.clear();
                        this.$router.push({
                            name: 'businessView',
                            params:{ code: "", viewType: type,data:response.data,nowUser:_this.userName }
                        });
                    } else {
                        Toast.clear();
                        Toast('数据加载失败!');
                    }
                })
                .catch(error => {
                    Toast.clear();
                    Toast('服务器请求错误!');
                    console.log(error);
                });
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
        padding-left: .2rem;
        max-width: calc(100%-2.3rem);
    }
    .blue-button{
        background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
        color: #ffffff !important;
    }
</style>