<template>
	<div class="house-certify-download">
		<page-head :title="title"></page-head>
		<canvas v-for="n in totalPage" :id="'pdf_canvas' + n" class="pdf-content"></canvas>

		<!--<canvas v-if="isShowPDF" id="pdf_canvas" class="pdf-content"></canvas>-->
		<!--<div id="pdf" v-show="isShowPDF" style="width: 100%;height: 100%;">
			&lt;!&ndash;<canvas id="canvas" style="width: 100%;height: 100%;"></canvas>&ndash;&gt;
			<pdf ref="pdf" :src="pdfURL" ></pdf>
		</div>-->
	</div>
</template>

<script>

	import Head from '../app/head';

	import { request } from '../../utils/http';
	import { Toast } from 'vant'

	import PDFJS from 'pdfjs-dist';

	export default {
		components: {
			'page-head': Head,
			PDFJS
		},
		data () {
			return {
				title: '住房证明查询',

				totalPage: '',
				loadedPageCount: 0,
			};
		},
		methods: {
			showPDF(pdfData) {
				const _this = this;
				PDFJS.getDocument({ data: pdfData }).then(pdf => {
					_this.totalPage = pdf.numPages;	// 总页数
					// 我是一次加载了所有页，网上一些是一页页加载的，因为我的pdf页数不多
					for(var i = 1; i <= _this.totalPage; i++) {
						pdf.getPage(i).then(page => {
							var scale = 1;	// 缩放倍数，1表示原始大小
							var viewport = page.getViewport(scale);
							var canvas = document.getElementById('pdf_canvas' + page.pageNumber);
							var context = canvas.getContext('2d');
							canvas.height = viewport.height;
							canvas.width = viewport.width;
							var renderContext = {
								canvasContext: context,
								viewport: viewport
							};
							page.render(renderContext).promise.then(function(){
								_this.loadedPageCount ++; // 加载一个+1，最后总数和totalPage一样了，表示pdf加载完了
							});
						});
					}
				}).catch(function(error){
					console.log(error);
					Toast('PDF暂时无法移动端预览，请在PC端查看!')
				});
			},

			getBlob(base64) {
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

			renderPage (num) {
				this.pageRendering = true
				let _this = this
				this.pdfDoc.getPage(num).then(function (page) {
					var viewport = page.getViewport(_this.scale)
					let canvas = document.getElementById('pdf_canvas')
					canvas.height = viewport.height
					canvas.width = viewport.width

					var renderContext = {
						canvasContext: canvas.getContext('2d'),
						viewport: viewport
					}
					var renderTask = page.render(renderContext)

					renderTask.promise.then(function () {
						_this.pageRendering = false
						if (_this.pageNumPending !== null) {
							// New page rendering is pending
							this.renderPage(_this.pageNumPending)
							_this.pageNumPending = null
						}
					})
				})
			},
			/*renderPage(pdf, numPages, current){
				console.log("renderPage");
				for(var i=1; i<=numPages; i++){
					pdf.getPage(i).then(page => {
						let scale = 1.5;
						let viewport = page.getViewport(scale);
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
			},*/
			convertDataURIToBinary(dataURI) {   // 编码转换
				var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
				var base64 = dataURI.substring(base64Index);
				let raw = window.atob(base64);
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

			this.title = this.$route.query.title;

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
						// window.open('/pdf/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(blob)))
						// window.location.href = '/pdf/web/viewer.html?file=' + window.URL.createObjectURL(blob);

						/*PDFJS.getDocument({ data: pdfData }).then(pdf => {
							var numPages = pdf.numPages;
							var start = 1;
							_this.renderPage(pdf, numPages, start);
						});*/

						_this.showPDF(pdfData);
					} else {
						Toast(response.resultmsg);
					}
				},
				fail(error) {
					console.log(error);
				}
			})
		}
	};

</script>

<style scoped>
	.house-certify-download {
		width: 100%;
		height: 100%;
	}

	.pdf-content {
		width: 100%;
	}
</style>
