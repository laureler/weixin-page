<template>
  <div class="approve">
    <div style="height: 50px;margin: 10px">
      <sg-step :title="title" :active="active" class="approve_step"></sg-step>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  import sgStep from '../sgStep'

  export default {
    // 当前使用的组件
    components: {
      sgStep
    },
    data() {
      return {
        title: ['确认信息', '关注公众号', '人脸核身']
      }
    },
    // 计算属性 返回active数据来使用
    computed: {
      active() {
        return this.$store.state.messageStep;
      }
    }
  }


</script>

<style scoped lang="less">
  .approve {
    width: 100%;
    height: calc(~'100%');
    padding-top: 10px;
    background: #f3f3f3;

    .approve_step {
      margin-bottom: 20px;
    }

  }
</style>
