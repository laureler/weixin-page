<template>
  <div >
    <page-head :title="title"></page-head>
    <div class="title">您的个人不动产信息查询结果如下</div>
    <div id="context">
      <div v-if="!isSuccess" class="title">{{resultmsg}}</div>
      <div v-else class="content">
        <table class="info" v-for="info in infos">
          <tbody>
          <tr>
            <td>权利人名称:</td>
            <td>{{info.qlrmc}}</td>
          </tr>
          <tr>
            <td>证件号码:</td>
            <td>{{info.zjhm}}</td>
          </tr>
          <tr>
            <td>不动产坐落:</td>
            <td>{{info.zl}}</td>
          </tr>
          <tr>
            <td>不动产单元号:</td>
            <td>{{info.bdcdyh}}</td>
          </tr>
          <tr>
            <td>不动产权证号:</td>
            <td>{{info.cqzh}}</td>
          </tr>
          <tr>
            <td>共有方式:</td>
            <td>{{info.gyfs}}</td>
          </tr>
          <tr>
            <td>面积:</td>
            <td>{{info.mj}}</td>
          </tr>
          <tr>
            <td>用途:</td>
            <td>{{info.yt}}</td>
          </tr>
          <tr>
            <td>登记状态:</td>
            <td>{{info.fwzt}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import header from './../app/head'
  import { request } from '../../utils/http'
  import { watermark } from '../../utils/waterLog'
    export default {
      name: "person-info",
      data(){
        return{
          resultmsg:'',
          // 默认没有成功获取数据
          isSuccess:false,
          //存储返回 查询信息 数组
          infos:[],
          title:'信息查询'
        }
      },
      components:{'page-head':header},
      mounted(){
        console.log('enter personInfo:'+this.$store.state.cardCode+":"+this.$store.state.cardName)
        /*let param = {
          'qlr': this.$store.state.cardCode,
          'zjhm': this.$store.state.cardName
        };*/
        // todo 若store没有经过 commit cardCode 也就不会有这个属性值 在逻辑不确定的情况下，可能会出现空值的问题。
        // todo 在此改为参数了 但是name放在最后面 需要修改。
        let _this = this;
        let param = {
          'qlr': this.$route.query.name,
          'zjhm':this.$route.query.id
        };
        request({
          url: '/GetPersonDataInfo',
          data: { strJson: JSON.stringify(param) },
          success(response) {
            if(response) {
              // result 查询信息存在的时候
              if(response.resultcode===1 || response.resultcode==='1'){
                _this.isSuccess = true;
                _this.infos = response.result || '';
                watermark(null,_this.infos[0].mark);
              }else{
                _this.isSuccess = false;
                _this.resultmsg = response.resultmsg;
              }
            }
          },
          fail(err) {
            console.log(err)
            // 模拟数据
            // _this.isSuccess = true;
            // _this.infos = [
            //   {
            //     "qlrmc": "黎卓荣、黎燕",
            //     "zjhm": "442827196801011231、441227197002041224",
            //     "gyfs": "单独所有",
            //     "zl": "云浮市市区育华路与龙华路交汇处第七层701号房",
            //     "bdcdyh": "44530200125358550304000778",
            //     "cqzh": "云0000027232",
            //     "mj": "130.12平方米",
            //     "yt": "住宅",
            //     "fwzt": "抵押"
            //   }
            // ];
          },
        })
      }
    }
</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 15px;
    padding: 2.5px;
    margin: 10px 0 15px 0;
  }

  .content {
    padding: 10px;
  }

  .info {
    font-size: 13px;
    margin-bottom: 15px;
    padding: 10px;
    display: block;
    border: 0.5px solid #dad7d7;
    border-radius: 2.5px;
    box-shadow: 0px 0px 5px #9e9d9d;
  }

  .info td {
    padding: 5px 0;
  }

  .info td:nth-child(1) {
    text-align: right;
    width: 90px;
  }

  .info td:nth-child(2) {
    padding-left: 10px
  }
</style>
