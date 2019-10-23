<template>
    <div style="width:100%">
        <page-head title="个人业务详情"></page-head>
        <div v-if="viewType==0" style="margin: 10px 0px">
			<van-button type="default" size="default" class="fullButton">下载证照</van-button>
		</div>
        <div v-else style="margin: 10px 0px;text-align:center">
			<van-button type="default" size="small" class="blue-button">提交</van-button>
            <van-button type="default" size="small" style="margin-left:.2rem;margin-right:.2rem" class="blue-button">关联交税</van-button>
            <van-button type="default" size="small" class="blue-button">电子签名</van-button>
		</div>
        <div class="fromTable">
            <table>
                <tr>
                    <td class="title">申请编号</td>
                    <td class="count">{{formData.sqbh}}</td>
                </tr>
                <tr>
                    <td class="title">权利人</td>
                    <td class="count">{{formData.qlr}}</td>
                </tr>
                <tr>
                    <td class="title">证件号码</td>
                    <td class="count-defult">{{formData.zjhm}}</td>
                </tr>
                <tr>
                    <td class="title">联系电话</td>
                    <td class="count-defult">{{formData.lxdh}}</td>
                </tr>
                <tr>
                    <td class="title">合同号</td>
                    <td class="count-defult">{{formData.hth}}</td>
                </tr>
                <tr>
                    <td class="title">坐落</td>
                    <td class="count-defult">
                        {{formData.zl}}
                    </td>
                </tr>
                <tr>
                    <td class="title">建筑面积</td>
                    <td class="count-defult">{{formData.jzmj}}</td>
                </tr>
                <tr>
                    <td class="title">是否交税</td>
                    <td class="count-defult">{{formData.jsf}}</td>
                </tr>
            </table>
            <div style="border-bottom: 1px solid #333;margin-top:.5rem;width:2.5rem;font-size:.6rem;font-weight: bolder">附件信息</div>
            <div style="width:100%;border-top: 1px solid #bbb;"></div>
            <table>
                <tr>
                    <td>完税证明</td>
                    <td>是否已上传</td>
                    <td></td>
                </tr>
                <tr>
                    <td>完税证明</td>
                    <td>是</td>
                    <td>
                        <van-button type="info" size="small">预览</van-button>
                    </td>
                </tr>
                <tr>
                    <td>转移申请登记表</td>
                    <td>否</td>
                    <td>
                        <van-button disabled  type="info" size="small">预览</van-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import Head from '@/components/app/head.vue';
export default {
    name:"businessView",
    data(){
        return{
            formData:{
                "sqbh":"12355546","qlr":"张三","zjhm":"45866658642","lxdh":"13385465584","hth":"6584558465115","zl":"东莞市某某镇某某接到",
                "jzmj":"133.2m²","jsf":"是"
            },
            viewType:0,//视图类型 0：预览  1：在线申请

        }
    },
    components: {
			'page-head': Head,
    },
    mounted(){
        let _this=this;
        _this.viewType=_this.$route.query.viewType;
    }
}
</script>
<style scoped>
/*通用的蓝色按钮*/
	.fullButton {
		display: block !important;
		width: 90% !important;
		margin: 0 auto !important;
		font-weight: bold !important;
		letter-spacing: 2px !important;
		border-radius: 5px !important;
        background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
		color: #ffffff !important;
	}
    .fromTable{
        width: 100%;
        padding-left: .1rem;
        padding-right: .1rem;
    }
    .fromTable table{
        border-bottom: 1px solid #bbb;
        width: 100%;
    }
    .fromTable table tr{
        border-top: 1px solid #bbb;
        height: 1rem;
    }
    .fromTable table tr td{
        font-size: .5rem;
    }
    .fromTable .title{
        border-right:  1px solid #bbb;
        text-align: center;
        width: 2.3rem;
    }
    .fromTable .count{
        padding-left: .2rem
    }
    .fromTable .count-defult{
        padding-left: .2rem;
        color: #999
    }
    .blue-button{
        background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
        color: #ffffff !important;
    }
</style>