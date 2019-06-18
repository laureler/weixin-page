<template lang="html">
	<div class="archive-detail">
		<page-head :title="title"></page-head>
		<preview-pdf :obj="base64Obj" :showBtn="true"></preview-pdf>
    </div>
</template>

<script>
    import Head from './head.vue'
    import { Toast } from 'vant'
    import { request } from '../../utils/http.js'

    import previewPDF from '../../utils/pdf/previewPDF'

    export default {
        components: {
            'page-head': Head,
			'preview-pdf': previewPDF
        },
        data () {
            return {
                base64Obj:'',
                title:'',	// 头部标题
                inter: '',	// 住房证明和不动产登记资料查询结果的PDF文件查询接口
                filter: {}	// 查询条件
            }
        },
        created(){
            this.title = this.$route.query.title;
            this.inter = this.$route.query.inter;
            this.filter = this.$route.query.filter;
        },
	    watch: {
		    $route(to, from ){
			    console.log( to , from )
		    }
	    },
        mounted(){
            const that = this;
            request({
                url: that.inter,
                data: that.filter,
                success(data){
	                that.base64Obj = 'data:application/pdf;base64,' + data.cqxx;
                },
                fail(error){
                    if(Number(error.status) === 404){
                        Toast("找不到该接口！");
                        return;
                    }
                }
            })
        }
    }
</script>

<style lang="css" scoped>
</style>
