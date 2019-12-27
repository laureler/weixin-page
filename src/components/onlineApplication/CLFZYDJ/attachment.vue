<!--
 * @Author: charls.fairy
 * @Motto: Your smile is my rainbow.
 * @Website: https://www.fairy520.top/
 * @Github: https://github.com/CharlsPrince
 * @Date: 2019-10-16 19:32:10
 * @LastEditors: charls.fairy
 * @LastEditTime: 2019-10-24 09:31:56
 * @Description: 文件注释
 -->
<template>
	<div class="container">
		<page-head title="上传附件材料"></page-head>
		<div class="body-box">
			<div class="attachment-item" v-for="(item, index) in fjqd">
				<div class="item-title">
					{{item["JOB_FILES.ZLMC"]}}
				</div>
				<div class="item-content">
					<div class="content-div">
						必须提供：{{item["JOB_FILES.XYTG"]}}
					</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, i) in imgs[index]">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(index,i)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader :name="'uploader_' + index" :after-read="onRead">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>

				<div class="triangle"></div>
				<div class="num">{{item["JOB_FILES.XH"]}}</div>
			</div>
		</div>

		<div style="height: 50px;"></div>
		<van-button size="large" type="info" class="bottom-button" @click.native="nextStep()">下一步</van-button>
	</div>
</template>

<script>
	import Head from '../../app/head.vue';
	import {
		Toast
	} from 'vant';
	import {
		UPLOAD_FILES,
		FILL_SUB_FORM_DATA,
		SUBMIT_TASK_FORM_DATA
	} from '../../../constants/index.js'
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				imgs: [],
				JOB_FILES: {},
				loading1: false,
				fjqd: [],
			}
		},
		methods: {
			onRead: function (file, detail) {
				console.log('file:', file, detail);
				var form = new FormData();
				form.append('mFile', file.file);
				var _this = this;
				this.axios({
					url: UPLOAD_FILES + '?jid=' + sessionStorage.getItem('jid'),
					method: 'post',
					data: form,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(response => {
					console.log(response);
					var arr = detail.name.split('_');
					//将上传文件存到对应展示数组中
					_this.imgs[arr[1]].push(file);
					var img = [];
					var ob = _this.fjqd[arr[1]]['JOB_FILES.FPATH'];
					if (ob != '') {
						img = ob.split('::');
					}
					img.push(file.file.name + '|' + response.data[0]);
					_this.fjqd[arr[1]]['JOB_FILES.FPATH'] = img.join('::');
					console.log(_this.fjqd[arr[1]]['JOB_FILES.FPATH']);
				}).catch(error => {
					console.log(error);
				});
			},
			//index:第几个附件模块执行删除操作;i:第index个附件模块下第i个附件执行删除操作
			delImg: function (index, i) {
				this.imgs[index].splice(i, 1);
				var files = this.fjqd[index]['JOB_FILES.FPATH'].split('::');
				this.fjqd[index]['JOB_FILES.FPATH'] = files.splice(i, 1).join('::');
			},
			fillSubFormData: function (title, params) {
				var business = JSON.parse(sessionStorage.getItem('business'));
				var result = JSON.parse(business.result);
				console.log(result);
				var link = title.split('.')[0];
				var domains = title.split('_LINK')[0]
				var parentrid = result.data.values[link + '.RID'];
				var templateid = result.data.controls[title].linkTplId;
				console.log(result.data.values[link + '.RID']);
				console.log(result.data.controls[title].linkTplId);
				var _this = this;
				Toast.loading({
					duration: 0,
					mask: true,
					message: '上传中...'
				});
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					Toast.clear();
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					Toast.fail(error.message);
					console.log(error);
				});
			},
			endFillSub: function () {
					console.log('结束保存子表单');
					this.$router.push({
						path: '/onlineApplication/CLFZYDJ/verification'
					});
			},
			nextStep: function () {
				this.fillSubFormData('JOB_FILES_LINK.IFJQD', this.fjqd);
			},
			submitTaskFormData: function () {
				Toast.loading({
					duration: 0,
					mask: true,
					message: '提交中...'
				});
				var taskId = sessionStorage.getItem('taskId');
				var formData = JSON.parse(sessionStorage.getItem('formdata'));
				this.axios({
					url: SUBMIT_TASK_FORM_DATA + '?taskId=' + taskId,
					method: 'post',
					data: formData,
					transformRequest: [function (data) {
						let ret = ''
						for (let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(response => {
					console.log(response);
					Toast.clear();
					if (response.status == 200) {
						this.$router.push({
							path: '/onlineApplication/CLFZYDJ/verification'
						});
					}
				}).catch(error => {
					console.log(error);
					Toast.clear();
					Toast('请求失败');
				});
			},
			//获取附件清单
			getFile: function (clmc, cllx, bxtg) {
				var fjdata = [];
				for (var i = 0; i < clmc.length; i++) {
					var fjreocrd = {};
					fjreocrd["JOB_FILES.XH"] = i + 1;
					fjreocrd["JOB_FILES.ZLMC"] = clmc[i];
					fjreocrd["JOB_FILES.CCJZ"] = cllx[i];
					fjreocrd["JOB_FILES.XYTG"] = bxtg[i];
					fjreocrd["JOB_FILES.FPATH"] = '';
					fjdata.push(fjreocrd);
				}
				return fjdata;
			}
		},
		mounted() {
			console.log('进入附件页面');
			this.loading1 = false;
			this.loading2 = false;
		},
		created() {
			//类型1附件材料
			var clmc1 = ["不动产权证书", "《房屋所有权证》", "《国有土地使用证》", "房屋买卖合同(原件)", "生效的法律文书(原件)", "完税或减免税凭证", "申请人身份证明(复印件)",
				"委托公证文书", "单位授权委托书(原件)", "不动产登记申请审批表(原件)", "确认书", "询问笔录", "房屋平面图", "宗地图", "其他必要材料"
			];
			var cllx1 = ["原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "正本复印件", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本",
				"原件正本", "原件正本", "原件正本"
			];
			var bxtg1 = ["否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否"];
			//类型2附件材料
			var clmc2 = ["不动产权证书", "《房屋所有权证》", "《国有土地使用证》", "房屋赠与合同或经公证的赠与书与受赠书(原件)", "生效的法律文书(原件)", "完税或减免税凭证",
				"申请人身份证明(复印件)", "委托公证文书", "单位授权委托书(原件)", "不动产登记申请审批表(原件)", "确认书", "询问笔录", "房屋平面图", "宗地图", "其他必要材料"
			];
			var cllx2 = ["原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "正本复印件", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本",
				"原件正本", "原件正本", "原件正本"
			];
			var bxtg2 = ["否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否"];
			//类型3附件材料
			var clmc3 = ["不动产权证书", "《房屋所有权证》", "《国有土地使用证》", "房屋买卖合同(原件)", "生效的法律文书(原件)", "完税或减免税凭证", "婚姻状况证明",
				"《政策性住房产权转移登记卡》", "申请人身份证明(复印件)", "委托公证文书", "单位授权委托书(原件)", "不动产登记申请审批表(原件)", "确认书", "询问笔录", "房屋平面图",
				"宗地图", "其他必要材料"
			];
			var cllx3 = ["原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "正本复印件", "原件正本", "原件正本", "原件正本",
				"原件正本", "原件正本", "原件正本", "原件正本", "原件正本"
			];
			var bxtg3 = ["否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否"];
			//类型3附件材料
			var clmc4 = ["不动产权证书", "《房屋所有权证》", "《国有土地使用证》", "生效的法律文书(原件)", "完税或减免税凭证", "作价入股相关协议及相关主管部门的批准文件(原件)",
				"申请人身份证明(复印件)", "委托公证文书", "单位授权委托书(原件)", "不动产登记申请审批表(原件)", "确认书", "询问笔录", "房屋平面图", "宗地图", "其他必要材料"
			];
			var cllx4 = ["原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本", "正本复印件", "原件正本", "原件正本", "原件正本", "原件正本", "原件正本",
				"原件正本", "原件正本", "原件正本"
			];
			var bxtg4 = ["否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否", "否"];
			//获取产权来源
			var cqly = JSON.parse(sessionStorage.getItem('formdata'))["JOB_FDCQXXB.FCQLY"];
			console.log('cqly', cqly);
			if (!cqly) {
				showError("请先选择产权来源");
				return;
			}
			if (cqly == "42") {
				this.fjqd = this.getFile(clmc1, cllx1, bxtg1);
			} else if (cqly == "49") {
				this.fjqd = this.getFile(clmc2, cllx2, bxtg2);
			} else if (cqly == "64") {
				this.fjqd = this.getFile(clmc3, cllx3, bxtg3);
			} else if (cqly == "50") {
				this.fjqd = this.getFile(clmc4, cllx4, bxtg4);
			} else {
				showError("没有该类型材料清单，请自行新增！");
			}
			if (this.fjqd.length != 0) {
				for (var i = 0; i < this.fjqd.length; i++) {
					var arr = [];
					this.imgs.push(arr);
				}
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

	.attachment-item+.attachment-item {
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
