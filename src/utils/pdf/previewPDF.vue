<template>
	<div class="preview-pdf">
		<canvas :class="newClass" ref="canvas"></canvas>
		<footer v-if="pdfObj && showBtn" class="foot-btn">
			<div v-if="pageNum > 1" style="display: inline-block;">
				<van-button class='pdf-btn' size="small" @click="onPrevPage">上一页</van-button>
			</div>
			<van-button class='pdf-btn' size="small" @click="pdfDownload">下载</van-button>
			<!--<van-button class='pdf-btn' size="small" @click="scalePlus">放大</van-button>-->
			<div v-if="pageNum < pdfObj.numPages" style="display: inline-block;">
				<van-button class='pdf-btn' size="small" @click="onNextPage">下一页</van-button>
			</div>
		</footer>
	</div>
</template>
<script>

	import { Toast } from 'vant'

	import PDFJS from 'pdfjs-dist'

	export default {
		name: 'preview-pdf',
		props: {
			obj: '',
			showBtn: {
				type: Boolean,
				default: false
			},
		},
		watch: {
			obj: function (newVal) {
				if (!newVal) {
					this.pdfObj = null;
					return;
				}
				this.showPDF(newVal);
			}
		},
		data () {
			return {
				showMultiPage: true,
				pdfObj: null,

				pageNum: 1,
				scale: 2,
				pageRendering: false,
				pageNumPending: null,

				newClass: 'pdf-content',

				pdfUrl: ''
			}
		},
		methods: {
			showPDF (obj) {
				let _this = this;

				if (/base64/.test(obj)) {
					obj = { data: 'data:application/pdf;base64,' + atob(obj.substr(obj.indexOf("base64,") + 7, obj.length)) };
				}

				PDFJS.getDocument(obj).then(pdf => {
					_this.pdfObj = pdf;
					if (pdf.numPages <= 1) {
						_this.newClass = 'new-pdf-content';
					}
					_this.renderPage(1);
				});
			},
			pdfDownload() {
				let fileName = this.$store.getters.getPersonCardInfo.cardName || '';
				fileName = fileName + new Date().getTime() + '.pdf';

				if (!/base64/.test(this.obj)) {
					// 如果是url，直接下载
					window.location.href = this.obj;
					return;
				}

				let blob = this.getBlob(this.obj);

				// window.navigator.msSaveBlob：以本地方式保存文件
				if (typeof window.navigator.msSaveBlob !== 'undefined') {
					window.navigator.msSaveBlob(blob, fileName)
				} else {
					let objectUrl = this.pdfUrl;
					if (!this.pdfUrl) {
						// 创建新的URL表示指定的File对象或者Blob对象
						let URL = window.URL || window.webkitURL;
						objectUrl = URL.createObjectURL(blob);
						this.objectUrl = objectUrl;
					}
					this.createASignDownload(objectUrl, fileName);
				}
			},
			createASignDownload(objectUrl, fileName) {
				// 创建a标签用于跳转至下载链接
				let a = document.createElement('a');
				a.style.display = 'none';
				// download：指示浏览器下载URL而不是导航到它，也可设置下载文件的名称
				if (typeof a.download === 'undefined') {
					// window.location：获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
					window.location = objectUrl;
				} else {
					// href属性指定下载链接
					a.href = objectUrl;
					// download属性指定文件名
					a.download = fileName;
					// 将a标签插入body中
					document.body.appendChild(a);

					console.log(a);

					var event = document.createEvent("MouseEvents");
					event.initEvent("click", false, false);
					a.dispatchEvent(event);
					// 去除a标签，以免影响其他操作
					a.remove();
				}
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
				const _this = this;
				this.pageRendering = true;
				this.pdfObj.getPage(num).then(pdf => {
					var viewport = pdf.getViewport(_this.scale);
					let canvas = _this.$refs.canvas;
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					var renderContext = {
						canvasContext: canvas.getContext('2d'),
						viewport: viewport
					}
					var renderTask = pdf.render(renderContext);

					renderTask.promise.then(() => {
						_this.pageRendering = false;
						if (_this.pageNumPending !== null) {
							this.renderPage(_this.pageNumPending);
							_this.pageNumPending = null;
						}
					})
				})
			},
			queueRenderPage (num) {
				if (this.pageRendering) {
					this.pageNumPending = num;
				} else {
					this.renderPage(num);
				}
			},
			onPrevPage () {
				if (this.pageNum <= 1) {
					return
				}
				this.pageNum--;
				this.queueRenderPage(this.pageNum);
			},
			onNextPage () {
				if (this.pageNum >= this.pdfObj.numPages) {
					return
				}
				this.pageNum++;
				this.queueRenderPage(this.pageNum);
			},
			// 放大
			scalePlus () {

			},
			// 缩小
			subScale () {

			}
		}
	}
</script>

<style scoped>
	.preview-pdf {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		text-align: center;
		left: 0;
		padding: 0;
	}

	.pdf-content {
		width: 100%;
		height: calc(100% - 85px);
	}

	.new-pdf-content {
		width: 100%;
		height: calc(100% - 85px);
	}

	.pdf-btn {
		margin: 0 5px;
	}

	.foot-btn {
		width: 100%;
	}

</style>
