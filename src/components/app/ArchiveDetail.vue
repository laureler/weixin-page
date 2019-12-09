<template lang="html">
	<div class="archive-detail">
		<page-head :title="title"></page-head>
		<preview-pdf :obj="obj" :showBtn="showBtn"></preview-pdf>
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
                obj:'',
                title:'',	// 头部标题
                inter: '',	// 住房证明和不动产登记资料查询结果的PDF文件查询接口
                filter: {},	// 查询条件

	            showBtn: false,
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
            let that = this;
            if (this.title === '住房证明查询') {
            	// wechatRemoteCheck
				this.$fetch(that.inter)
		            .then(response=>{
		            	if (response.resultcode == 1  || response.resultcode == '1'){
				            that.obj = response.cqxx;
				            that.showBtn = true;
			            }else {
				            Toast(response.resultmsg);
			            }
		            }).catch(e=>{
		            	Toast("接口服务异常！")
	            })
			} else {
				let params = '?strJson=' + encodeURIComponent(this.filter.strJson);
				this.$fetch('/pubWeb/system/public/getArchiveDataInfo'  + params)
						.then(response => {
							if (Number(response.resultcode) === 1) {
								that.obj = response.cqxx;
								that.showBtn = true;
							} else {
								Toast(response.resultmsg);
							}
						})
						.catch(error => {
							Toast("接口访问异常！");
							console.log(error);
							if(Number(error.status) === 404){
								Toast("找不到该接口！");
								return;
							}
						});
			}
        }
    }
</script>

<style lang="css" scoped>
</style>
