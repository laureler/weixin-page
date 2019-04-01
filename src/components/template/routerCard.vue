<template xmlns:javascript="http://www.w3.org/1999/xhtml">
  <div class="routerCard">
    <!--todo img 根据iconUrl属性来读取数据 -->
    <img src="../../../src/assets/icon/diya2x.png" onerror="javascript:this.src='../../../src/assets/icon/diya2x.png'">
    <div>{{context}}</div>
  </div>
</template>

<script>
  /* 导航栏数据列表模板 */
  export default {
    props: ["iconUrl", "context"],
    data: function () {
      return {}
    },
    computed: {
      // inputListeners: function () {
      //   var vm = this
      //   // `Object.assign` 将所有的对象合并为一个新对象
      //   return Object.assign({},
      //     // 我们从父级添加所有的监听器
      //     this.$listeners,
      //     // 然后我们添加自定义监听器，
      //     // 或覆写一些监听器的行为
      //     {
      //       // 这里确保组件配合 `v-model` 的工作
      //       input: function (event) {
      //         vm.$emit('input', event.target.value)
      //       }
      //     }
      //   )
      // }
    }

  }
</script>

<style scoped>
.routerCard{
  min-height: 100px;
  margin: 15px;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
  .routerCard img{
    display: block;
    height: 50px;
    width: 50px;
    margin: 10px auto;
  }
  .routerCard div{
    width: 100%;
    height: 30px;
    text-align: center;
    font-family: "STHeiti STXihei";
    font-weight: bold;
    font-size: 14px;
  }
</style>
