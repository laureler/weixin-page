<template>
  <div class="routerHeader">
    {{}}
  </div>
</template>

<script>
  import  Vue from  'vue'
  import { NavBar } from 'vant';
  Vue.use(NavBar);

  /* 导航栏菜单 导航 */
  export default {
    name:"RouterDetail",
    props: [""],
    data: function () {
      return {}
    },
    computed: {},
    methods:{

    }
  }
</script>

<style scoped>


</style>
