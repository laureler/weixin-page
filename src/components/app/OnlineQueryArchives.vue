<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="在线查档"></page-head>
        <van-row gutter="20">
            <van-col span="12" v-for="item in datas" @click.native="open(item.url)">
                <div class="nav-block">
                    <img :src="item.iconSrc"/>
                    <div class="title">{{item.name}}</div>
                </div>
            </van-col>
        </van-row>
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
                datas:[
                    {
                        name: '住房证明',
                        iconSrc: './images/onlineQueryArchives/house_prove.jpg',
                        url: ''
                    },
                    {
                        name: '不动产登记资料查询',
                        iconSrc: './images/onlineQueryArchives/query_archives.jpg',
                        url: '/arcl'
                    }
                ]
            }
        },
        methods: {
            open(url){
                this.$router.push({
                    path: url
                })
            }
            
        }
    }
</script>

<style lang="css" scoped>
	.content {
        box-sizing: border-box;
        width: 100%;
    }

    .nav-block {
        width: 90%;
        /* height: 100px; */
        border: 1px solid #ebedf0;
        margin: 10px;
    }

    .nav-block img{
        width: 100%;
        height: 100px;
    }

    .nav-block .title {
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        padding: 3px;
    }
</style>
