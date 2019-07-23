<template>
  <div class="container">
    <page-head title="在线申办"></page-head>
    <div class="box-body">
      <van-cell-group class="group" :title="item.groupTitle" v-for="item in list" :key="item.groupTitle">
        <van-cell v-for="(item2, index) in item.groupCells" :value="item2" :key="index"
          @click.native="groupCellClicked(item2)" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
  import Head from '../app/head.vue'
  export default {
    components: {
      'page-head': Head
    },
    data() {
      return {
        list: [{
          groupTitle: "转移登记",
          groupCells: ["建设用地使用权、宅基地使用权转移登记", "房地产（独幢、层、套、间房屋）转移登记", "存量房（二手房）转移登记"]
        },
        {
          groupTitle: "变更登记",
          groupCells: ["建设用地使用权、宅基地使用权变更登记", "房地产（独幢、层、套、间房屋）变更登记"]
        },
        {
          groupTitle: "注销登记",
          groupCells: ["不动产权利证书注销登记"]
        },
        {
          groupTitle: "更正登记",
          groupCells: ["不动产权利证书更正登记", "不动产权利证明更正登记"]
        },
        {
          groupTitle: "异议登记",
          groupCells: ["异议登记", "异议注销登记"]
        },
        {
          groupTitle: "其他登记",
          groupCells: ["不动产权属证书遗失（换证）登记", "不动产权属证明遗失（换证）登记"]
        },
        ]
      }
    },
    methods: {
      groupCellClicked: function (value) {
        console.log(value);
        this.$router.push({
          path: "/onlineApplication/bookIn"
        });
      }
    }
  }

</script>

<style scoped>
  .van-cell-group__title {
    background-color: #ffffff;
  }

  .group {
    margin-bottom: 10px;
  }
</style>