<template>
	<div class="step2">
		<div class="containerbackground">
			<div style="height: 20px"></div>
			<img src="/public/images/common/officalAccount.jpg" style="width: 120px;margin: 0 auto;display: block">
			<div style="display: block;width: 300px;margin: 0 auto;">
				<ul>
					<li><h4>步骤一：长按二维码图片，然后按照提示将图片保存到本地；</h4></li>
					<li><h4>步骤二：打开微信扫一扫功能，然后点击右上角".../相册"，选择相册并选取二维码图片进行扫码，然后按提示完成关注公众号；（已关注可忽略此步骤）</h4></li>
				</ul>
			</div>
		</div>
		<div class="step3_btn_box" v-show="!isSuccess">
			<button class="step3_fail" @click="goback">返回</button>
			<button class="step3_fail" @click="gonext">下一步</button>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        computed: {},
        methods: {
            /**
             * 返回上一步
             */
            goback () {
                this.$store.state.messageStep -= 1;
                this.$router.push({ path: '/messageApprove', query: { token: uiScript.getParam('token') } });
            },
            /**
             * 执行下一步
             */
            gonext () {
                this.$store.state.messageStep += 1;
                this.$router.push({ path: '/messageStep3', query: { token: uiScript.getParam('token') } });
            },
        },
        mounted () {
            this.$store.state.messageStep = 2;
        }
    }
</script>

<style lang="less" type="text/less" scoped>
  .step2 {
    .containerbackground{
      position: relative;
      height:320px;
      background-color:#fff;
      .p_hint{
        width:100%;
        height:14/2px;
        line-height: 28/2px;
        color:#9a9a9a;
        text-align: center;
        font-size: 14/2px;
        position: absolute;
        bottom:40/2px;
      }
    }
    .container {
      /* 减去 上50 下60 margin:40*/
      margin: 20px auto;
      padding-bottom: 55px;
    }
    .approve_next {
      width: 150px;
      height: 88/2px;
      margin: 40/2px 30/2px;
      border: none;
      background: #8bbeff;
      border-radius: 44/2px;
      font-size: 36/2px;
      color: #fff;
    }
    .approve_isNext {
      background: #338cfd;
    }
    .step3_btn_box{
      position: absolute;
      bottom:40/2px;
      left:30/2px;
      width:690/2px;
      height:88/2px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .step3_fail{
        width:322/2px;
        height:88/2px;
        border:none;
        background: linear-gradient(to right, #2db6ff , #2edbfd);
        border-radius: 44/2px;
        font-size: 36/2px;
        color:#fff;

      }
      .step3_success{
        width:690/2px;
        height:88/2px;
        border:none;
        background: linear-gradient(to right, #2db6ff , #2edbfd);
        border-radius: 44/2px;
        font-size: 36/2px;
        color:#fff;
      }
      .step3_fail:nth-child(1){
        background: #e4e4e4;
      }
    }
  }
</style>
