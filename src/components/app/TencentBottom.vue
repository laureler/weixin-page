<template>
  <div>
    <img :style="{zIndex: zindex}" src="../../../public/images/approve/face_checkout_page_bottom.png" class="image_bottom">
  </div>
</template>

<script>
    export default {
      props:['type'],
      data:function(){
        return {}
      },
      computed:{
        //通过聚焦修改zindex的值控制显示隐藏
        zindex:function () {
          return this.type === true ? '1' : '-1'
        }
      },
    }
</script>

<style scoped>
  .image_bottom{
    height:30px;
    position: absolute;
    bottom: 20px;
    margin: auto;
    left: 0;
    right: 0;
    display: block;
  }
</style>
