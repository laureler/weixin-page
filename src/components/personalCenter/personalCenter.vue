<template>
	<!-- 个人中心首页 -->
	<div class="personal-center">
		<page-head title="个人中心"></page-head>
		<div class="personal-center-content">
			<!-- 两端对齐 -->
			<div v-for="(column, key) in columns" class="content-tab-div" @click="clickIntoNextPage(column.path, column.title)">
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
	</div>
</template>

<script>

	import Head from '../app/head'
	import { watermark } from '../../utils/waterLog'

	export default {
		components: {
			'page-head': Head,
		},
		data () {
			return {
				columns: [],

				pdfURL: '',
				pdfData: '',
				pages: '',
				isShowPDF: false,
			}
		},
		methods: {
			clickIntoNextPage (path, title) {
				this.$router.push({path: path, query: { title: title }});
			},
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
