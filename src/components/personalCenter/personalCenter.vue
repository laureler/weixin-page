<template>
	<!-- 个人中心首页 -->
	<div class="personal-center">
		<page-head title="个人中心"></page-head>
		<div class="personal-center-content">
			<!-- 两端对齐 -->
			<div v-for="(column, key) in columns" class="content-tab-div" @click="open(column.path)">
				<div v-if="column.iconUrl">
					<img src="../../../public/images/wechatstatic/personal-center.png" class="img"/>
				</div>
				<div v-else>
					<img src="../../../public/images/wechatstatic/personal-center.png" class="img"/>
				</div>
				<div class="content-text content-title">
					<span>
						{{column.title}}
					</span>
				</div>
			</div>
		</div>
		<!--<canvas v-if="isShowPDF" v-for="n in totalPage" :id="'canvas' + n" class="pdf-content"></canvas>-->
		<!--<canvas v-if="isShowPDF" id="canvas" class="pdf-content"></canvas>-->
		<!--<div id="pdf" v-show="isShowPDF" style="width: 100%;height: 100%;">
			&lt;!&ndash;<canvas id="canvas" style="width: 100%;height: 100%;"></canvas>&ndash;&gt;
			<pdf ref="pdf" :src="pdfURL" ></pdf>
		</div>-->
	</div>
</template>

<script>

	import Head from '../app/head'

	import { request } from '../../utils/http';
	import { Toast } from 'vant'

	const BASE64 = require('js-base64').Base64
	import PDFJS from 'pdfjs-dist';
	import pdf from 'vue-pdf'


	export default {
		components: {
			'page-head': Head,
			pdf,
			PDFJS
		},
		data () {
			return {
				columns: [
					/*{
						title: '住房证明查询',
						path: 'FirstHouseQuery',
						iconUrl: ''
					},*/
				],

				pdfURL: '',
				pdfData: '',
				pages: '',
				totalPage: '',
				isShowPDF: false,
			}
		},
		methods: {
			open (path) {
				const _this = this;

				// 如果是住房证明查询，直接请求获取PDF
				if (path === 'FirstHouseQuery') {
					let qlr = _this.$store.getters.getPersonCardInfo.cardName;
					let zjhm = _this.$store.getters.getPersonCardInfo.cardCode;

					let strJson = JSON.stringify({
						'qlr': qlr,
						'zjhm': zjhm,
						'returnbyte': true
					});

					request({
						url: '/FirstHouseQuery',
						data: { strJson: strJson },
						success(response) {
							if (Number(response.resultcode) === 1) {
								let pdfData = atob(response.cqxx);

								// var downLoad =  document.querySelectorAll('#pdf a')[0];
								// var blob = _this.getBlob('data:application/pdf;base64,' + response.cqxx);
								// window.open('/pdf/web/viewer.html?file=' + URL.createObjectURL(blob))
								// window.location.href = '/pdf/web/viewer.html?file=' + URL.createObjectURL(blob);

								_this.pdfURL = pdf.createLoadingTask('/index.pdf')

								/*PDFJS.getDocument({ data: pdfData }).then(pdf => {
									var numPages = pdf.numPages;
									var start = 1;
									_this.renderPage(pdf, numPages, start);
								});*/



								_this.isShowPDF = true;
							} else {
								Toast(response.resultmsg);
							}
						},
						fail(error) {
							console.log(error);
						}
					})
				} else {
					_this.$router.push(path);
				}
			},
			getBlob(base64) {
					console.log(this.getContentType(base64))
					return this.b64toBlob(this.getData(base64), this.getContentType(base64));
				},
			getContentType(base64) {
				return /data:([^;]*);/i.exec(base64)[1];
			},

			getData(base64) {
				return base64.substr(base64.indexOf("base64,") + 7, base64.length);
			},

			b64toBlob(b64Data, contentType, sliceSize) {
				contentType = contentType || '';
				sliceSize = sliceSize || 512;

				var byteCharacters = atob(b64Data);
				var byteArrays = [];

				for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
					var slice = byteCharacters.slice(offset, offset + sliceSize);

					var byteNumbers = new Array(slice.length);
					for (var i = 0; i < slice.length; i++) {
						byteNumbers[i] = slice.charCodeAt(i);
					}

					var byteArray = new Uint8Array(byteNumbers);

					byteArrays.push(byteArray);
				}

				var blob = new Blob(byteArrays, { type: contentType });
				return blob;
			},
			renderPage(pdf, numPages, current){
				console.log("renderPage");
				for(var i=1; i<=numPages; i++){
					pdf.getPage(i).then(page => {
						let scale = 1.5;
						let viewport = page.getViewport(scale);
						// Prepare canvas using PDF page dimensions.
						let canvas = document.createElement("canvas");
						let context = canvas.getContext('2d');
						document.body.appendChild(canvas);

						canvas.height = viewport.height;
						canvas.width = viewport.width;

						let renderContext = {
							canvasContext: context,
							viewport: viewport
						};
						page.render(renderContext);
					});
				}
				console.log("renderPage end");
			},
			showPDF() {
				var DEFAULT_URL = "";
				var pdfUrl =document.location.search.substring(1);
				if(null == pdfUrl || "" == pdfUrl){
					var BASE64_MARKER = ';base64,';//声明文件流编码格式
					var preFileId = "";
					var pdfAsDataUri = "";
					var pdfAsDataUri = sessionStorage.getItem("_imgUrl");//这里就是pdf文件的base64码，我是通过session传递base64的
					var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
					DEFAULT_URL = pdfAsArray;
					this.convertDataURIToBinary()
				}
			},
			convertDataURIToBinary(dataURI) {   // 编码转换
				let raw = window.atob(dataURI);	// 这个方法在ie内核下无法正常解析。
				let rawLength = raw.length;
				// 转换成pdf.js能直接解析的Uint8Array类型
				let array = new Uint8Array(new ArrayBuffer(rawLength));
				for (i = 0; i < rawLength; i++) {
					array[i] = raw.charCodeAt(i) & 0xff;
				}
				return array;
			}
		},
		mounted () {
			const _this = this;
			let userId = _this.$store.getters.getIbaseAccountId;
			// let userId = '0e1c5c85-23d8-4576-af58-c47dd8112cc8';
			_this.$fetch('/pubWeb/public/getWeChatPersonalMenus').then(data => {
				for (let i = 0, len = data.length; i < len; i++) {
					_this.columns.push({
						title: data[i].text,
						path: data[i].attributes.path,
						iconUrl: data[i].attributes.iconUrl
					})
				}

			});
		},
	}
</script>

<style scoped>
	.personal-center {
		text-align: center;
	}

	.content-tab-div {
		float: left;
		margin: 20px 20px;
		width: calc(50% - 40px);
		padding: 10px 0;
		border: 1px solid #E9E9E9;
		border-radius: 8px;
	}

	.content-text {
		width: 100%;
		padding: 2px 0;
		text-align: center;
	}

	.content-title {
		font-weight: bold;
	}
</style>
