<template>
	<div class="container">
		<page-head title="上传附件材料"></page-head>
		<div class="body-box">
			<div class="attachment-item">
				<div class="item-title">
					不动产登记申请表
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：否</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, index) in imgs">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(index)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader name="uploader" :after-read="onRead">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>
				
				<div class="triangle"></div>
				<div class="num">1</div>
			</div>
			<div class="attachment-item">
				<div class="item-title">
					房屋地址证明
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：否</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, index) in imgs2">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(2, index)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader name="uploader" :after-read="onRead2">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>

				<div class="triangle"></div>
				<div class="num">2</div>
			</div>
			<div class="attachment-item">
				<div class="item-title">
					申请人身份证明
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：否</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, index) in imgs3">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(3, index)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader name="uploader" :after-read="onRead3">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>

				<div class="triangle"></div>
				<div class="num">3</div>
			</div>
			<div class="attachment-item">
				<div class="item-title">
					建设工程规划许可证
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：否</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, index) in imgs4">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(4, index)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader name="uploader" :after-read="onRead4">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>

				<div class="triangle"></div>
				<div class="num">4</div>
			</div>
			<div class="attachment-item">
				<div class="item-title">
					建设工程规划条件核实批复书及图纸
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：否</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, index) in imgs5">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(5, index)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader name="uploader" :after-read="onRead5">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>

				<div class="triangle"></div>
				<div class="num">5</div>
			</div>
			<div class="attachment-item">
				<div class="item-title">
					建设工程竣工验收备案登记证
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：否</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, index) in imgs6">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(6, index)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader name="uploader" :after-read="onRead6">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>

				<div class="triangle"></div>
				<div class="num">6</div>
			</div>
			<div class="attachment-item">
				<div class="item-title">
					其他材料
				</div>
				<div class="item-content">
					<div class="content-div">必须提供：否</div>
					<div class="content-div">附件内容：</div>
					<div class="attachments flex-box">
						<div class="attachment" v-for="(item, index) in imgs7">
							<div class="attachment-img" :style="{backgroundImage:'url(' + item.content + ')'}">
								<img class="attachment-del" src="../../../assets/images/online-application/delete.png"
									alt="" @click="delImg(7, index)">
							</div>
						</div>
					</div>
				</div>

				<van-uploader name="uploader" :after-read="onRead7">
					<van-button plain hairline type="default">
						<img src="../../../assets/images/online-application/上传.png"
							style="width: 15px; display: inline-block; position: relative; top: -2px;" alt="">
						上传
					</van-button>
				</van-uploader>

				<div class="triangle"></div>
				<div class="num">7</div>
			</div>
		</div>

		<div style="height: 50px;"></div>
		<van-button size="large" type="info" class="bottom-button" @click.native="nextStep()">下一步</van-button>
	</div>
</template>

<script>
	import Head from '../../app/head.vue';
	import {Toast } from 'vant'; 
	import {UPLOAD_FILES, FILL_SUB_FORM_DATA,SUBMIT_TASK_FORM_DATA } from '../../../constants/index.js'
	export default {
		components: {
			'page-head': Head
		},
		data () {
			return {
				imgs: [],
				imgs2: [],
				imgs3: [],
				imgs4: [],
				imgs5: [],
				imgs6: [],
				imgs7: [],
				files: [],
				files2: [],
				files3: [],
				files4: [],
				files5: [],
				files6: [],
				files7: [],
				
				JOB_FILES: {},
				JOB_FILES2: {},
				JOB_FILES3: {},
				JOB_FILES4: {},
				JOB_FILES5: {},
				JOB_FILES6: {},
				JOB_FILES7: {},
				loading1: false,
				loading2: false,
				loading3: false,
				loading4: false,
				loading5: false,
				loading6: false,
				loading7: false,
			}
		},
		methods: {
			onRead: function (file) {
				console.log('file:', file);
				
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
					this.imgs.push(file);
					_this.files.push(file.file.name + '|' + response.data[0]);
					console.log(_this.files);
				}).catch(error => {
					console.log(error);
				});
			},
			onRead2: function (file) {
				console.log('file:', file);
				
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
					this.imgs2.push(file);
					_this.files2.push(file.file.name + '|' + response.data[0]);
					console.log(_this.files);
				}).catch(error => {
					console.log(error);
				});
			},
			onRead3: function (file) {
				console.log('file:', file);
				
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
					this.imgs3.push(file);
					_this.files3.push(file.file.name + '|' + response.data[0]);
					console.log(_this.files);
				}).catch(error => {
					console.log(error);
				});
			},
			onRead4: function (file) {
				console.log('file:', file);
				
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
					this.imgs4.push(file);
					_this.files4.push(file.file.name + '|' + response.data[0]);
					console.log(_this.files);
				}).catch(error => {
					console.log(error);
				});
			},
			onRead5: function (file) {
				console.log('file:', file);
				
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
					this.imgs5.push(file);
					_this.files5.push(file.file.name + '|' + response.data[0]);
					console.log(_this.files);
				}).catch(error => {
					console.log(error);
				});
			},
			onRead6: function (file) {
				console.log('file:', file);
				
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
					this.imgs6.push(file);
					_this.files6.push(file.file.name + '|' + response.data[0]);
					console.log(_this.files);
				}).catch(error => {
					console.log(error);
				});
			},
			onRead7: function (file) {
				console.log('file:', file);
				
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
					this.imgs7.push(file);
					_this.files7.push(file.file.name + '|' + response.data[0]);
					console.log(_this.files);
				}).catch(error => {
					console.log(error);
				});
			},
			delImg: function (index) {
				if (item === 1) {
					this.files.splice(index, 1);
					this.imgs.splice(index, 1);
				} else if (item === 2) {
					this.files2.splice(index, 1);
					this.imgs2.splice(index, 1);
				} else if (item === 3) {
					this.files3.splice(index, 1);
					this.imgs3.splice(index, 1);
				} else if (item === 4) {
					this.files4.splice(index, 1);
					this.imgs4.splice(index, 1);
				} else if (item === 5) {
					this.files5.splice(index, 1);
					this.imgs5.splice(index, 1);
				}  else if (item === 6) {
					this.files6.splice(index, 1);
					this.imgs6.splice(index, 1);
				} else {
					this.files7.splice(index, 1);
					this.imgs7.splice(index, 1);
				}
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
				_this.loading1 = true;
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					_this.loading1 = false;
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					_this.loading1 = false;
					console.log(error);
				});

			},
			fillSubFormData2: function (title, params) {
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
				_this.loading2 = true;
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					_this.loading2 = false;
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES2 = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					_this.loading2 = false;
					console.log(error);
				});

			},
			fillSubFormData3: function (title, params) {
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
				_this.loading3 = true;
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					_this.loading3 = false;
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES3 = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					_this.loading3 = false;
					console.log(error);
				});

			},
			fillSubFormData4: function (title, params) {
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
				_this.loading4 = true;
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					_this.loading4 = false;
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES2 = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					_this.loading4 = false;
					console.log(error);
				});

			},
			fillSubFormData5: function (title, params) {
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
				_this.loading5 = true;
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					_this.loading5 = false;
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES5 = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					_this.loading5 = false;
					console.log(error);
				});

			},
			fillSubFormData6: function (title, params) {
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
				_this.loading6 = true;
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					_this.loading6 = false;
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES6 = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					_this.loading6 = false;
					console.log(error);
				});

			},
			fillSubFormData7: function (title, params) {
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
				_this.loading7 = true;
				this.axios({
					url: FILL_SUB_FORM_DATA + '?jid=' + sessionStorage.getItem('jid') + '&type=0' +
						'&parentdomname=' + title + '&parentrid=' + parentrid + '&domains=' + domains +
						'&templateid=' + templateid,
					method: 'post',
					data: params,
				}).then(response => {
					_this.loading7 = false;
					console.log('FILL_SUB_FORM_DATA:', response);
					if (response.status === 200) {
						_this.JOB_FILES7 = response.data.result[0];
						_this.endFillSub();
					}
				}).catch(error => {
					_this.loading7 = false;
					console.log(error);
				});

			},
			endFillSub: function () {
				if (this.loading1 === false && this.loading2 === false && this.loading3 === false && this.loading4 ===
					false && this.loading5 === false && this.loading6 === false && this.loading7 === false) {
					console.log('结束保存子表单');
					this.submitTaskFormData();
					/* this.$router.push({
						path: '/onlineApplication/FDCQBGDJ/ems'
					}); */
				}
			},
			nextStep: function () {
				console.log("files:", this.files);
				
				var filesStr = this.files.join("::");
				var files2Str = this.files2.join("::");
				var files3Str = this.files3.join("::");
				var files4Str = this.files4.join("::");
				var files5Str = this.files5.join("::");
				var files6Str = this.files6.join("::");
				var files7Str = this.files7.join("::");
				this.fillSubFormData('JOB_FILES_LINK.IFJQD', [{
					'JOB_FILES.CCJZ': "正本复印件",
					'JOB_FILES.FBZ': null,
					'JOB_FILES.FPATH': filesStr,
					'JOB_FILES.FSL': 0,
					'JOB_FILES.FYM': "0",
					'JOB_FILES.FYS': 1,
					'JOB_FILES.RID': null,
					'JOB_FILES.SYS_MRID': null,
					'JOB_FILES.XH': 0,
					'JOB_FILES.XYTG': "否",
					'JOB_FILES.ZLMC': "申请人身份证明"
				}]);
				this.fillSubFormData2('JOB_FILES_LINK.IFJQD', [{
					'JOB_FILES.CCJZ': "正本复印件",
					'JOB_FILES.FBZ': null,
					'JOB_FILES.FPATH': files2Str,
					'JOB_FILES.FSL': 0,
					'JOB_FILES.FYM': "0",
					'JOB_FILES.FYS': 1,
					'JOB_FILES.RID': null,
					'JOB_FILES.SYS_MRID': null,
					'JOB_FILES.XH': 0,
					'JOB_FILES.XYTG': "否",
					'JOB_FILES.ZLMC': "房屋地址证明"
				}]);
				this.fillSubFormData3('JOB_FILES_LINK.IFJQD', [{
					'JOB_FILES.CCJZ': "正本复印件",
					'JOB_FILES.FBZ': null,
					'JOB_FILES.FPATH': files3Str,
					'JOB_FILES.FSL': 0,
					'JOB_FILES.FYM': "0",
					'JOB_FILES.FYS': 1,
					'JOB_FILES.RID': null,
					'JOB_FILES.SYS_MRID': null,
					'JOB_FILES.XH': 0,
					'JOB_FILES.XYTG': "否",
					'JOB_FILES.ZLMC': "申请人身份证明"
				}]);
				this.fillSubFormData4('JOB_FILES_LINK.IFJQD', [{
					'JOB_FILES.CCJZ': "正本复印件",
					'JOB_FILES.FBZ': null,
					'JOB_FILES.FPATH': files4Str,
					'JOB_FILES.FSL': 0,
					'JOB_FILES.FYM': "0",
					'JOB_FILES.FYS': 1,
					'JOB_FILES.RID': null,
					'JOB_FILES.SYS_MRID': null,
					'JOB_FILES.XH': 0,
					'JOB_FILES.XYTG': "否",
					'JOB_FILES.ZLMC': "建设工程规划许可证"
				}]);
				this.fillSubFormData5('JOB_FILES_LINK.IFJQD', [{
					'JOB_FILES.CCJZ': "正本复印件",
					'JOB_FILES.FBZ': null,
					'JOB_FILES.FPATH': files5Str,
					'JOB_FILES.FSL': 0,
					'JOB_FILES.FYM': "0",
					'JOB_FILES.FYS': 1,
					'JOB_FILES.RID': null,
					'JOB_FILES.SYS_MRID': null,
					'JOB_FILES.XH': 0,
					'JOB_FILES.XYTG': "否",
					'JOB_FILES.ZLMC': "建设工程规划条件核实批复书及图纸"
				}]);
				this.fillSubFormData6('JOB_FILES_LINK.IFJQD', [{
					'JOB_FILES.CCJZ': "正本复印件",
					'JOB_FILES.FBZ': null,
					'JOB_FILES.FPATH': files6Str,
					'JOB_FILES.FSL': 0,
					'JOB_FILES.FYM': "0",
					'JOB_FILES.FYS': 1,
					'JOB_FILES.RID': null,
					'JOB_FILES.SYS_MRID': null,
					'JOB_FILES.XH': 0,
					'JOB_FILES.XYTG': "否",
					'JOB_FILES.ZLMC': "建设工程竣工验收备案登记证"
				}]);
				this.fillSubFormData7('JOB_FILES_LINK.IFJQD', [{
					'JOB_FILES.CCJZ': "正本复印件",
					'JOB_FILES.FBZ': null,
					'JOB_FILES.FPATH': files7Str,
					'JOB_FILES.FSL': 0,
					'JOB_FILES.FYM': "0",
					'JOB_FILES.FYS': 1,
					'JOB_FILES.RID': null,
					'JOB_FILES.SYS_MRID': null,
					'JOB_FILES.XH': 0,
					'JOB_FILES.XYTG': "否",
					'JOB_FILES.ZLMC': "其他材料"
				}]);
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
							path: '/onlineApplication/FDCQSCDJ/success'
						});
					}
				}).catch(error => {
					console.log(error);
					Toast.clear();
					Toast('请求失败');
				});
			}
		},
		mounted () {
			console.log('进入附件页面');
			this.loading1 = false;
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
