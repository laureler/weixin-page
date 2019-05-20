<template>
	<div class="container">
		<canvas :class="newClass" id="canvas"></canvas>
		<div class="foot" v-if='showMultiPage && pdfObj && pdfObj.numPages > 1'>
			<van-button class='pdf-btn' size="small" v-if="pageNum>1" @click="onPrevPage">上一页</van-button>
			<van-button class='pdf-btn' size="small" v-if="pageNum<pdfObj.numPages" @click="onNextPage">下一页</van-button>
		</div>
	</div>
</template>
<script>

	import PDFJS from 'pdfjs-dist'

	export default {
		data () {
			return {
				showMultiPage: true,
				pdfObj: null,

				pageNum: 1,
				pageRendering: false,
				pageNumPending: null,

				newClass: 'pdf-content'
			}
		},
		methods: {
			showPDF (url, showMultiPage) {
				let _this = this;

				if (!showMultiPage) {
					_this.newClass = 'new-pdf-content';
					_this.showMultiPage = showMultiPage;
				}
				PDFJS.getDocument(url).then(pdf => {
					_this.pdfObj = pdf;
					_this.renderPage(1);
				});
			},
			renderPage (num) {
				const _this = this;
				this.pageRendering = true;
				this.pdfObj.getPage(num).then(pdf => {
					var viewport = pdf.getViewport(0.9);
					let canvas = document.getElementById('canvas');
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					// Render PDF page into canvas context
					var renderContext = {
						canvasContext: canvas.getContext('2d'),
						viewport: viewport
					}
					var renderTask = pdf.render(renderContext);

					// Wait for rendering to finish
					renderTask.promise.then(() => {
						_this.pageRendering = false;
						if (_this.pageNumPending !== null) {
							// New page rendering is pending
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
			}
		}
	}
</script>

<style scoped>
	.container {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		text-align: center;
		top: 0;
		left: 0;
		padding: 0;
		background-color: rgba(0, 0, 0, 0.75);
	}

	.pdf-content {
		width: 100%;
		height: calc(100% - 40px);
	}

	.new-pdf-content {
		width: 100%;
		height: 100%;
	}

	.foot {
		position: fixed;
		transform: translate(-50%, 0);
		left: 50%;
	}

	.pdf-btn {
		margin: 0 5px;
	}

</style>
