<template>
  <div>
    <!--当前数据的子节点没有子节点了-->
    <div v-if="childHasChild">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item  :name="index" v-for="item,index in lists" >
          <div slot="title">
            <div style="display: flex">
              <img :src="item.attributes==undefined?'':item.attributes.iconUrl" class="routerListIcon"
                   onerror="javascript:this.src='/public/img/diya2x.cc0f8da.png'">
              {{item.text}}
            </div>
          </div>
          <van-cell-group>
            <van-cell v-for="(itemChild,indexChild) in item.children" right value="" @click="$emit('click-cell-text',itemChild)">
              <template slot="icon">
                <img :src="itemChild.attributes== undefined?'':itemChild.attributes.iconUrl" class="routerListIcon routerListIconLevel2"
                     onerror="javascript:this.src='/public/img/diya2x.cc0f8da.png'">
              </template>
              <template slot="title">
                <span class="routerListSpan">{{itemChild.text}}</span>
              </template>

            </van-cell>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div v-else>
      <van-cell-group>
        <van-cell v-for="(itemChild,indexChild) in lists" right value="" @click="$emit('click-cell',itemChild)">
          <template slot="icon">
            <img :src="itemChild.attributes==undefined?'':itemChild.attributes.iconUrl" class="routerListIcon"
                 onerror="javascript:this.src='/public/img/diya2x.cc0f8da.png'">
          </template>
          <template slot="title">
            <span class="routerListSpan">{{itemChild.text}}</span>
          </template>
        </van-cell>
      </van-cell-group>

    </div>
  </div>
</template>

<script>
  import {Cell, CellGroup} from 'vant';
  import Vue from 'vue';
  import {Collapse, CollapseItem} from 'vant';

  Vue.use(Collapse).use(CollapseItem);

  Vue.use(Cell).use(CellGroup);
  import RouterHeader from './routerHeader'
  /* 导航栏数据列表模板 */
  export default {
    name:"routerList",
    props: ['dataList','allData'],
    data: function () {
      return {
        activeNames: ['1'],
      }
    },

    methods:{

    },
    computed: {
      /**
       * 判断是否 子节点拥有子节点
       */
      childHasChild:function(){
        try {
          var st = this.dataList[0].children[0].children == undefined || this.dataList[0].children[0].children.length == 0
        } catch (e) {
          return false
        }
        return st;
      },
      lists:function () {
        return this.dataList;
      }
    },
    mounted:function () {

    },
    components: {RouterHeader},
  }
</script>

<style scoped>
  .routerListSpan {
    line-height: 100%;
  }

  .routerListIcon {
    height: 20px;
    margin: 2px 10px;
  }
  .routerListIconLevel2{
      margin-left: 30px;
  }
</style>
