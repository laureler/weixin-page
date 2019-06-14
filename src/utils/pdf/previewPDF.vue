<template>
	<div class="preview-pdf">
		<canvas :class="newClass" ref="canvas"></canvas>
		<div class="foot" v-if='pdfObj && pdfObj.numPages > 1'>
			<van-button class='pdf-btn' size="small" v-if="pageNum>1" @click="onPrevPage">上一页</van-button>
			<van-button class='pdf-btn' size="small" v-if="pageNum<pdfObj.numPages" @click="onNextPage">下一页</van-button>
		</div>
		<div class="flex-btn">
			<van-button class='pdf-btn' size="small" @click="scalePlus" >放大</van-button>
			<van-button class='pdf-btn' size="small" @click="subScale">缩小</van-button>
		</div>
	</div>
</template>
<script>

	import PDFJS from 'pdfjs-dist'

	export default {
		name: 'preview-pdf',
		props: {
			obj: ''
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

				newClass: 'pdf-content'
			}
		},
		methods: {
			showPDF (obj) {
				let _this = this;

				PDFJS.getDocument(obj).then(pdf => {
					_this.pdfObj = pdf;
					if (pdf.numPages <= 1) {
						_this.newClass = 'new-pdf-content';
					}
					_this.renderPage(1);
				});
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
				console.log(this.scale);
				this.scale = this.scale + 0.1;
			},
			// 缩小
			subScale () {
				console.log(this.scale);
				if (this.scale > 1.2) {
					this.scale = this.scale - 0.1;
				}
			}
		},
		beforeRouteLeave (to, from, next) {
			console.log('daaaa');
		},
	}
</script>

<style scoped>
	.preview-pdf {
		position: fixed;
		width: 100%;
		overflow: auto;
		text-align: center;
		top: 50px;
		left: 0;
		padding: 0;
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

	.flex-btn {
		position: fixed;
		right: 0;
		display: none;
	}

</style>
