<template>
    <div class="step2">
        <div class="step2_background"></div>
        <div class="step2_notice_box">
            <div class="step2_item">水平拍照</div>
            <div class="step2_item">光线适宜</div>
            <div class="step2_item">环境清晰</div>
        </div>
        <p class="step2_notice">
             此过程需要您本人完成，验证过程中请您注意以上几点
        </p>
        <ul class="step2_code">
           <li v-for="(i,index) in code" :key="index">{{i}}</li>
        </ul>
        <p class="step_tips">请使用前置摄像头</p>
        <p class="step_tips">录制一段匀速朗读上方数字的身份验证视频</p>
        <!-- <input type="file" accept="video/*" capture="camcorder"> -->
        <van-uploader :after-read="onRead" accept="video/*" capture="user" class="approve_card_backend">
             <button class="approve_next" >开始检测</button>
        </van-uploader>
        <div class="wait_tips" v-show="isRead">识别中，请稍后</div>

        <div class="step2_shade" v-show="isRemove">
            <div class="step_dialog">
                <p>您已绑定身份证信息<br>是否解除绑定重新认证</p>
                <button @click="remove">解除</button><button @click="cancelRemove">取消</button>
            </div>
        </div>

        <div class="wait_tips" v-show="showTips">{{tipsMsg}}</div>
    </div>
</template>

<script>
import { Uploader,Dialog  } from 'vant';
import Vue from 'vue';
import Cookies from 'js-cookie'
Vue.use(Uploader).use(Dialog);
    export default {
        data() {
            return {
                code: [],
                session_id:'0',
                token:'asdfsdf',
                isRead:false,
                cardCode:'445281198606095334',
                // isRemove:false,
                showTips:false,
                tipsMsg:''
            }
        },
        computed:{
            isRemove(){
                return this.$store.state.showDialog
            }
        },
        methods: {
            next() {
                 this.$store.commit('GET_STEP_URL',{path:'',verified:''})
                 this.$router.push({path:'/step3'})
            },
            onRead(file){
                var _this=this;
                console.log(file)
                 // var data= file.content.split(',')[1];
                let openId = Cookies.get('openid');
                console.log(file.file);
              let config = {headers: {'Content-Type': 'multipart/form-data'}};
              let formData = new FormData();
              formData.append('token', _this.token);
              formData.append('faceVideo', file.file);
              if(this.session_id == '0'){ // 传腾讯传验证码
                formData.append('sessionCode', this.code);
              }else{  // 传百度接口的session_id
                formData.append('sessionCode', this.session_id);
              }
              formData.append('openId', openId); //openId
              _this.isRead=true;

               _this.$post('/pubWeb/public/faceRecognition/faceVerify',formData,config).then(res=>{
            //    _this.$post('http://172.16.42.85:8080/pubWeb/public/faceRecognition/faceVerify',formData,config).then(res=>{
                    console.log(res)
                    _this.isRead=false;
                  if(res.err_no==0){//成功时候的回调
                       if(!this.$store.state.callbackUrl){
                          this.$router.push({path:'/step3',query:{isSuccess:true}})
                          this.$store.commit('SET_STEP',3)
                       }
                       else{
                         var cardInfo = res.card_info;
                         var parseCardInfo = JSON.parse(cardInfo);
                         window.location.href = this.$store.state.callbackUrl+`?id=${parseCardInfo.id}&name=${parseCardInfo.name}`;
                          // this.$router.push({path:'/personInfo',query:{cardCode:this.cardCode, name:''}}) //成功后直接跳转到信息页
                       }
                  }else{ //失败时候的回调
                      this.$router.push({path:'/step3',query:{isSuccess:false}})
                      this.$store.commit('SET_STEP',2)
                  }
               }).catch(err =>{

               })
            },
            remove(){
                // this.isRemove=false;
                let _this=this;
                let openId = Cookies.get('openid');
                // let openId ='oaPef0Vw4iqgD8ihvxBlYJbPoKK0';

                this.$fetch('/pubWeb/public/faceRecognition/resetOpenIdLinkedInfo?openId='+openId)
                // this.$fetch('http://172.16.42.85:8080/pubWeb/public/faceRecognition/resetOpenIdLinkedInfo?openId='+openId)
                .then(res=>{
                    console.log(res);
                    if(res.code>=0){
                        //重置成功
                        this.showTips=true;
                        this.$store.commit('DIALOG_CTRL',false)
                        // this.isRemove=false;
                        this.tipsMsg=res.msg
                        setTimeout(function(){
                            _this.showTips=false;
                            _this.$store.commit('SET_STEP',0);
                             _this.$router.push({path:'/approve'})
                        },1500);
                    }else{
                        this.showTips=true;
                        this.$store.commit('DIALOG_CTRL',false)
                        // this.isRemove=false;
                        this.tipsMsg=res.msg
                        setTimeout(function(){_this.showTips=false},1500);

                    }

                })

            },
            cancelRemove(){
                // this.isRemove=false
                this.$store.commit('DIALOG_CTRL',false)
            }
        },
        mounted(){
            this.cardCode = this.$route.query.cardCode;
            this.token=sessionStorage.getItem('token');
            var _this=this;

            this.$store.commit('GET_STEP_URL',{path:this.$route.path,verified:this.$route.query.verified})
            console.log(this.$store.state)
            // if(this.$route.query.verified){
            //     this.isRemove=true
            // }
            this.$fetch('/pubWeb/public/faceRecognition/getSessionCode')
            // this.$fetch('http://www.aiwandoudou.com/pubWeb/public/faceRecognition/getSessionCode')
                .then(res=>{
                    console.log(res);
                    _this.session_id=res.session_id;
                    _this.code=res.code;
                })

            //监听回退事件
             if (window.history && window.history.pushState) {
                 window.addEventListener("popstate", function (a) {
                      _this.$store.commit('SET_STEP',0)
                      _this.$store.commit('GET_STEP_URL',{path:'',verified:''})
                })

              }

        }
    }
</script>

<style scoped lang="less">
.step2{
    .step2_background{
        height:450/2px;
        background-image: url('../../../public/images/approve/image_people@2x.png');
        background-repeat: no-repeat;
        background-size:cover;
    }
    .step2_notice_box{
        width:605/2px;
        height:48/2px;
        margin:28/2px auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .step2_item{
       width:113/2px;
       height:84/2px;
       font-size: 24/2px;
       color:#9a9a9a;
       line-height: 140/2px;
        background-position: top center;
    }
    .step2_item:nth-child(1){
        background-image: url('../../../public/images/approve/icon_shuipin@2x.png');
        background-repeat: no-repeat;
        background-size:48/2px;
    }
    .step2_item:nth-child(2){
        background-image: url('../../../public/images/approve/icon_guanxian@2x.png');
        background-repeat: no-repeat;
        background-size:48/2px;
    }
    .step2_item:nth-child(3){
        background-image: url('../../../public/images/approve/icon_huanjin@2x.png');
        background-repeat: no-repeat;
        background-size:48/2px;

    }
    .step2_notice{
        position: absolute;
        width:100%;
        height:24/2px;
        line-height: 24/2px;
        color:#9a9a9a;
        font-size: 24/2px;
        text-align: center;
        bottom:120/2px;
    }
    .approve_next{

        width:690/2px;
        height:88/2px;
        // margin:40/2px 30/2px;
        // position: absolute;
        // bottom:40/2px;
        // left:30/2px;
        border:none;
        background: linear-gradient(to right, #2db6ff , #2edbfd);
        border-radius: 44/2px;
        font-size: 36/2px;
        color:#fff;
        font-weight: 550;
    }
    .approve_card_backend{
        width:690/2px;
        height:88/2px;
        // margin:40/2px 30/2px;
        position: absolute;
        bottom:20/2px;
        left:30/2px;
        border:none;
        background: #338cfd;
        border-radius: 44/2px;
        font-size: 36/2px;
        color:#fff;
        font-weight: 550;
    }
    .step2_code{
        clear: both;
        width:400/2px;
        height:80/2px;
        margin: 0 auto;
        line-height: 80/2px;
        display: flex;
        margin-top:50/2px;
        margin-bottom:30/2px;
        flex-direction: row;
        justify-content:space-around;
        li{
           width:50/2px;
        //    flex-grow:0;
           color:#fff;
           border-radius: 10/2px;
           background: #338cfd;
           text-align: center;

        }
    }
    .step_tips{
        height:30/2px;
        line-height: 30/2px;
        text-align:center;
        color:#9a9a9a;
    }
     .wait_tips{
        width:200/2px;
        height:200/2px;
        background: rgba(0,0,0,0.5);
        line-height: 200/2px;
        text-align: center;
        color:#fff;
        border-radius: 10/2px;
        position: fixed;
        top:50%;
        left:50%;
        transform: translate3d(-50%,-50%,0);
    }
    .step2_shade{
        position: absolute;
        top:0;
        z-index: 100;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.3);
        .step_dialog{
            width:200px;
            height:100px;
            background: #fff;
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            margin:auto;
            border-radius: 5px;
            box-sizing: border-box;
            padding:15px;
            p{
                height:40px;
                line-height:20px;
                text-align: center;
                color:#333;
                padding-bottom:5px;
                border-bottom:1px solid #e4e4e4;
            }
            button{
                width:85px;
                margin-top:10px;
                border:none;
                background: #fff;
            }
            button:nth-child(2){
                border-right:1px solid #e4e4e4;
                color:#9a9a9a;
            }
            button:nth-child(3){

                color:#338cfd;
            }
        }
    }
}
</style>
