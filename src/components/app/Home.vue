<template>
	<div>
		<!--<img src="../../../public/images/wechatstatic/bg_top1.png" class="img"/>-->
		<div style="position: relative; height: 150px">
			<img src="../../../public/images/wechatstatic/bg_top.png" class="img"/>
			<span class="title_name">{{getTitleValue()}}</span>
		</div>
		<transition name="fade">
			<div v-show="inited" class="row-box">
				<van-row class="home-row">
					<van-col :span="8">
						<div class="home-item" @click="open('/appl')">
							<p class="iconfont icon-yuyue green"></p>
							<p class="title">在线预约</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item" @click="open('/resq')">
							<p class="iconfont icon-chaxun blue"></p>
							<p class="title">预约查询</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item last" @click="open('/canr')">
							<p class="iconfont icon-quxiaoyuyue red"></p>
							<p class="title">取消预约</p>
						</div>
					</van-col>
				</van-row>
				<van-row class="home-row">
					<van-col :span="8">
						<div class="home-item" @click="open('/wtnum')">
							<p class="iconfont icon-quhao orange"></p>
							<p class="title">排队取号</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item" @click="open('/qupr')">
							<p class="iconfont icon-paidui green"></p>
							<p class="title">排队进度</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item last" @click="open('/schq')">
							<p class="iconfont icon-jindu blue"></p>
							<p class="title">进度查询</p>
						</div>
					</van-col>
				</van-row>
				<van-row class="home-row">
					<van-col :span="8">
						<div class="home-item" @click="open('/wecq')">
							<p class="iconfont icon-wodedangxuan blue"></p>
							<p class="title">我的预约</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item" @click="open('/poli')">
							<p class="iconfont icon-zhengce green"></p>
							<p class="title">政务资讯</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item" @click="open('/spea')">
							<p class="iconfont icon-yuyue orange"></p>
							<p class="title">开发商预约</p>
						</div>
					</van-col>
				</van-row>
				<van-row class="home-row">
					<van-col :span="8">
						<div class="home-item" @click="open('/routerHomePage')">
							<p class="iconfont icon-yuyue orange"></p>
							<p class="title">导航功能</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item" @click="open('/personalCenter')">
							<p class="iconfont icon-yuyue orange"></p>
							<p class="title">在线查档</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item" @click="open('/oqarc')">
							<p class="iconfont icon-yuyue orange"></p>
							<p class="title">在线查档</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item last" @click="open('/newschq')">
							<p class="iconfont icon-jindu blue"></p>
							<p class="title">进度查询</p>
						</div>
					</van-col>
					<van-col :span="8">
						<div class="home-item" @click="open('/onlineApplication')">
							<p class="iconfont icon-yuyue orange"></p>
							<p class="title">在线申办</p>
						</div>
					</van-col>
					<van-col :span="8">
							<div class="home-item last" @click="open('/myApplications')">
								<p class="iconfont icon-yuyue orange"></p>
								<p class="title">我的申办</p>
							</div>
						</van-col>
					<van-col :span="8">
							<div class="home-item last" @click="open('/faceVerify')">
								<p class="iconfont icon-yuyue orange"></p>
								<p class="title">开启人脸识别</p>
							</div>
					</van-col>
					<van-col :span="8">
							<div class="home-item last" @click="open('/certificateCheck')">
								<p class="iconfont icon-yuyue orange"></p>
								<p class="title">证书查验</p>
							</div>
					</van-col>
				</van-row>
			</div>
		</transition>
		<footer v-show="inited" class="home-footer">
			<span>&copy;</span>
			{{getDate}}
			<span>{{place}}</span>
		</footer>
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
            const that = this
            setTimeout(() => {
                that.inited = true
            }, 300)
            const myDate = new Date()
            that.getDate = myDate.getFullYear()
        },
        methods: {
            open (path) {
                this.$router.push(path)
            },
            // 轮询公众号名称
            getTitleValue () {
                var newVar = window.titleValue === undefined ? '不动产登记中心' : window.titleValue
                var timeNumber = setInterval(function () {
                    // flash data
                    if (newVar !== '不动产登记中心') {
                        clearInterval(timeNumber)
                    } else {
                        newVar = window.titleValue === undefined ? '不动产登记中心' : window.titleValue
                    }
                }, 300)
                return newVar
            }
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
