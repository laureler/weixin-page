<template>
	<div class="container">
		<page-head title="上传附件材料"></page-head>
		<div class="body-box">
			<div class="attachment-item">
				<div class="item-title">
					申请人（代理人）身份证明
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：是</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="item in imgs">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item + ')'}">
								<img class="attachment-del" src="../../assets/images/online-application/delete.png" alt="">
							</div>
						</div>
					</div>
				</div>
				<van-button plain hairline type="default">上传</van-button>
				<div class="triangle"></div>
				<div class="num">1</div>
			</div>
			<div class="attachment-item">
					<div class="item-title">
						申请人（代理人）身份证明
					</div>
					<div class="item-content">
						<div class="content-div">必须提供：是</div>
						<div class="content-div">附件内容：</div>
						<div class="attachments flex-box">
							<div class="attachment" v-for="item in imgs">
								<div class="attachment-img" :style="{backgroundImage:'url(' + item + ')'}">
									<img class="attachment-del" src="../../assets/images/online-application/delete.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<van-button plain hairline type="default">上传</van-button>
					<div class="triangle"></div>
					<div class="num">2</div>
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
		data() {
			return {
				imgs: [
					"http://image.biaobaiju.com/uploads/20181018/12/1539838505-IxUSeNJAOc.jpg",
					"http://www.caisheng.net/UploadFiles/img_0_691308372_1185552238_27.jpg",
					"http://imgs.sgss8.com/20170216/1858535962.jpg",
					"http://www.feizl.com/upload2007/2015_07/15071001566967.jpg",
					"http://img3.duitang.com/uploads/item/201605/12/20160512000752_dmAhE.thumb.700_0.jpeg",
				]
			}
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
		background-color: #F4F5F6; 
	}

	.flex-box {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
	}

	.attachment-item {
		padding: 0 10px;
		position: relative;
		overflow: hidden;
		padding-bottom: 20px;
		background-color: #ffffff;
	}
	.attachment-item + .attachment-item {
		margin-top: 10px;
	}

	.item-title {
		padding: .3rem 0;
		border-bottom: 1px solid #ccc;
		color: #222222;
		margin: 0 5px;
	}
	.item-content {
		margin-bottom: 10px;
	}

	.content-div {
		margin: 10px 0;
		color: #666666;
		padding: 0 5px;
	}

	.attachment {
		height: 35vw;
		width: 33.3%;
		background-color: #ffffff;
		padding: 5px;
	}

	.attachment-img {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center center;
		position: relative;
		border-radius: 8px;
	}

	.attachment-del {
		position: absolute;
		right: -.2rem;
		top: -.2rem;
		width: .6rem;
	}

	.triangle {
		width: 50px;
    height: 50px;
    position: absolute;
    right: -25px;
    top: -25px;
    background-color: #2db7fe;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
	}

	.num {
		position: absolute;
    right: 6px;
    top: 0px;
    color: #ffffff;
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
