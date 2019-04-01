<template>
  <div class="cellBox">
    <div class="cellTitle cell-hairline">
      <span>{{title}}</span>
      <div class="cellLabel">{{label}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cellLine',
    props: ['title', 'label'],
    data: function () {
      return {
        tabKey: null
      }
    }
  }
</script>

<style scoped>
  .cellLabel {
    color:#999999;
  }
  .cellBox {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 0.266667rem 0.4rem;
    box-sizing: border-box;
    line-height: 0.64rem;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 0.373333rem;
    overflow: hidden;
    border-bottom: 1px solid #ebeef5;
  }
  [class*=cell-hairline]::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e5e5e5;
  }
</style>
