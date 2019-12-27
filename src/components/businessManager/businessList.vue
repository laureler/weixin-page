<template>
	<div style="width:100%">
		<page-head title="个人业务列表"></page-head>
		<div class="list-box">
			<template v-if="resultData.length > 0">
				<div
					class="list"
					v-for="(dataRow, index) in resultData"
					:key="index"
				>
					<table>
						<tr>
							<td class="title">申请编号</td>
							<td class="count">{{ dataRow.SQBH }}</td>
						</tr>
						<tr>
							<td class="title">合同号</td>
							<td class="count">{{ dataRow.HTBH }}</td>
						</tr>
						<tr>
							<td class="title">坐落</td>
							<td class="count">{{ dataRow.BDCZL }}</td>
						</tr>
						<tr>
							<td class="title">是否按揭</td>
							<td class="count">
								{{ dataRow.SFAJ == 1 ? "是" : "否" }}
							</td>
						</tr>
						<tr>
							<td class="title">进度</td>
							<td class="count">{{ dataRow.YWJD }}</td>
						</tr>
						<tr>
							<td class="title">操作</td>
							<td class="count">
								<van-button
									@click="showBusiness(dataRow)"
									v-if="
										dataRow.YWJD == '预申请' ||
											dataRow.YWJD == '待申请' ||
											dataRow.YWJD == '预受理' ||
											!dataRow.YWJD
									"
									type="default"
									size="small"
									class="blue-button"
									>申请</van-button
								>
								<van-button
									@click="showBusiness(dataRow)"
									v-else
									type="default"
									size="small"
									class="blue-button"
									>查看</van-button
								>
							</td>
						</tr>
					</table>

					<div class="spilt"><div></div></div>
				</div>
			</template>
			<template v-else>
				<div
					style="color:#333;width:100%;padding-top:3rem;text-align:center"
				>
					查询无数据
				</div>
			</template>
		</div>
	</div>
</template>
<script>
import Head from "@/components/app/head.vue";
import { Toast, Dialog } from "vant";
export default {
	name: "businessList",
	data() {
		return {
			resultData: [{ ywbh: "", hth: "", zl: "", ajf: "", jd: "" }],
			cardCode: null,
			userName: null
		};
	},
	components: {
		"page-head": Head
	},
	mounted() {
		let _this = this;
		let isBusinessVerify = _this.$store.state.businessVerify;
		_this.cardCode = _this.$store.getters.getPersonCardInfo.cardName;
		_this.userName = _this.$store.getters.getPersonCardInfo.cardCode;
		//_this.userName = "蒲秀蓉";
		//_this.cardCode = "512921197609094225";
		//let isBusinessVerify = true;
		if (!isBusinessVerify) {
			this.$router.push({
				path: "/preApprovenew",
				query: {
					callbackUrl: "/businessList"
				}
			});
		} else if (_this.cardCode && _this.userName) {
			Toast.loading({
				duration: 0,
				mask: true,
				message: "加载中..."
			});
			// 获取数据
			this.$fetch(
				"/gdbdcWebService/public/personalBusiness/findInformation?buyerName=" +
					_this.userName +
					"&idNumber=" +
					_this.cardCode
			)
				.then(response => {
					if (response.code == 1) {
						_this.resultData = response.data;
						Toast.clear();
					} else {
						Toast.clear();
						_this.resultData = [];
						Toast(response.msg);
					}
				})
				.catch(error => {
					_this.resultData = [];
					Toast.clear();
					Toast("服务器请求错误!");
					console.log(error);
				});
		} else {
			this.$router.push({
				path: "/preApprovenew",
				query: {
					callbackUrl: "/businessList"
				}
			});
		}
	},
	methods: {
		showBusiness(dataRow) {
			let _this = this;
			let msg = "";
			if (
				dataRow.YWJD == "预申请" ||
				dataRow.YWJD == "待申请" ||
				dataRow.YWJD == "预受理" ||
				!dataRow.YWJD
			) {
				msg = "数据提交中...";
			} else {
				msg = "数据获取中...";
			}
			Toast.loading({
				duration: 0,
				mask: true,
				message: msg
			});
			_this
				.$fetch(
					"/workflowWebService/public/getBusiness?code=" +
						dataRow.BCODE +
						"&contractNumber=" +
						dataRow.HTBH +
						"&createType=2"
				)
				.then(response => {
					if (response.resultcode == 1) {
						this.$router.push({
							path: "/businessView",
							query: {
								nowUser: _this.userName,
								BCODE: dataRow.BCODE,
								HTBH: dataRow.HTBH
							}
						});
						Toast.clear();
					} else {
						Toast.clear();
						Toast(response.resultmsg);
					}
				})
				.catch(error => {
					Toast.clear();
					Toast("服务器请求错误!");
					console.log(error);
				});
		}
	}
};
</script>
<style scoped>
.list-box {
	width: 100%;
	padding-left: 0.1rem;
	padding-right: 0.1rem;
	padding-bottom: 0.5rem;
}
.list-box .list {
	width: 100%;
}
.list-box .list .spilt {
	height: 0.7rem;
	width: 100%;
}
.list-box .list .spilt div {
	height: 0.4rem;
	width: 100%;
	border-bottom: 0.1rem #7be9ff solid;
}
.list-box .list table {
	width: 100%;
	border-bottom: 1px solid #bbb;
}
.list-box .list table tr {
	border-top: 1px solid #bbb;
	height: 0.8rem;
}
.list-box .list table tr td {
	font-size: 0.5rem;
}
.list-box .list .title {
	border-right: 1px solid #bbb;
	text-align: center;
	width: 2.3rem;
}
.list-box .list .count {
	padding-left: 0.2rem;
	max-width: calc(100%-2.3rem);
}
.blue-button {
	background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	color: #ffffff !important;
}
</style>
