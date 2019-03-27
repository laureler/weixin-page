<template xmlns:javascript="http://www.w3.org/1999/xhtml">
  <div class="routerHeader">
    <van-nav-bar
      :title="headerTitle"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="wap-home" slot="right"  style="font-size: 20px;color: #252525;"/>
      <van-icon name="arrow-left" slot="left"  style="font-size: 20px;color: #252525;"/>
    </van-nav-bar>
  </div>
</template>

<script>
  import  Vue from  'vue'
  import { NavBar } from 'vant';
  Vue.use(NavBar);

  /* 导航栏菜单 导航 */
  export default {
    name:"RouterHeader",
    props: ["headerTitle"],
    data: function () {
      return {}
    },
    computed: {},
    methods:{
      onClickLeft() {
        // 尝试着插入一个 list返回的处理结果
        if(true){

          var parentList = this.getParentList();

          if(!parentList){
            this.$router.back()
          }
        }

      },
      /**
       *尝试去返回上一个节点数据
       *  若有上一个节点数据，则切换到上一个节点，并且return
       *  若没有上一个节点数据 则不作任何处理 交由下一步路由返回跳转
       */
      getParentList(){
        // 是否拥有list组件 0 代表默认情况 1代表list组件 2代表detail详细组件
        var status = 0
        var tempComponents = null

        for (var i = 0; i < this.$parent.$children.length; i++) {
          var $child = this.$parent.$children[i];
          // if($child.$options.name == "routerList"){
          //
          // }
          if($child.$options.name == "routerList"){
            status = 1;
          }
          if($child.$options.name == "van-row"){
            tempComponents
            status = 2;
          }
        }
        if(status >=1){
          if(status == 1){
            var id = this.$parent.dataList[0].id;
            var allData = this.$parent.allData
          }
          if(status == 2){
            /*var id = this.$parent.$data.activeid;
            var allData = this.$store.state.allData*/
            this.$parent.isListPage = true
            this.$parent.dataTitle = this.$parent.dataTitle_bak
            return true;
          }
          var arrayInLoop = this.getArrayInLoop(id,allData,allData,1);
          if(arrayInLoop == undefined || arrayInLoop.length == 0 || arrayInLoop == false){
            console.log("未找到匹配父类节点");
            return false;
          }else{
            if(status == 2){

            }else {
              this.$parent.$data.dataList = arrayInLoop
            }
            return true
          }
        }
        else {
          return false;
        }

      },
      /**
       * 递归查找当前 数据列表中 符合id的父类数组
       * @param id
       * @param allData
       * @returns {*} 如果找不到 返回空数组
       */
      getArrayInLoop(id, allData, parentData, countNumber) {
        for (var i = 0; i < allData.length; i++) {
          if (countNumber > 2) {
            parentData = parentData[i].children
          }
          var tempId = allData[i].id;
          if (id == tempId && countNumber == 1) {
            return false
          }
          if (id == tempId && countNumber != 1) {
            return parentData
          } else {
            return this.getArrayInLoop(id, allData[i].children, parentData, ++countNumber)
          }
        }
        return false
      },
      // 右侧首页按钮
      onClickRight() {
      this.$router.push({
        path:"/routerHomePage"
      })
      }
    }
  }
</script>

<style scoped>
.routerHeader{
  padding-bottom: 12px;
  background-color: #f0f5f8 !important;
  font-family: "STHeiti STXihei";
  font-weight: bold;
  font-size: 14px;
}

</style>
