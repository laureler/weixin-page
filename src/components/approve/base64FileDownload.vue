<template>
	<div style="width:100%;height:100%">
		<div class="wxbg" v-if="isWeixin">
			<img
				src="../../assets/images/downbg.jpg"
				style="width:100%;height:100%"
			/>
			<van-button class="backbtn" @click="goBack()" size="small"
				>返回</van-button
			>
		</div>
		<div v-else id="purchaseManage"></div>
	</div>
</template>
<script>
import { request } from "../../utils/http";
import { Toast } from "vant";
export default {
	name: "base64FileDownload",
	data() {
		return {
			isWeixin: true
		};
	},
	methods: {
		goBack: function() {
			this.$router.back();
		},
		requestGetFile: function(fileUrl, param, fileName) {
			let _this = this;
			request({
				url: fileUrl,
				data: { strJson: param },
				success(response) {
					if (response) {
						if (response.resultcode == 1) {
							const fileBase64 = response.result;
							_this.downloadBlob(fileBase64, fileName);
						} else {
							Toast(response.resultmsg);
						}
					}
				},
				fail(err) {
					console.log(err);
				}
			});
		},
		saveFile: function(data, filename) {
			//var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			let URL = this.dataURLtoBlob(data);
		},
		dataURLtoBlob: function(dataurl) {
			var bstr = atob(dataurl);
			var n = bstr.length;
			var u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: "pdf" });
		},
		downloadBlob: function(dataurl, fileName) {
			let URL = this.dataURLtoBlob(dataurl);
			var reader = new FileReader();
			reader.readAsDataURL(URL);
			reader.onload = function(e) {
				// 兼容IE
				var bstr = atob(e.target.result.split(",")[1]);
					var n = bstr.length;
					var u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					var blob = new Blob([u8arr]);
					window.navigator.msSaveOrOpenBlob(blob, fileName + ".pdf");
			};
		}
	},
	computed: {
		is_weixin: function() {
			var ua = window.navigator.userAgent.toLowerCase();
			console.log("----------------------------------");
			console.log(ua);
			console.log("----------------------------------");
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				console.log("微信浏览器");
				return true;
			} else {
				console.log("不是微信浏览器");
				return false;
			}
		}
	},
	created() {
		this.isWeixin = this.is_weixin;
		let fileUrl = this.$route.query.fileUrl;
		let fileName = this.$route.query.fileName;
		let val = this.$route.query.val;
		let type = this.$route.query.type;
		if (!this.isWeixin && type == "request") {
			this.requestGetFile(fileUrl, val, fileName);
		}
	}
};
</script>
<style scoped>
.wxbg {
	width: 100%;
	height: 100%;
	position: relative;
}
.backbtn {
	position: absolute;
	left: 0.2rem;
	top: 0.2rem;
}
</style>
