<template>
	<div class="container">
		<page-head title="权籍调查申请"></page-head>
		<div class="body-box">
			<div class="success-box"
				style="padding-top: 30px; border: 1px solid #ccc; border-radius: 5px; margin: .2rem;">
				<img src="../../../assets/images/online-application/submit.png"
					style="width: 1.2rem; display: block; margin: 20px auto;">
				<div class="success-text"
					style="font-size: .45rem; color: #00b957; font-weight: bolder; text-align: center;">您的申请已提交</div>
				<div class="application">申办事项：权籍调查申请</div>
				<div class="application-num">申办编号：{{ jid }}</div>
				<div class="tips">
					提示：可以在个人中心-我的申办中查看申办信息。
				</div>
			</div>
			<div class="buttons">
				<van-button class="success-btn" plain size="normal" type="default">查看申请书</van-button>
				<van-button class="success-btn" plain size="normal" type="default" @click="finishClicked">完成
				</van-button>
			</div>
		</div>
	</div>

</template>

<script>
	import Head from '../../app/head.vue';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				jid: sessionStorage.getItem('jid')
			}
		},
		methods: {
			finishClicked: function () {
				sessionStorage.removeItem('formdata');
				sessionStorage.removeItem('business');
				sessionStorage.removeItem('taskId');
				this.$router.push('/onlineApplication');
			}
		}
	}

</script>

<style scoped>
	.success-box {
		font-size: .4rem;
	}

	.application {
		margin-top: 10px;
	}

	.application,
	.application-num,
	.tips {
		padding: 5px 10px;
		line-height: 2;
		color: #666666;
	}

	.tips {
		font-size: .35rem;
		padding: 10px;
		color: #999999;
		background-color: #F5F5F5;
	}

	.buttons {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		margin-top: 40px;
	}

	.buttons .success-btn {
		width: 45%;
		height: 1.3rem;
		border-radius: 5px;
	}

</style>
