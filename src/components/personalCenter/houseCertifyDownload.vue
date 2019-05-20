<template>
	<div class="house-certify-download">
		<page-head :title="title"></page-head>
	</div>
</template>

<script>

	import Head from '../app/head';

	import { request } from '../../utils/http';
	import { Dialog } from 'vant'


	import pdf from '../../utils/pdf'
	import Vue from 'vue'
	Vue.use(pdf);

	export default {
		components: {
			'page-head': Head
		},
		data () {
			return {
				title: '住房证明查询',
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
						const showMultiPage = false;	// 只显示一页pdf
						_this.$showPDF({ data: 'data:application/pdf;base64,' + atob(response.cqxx) }, showMultiPage);
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
