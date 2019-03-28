<template>
	<!-- 导航功能 -->
	<div>
		<div class="sliverBar"></div>
		<van-row>
			<van-col span="12" v-for="item,index in dataList">
				<router-card v-bind:context="item.text" v-bind:icon-type="item.iconUrl"
							 @click.native="visitList(item)"></router-card>
			</van-col>
		</van-row>
	</div>
</template>

<script>
    import RouterCard from '@/components/template/routerCard'

    //微信导航首页
    export default {
        name: 'routerHomePage',
        data: function () {
            return {
                dataList: []
            }
        },
        methods: {
            visitList: function (item) {
                this.$router.push({
                    path: '/routerListPage',
                    query: {
                        item: JSON.stringify(item)
                    },
                })
                // this.$store.commit("parentList")
            }
        },
        // 挂载生命周期钩子函数
        mounted: function () {
            var _this = this
            // _this.$post('http://172.16.42.126:8080/pubWeb/public/wechatRouterList').then(data=>{
            _this.$post('/pubWeb/public/wechatRouterList').then(data => {
                _this.dataList = data
            }).catch(error => {
                console.log(error)
            })
        },
        components: { RouterCard }
    }
</script>

<style scoped>
	.sliverBar {
		height: 12px;
		background-color: #f0f5f8 !important;
	}
</style>
