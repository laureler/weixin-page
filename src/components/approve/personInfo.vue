<template>
	<div>
		<page-head :title="title"></page-head>
		<div class="title">您的个人不动产信息查询结果如下</div>
		<div id="context">
			<div v-if="!isSuccess" class="title">{{ resultmsg }}</div>
			<div v-else class="content">
				<table class="info" v-for="info in infos">
					<tbody>
						<tr>
							<td>权利人名称:</td>
							<td>{{ info.qlrmc }}</td>
						</tr>
						<tr>
							<td>证件号码:</td>
							<td>{{ info.zjhm }}</td>
						</tr>
						<tr>
							<td>不动产坐落:</td>
							<td>{{ info.zl }}</td>
						</tr>
						<tr>
							<td>不动产单元号:</td>
							<td>{{ info.bdcdyh }}</td>
						</tr>
						<tr>
							<td>不动产权证号:</td>
							<td>{{ info.cqzh }}</td>
						</tr>
						<tr>
							<td>共有方式:</td>
							<td>{{ info.gyfs }}</td>
						</tr>
						<tr>
							<td>面积:</td>
							<td>{{ info.mj }}</td>
						</tr>
						<tr>
							<td>用途:</td>
							<td>{{ info.yt }}</td>
						</tr>
						<tr>
							<td>登记状态:</td>
							<td>{{ info.fwzt }}</td>
						</tr>
						<tr>
							<td>产权类型:</td>
							<td>{{ info.cqlx }}</td>
						</tr>
						<tr>
							<td colspan="2">
								<van-button
									type="info"
									size="small"
									style="z-index:100"
									@click="fileDown(info)"
									>下载证照</van-button
								>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="endMessage" v-html="endMessage"></div>
		</div>
	</div>
</template>

<script>
import header from "./../app/head";
import { request } from "../../utils/http";
import { watermark } from "../../utils/waterLog";
import { Toast, Dialog } from "vant";
export default {
	name: "person-info",
	data() {
		return {
			resultmsg: "",
			// 默认没有成功获取数据
			isSuccess: false,
			//存储返回 查询信息 数组
			infos: [],
			title: "信息查询",
			endMessage: ``
		};
	},
	components: { "page-head": header },
	methods: {
		fileDown: function(infoData) {
			let _this = this;
			let valData = {
				jid: infoData.jid,
				qlrmc: infoData.qlrmc,
				cqlx: infoData.cqlx
			};
			let fileName = infoData.zjhm + ".pdf";
			let param = {
				strJson: JSON.stringify(valData),
				fileName: fileName
			};
			Toast.loading({
				duration: 0,
				mask: true,
				message: "正在获取文件..."
			});
			_this
				.$postFrom(
					"/pubWeb/public/doIntranetDownRequest/GetEleCertAndConctarct",
					param
				)
				.then(res => {
					if (res.resultcode == "1") {
						Toast.clear();
						_this.$router.push({
							path: "/fileDownload",
							query: {
								fileUrl: res.filePath
							}
						});
					}else{
						Toast.clear();
						Toast(res.resultmsg);
					}
				})
				.catch(error => {
					Toast.clear();
					Toast("服务器资源请求错误！");
					console.log(error);
				});
		}
	},
	mounted() {
		let title = this.$route.query.title;
		this.title = title ? title : this.title;

		/*let param = {
			  'qlr': this.$store.state.cardCode,
			  'zjhm': this.$store.state.cardName
			};*/
		// todo 若store没有经过 commit cardCode 也就不会有这个属性值 在逻辑不确定的情况下，可能会出现空值的问题。
		// todo 在此改为参数了 但是name放在最后面 需要修改。
		let _this = this;
		let param = {};
		if (_this.$store.getters.getVerifyState) {
			// 如果已经进行过统一身份认证，则直接使用预存储的身份信息
			param = {
				qlr: _this.$store.getters.getPersonCardInfo.cardName,
				zjhm: _this.$store.getters.getPersonCardInfo.cardCode
			};
		} else {
			param = {
				qlr: _this.$route.query.name,
				zjhm: _this.$route.query.id
			};
		}
		request({
			url: "/GetPersonDataInfo",
			data: { strJson: JSON.stringify(param) },
			success(response) {
				if (response) {
					// result 查询信息存在的时候
					if (Number(response.resultcode) === 1) {
						_this.isSuccess = true;
						_this.infos = response.result || "";

						_this.$nextTick(() => {
							watermark(null, _this.infos[0].mark);
						});
					} else {
						_this.isSuccess = false;
						_this.resultmsg = response.resultmsg;
					}
				}
			},
			fail(err) {
				console.log(err);
			}
		});
		_this
			.$fetch(
				"/gdbdcWebService/WeChatConfig/public/getProtocolTitleInfomation"
			)
			.then(res => {
				if (res) {
					const titlecontent = res.TITLECONTENT3;
					if (titlecontent) {
						_this.endMessage = titlecontent.replace(/##/g, "<br/>");
					}
				}
			})
			.catch(error => {
				Toast.clear();
				Toast("服务器资源请求错误！");
				console.log(error);
			});
	},
	beforeDestroy() {
		document
			.querySelectorAll('div[id*="mask_div"]')
			.forEach(function(item) {
				item.parentNode.removeChild(item);
			});
	}
};
</script>

<style scoped>
.title {
	text-align: center;
	font-size: 15px;
	padding: 2.5px;
	margin: 10px 0 15px 0;
}

.content {
	padding: 10px;
}

.info {
	font-size: 13px;
	margin-bottom: 15px;
	padding: 10px;
	display: block;
	border: 0.5px solid #dad7d7;
	border-radius: 2.5px;
	box-shadow: 0px 0px 5px #9e9d9d;
}

.info td {
	padding: 5px 0;
}

.info td:nth-child(1) {
	text-align: right;
	width: 90px;
}

.info td:nth-child(2) {
	padding-left: 10px;
}
.endMessage {
	padding: 0 0.5rem;
	font-size: .4rem;
}
</style>
