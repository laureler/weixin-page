<template>
	<div class="serachInfo">
		<div class="title">
			<h1>{{ title }}</h1>
		</div>
		<div class="head">
			<label> {{ head }}</label>
		</div>
		<div v-html="serachInfoContent" class="count"></div>
		<div class="aggre">
			<van-button
				type="info"
				:disabled="agreeDisabled"
				@click="agree"
				size="large"
				>{{ agreeLable }}</van-button
			>
		</div>
	</div>
</template>
<script>
import { Dialog, CellGroup, Field, Uploader, Toast } from "vant";
export default {
	name: "searchInfo",
	data() {
		return {
			serachInfoContent: ``,
			agreeDisabled: true,
			agreeLable: "同意",
			title: "查询须知",
			head: "申请人在申请查询前需仔细阅读本须知："
		};
	},
	methods: {
		countDown: function(time) {
			let _this = this;
			if (time > 0) {
				_this.agreeLable = `同意(` + time + `)`;
				const newTime = Number(time - 1);
				setTimeout(function() {
					_this.countDown(newTime);
				}, 1000);
			} else {
				_this.agreeLable = `同意`;
				_this.agreeDisabled = false;
			}
		},
		agree: function() {
			let _this = this;
			let callbackurl = _this.$route.query.callbackUrl;
			_this.$router.push({
				path: "/preApprovenew",
				query: {
					callbackUrl: callbackurl
				}
			});
		}
	},
	mounted() {
		const _this = this;
		Toast.loading({
			duration: 0,
			mask: true,
			message: "加载中..."
		});
		var xzlx = _this.$route.query.xzlx;
		// http://czsbdcrz.ngcz.tv/gdbdcWebService/WeChatConfig/public/getProtocolTitleInfomation
		_this
			.$fetch(
				"/gdbdcWebService/WeChatConfig/public/getProtocolTitleInfomation"
			)
			.then(res => {
				if (res) {
					let titlecontent;
					switch (xzlx) {
						case "cxxz":
							titlecontent = res.TITLECONTENT2;
							break;
						case "cxwfzmxz":
							titlecontent = res.TITLECONTENT4;
							break;
						default:
							titlecontent = res.TITLECONTENT2;
							break;
					}

					if (titlecontent) {
						let countList = titlecontent.split("##");
						for (var i = countList.length; i > -1; i--) {
							let countText = new String(countList[i]);
							if (countText.indexOf("@t") == 0) {
								_this.title = countText.replace(/@t/g, "");
								countList.splice(i, 1);
							}
							if (countText.indexOf("@h") == 0) {
								_this.head = countText.replace(/@h/g, "");
								countList.splice(i, 1);
							}
						}
						let countData = countList.join("##");
						_this.serachInfoContent = countData.replace(
							/##/g,
							"<br/>"
						);
					}
					Toast.clear();
					_this.countDown(9);
				}
			})
			.catch(error => {
				Toast.clear();
				Toast("服务器资源请求错误！");
				console.log(error);
			});
		_this.$fetch('/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0]).then(res => {
				console.log("微信配置结果")
				console.log(res);
				console.log(res);
				console.log(res);
				wx.config(res);
			});
	}
};
</script>
<style scoped>
.serachInfo {
	width: 100%;
	padding: 0.3rem;
}
.serachInfo .title {
	text-align: center;
	padding-top: 0.3rem;
	padding-bottom: 0.3rem;
}
.serachInfo .title h1 {
	font-size: 0.6rem;
	font-weight: bolder;
	font-family: "Microsoft Yahei";
}
.serachInfo .head {
	font-family: "Microsoft Yahei";
	font-weight: 600;
	font-size: .45rem
}
.serachInfo .aggre {
	width: 60%;
	margin: 0 auto;
	padding-top: 1rem;
}
.serachInfo .count{
	font-size: .4rem
}
</style>
