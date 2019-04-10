<template>
  <div>
    <router-header :header-title="dataTitle"></router-header>
    <div v-if="isListPage" >
      <keep-alive>
      <router-list :data-list="dataList" :allData="allData" v-on:click-cell="clickCell"
                   v-on:click-cell-text="clickCellText"></router-list>
      </keep-alive>
    </div>
    <div v-else>
      <van-row type="flex" justify="center" style="margin-top: 30px">
        <van-col span="20">
          <div v-html="responseHtml"></div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import { Toast} from 'vant';
  import {request} from '../../utils/http'
  import RouterList from "@/components/template/routerList";
  import RouterHeader from "@/components/template/routerHeader";

  /*
  * 微信导航 列表页面
  * */

  export default {

    name: "routerListPage",
    data: function () {
      return {
        isListPage:true,
        dataList: [],
        allData:[],
        dataTitle: "",
        dataTitle_bak :"",
        businessItem: null,
        responseHtml:"",
      };
    },
    methods: {
      clickCell:function(item){
        if(item.children == undefined || item.children.length == 0){
          Toast("当前节点没有子节点！")
          return
        }
        this.dataList  = item.children;
      },
      clickCellText:function (item) {
        // 当前item节点的点击事件 需要展示具体的页面逻辑（url/data)?
        var _this = this

        request({
          url: '/pubWeb/public/getDetailHtmlById',
          data: {
            itemId:item.id,
          },
          success(response) {
            _this.dataTitle = item.text;
            _this.isListPage = false;
            _this.responseHtml = response.detailHTML
          },
          fail(error) {
            _this.dataTitle = item.text;
            _this.isListPage = false;
            _this.responseHtml = `<div>错误：服务端没有数据</di>`
          }
        })
      }
    },
    components: {
      RouterHeader,
      RouterList
    },
    mounted: function () {
      var _this = this;
      var parsedItem = JSON.parse(_this.$route.query.item);
      let config = {headers: {'Content-Type': 'multipart/form-data'}};
      var formData = new FormData();
      formData.append("parentId",parsedItem.id)
      _this.$post('/pubWeb/public/wechatRouterListById',formData,config)
        .then(response=>{
          if(_this.$route.query.item == undefined){
            var activeItemIdStr =  _this.$route.query.activeItemId ||""
            var activeItemId = activeItemIdStr==""? undefined:JSON.parse(activeItemIdStr);
            return;
          }
          var businessItem = JSON.parse(_this.$route.query.item);
          _this.businessItem = businessItem
          _this.dataTitle = businessItem.text
          _this.dataTitle_bak = businessItem.text
          _this.dataList = response
          _this.allData = _this.dataList;
          _this.$store.state.allData = _this.allData;
        })
        .catch(error=>{
        console.log(error);
      })
    }
  }
</script>

<style scoped>

</style>
