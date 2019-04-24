<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="在线查档"></page-head>
        <div style="background: #F0F5F8;width: 100%;height: 10px;"></div>
        <van-row type="flex">
            <van-col span="24" @click.native="open(datas[0].url,datas[0].name,datas[0].inter)" class="nav-col">
                <!-- <div class="nav-block">
                    <img :src="item.iconSrc"/>
                    <div class="title">{{item.name}}</div>
                </div> -->
                <van-cell is-link :value="datas[0].name" icon="todo-list-o" class="nav-cell house-color"/>
            </van-col>
        </van-row>
        <van-row type="flex">
            <van-col span="24" @click.native="open(datas[1].url,datas[1].name,datas[1].inter)" class="nav-col">
                <van-cell is-link :value="datas[1].name" icon="balance-list-o" class="nav-cell archives-color"/>
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
                        //个人无房证明页面地址
                        url: '/arcd',
                        //个人无房证明查询接口
                        inter: '/pubWeb/public/system//FirstHouseQuery'
                    },
                    {
                        name: '不动产登记资料查询',
                        iconSrc: './images/onlineQueryArchives/query_archives.jpg',
                        //不动产登记资料查询页面地址
                        url: '/arcl',
                        //个人产权信息查询接口
                        inter: '/pubWeb/public/weChatPublic//GetPersonDataInfo'
                    }
                ]
            }
        },
        methods: {
            open(url,name,inter){
                //进入人脸核身
                this.$router.push({
                    path: '/preApprove',
                    query: {callbackUrl: inter}
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

    /* .nav-block {
        width: 100%;
        border: 1px solid #ebedf0;
    } */

    .nav-col {
        position: relative;
        box-sizing: border-box;
        padding: 10px;
    }

    .nav-cell {
        height: 100px;
        width: 100%;
        border-radius: 5px;
    }

    .house-color {
        background: linear-gradient(to bottom right, #045BF0 , #03E5F9);
    }
    
    .archives-color {
        background: linear-gradient(to bottom right, #1BA792 , #03F994);
    }

    .nav-cell .van-cell__left-icon {
        height: 80px;
        color: #FFF;
        font-size: 80px;
        line-height: 80px;
    }

    .nav-cell .van-cell__value--alone {
        color: #FFF;
        text-align: right;
        line-height: 80px;
    }

    .nav-cell .van-cell__right-icon {
        color: #FFF;
        line-height: 80px;
    }

    .nav-block img{
        width: 100%;
        height: 120px;
    }

    .nav-block .title {
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        padding: 3px;
    }
</style>
