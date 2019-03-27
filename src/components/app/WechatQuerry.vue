<template lang="html">
	<div style="display:flex;flex-direction:column;height:100%;background: #f0f5f8">
		<page-head title="我的预约"></page-head>
    <div  v-if="inited && items.length > 0" class="content">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item class="collapse-content" v-for="(item,index) in items" :key="item.id" :name="index">
          <div slot="title">
            <div>
              <span>预约状态：</span>
              <span style="color:red">{{item.zt}}</span>
            </div>
          </div>
          <van-cell-group>
            <van-cell title="业务类型：" :value="item.cerType"></van-cell>
            <van-cell title="预约人：" :value="item.yyr"></van-cell>
            <van-cell title="预约号：" :value="item.yyh"></van-cell>
            <van-cell title="证件号码：" :value="item.zjhm"></van-cell>
            <van-cell title="预约日期：" :value="item.yyrq"></van-cell>
            <van-cell title="预约时段：" :value="item.yysd"></van-cell>
            <van-cell title="预约事项：" :value="item.yysx"></van-cell>
            <van-cell title="所在网点：" :value="item.szwd"></van-cell>
          </van-cell-group>
          <div v-if=" item.zt === '未受理' ">
            <div style="height: 40px" class=""></div>
            <van-button size="large" class="blueButton" @click="cancel(index)">取消预约</van-button>
            <div style="height: 20px"></div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

  .content{
    margin-bottom: 0.075rem;
    font-size: 0.375rem;
  }

  .collapse-content{
    margin-top: 0.2rem;
  }


</style>

<script>

	import Head from './head.vue'
  import { Dialog,Collapse, CollapseItem} from 'vant';
	import  Vue from 'vue';
	import { request } from '../../utils/http'
	import { isWx } from '../../utils/ua'

	import Cookies from 'js-cookie'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
        inited: false,
				items: [],
        activeName: 0,
        value:'',
        personalSer: [],
        developerSer: [],
        cerType: ''
      }
		},
		mounted() {
      Vue.use(Dialog).use(Collapse).use(CollapseItem)
			this.requestQuery()
		},
		methods: {
			cancel(index) {
			  let that = this
        Dialog.confirm({
          title: '提示',
          message: '确定取消本次预约吗?'
        }).then(() => {
          that.value = index
          that.cancelSure()
        }).catch(() => {

        });
			},
			cancelSure() {
				const that = this
        const openid = isWx() ? Cookies.get('openid') : ''
				const form = {
					yyr: that.items[that.value].yyr,
					yyh: that.items[that.value].yyh,
					/* qzhm : that.items[that.value].qzhm, */
					zjhm: that.items[that.value].zjhm,
					id: that.items[that.value].id,
          openid:openid
				}
				request({
					url: '/CancelYYInfoByID',
					data: { strJson: JSON.stringify(form) },
					success(response) {
						console.log(response)
						if (response.resultcode == 1 || response.resultcode == "1") {
							alert(response.resultmsg)
							that.requestQuery()
						} else {
							alert(response.resultmsg)
						}
					},
					fail(error) {
					},
				})
			},
			requestQuery() {
				const that = this
				const openid = isWx() ? Cookies.get('openid') : ''
				request({
					url: '/SearchYYInfoListByOpenId',
					data: { strJson: JSON.stringify({ openid }) },
					success(response) {
						console.log(response)
						if (response.resultcode == 1 || response.resultcode == "1") {
							that.items = []
							that.personalSer = []
							that.developerSer = []
							for (let i = 0; i < response.yyinfo.length; i++) {
								if (response.yyinfo[i].yyh) {
									that.personalSer.push({ ...response.yyinfo[i], cerType: '个人业务' })
								} else {
									that.developerSer.push({ ...response.yyinfo[i], cerType: '开发商业务' })
								}
							}
							that.items.push(...that.personalSer)
							that.items.push(...that.developerSer)
							console.log(that.items)
						}
						that.inited = true
					},
					fail(error) {
					},
				})
			},
		},
	}
</script>
