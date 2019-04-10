<template>
	<!-- 个人中心首页 -->
	<div>
		<div style="position: relative; height: 150px">
			<img src="../../../public/images/wechatstatic/bg_top.png" class="img"/>
		</div>
		<transition name="fade">
			<div v-show="inited" class="row-box">
				<el-row class="home-row">
					<el-col :span="8">
						<div class="home-item" @click="open('/serviceConfirm')">
							<p class="iconfont icon-chaxun blue"></p>
							<p class="title">业务确认</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="home-item" @click="open('/personInfo')">
							<p class="iconfont icon-quxiaoyuyue red"></p>
							<p class="title">个人产权查询</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="home-item" @click="getGrantDeep">
							<p class="iconfont icon-quhao orange"></p>
							<p class="title">产权证明下载</p>
						</div>
					</el-col>
				</el-row>
				<el-row class="home-row">
					<el-col :span="8">
						<div class="home-item" @click="open('/personalSetting')">
							<p class="iconfont icon-paidui green"></p>
							<p class="title">个人设置</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="home-item" @click="open('/schq')">
							<p class="iconfont icon-jindu blue"></p>
							<p class="title">进度查询</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="home-item" @click="open('/wecq')">
							<p class="iconfont icon-wodedangxuan blue"></p>
							<p class="title">付费</p>
						</div>
					</el-col>
				</el-row>
				<el-row class="home-row">
					<el-col :span="8">
						<div class="home-item" @click="open('/wecq')">
							<p class="iconfont icon-wodedangxuan blue"></p>
							<p class="title">个人业务</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="home-item" @click="open('/poli')">
							<p class="iconfont icon-zhengce green"></p>
							<p class="title">政务资讯</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="home-item" @click="open('/spea')">
							<p class="iconfont icon-yuyue orange"></p>
							<p class="title">开发商预约</p>
						</div>
					</el-col>
				</el-row>
			</div>
		</transition>
	</div>
</template>

<script>

    const place_title = require('../../utils/place-title.js')

    export default {
        data () {
            return {
                inited: false,
                getDate: '',
                place: place_title
            }
        },
        mounted () {
            const that = this;
            setTimeout(() => {
                that.inited = true
            }, 300);
            const myDate = new Date();
            that.getDate = myDate.getFullYear();
        },
        methods: {
            open (path) {
	            this.$router.push(path);
            },
			/*
				下载个人产权证明
			 */
	        getGrantDeep() {
		        const _this = this;
		        let strJson = JSON.stringify({
			        'qlr': _this.$store.getters.getPersonCardInfo.cardName,
			        'zjhm': _this.$store.getters.getPersonCardInfo.cardCode,
			        'returnbyte': true
		        });
		        // 个人产权证明下载接口
		        var stringUrl = '/pubWeb/public/system/WeChatRemoteCheck';
		        let paramData = {
			        'strJson': strJson
		        };
		        console.log(paramData);
		        let config = { headers: { 'Content-Type': 'multipart/form-data' } };
		        _this.$post(stringUrl, paramData, config).then(rs => {
			        switch (rs.status) {
				        case '-1' || undefined:
					        alert('服务器出错');
					        break;
				        case '0':
					        alert('没有权限下载');
					        break;
				        case '1':
					        window.location.href = stringUrl + '?strJson=' + encodeURIComponent(strJson);
					        break;
			        }
		        }).catch(e => {
			        alert('服务器出错');
		        });
	        },
        },
    }
</script>

<style lang="css" scoped>
	span.title_name {
		position: absolute;
		font-size: 26px;
		font-weight: 500;
		font-family: 'STXingkai', serif;
		color: #ffffff;
		top: calc(50% - 13px);
		left: 0;
		width: 100%;
		text-align: center;
	}

	.home-footer {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.3rem;
		margin-top: 4.5rem;
	}

	.home-footer span {
		margin-left: 0.075rem;
		margin-right: 0.075rem;
	}

	body {
		margin: 0;
		padding: 0;
		font-size: 0.225rem;
	}

	.img {
		float: left;
		display: block;
		width: 100%;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}

	.fade-enter, .fade-leave-to {
		opacity: 0
	}

	.home-row .home-item {
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.home-row .home-item.last {
		border-right: 0;
	}

	.home-row .home-item .iconfont {
		padding: 0.225rem 0 0.15rem;
		text-align: center;
		font-size: 1.8rem;
	}

	.home-row .home-item .title {
		padding: 0 0 0.225rem 0;
		text-align: center;
		font-size: 0.48rem;
		color: #5e6d82;
	}

	.home-row .home-item .iconfont.blue {
		color: #409EFF;
	}

	.home-row .home-item .iconfont.green {
		color: #67C23A;
	}

	.home-row .home-item .iconfont.orange {
		color: #EB9E05;
	}

	.home-row .home-item .iconfont.red {
		color: #FA5555;
	}
</style>
