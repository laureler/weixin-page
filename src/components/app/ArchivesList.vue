<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="不动产登记资料查询"></page-head>
        <div v-show="!isShow" style="font-size:0.42rem;color:#999999;margin-left: 0.5rem">{{resultmsg}}</div>
		<div v-show="isShow" class="container" v-for="result in results" :key="result.id">
			<div>收件编号：{{result.jid}}</div>
			<div>业务类型：{{result.jtitle}}</div>
			<div>房地坐落：{{result.zl}}</div>
			<div class="redColor">业务状态：{{result.ywjd}}</div>
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
                results:[]
                
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="css" scoped>
	
</style>
