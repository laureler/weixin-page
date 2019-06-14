<template>
	<div class="house-certify-download">
		<page-head :title="title"></page-head>
		<preview-pdf :obj="atobObj"></preview-pdf>
	</div>
</template>

<script>

	import Head from '../app/head';

	import { request } from '../../utils/http';
	import { Dialog } from 'vant'


	import previewPDF from '../../utils/pdf/previewPDF'

	export default {
		components: {
			'page-head': Head,
			'preview-pdf': previewPDF
		},
		data () {
			return {
				title: '住房证明查询',
				atobObj: ''
			};
		},
		methods: {
			dialogAlert(title, message) {
				Dialog.alert({
					title: title,
					message: message
				})
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
						_this.atobObj = { data: 'data:application/pdf;base64,' + atob(response.cqxx) };
					} else {
						_this.dialogAlert('提示', response.resultmsg);
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
</style>
