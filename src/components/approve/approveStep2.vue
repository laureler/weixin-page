<template>
	<div class="step3">
		<page-head title="人脸核身"></page-head>
		<div class="space_between"></div>
		<div v-show="isSuccess === 0">
			<div class="step3fail">
				<p class="step3result">人脸识别未成功</p>
			</div>
			<div class="space_between"></div>
			<div class="step3btn">
				<div class="btnside"></div>
				<van-button size="large" class="blueButton" @click="reApprove">继续人脸识别登录</van-button>
			</div>
		</div>
		<div v-show="isSuccess === 1">
			<div class="step3success">
				<p class="step3result">人脸识别成功</p>
			</div>
			<div class="space_between"></div>
			<div class="step3btn">
				<div class="btnside"></div>
				<van-button size="large" class="blueButton" @click="complete">确定</van-button>
			</div>
		</div>

	</div>
</template>

<script>

    import Head from '../app/head.vue'
    import { Icon } from 'vant'
    import Vue from 'vue'
    Vue.use(Icon)

    export default {
        components: {
            'page-head': Head,
        },
        data () {
            return {
                isSuccess: 0
            }
        },
        methods: {
            reApprove () {
                this.$router.push({ path: '/approve' })
            },
            complete () {
                if (this.$store.callbackUrl == undefined) {
                    //关闭当前浏览器页面
                    wx.closeWindow()
                } else {
                    //若没有验证成功
                    if (isSuccess == false) {
                        //关闭当前浏览器页面
                        wx.closeWindow()
                    }
                }
            }
        },
        mounted () {
            //todo 接口需要调试，需要返回整数，0表示失败，1表示成功
            this.isSuccess = this.$route.query.isSuccess == undefined ? 0 : this.$route.query.isSuccess
            // 只有在 personInfo的时候才会有-10的效果
            if (this.isSuccess == -10) {
                var cardCode = this.$route.query.cardCode
                var username = this.$route.query.username
                this.$router.push({
                    path: '/personInfo', query: { id: cardCode, name: username }
                })
                // window.location.href = this.$store.state.callbackUrl+`?id=${cardCode}&name=${username}`;
            }
        }
    }
</script>

<style lang="less" scoped>
	.space_between {
		background-color: #eff7f7;
		height: 8px;
		margin: 0px;
	}

	.step3 {
		height: 100%;
		background: #f0f5f8;
	}

	.step3fail {
		height: 5.43rem;
		background-image: url('../../../public/images/approve/icon_step3fail.png');
		background-repeat: no-repeat;
		background-color: white;
		background-position: center 0.9rem;
		background-size: 100px;
	}

	.step3result {
		width: 100%;
		height: 0.48rem;
		line-height: 0.48rem;
		text-align: center;
		font-size: 0.48rem;
		position: relative;
		padding-top: 4.4rem;
		font-weight: bold;
	}

	.step3btn {
		height: 100vh;
		background: white;
	}

	.btnside {
		height: 1.2rem;
	}

	.blueButton {
		display: block !important;
		border: none;
		background: linear-gradient(to right, #2db6ff, #2edbfd);
		width: 95% !important;
		margin: 0 auto;
		display: block;
		color: #ffffff !important;
		font-weight: bold;
		letter-spacing: 2px;
		border-radius: 0.15rem;
		/*box-shadow: 0rem 0.18rem #caeeff;*/
	}

	.step3success {
		height: 5.43rem;
		background-image: url('../../../public/images/approve/icon_step3success.png');
		background-repeat: no-repeat;
		background-color: white;
		background-position: center 0.9rem;
		background-size: 2.4rem;
	}
</style>
