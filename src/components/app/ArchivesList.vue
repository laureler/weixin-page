<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head :title="title"></page-head>
        <div v-show="!isShow" style="font-size:0.42rem;color:#999999;margin-left: 0.5rem">{{resultmsg}}</div>
		<div v-show="isShow" class="container" v-for="result in results" :key="result.id">
			<div>权利人：{{result.qlrmc}}</div>
			<div>
                <div style="width:78%;white-space:wrap;">坐落：{{result.zl}}</div>
                <van-button slot="button" size="small" plain type="danger" @click="queryArchives(result.rid)" class="query-btn">查档</van-button>
            </div>
			<div>面积：{{result.mj}}</div>
		</div>
    </div>
</template>

<script>
    import Head from './head.vue'
    import { Toast } from 'vant'
    import { request } from '../../utils/http.js'

    export default {
        components: {
            'page-head': Head
        },
        data () {
            return {
                isShow:false,
                results:[],
                resultmsg: '未查询到结果',
                title: '',
                //查询条件
                filter: {}, 
                //档案查询接口
                archiveInter: '/GetArchiveDataInfo'
            }
        },
        methods: {
            queryArchives(rid){
                this.$router.push({
                    path: '/arcd',
                    query: {filter: {strJson: JSON.stringify({rid: rid})},title:this.title + '结果',inter: this.archiveInter}
                });
            }
        },
        created(){
            this.title = this.$route.query.title;
            this.inter = this.$route.query.inter;
            this.filter = this.$route.query.filter;
        },
        mounted(){
            const that = this;
            request({
                url: that.inter,
                data: that.filter,
                success(data){
                    if (Number(data.resultcode) === 1) {
                        that.isShow = !that.isShow;
                        that.results = data.result;
                    } else {
                        that.isShow = false;
                    }
                    that.results = data.result;
                },
                fail(error){
                    if(error.status == '404'){
                        Toast("找不到该接口！");
                        return;
                    }
                }
            });
        }
    }
</script>

<style lang="css" scoped>
	.container {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.15rem;
		font-size: 0.375rem;
		padding-top: 0.15rem;
		padding-left: 0.45rem;
		padding-bottom: 0.3rem;
	}

    .query-btn{
        float: right;
        right: 10px;
        bottom: 20px;
    }
</style>
