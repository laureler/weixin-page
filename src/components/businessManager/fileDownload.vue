<template>
    <div style="width:100%;height:100%">
        <div  class="wxbg" v-if="isWeixin">
            <img src="../../assets/images/downbg.jpg" style="width:100%;height:100%" />
            <van-button class="backbtn"  @click="goBack()" size="small">返回</van-button>
        </div>
    </div>
</template>
<script>
export default {
    name:"fileDownload",
    data(){
        return{
            isWeixin:true,
        }
    },
    methods:{
        goBack:function(){
            this.$router.back();
        }
    },
    computed:{
        is_weixin:function(){
            var ua = window.navigator.userAgent.toLowerCase(); 
            if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
                console.log('微信浏览器');
                return true;
            } else { 
                console.log("不是微信浏览器"); 
                return false;
            } 
        }
    },
    created(){
        this.isWeixin = this.is_weixin;
        let fileUrl=this.$route.query.fileUrl;
        if(!this.isWeixin){
            window.location.href = fileUrl;
        }
    }
}
</script>
<style scoped>
    .wxbg{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .backbtn{
        position: absolute;
        left: .2rem;
        top: .2rem;
    }
</style>