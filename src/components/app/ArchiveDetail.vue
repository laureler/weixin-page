<template lang="html">
	<div style="display:flex;flex-direction:column;height:100%;">
		<page-head :title="title"></page-head>
        <div class="show-pdf">
            <iframe :src="cqxx" class="pdf-content"></iframe>
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
                cqxx:'',
                //头部标题
                title:'',
                //住房证明和不动产登记资料查询结果的PDF文件查询接口
                inter: '',
                //查询条件
                filter: {}
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
                    that.cqxx = data.cqxx;
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
	.show-pdf {
        width: 100%;
        height: calc(100% - 1.2rem);
    }

    .pdf-content {
        width:100%;
        height:100%;
        display:block;
        border: none;
    }
</style>
