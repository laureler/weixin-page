<template>
  <!-- <div class="step1" v-show="!isCheckBefore"> -->
  <div class="step1">
    <div class="container">
      <!--<van-collapse v-model="activeNames" accordion  v-for="(item,index) in PageDataArray">
        <div id="index">{{item}}</div>
      </van-collapse>-->
      <van-collapse v-model="activeNames" accordion v-for="(outerItem,outerKey,outerIndex) in PageDataArray">
        <van-collapse-item :name="outerIndex" >
          <div slot="title">
            <div style="border-left: 2px solid #2db6ff;height: 12px;margin-top: 6px;float: left;margin-right: 10px"/>
            {{outerKey}}
          </div>
          <div v-if="typeof outerItem[0][Object.keys(outerItem[0])]=='string'">
            <van-cell-group v-for="(innerItem)  in outerItem">
              <van-cell :value="innerItem[Object.keys(innerItem)[0]]" :title="Object.keys(innerItem)[0]"/>
            </van-cell-group>
          </div>
          <div v-else>
            <van-tabs v-model="active">
              <van-tab v-for="(valueTab,indexTab) in outerItem[0][Object.keys(outerItem[0])[0]]" :title="(Object.keys(outerItem[0])[0])+(indexTab+1)">
                <van-cell-group v-for="(innerTabItem,innerTabkey,innerTabIndex)  in valueTab">
                  <van-cell :value="innerTabItem" :title="innerTabkey"/>
                </van-cell-group>
              </van-tab>
            </van-tabs>
          </div>
          <!--<div v-if="typeof innerValue=='string'">-->
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-button size="large" class="blueButton" @click="next()" id="nextStep">下一步</van-button>
    <div style="height: 20px"></div>
  </div>
</template>

<script>
  import pageTable from './pageTable';
  import {Collapse, CollapseItem} from 'vant';
  import Vue from 'vue';
  import {GenerateUUID} from '../../utils/uuidgenerator.js'

  Vue.use(Collapse).use(CollapseItem);
  export default {
    data() {
      return {
        PageData: null,
        PageDataArray: null,
        active:1,
        activeNames: [1, 2, 3],
      }
    },
    watch: {
      PageData: function (newValue, oldValue) {
        this.PageDataArray = newValue
      }
    },
    computed: {
      /*activeNames:function () {
        for (let i = 0; i < this.PageData.length; i++) {
          let dataItem = this.PageData[i];

        }
        return this.PageData;
      }*/
    },
    components: {
      pageTable
    },
    methods: {
      uuid: GenerateUUID,
      next() {
          this.$store.state.messageStep += 1
          this.$router.push({path: '/messageStep2', query: {token: uiScript.getParam('token')}})
      },
      // todo img to base64
      ImgToBase64(file, callBack) {
        var img = new Image();
        var reader = new FileReader();//读取客户端上的文件
        reader.onload = function () {
          var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
          img.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
        };
        img.onload = function () {
          //生成比例
          var width = img.width, height = img.height;
          //计算缩放比例

          //生成canvas
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          var base64 = canvas.toDataURL('image/jpeg', 0.5);
          callBack(base64);
        };
        reader.readAsDataURL(file);
      }
    },
    //在$el被替换的时候调用钩子函数
    mounted() {
      this.$store.state.messageStep = 1
      var tokenvalue = uiScript.getParam('token');
      var jidValue = tokenvalue.substr(0, tokenvalue.length - 1)
      this.$fetch('/formengineWebService/public/getConfigDataByJid?jid=' + jidValue)
        .then(rs => {
          if (rs) {
            this.PageData = rs;
          } else {
            console.error("返回数据错误")
            alert("服务器返回数据错误jid:" + jidValue)
          }
        })
        .catch(e => {
          console.log(e)
          // var tmpdata = {
          //   "不动产情况": [
          //     {
          //       "不动产单元号": ""
          //     },
          //     {
          //       "不动产坐落": "123"
          //     },
          //     {
          //       "房屋结构": "钢结构"
          //     },
          //     {
          //       "建筑面积": "123.0"
          //     },
          //     {
          //       "规划用途": "住宅"
          //     },
          //     {
          //       "合同编号": ""
          //     }
          //   ],
          //   "权利人信息": [
          //     {
          //       "权利人": [
          //         {
          //           "姓名": "456",
          //           "代理人名称": "p",
          //           "证件号码": "1234567890",
          //           "联系电话": "t",
          //           "共有情况": "单独所有",
          //           "代理人证件号码": "a",
          //           "证件种类": "身份证",
          //           "通讯地址": "w",
          //           "单位性质": "个人"
          //         },
          //         {
          //           "姓名": "123",
          //           "代理人名称": null,
          //           "证件号码": null,
          //           "联系电话": null,
          //           "共有情况": null,
          //           "代理人证件号码": null,
          //           "证件种类": null,
          //           "通讯地址": null,
          //           "单位性质": "个人"
          //         }
          //       ]
          //     }
          //   ],
          //   "义务人信息": [
          //     {
          //       "义务人": [
          //         {
          //           "姓名": "qwe",
          //           "代理人名称": null,
          //           "证件号码": null,
          //           "法人代表名称": null,
          //           "联系电话": null,
          //           "代理人证件号码": null,
          //           "证件种类": null,
          //           "通讯地址": null,
          //           "单位性质": null
          //         },
          //         {
          //           "姓名": "asd",
          //           "代理人名称": "o",
          //           "证件号码": "asdfdgfdgd",
          //           "法人代表名称": "u",
          //           "联系电话": "r",
          //           "代理人证件号码": "p",
          //           "证件种类": "身份证",
          //           "通讯地址": "w",
          //           "单位性质": "个人"
          //         }
          //       ]
          //     }
          //   ]
          // }
          // this.PageData = tmpdata;
          alert("服务器返回数据错误jid:" + jidValue)
        })
    }
  }
</script>

<style lang="less">

  .step1 {
    background: #f3f3f3;
    font-size: 16px;
    .container {
      /* 减去 上50 下60 margin:40*/
      margin: 20px auto;
      padding-bottom: 55px;
    }
    .bottom {
      position: fixed;
      bottom: 10px;
      height: 60px;
      margin-bottom: 20px
    }
    .approve_next {
      width: 690/2px;
      height: 88/2px;
      margin: 40/2px 30/2px;
      border: none;
      background: #8bbeff;
      border-radius: 44/2px;
      font-size: 36/2px;
      color: #fff;
    }
    .approve_isNext {
      background: #338cfd;
    }

  }
</style>
