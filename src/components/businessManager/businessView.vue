<template>
	<div style="width:100%;height: 100%;position: relative;">
		<page-head title="个人业务详情"></page-head>

		<div v-show="showQrcode" @click="hide" class="qrCodeBox">
			<div v-show="showQrcode" class="qrCode" id="qrcode">
				<img src="" alt="" id="arcodeImg" />
			</div>
			<!-- 创建一个div，并设置id为qrcode -->
			<div class="hrefText">长按二维码识别跳转签名</div>
		</div>
		<!--<div  v-show="showImg" @click="viewImg('')" class="viewImgBox">
            <img :src="imgPath"/
        </div>>-->
		<div v-show="showImg" class="viewImgBox">
			<wimg
				:show.sync="showImg"
				:imgs.sync="imgPath"
				:currentImg.sync="current"
				ref="viewImgShow"
				@close="showImg = false"
			></wimg>
			<van-button
				v-if="isDelete"
				class="btnAddr"
				@click="deleteFile()"
				type="info"
				size="small"
				>删除</van-button
			>
		</div>

		<div style="z-index:1">
			<div v-if="viewType == 0" style="margin: 10px 0px">
				<van-button
					@click="downloadFiel"
					type="default"
					size="default"
					class="fullButton"
					>下载证照</van-button
				>
			</div>
			<div
				v-else-if="viewType == 1"
				style="margin: 10px 0px;text-align:center"
			>
				<div style="width:100%;height:.3rem"></div>
				<van-button
					type="default"
					size="default"
					class="fullButton"
					@click="qrcode"
					>电子签名</van-button
				>
			</div>
			<div class="fromTable">
				<table>
					<tr>
						<td class="title">申请编号</td>
						<td class="count">{{ formData.SQBH }}</td>
					</tr>
					<tr>
						<td class="title">权利人</td>
						<td class="count">{{ formData.GFRMC }}</td>
					</tr>
					<tr>
						<td class="title">证件号码</td>
						<td class="count">{{ formData.GFRZJHM }}</td>
					</tr>
					<tr>
						<td class="title">联系人</td>
						<td class="count">
							<van-field
								v-model="nowUser.LXR"
								:error="nowUser.LXR == ''"
								placeholder="请输入联系人"
							/>
						</td>
					</tr>
					<tr>
						<td class="title">联系电话</td>
						<td class="count">
							<van-field
								v-model="nowUser.LXDH"
								:error="nowUser.LXDH == ''"
								placeholder="请输入联系电话"
							/>
						</td>
					</tr>
					<tr>
						<td class="title">合同号</td>
						<td class="count">{{ formData.HTBH }}</td>
					</tr>
					<tr>
						<td class="title">坐落</td>
						<td class="count">
							{{ formData.BDCZL }}
						</td>
					</tr>
					<tr>
						<td class="title">建筑面积</td>
						<td class="count">{{ formData.FJZMJ }}</td>
					</tr>
				</table>

				<div
					style="border-bottom: 1px solid #333;margin-top:.5rem;width:3.8rem;font-size:.6rem;font-weight: bolder"
				>
					EMS寄件信息
				</div>
				<div style="width:100%;border-top: 1px solid #bbb;"></div>
				<div style="color:red">
					系统支持下载电子证明，具有同等法律效力，申请人如需纸质证明，请填写寄送信息，快递费用自行承担，
					港澳台地区暂不支持邮寄。
					<van-row class="checkType">
						<van-radio-group
							v-model="ems.FSFKDJZ"
							@change="kdjzchange"
						>
							<div
								style="color:#000;font-size: 0.5rem"
								class="radioBox van-col van-col--8"
							>
								<label style="padding-left:15px"
									>快递寄证</label
								>
							</div>
							<van-col span="8" class="radioBox">
								<van-radio name="是">是</van-radio>
							</van-col>
							<van-col span="8" class="radioBox">
								<van-radio name="否">否</van-radio>
							</van-col>
						</van-radio-group>
					</van-row>
					<template v-if="ems.FSFKDJZ == '是'">
						<van-field
							v-model="ems.FDXLXR"
							label="联系人"
							:error="ems.FDXLXR == ''"
							placeholder="请输入联系人"
						/>
						<van-field
							v-model="ems.FDXTZDH"
							label="联系电话"
							:error="ems.FDXTZDH == ''"
							placeholder="请输入联系电话"
						/>
						<van-field
							v-model="ems.FDZ"
							label="联系地址"
							:error="ems.FDZ == ''"
							placeholder="请输入联系地址"
						/>
						<van-button
							type="default"
							size="default"
							class="fullButton"
							@click="saveEms"
							>暂存</van-button
						>
					</template>
				</div>
				<div
					style="border-bottom: 1px solid #333;margin-top:.5rem;width:2.5rem;font-size:.6rem;font-weight: bolder"
				>
					附件信息
				</div>
				<div style="width:100%;border-top: 1px solid #bbb;"></div>
				<table>
					<tr>
						<td>附件名称</td>
						<td></td>
					</tr>
					<template v-for="(qd, index) in formData.FJQD">
						<tr :key="index">
							<td>{{ qd.ZLMC }}</td>
							<td v-if="viewType == 1" style="width:4.6rem">
								<van-button
									v-if="isUpload(qd.ZLMC)"
									@click="uploadImg(index)"
									type="info"
									size="small"
									>上传</van-button
								>
								<van-button
									style="float:right;margin-right:.2rem"
									:disabled="qd.FPATH == null ? true : false"
									@click="viewImg(qd.FPATH, qd.ZLMC)"
									type="info"
									size="small"
									>预览</van-button
								>
								<input
									:ref="'getPhoto' + index"
									@change="
										postImg('getPhoto' + index, qd.ZLMC)
									"
									v-if="isUpload(qd.ZLMC)"
									style="display:none;"
									type="file"
									id="upload"
									accept="image/*"
									size="30"
								/>
							</td>
							<td v-if="viewType == 0" style="width:2.2rem">
								<van-button
									style="float:right;margin-right:.2rem"
									:disabled="qd.FPATH == null ? true : false"
									@click="viewImg(qd.FPATH, qd.ZLMC)"
									type="info"
									size="small"
									>预览</van-button
								>
							</td>
						</tr>
					</template>
				</table>

				<div
					v-if="viewType == 1"
					style="margin: 10px 0px;text-align:center"
				>
					<div class="home_approve_container">
						<div class="home_approve">
							<div
								class="message_check_box"
								@click="aggreeOnChange"
							>
								<span
									:class="{
										message_check: true,
										message_isCheck: ckAggree
									}"
								></span>
							</div>
							本人同意将附件材料作为一手房办证的申请材料
						</div>
					</div>
					<van-button
						type="default"
						size="default"
						class="fullButton"
						:disabled="!ckAggree"
						@click="sublitBusiness"
						>提交</van-button
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Head from "@/components/app/head.vue";
import QRCode from "qrcode";
import axios from "axios";
import qs from "qs";
import wimg from "w-previewimg";
import lrz from "lrz";
import { Toast, Dialog, Radio, RadioGroup } from "vant";
export default {
	name: "businessView",
	data() {
		return {
			formData: {
				SQBH: "",
				QQJID: "",
				GFRMC: "",
				GFRZJHM: "",
				LXDH: "",
				LXR: "",
				HTBH: "",
				BDCZL: "",
				FJZMJ: "",
				FJQD: [],
				ALLGFRXX: [],
				FWBM: "",
				YWJD: ""
			},
			viewType: -1, //视图类型 0：预览  1：在线申请
			showQrcode: false,
			imgPath: [
				"/view/preview/201911/proveWeChat/身份证明材料/2019110600031/18e39ca3-eaea-4638-9173-294ea16542ad.jpg"
			],
			showImg: false,
			headerImage: "",
			picValue: "",
			current: "",
			nowUser: { LXR: "", LXDH: "", SIGNLINK: "" }, //纪律当前登录的账户信息
			currentIndex: -1, //附件上传所在的附件列表
			isDelete: false, //控制是否可以删除附件
			currentFilePath: "", //预览的文件宏路径
			preViewZlmc: "", //当前预览的资料名称
			ckAggree: false, //同意提交
			ems: {
				FDXLXR: "",
				FDXTZDH: "",
				FDZ: "",
				FSFKDJZ: "否"
			}
		};
	},
	components: {
		"page-head": Head,
		wimg
	},
	methods: {
		saveEms: function() {
			let _this = this;
			if (!_this.ems.FDXLXR) {
				Toast("联系人不能为空！");
				return;
			}
			if (!_this.ems.FDXTZDH) {
				Toast("联系电话不能为空！");
				return;
			}
			if (!_this.ems.FDZ) {
				Toast("联系地址不能为空！");
				return;
			}
			let params = {
				jid: _this.formData.SQBH,
				flag: _this.ems.FSFKDJZ,
				emsContact: _this.ems.FDXLXR,
				emsPhoneNumber: _this.ems.FDXTZDH,
				emsAddress: _this.ems.FDZ
			};
			Toast.loading({
				duration: 0,
				mask: true,
				message: "正在暂存..."
			});
			_this
				.$post(
					"/workflowWebService/public/saveEms",
					qs.stringify(params)
				)
				.then(response => {
					if (response.code == 1) {
						Toast.clear();
						Toast("暂存成功！");
					} else {
						Toast.clear();
						Toast(response.message);
					}
				})
				.catch(error => {
					Toast.clear();
					Toast("服务器请求错误!");
				});
		},
		kdjzchange: function(val) {
			if (
				val == "是" &&
				this.ems.FDXLXR == "" &&
				this.ems.FDXTZDH == ""
			) {
				this.ems.FDXLXR = this.nowUser.LXR;
				this.ems.FDXTZDH = this.nowUser.LXDH;
			}
		},
		aggreeOnChange: function() {
			this.ckAggree = !this.ckAggree;
		},
		isUpload(fileListName) {
			fileListName = fileListName.replace(/\s+/g, "");
			let loginName = this.$store.getters.getPersonCardInfo.cardName;
			loginName = loginName.replace(/\s+/g, "");
			let isUser = fileListName == "身份证明材料_" + loginName; //"身份证明材料_" + this.nowUser.LXR;
			return isUser;
		},
		deleteFile() {
			let _this = this;
			/*debugger;
			console.log(this.imgPath);
			console.log(this.$refs.viewImgShow.current);
			return;*/
			let paths = _this.currentFilePath.split("::");
			let params = {
				fpath: paths[_this.$refs.viewImgShow.currentIndex],
				jid: _this.formData.SQBH,
				materialName: _this.preViewZlmc
			};
			Toast.loading({
				duration: 0,
				mask: true,
				message: "正在删除..."
			});
			_this
				.$post(
					"/gdbdcWebService/public/personalBusiness/delectFileWeChat",
					qs.stringify(params)
				)
				.then(response => {
					if (response.code == 0) {
						Toast.clear();
						let arrFile = new Array(_this.imgPath);
						arrFile[0].splice(
							_this.$refs.viewImgShow.currentIndex,
							1
						);
						_this.imgPath = arrFile[0];

						if (_this.imgPath.length == 0) {
							_this.showImg = false;
						}
						let showIndexImg =
							_this.$refs.viewImgShow.currentIndex > 0
								? _this.$refs.viewImgShow.currentIndex - 1
								: 0;
						_this.$refs.viewImgShow.current =
							_this.imgPath[showIndexImg];
						_this.$refs.viewImgShow.currentImg =
							_this.imgPath[showIndexImg];
						_this.$refs.viewImgShow.currentIndex = showIndexImg;
						let fjqd = _this.formData.FJQD;
						for (var i = 0; i < fjqd.length; i++) {
							if (_this.preViewZlmc == fjqd[i].ZLMC) {
								fjqd[i].FPATH = response.result
									? response.result
									: null;
								_this.currentFilePath = response.result
									? response.result
									: null;
							}
						}
						Toast("删除成功！");
					} else {
						Toast.clear();
						Toast(response.msg);
					}
				})
				.catch(error => {
					Toast.clear();
					Toast("服务器请求错误!");
				});
		},
		downloadFiel() {
			let _this = this;
			_this
				.$http({
					method: "get",
					url:
						"/gdbdcWebService/public/personalBusiness/downLoadCertification?qqJid=" +
						_this.formData.SQBH +
						"&materialName=申请人身份证明" //headers:{'Content-Type':'application/x-download'}, //responseType: 'blob',
				})
				.then(function(res) {
					let resultData = res.data;
					if (resultData.code == 1) {
						//window.top.location.href=resultData.url;
						_this.$router.push({
							path: "/fileDownload",
							query: {
								fileUrl: resultData.url
							}
						});
						//window.open(resultData.url);
					} else {
						Toast(resultData.msg);
					} /* let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
                        　　let link = document.createElement('a');
                        　　link.style.display = 'none';
                        　　link.href = url;
                            link.download= '电子证照.pdf'; //docNumber 动态文件名
                        　　document.body.appendChild(link);
                        　　link.click();*/
				});
		},
		uploadImg(index) {
			this.currentIndex = index;
			document.getElementById("upload").click();
		},
		//获取并设置预览图
		async setViewPath(filePath) {
			let _this = this;
			_this.imgPath = [];
			Toast.loading({
				duration: 0,
				mask: true,
				message: "加载中..."
			});
			let filepaths = [];
			if (filePath.indexOf("::") > -1) {
				filepaths = filePath.split("::");
			} else {
				filepaths.push(filePath);
			}
			for (var i = 0; i < filepaths.length; i++) {
				let fileAllPath = filepaths[i].split("|");
				let fileMacroPath = fileAllPath[1];
				let isBack = false;
				let params = { rebuild: 1, macroPath: fileMacroPath };
				await _this
					.$post(
						"/formengineWebService/public/preview",
						qs.stringify(params)
					)
					.then(response => {
						if (response.code == 0) {
							let resultFile = response.result;
							for (
								var resultIndex = 0;
								resultIndex < resultFile.length;
								resultIndex++
							) {
								let resultFileType = resultFile[
									resultIndex
								].substring(
									resultFile[resultIndex].lastIndexOf("."),
									resultFile[resultIndex].length
								);
								resultFileType = resultFileType.toLowerCase();
								if (
									resultFileType == ".jpg" ||
									resultFileType == ".jpeg" ||
									resultFileType == ".png" ||
									resultFileType == ".gif"
								) {
									_this.imgPath.push(resultFile[resultIndex]);
								} else {
									if (i == 0) {
										isBack = true;
										Toast.clear();
										_this.$router.push({
											path: "/fileDownload",
											query: {
												fileUrl: resultFile[resultIndex]
											}
										});
										//window.top.location.href=resultFile[resultIndex];
									}
								}
							}
						}
					})
					.catch(error => {
						Toast.clear();
						Toast("服务器请求错误!");
						console.log(error);
					});
				if (isBack) {
					return;
				}
			}
			if (_this.imgPath.length > 0) {
				_this.current = _this.imgPath[0];
				_this.showImg = !this.showImg;
				Toast.clear();
			} else {
				Toast("文件转换出错!");
			}
		},
		//图片上传方法
		submitModify(form) {
			let _this = this;
			Toast.loading({
				duration: 0,
				mask: true,
				message: "正在上传..."
			});
			this.$post(
				"/gdbdcWebService/public/personalBusiness/uploadProve",
				form,
				{
					"Content-Type": "multipart/form-data;charset=UTF-8"
				}
			)
				.then(response => {
					if (response.code == 1) {
						_this.formData.FJQD[_this.currentIndex].FPATH =
							response.sFullFilePath;
						let filePath = response.sFullFilePath;
						let filepaths = [];
						if (filePath.indexOf("::") > -1) {
							filepaths = filePath.split("::");
						} else {
							filepaths.push(filePath);
						}
						for (var i = 0; i < filepaths.length; i++) {
							let fileAllPath = filepaths[i].split("|");
							let params = {
								rebuild: 1,
								macroPath: fileAllPath[1]
							};
							_this
								.$post(
									"/formengineWebService/public/preview",
									qs.stringify(params)
								)
								.then(response => {})
								.catch(error => {});
						}
						Toast.clear();
						Toast("上传成功!");
					} else {
						Toast.clear();
						Toast("上传失败!");
					}
				})
				.catch(error => {
					Toast.clear();
					Toast("服务器错误!");
					console.log(error);
				});
		},
		dataURLtoFile(dataurl, filename) {
			var arr = dataurl.split(","),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new File([u8arr], filename, { type: mime });
		},
		//上传图片设置form
		async postImg(node, zlmc) {
			let _this = this;
			//这里写接口
			let $node = this.$refs[node];
			var file = $node[0].files; //获取当前选择的照片
			let formData = new FormData();
			if (file.length == 0) return;
			Toast.loading({
				duration: 0,
				mask: true,
				message: "图片处理中..."
			});
			for (var i = 0; i < file.length; i++) {
				await lrz(file[i], { quality: 0.3 })
					.then(function(rst) {
						//成功时执行
						let newFile = _this.dataURLtoFile(
							rst.base64,
							file[i].name
						);
						formData.append("multipartFile", newFile);
					})
					.catch(function(error) {
						//失败时执行
						console.error(error);
					})
					.always(function() {
						//不管成功或失败，都会执行
					});
			}
			Toast.clear();
			formData.append("jid", _this.formData.SQBH);
			formData.append("materialName", zlmc);
			_this.submitModify(formData); //上传方法
			/* let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            let img = new Image();
            img.onload = function () {
　　　　　　    img.src = e.target.result;
            let data = compress(img);
            let blob = dataURItoBlob(data);
            }
        };*/
		},
		//设置图片预览路径显示图片
		viewImg(path, zlmc) {
			zlmc = zlmc.replace(/\s+/g, "");
			let loginName = this.$store.getters.getPersonCardInfo.cardName;
			loginName = loginName.replace(/\s+/g, "");
			if (zlmc == "身份证明材料_" + loginName) {
				this.isDelete = true;
			} else {
				this.isDelete = false;
			}
			if (path) {
				this.preViewZlmc = zlmc;
				this.currentFilePath = path;
				this.setViewPath(path);
			} else {
				Toast("无附件可预览!");
			}
		},
		//隐藏二维码
		hide() {
			let _this = this;
			_this.showQrcode = false;
		},
		//提交数据
		sublitBusiness() {
			let _this = this;
			if (!_this.nowUser.LXR) {
				Toast("联系人不能为空!");
				return;
			}
			if (!_this.nowUser.LXDH) {
				Toast("联系电话不能为空!");
				return;
			}
			if (_this.ems.FSFKDJZ == "是") {
				if (!_this.ems.FDXLXR) {
					Toast("寄件联系人不能为空！");
					return;
				}
				if (!_this.ems.FDXTZDH) {
					Toast("寄件联系电话不能为空！");
					return;
				}
				if (!_this.ems.FDZ) {
					Toast("寄件联系地址不能为空！");
					return;
				}
			}
			Toast.loading({
				duration: 0,
				mask: true,
				message: "数据提交中..."
			});
			let json = {
				OLDJID: _this.formData.QQJID,
				JID: _this.formData.SQBH,
				FWBM: _this.formData.FWBM
			};
			let params = {
				contractNumber: _this.formData.HTBH,
				strJson: JSON.stringify(json),
				idCard: _this.$store.getters.getPersonCardInfo.cardCode,
				contact: _this.nowUser.LXR,
				phoneNumber: _this.nowUser.LXDH,
				flag: _this.ems.FSFKDJZ,
				emsContact: _this.ems.FDXLXR,
				emsPhoneNumber: _this.ems.FDXTZDH,
				emsAddress: _this.ems.FDZ
			};
			var resultData = null;
			_this
				.$post(
					"/workflowWebService/public/businessSubmit",
					qs.stringify(params)
				)
				.then(response => {
					if (response.errcode == "1") {
						_this.viewType = 0;
						Toast.clear();
						Toast("提交成功!");
					} else {
						Toast.clear();
						Toast(response.message);
					}
				})
				.catch(error => {
					Toast.clear();
					Toast("服务器请求错误!");
					console.error(error);
				});
		},
		//设置二维码
		qrcode() {
			let _this = this;
			//var canvas = document.getElementById('canvas')
			var opts = {
				errorCorrectionLevel: "H",
				type: "image/jpeg",
				quality: 0.3,
				margin: 1,
				color: {
					dark: "#000000",
					light: "#ffffff"
				}
			};
			let text = this.nowUser.SIGNLINK; // 二维码地址
			QRCode.toDataURL(text, opts, function(error, url) {
				if (error) console.error(error);
				var img = document.getElementById("arcodeImg");
				img.src = url;
				console.log("QRCode success!");
				_this.showQrcode = true;
			});
		}
	},
	mounted() {
		let _this = this;
		Toast.loading({
			duration: 0,
			mask: true,
			message: "加载中..."
		});
		let htbh = _this.$route.query.HTBH;
		let bcode = _this.$route.query.BCODE;
		this.$fetch(
			"/workflowWebService/public/getBusiness?code=" +
				_this.$route.query.BCODE +
				"&contractNumber=" +
				_this.$route.query.HTBH +
				"&createType=2"
		)
			.then(response => {
				if (response.resultcode == 1) {
					let user = _this.$store.getters.getPersonCardInfo.cardName;
					let cardCode =
						_this.$store.getters.getPersonCardInfo.cardCode;
					if (
						response.resultdata.YWJD == "预申请" ||
						response.resultdata.YWJD == "待申请" ||
						response.resultdata.YWJD == "预受理" ||
						!response.resultdata.YWJD
					) {
						_this.viewType = 1;
					} else {
						_this.viewType = 0;
					}
					_this.formData = response.resultdata;
					_this.ems = response.resultdata.SJDJB;
					let allgfr = _this.formData.ALLGFRXX;
					for (var i = 0; i < allgfr.length; i++) {
						if (
							allgfr[i].GFRMC == user &&
							allgfr[i].GFRZJHM == cardCode
						) {
							_this.nowUser = allgfr[i];
						}
					}
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
};
</script>
<style scoped>
/*通用的蓝色按钮*/
.fullButton {
	display: block !important;
	width: 90% !important;
	margin: 0 auto !important;
	font-weight: bold !important;
	letter-spacing: 2px !important;
	border-radius: 5px !important;
	background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	color: #ffffff !important;
}
.fromTable {
	width: 100%;
	padding-left: 0.1rem;
	padding-right: 0.1rem;
}
.fromTable table {
	border-bottom: 1px solid #bbb;
	width: 100%;
}
.fromTable table tr {
	border-top: 1px solid #bbb;
	height: 46px;
}
.fromTable table tr td {
	font-size: 0.5rem;
}
.fromTable .title {
	border-right: 1px solid #bbb;
	text-align: center;
	width: 2.3rem;
}
.fromTable .count {
	padding-left: 0.2rem;
	word-wrap: break-word;
	word-break: break-all;
	white-space: normal;
	max-width: calc(100%-2.3rem);
}
.fromTable .count .van-cell {
	border: solid 1px #dfdfdf;
}
.fromTable .count-defult {
	padding-left: 0.2rem;
	color: #999;
}
.blue-button {
	background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	color: #ffffff !important;
}
.qrCodeBox {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 999;
	background: rgba(0, 0, 0, 0.5);
}
.viewImgBox {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 999;
	background: rgba(0, 0, 0, 0.5);
	text-align: center;
}
.btnAddr {
	position: fixed;
	bottom: 0.3rem;
	left: calc(50% - 29px);
}
.viewImgBox img {
	max-width: 90%;
}
.qrCode {
	z-index: 999;
	margin-left: calc(50% - 100px);
	margin-top: 5rem;
	position: relative;
	display: inline-block;
	background-color: #fff;
	padding: 8px;
}
.hrefText {
	color: #fff;
	width: 100%;
	text-align: center;
	padding-top: 0.2rem;
	font-size: 0.5rem;
	font-weight: bolder;
}

.show {
	width: 100px;
	height: 100px;
	overflow: hidden;
	position: relative;
	border-radius: 50%;
	border: 1px solid #d5d5d5;
}
.picture {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
}
.home_approve_container {
	position: relative;
	width: 100%;
	text-align: center;
	height: 32px;
}

.message_check_box {
	width: 30px;
	height: 25px;
	display: inline-block;
}

.message_check {
	padding: 0 8px;
	border-radius: 20px;
	border: 1px solid #9a9a9a;
}

.message_isCheck {
	border: none;
	background-image: url("../../../public/images/home/icon_gouxuan@2x.png");
	background-repeat: no-repeat;
	background-size: 16px 16px;
}
.checkType {
}
</style>
