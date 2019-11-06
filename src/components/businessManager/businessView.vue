<template>
    <div style="width:100%;height: 100%;position: relative;">
        <page-head title="个人业务详情"></page-head>

        <div v-show="showQrcode" @click="hide" class="qrCodeBox">
            <div v-show="showQrcode" class="qrCode" id="qrcode">
				<img src="" alt="" id="arcodeImg">
			</div><!-- 创建一个div，并设置id为qrcode -->
            <div class="hrefText">长按二维码识别跳转签名</div>
        </div>
        <div  v-show="showImg" @click="viewImg" class="viewImgBox">
            <img :src="imgPath"/>
        </div>
        <div style="z-index:1">
            <div v-if="viewType==0" style="margin: 10px 0px">
                <van-button type="default" size="default" class="fullButton">下载证照</van-button>
            </div>
            <div v-else style="margin: 10px 0px;text-align:center">
                <van-button type="default" size="default" class="fullButton">提交</van-button>
                <div style="width:100%;height:.3rem"></div>
                <van-button type="default" size="default" class="fullButton" @click="qrcode">电子签名</van-button>
            </div>
            <div class="fromTable">
                <table>
                    <tr>
                        <td class="title">申请编号</td>
                        <td class="count">{{formData.SQBH}}</td>
                    </tr>
                    <tr>
                        <td class="title">权利人</td>
                        <td class="count">{{formData.GFRMC}}</td>
                    </tr>
                    <tr>
                        <td class="title">证件号码</td>
                        <td class="count">{{formData.GFRZJHM}}</td>
                    </tr>
                    <tr>
                        <td class="title">联系人</td>
                        <td class="count">{{nowUser.LXR}}</td>
                    </tr>
                    <tr>
                        <td class="title">联系电话</td>
                        <td class="count">{{nowUser.LXDH}}</td>
                    </tr>
                    <tr>
                        <td class="title">合同号</td>
                        <td class="count">{{formData.HTBH}}</td>
                    </tr>
                    <tr>
                        <td class="title">坐落</td>
                        <td class="count">
                            {{formData.BDCZL}}
                        </td>
                    </tr>
                    <tr>
                        <td class="title">建筑面积</td>
                        <td class="count">{{formData.FJZMJ}}</td>
                    </tr>
                </table>
                <div style="border-bottom: 1px solid #333;margin-top:.5rem;width:2.5rem;font-size:.6rem;font-weight: bolder">附件信息</div>
                <div style="width:100%;border-top: 1px solid #bbb;"></div>
                <table>
                    <tr>
                        <td>附件名称</td>
                        <td></td>
                    </tr>
                    <template v-for="(qd,index) in formData.FJQD">
                        <tr :key="index">
                            <td>{{qd.ZLMC}}</td>
                            <td style="width:4.6rem">
                                <van-button :disabled="qd.FPATH==null?true:false" @click="viewImg(qd.FPATH)" type="info" size="small">预览</van-button>
                                &nbsp;&nbsp;&nbsp;&nbsp;<van-button style="padding-left:.2rem" v-if="qd.ZLMC == '身份证明材料'" @click="uploadImg" type="info" size="small">上传</van-button>
                                 <input :ref="'getPhoto'+index" @change="postImg('getPhoto'+index)" v-if="qd.ZLMC == '身份证明材料'" style="display:none;" type="file" id="upload" accept="image/*" size="30">
                            </td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import Head from '@/components/app/head.vue';
import QRCode from 'qrcode';
import axios from 'axios'
/*export function compress(img) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  canvas.width = width;
  canvas.height = height;
  // 铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, width, height);

  //进行最小压缩
  let ndata = canvas.toDataURL("image/jpeg", 0.1);
  return ndata;
}

export function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(base64Data.split(",")[1]);
  else byteString = unescape(base64Data.split(",")[1]);
  var mimeString = base64Data
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}*/
export default {
    name:"businessView",
    data(){
        return{
            formData:{SQBH:"",GFRMC:"",GFRZJHM:"",lxdh:"",HTBH:"",BDCZL:"",FJZMJ:"",FJQD:[],ALLGFRXX:[]},
            viewType:0,//视图类型 0：预览  1：在线申请
            showQrcode:false,
            imgPath:"",
            showImg:false,
            headerImage:'',
            picValue:'',
            nowUser:{LXR:"",LXDH:"",SIGNLINK:""}
        }
    },
    components: {
			'page-head': Head,
    },
    methods:{
        test(){},
        uploadImg(){
            document.getElementById("upload").click();
        },
        submitModify(form){
            debugger
            this.$post('/gdbdcWebService/public/personalBusiness/uploadProve',form,{
				'Content-Type':'multipart/form-data;charset=UTF-8'
			}).then(response => {
                    if (response.code==1) {
                        
                    } else {
                        Toast('数据加载失败!');
                    }
                })
                .catch(error => {
                   
                    Toast('服务器错误!');
                    console.log(error);
                });
        },
      postImg (node) {
        let _this = this;
        //这里写接口
        let $node = this.$refs[node];
        let file = $node[0].files[0];//获取当前选择的照片
        let formData = new FormData();
        if(!file) return;
            formData.append("multipartFile", file);
            formData.append("jid", _this.formData.SQBH);
            formData.append("materialName", "身份证明材料");
            _this.submitModify(formData); //上传方法
       /* let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            let img = new Image();
            img.onload = function () {
　　　　　　    img.src = e.target.result;
            let data = compress(img);
            let blob = dataURItoBlob(data);
            }
        };*/
      },
        viewImg(path){
            if(path){
                this.imgPath=path;
            }
            this.showImg=!this.showImg;
        },
        hide(){
            let _this = this;
            _this.showQrcode=false;
        },
        qrcode() {
            //var canvas = document.getElementById('canvas')
            var opts = {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                quality: 0.3,
                margin: 1,
                color: {
                    dark:"#000000",
                    light:"#ffffff"
                }
            }
            let text= this.nowUser.SIGNLINK; // 二维码地址
			QRCode.toDataURL(text, opts, function (error,url) {
                if (error) console.error(error)
                var img = document.getElementById("arcodeImg");
                img.src = url;
                console.log('QRCode success!');
                _this.showQrcode=true;
            })

        }
    },
    mounted(){
        let _this=this;
        let user=_this.$route.params.nowUser;
        _this.viewType=_this.$route.query.viewType;
        _this.formData=_this.$route.params.data;
        let  allgfr=_this.formData.ALLGFRXX;
        for(var i=0;i<allgfr.length;i++){
            if(allgfr[i].GFRMC==user){
                _this.nowUser=allgfr[i];
            }
        }
    },    
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
        padding-left: .2rem;
        word-wrap:break-word;
    	word-break:break-all;
    	white-space:normal;
        max-width: calc(100%-2.3rem)
    }
    .fromTable .count-defult{
        padding-left: .2rem;
        color: #999;
    }
    .blue-button{
        background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
        color: #ffffff !important;
    }
    .qrCodeBox{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(0,0,0,.5);
    }
    .viewImgBox{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(0,0,0,.5);
        text-align: center;
    }
    .viewImgBox img{
        max-width: 90%;
    }
    .qrCode{
        z-index: 999;
        margin-left: calc(50% - 100px);
        margin-top:  5rem;
        position: relative;
        display: inline-block;
        background-color: #fff;
        padding: 8px;
    }
    .hrefText{
        color: #fff;
        width: 100%;
        text-align: center;
        padding-top: .2rem;
        font-size: .5rem;
        font-weight: bolder;
    }
<<<<<<< .mine


.show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover; 
}
</style>
=======
</style>


















>>>>>>> .theirs
