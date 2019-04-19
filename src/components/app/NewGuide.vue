<template lang="html">
	<div style="display:flex;flex-direction:column;background-color:#F0F5F8">
		<page-head title="办事指南"></page-head>
        <div class="search-div">
            <div class="s-div">
                <input v-model="searchData" type="text" class="s-input"/>
                <el-button v-on:click="query(queryData)" class="s-query" icon="el-icon-search"></el-button>
            </div>
        </div>
		<div class="contain">
			<van-cell-group>
				<cell-line @click.native="open(index)" v-for="(item,index) in datas" :title="item.title"/>
			</van-cell-group>
		</div>
	</div>
</template>

<script>

    import Head from './head.vue'
    import { request } from '../../utils/http'
    import { Toast } from 'vant'
    import cellLine from './cellLine.vue'

    export default {
        components: {
            'page-head': Head,
            'cell-line': cellLine
        },
        data () {
            return {
                // 全部数据
                datas: [],
                //查询条件
                searchData:''
            }
        },
        methods: {
            query (queryData) {
                const that = this;
                request({
                    url: '/GetTitleList',
                    data: {strJson:JSON.stringify({filter:decodeURI(that.searchData),bname:decodeURI(that.$route.query.response)})},
                    success (data) {
                        var tempData = JSON.stringify(data.noInfo).toLowerCase();
                        that.datas = JSON.parse(tempData);
                    },
                    fail (error) {
                        if(error.status == '404'){
                            Toast("找不到该接口！");
                            return;
                        }
                    },
                })
            },
            open (index) {
                var url = '';

                var sUserAgent = navigator.userAgent.toLowerCase();
                var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                var bIsAndroid = sUserAgent.match(/android/i) == "android";
                var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            
                if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
                    url = this.datas[index].pc_url;
                }else{
                    url = this.datas[index].app_url;
                }
                window.location.href = url;
            }
        },
        mounted () {
            const that = this;
            request({
                url: '/GetTitleList',
                success (data) {
                    var tempData = JSON.stringify(data.noInfo).toLowerCase();
                    that.datas = JSON.parse(tempData);
                },
                fail (error) {
                    if(error.status == '404'){
                        Toast("找不到该接口！");
                        return;
                    }
                },
            })
        },
    };
</script>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.van-cell__title {
		width: 100% !important;
	}

	.contain {
		background-color: #ffffff;
		margin-top: 1.65rem;
	}

	.paging {
		padding: 0.15rem;
	}

    .search-div {
		background: #f0f5f8;
        width: 100%;
		height: 1.7rem;
        position: fixed;
        top: 1.2rem;
        left: 0;
        z-index: 2001;
	}

	.s-query {
		margin: 0 auto;
		border: none;
		color: #6cccff;
		margin-top: -0.1rem;
		padding-left: 0.1rem;
		height: 1rem;
	}

	.s-query:focus {
		background: white;
	}

	.s-query:hover {
		background: white;
	}

	.s-div {
		padding: 0.15rem 0rem 0.15rem 0.15rem;
		display: flex;
		margin: 0.25rem 0.25rem 0.25rem 0.25rem;
		background-color: #ffffff;
		height: 1.2rem;
	}

	.s-input {
		width: 85%;
		border: none;
		font-size: 13px;
        color: #333;
		outline: none;
		border-right: 1px solid #e5e5e5;
		height: 1rem;
		margin-right: 0.31rem;
	}
</style>
