<template>
	<div class="step3">
		<div class="step3_background" v-show="!isSuccess">
			<div style="height: 20px"></div>
			<img :src="srcData" style="width: 120px;margin: 0 auto;display: block">
			<div style="display: block;width: 300px;margin: 0 auto;">
				<ul>
					<li>
						<h4>
							步骤一：长按二维码图片，然后按照提示将图片保存到本地；
						</h4>
					</li>
					<li>
						<h4>
							步骤二：进入微信公众号，在“我要办事”菜单中选择“人脸核身”，选择相册并选取二维码进行扫码，按提示完成验证；
						</h4>
					</li>
				</ul>
			</div>
		</div>
		<div class="step3_btn_box" v-show="!isSuccess">
			<button class="step3_fail" @click="goback">返回</button>
			<button class="step3_fail" @click="gonext">完成认证</button>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                srcData: ''
            }
        },
        methods: {
            //进行下一步
            gonext () {
                // todo 关闭浏览器
            },
            // 返回上一步
            goback () {
                this.$store.state.messageStep -= 1
                this.$router.push({ path: '/messageStep2', query: { token: uiScript.getParam('token') } })
                    ,            }
        }
        mounted () {
            this.$store.state.messageStep = 3
            var tokenValue = uiScript.getParam('token')
            var imgurl = '/formengineWebService/public/convertContentToQrcode?qrcodeType=true&content=' + tokenValue
            this.$fetch(imgurl)
                .then(rs => {
                    this.srcData = rs
                }).catch(e => {
                alert('服务端错误，请检查是否跳过登陆')
            })
        }
    }
</script>

<style scoped lang="less">
	.step3 {

		.step3_background {
			position: relative;
			height: 320px;
			background-color: #fff;
			.step3_result {
				width: 100%;
				height: 36/2px;
				line-height: 36/2px;
				color: #338CFD;
				text-align: center;
				font-size: 36/2px;
				position: absolute;
				bottom: 80/2px;
				font-weight: 550;
			}
			.step3_hint {
				width: 100%;
				height: 14/2px;
				line-height: 28/2px;
				color: #9a9a9a;
				text-align: center;
				font-size: 14/2px;
				position: absolute;
				bottom: 40/2px;
			}
		}

		.step3_background_success {
			background-image: url('../../../public/images/approve/icon_chenggong@2x.png');
		}

		.step3_btn_box {
			position: absolute;
			bottom: 40/2px;
			left: 30/2px;
			width: 690/2px;
			height: 88/2px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.step3_fail {
				width: 322/2px;
				height: 88/2px;
				border: none;
				background: linear-gradient(to right, #2db6ff, #2edbfd);
				border-radius: 44/2px;
				font-size: 36/2px;
				color: #fff;
			}

			.step3_success {
				width: 690/2px;
				height: 88/2px;
				border: none;
				background: linear-gradient(to right, #2db6ff, #2edbfd);
				border-radius: 44/2px;
				font-size: 36/2px;
				color: #fff;
			}

			.step3_fail:nth-child(1) {
				background: #e4e4e4;
			}
		}
	}
</style>
