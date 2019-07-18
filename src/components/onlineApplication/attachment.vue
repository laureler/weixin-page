<template>
	<div class="container">
		<page-head title="上传附件材料"></page-head>
		<div class="body-box">
			<div class="attachment-item">
				<div class="item-title">
					申请人（代理人）身份证明
				</div>
				<div class="item-content">
					<div>必须提供：是</div>
					<div>附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="item in 5"></div>
					</div>
				</div>
			</div>
		</div>

		<div style="height: 50px;"></div>
		<van-button size="large" type="info" class="bottom-button" @click.native="nextStep()">下一步</van-button>
	</div>
</template>

<script>
	import Head from '../app/head.vue';
	export default {
		components: {
			'page-head': Head
		},
		methods: {
			nextStep: function () {
				this.$router.push({
					path: '/onlineApplication/ems'
				});
			}
		}
	}

</script>

<style scoped>
	.container {
		font-size: .4rem;
	}

	.body-box {
		padding: 0 10px;
	}

	.flex-box {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
	}

	.attachment {
		height: 35vw;
		width: 33.3%;
		background-color: red;
	}

	.bottom-button {
		position: fixed;
		bottom: 0;
		border: none;
		border-radius: 0;
		background: -webkit-gradient(linear, left top, right top, from(#2db6ff), to(#2edbfd)) !important;
		background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	}

</style>
