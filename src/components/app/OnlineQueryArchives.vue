<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="在线查档"></page-head>
        <div style="background: #F0F5F8;width: 100%;height: 10px;border-bottom: 1px solid #E5E5E5;"></div>
        <van-row type="flex" style="margin-top: 8px;">
            <van-col span="24" @click.native="open(datas[0].url,datas[0].name,datas[0].inter)" class="nav-col">
                <van-cell is-link :value="datas[0].name" class="nav-cell house-color">
                    <img slot="icon" :src="datas[0].iconSrc" class="van-icon van-icon--image van-cell__left-icon"/>
                </van-cell>
            </van-col>
        </van-row>
        <van-row type="flex">
            <van-col span="24" @click.native="open(datas[1].url,datas[1].name,datas[1].inter)" class="nav-col">
                <van-cell is-link :value="datas[1].name" class="nav-cell archives-color">
                    <img slot="icon" :src="datas[1].iconSrc" class="van-icon van-icon--image van-cell__left-icon"/>
                </van-cell>
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
                        iconSrc: './images/onlineQueryArchives/zhufang.png',
                        //个人无房证明页面地址
                        url: '/arcd',
                        //个人无房证明查询接口
                        inter: '/pubWeb/system/public/WeChatRemoteCheck'
                    },
                    {
                        name: '不动产登记资料查询',
                        iconSrc: './images/onlineQueryArchives/budongchan.png',
                        //不动产登记资料查询页面地址
                        url: '/arcl',
                        //个人产权信息查询接口
                        inter: '/pubWeb/public/weChatPublic/GetPersonDataInfo'
                    }
                ]
            }
        },
        methods: {
            open(url,name,inter){
                //进入人脸核身
                this.$router.push({
                    path: '/preApprovenew',
                    query: {callbackUrl: inter}
                })
            }
        },
		mounted() {
			// 后面要用到人脸识别就必须在进入功能首页这里进行配置的初始化（针对ios系统）
			this.$fetch('/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0]).then(res => {
				wx.config(res);
				console.log(res);
			});
		}
    }
</script>

<style lang="css" scoped>
	.content {
        box-sizing: border-box;
        width: 100%;
    }

    .nav-col {
        position: relative;
        box-sizing: border-box;
        padding: 8px 10px;
    }

    .nav-cell {
        height: 100px;
        width: 100%;
    }

    .house-color {
        background: url(../../../public/images/onlineQueryArchives/blue.png);
        background-size: 100% 100%;
    }

    .archives-color {
        background-image: url(../../../public/images/onlineQueryArchives/green.png);
        background-size: 100% 100%;
    }

    .nav-cell .van-cell__left-icon {
        width: 67px;
        height: 63px;
        color: #FFF;
        line-height: 63px;
        margin: 10px 5px;
    }

    .nav-cell .van-cell__value--alone {
        color: #FFF;
        text-align: right;
        line-height: 80px;
        font-size: 20px;
    }

    .nav-cell .van-cell__right-icon {
        color: #FFF;
        line-height: 80px;
        font-size: 20px;
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
