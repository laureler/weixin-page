<template lang="html">
	<div class="container">
		<page-head title="在线申办"></page-head>
		<div class="box-body">
			<van-cell-group class="group" title="转移登记">
				<van-cell value="建设用地使用权、宅基地使用权转移登记" />
				<van-cell value="房地产（独幢、层、套、间房屋）转移登记" />
				<van-cell value="存量房（二手房）转移登记" />
			</van-cell-group>
			<van-cell-group class="group" title="变更登记">
				<van-cell value="建设用地使用权、宅基地使用权变更登记" />
				<van-cell value="房地产（独幢、层、套、间房屋）变更登记" />
			</van-cell-group>
			<van-cell-group class="group" title="注销登记">
				<van-cell value="不动产权利证书注销登记" />
			</van-cell-group>
			<van-cell-group class="group" title="更正登记">
				<van-cell value="不动产权利证书更正登记" />
				<van-cell value="不动产权利证明更正登记" />
			</van-cell-group>
			<van-cell-group class="group" title="异议登记">
				<van-cell value="异议登记" />
				<van-cell value="异议注销登记" />
			</van-cell-group>
			<van-cell-group class="group" title="其他登记">
				<van-cell value="不动产权属证书遗失（换证）登记" />
				<van-cell value="不动产权属证明遗失（换证）登记" />
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	import {
		Cell,
		CellGroup
	} from 'vant';
	import Head from '../app/head.vue'
	export default {
		components: {
			'page-head': Head,
			CellGroup,
			Cell
		},
	}

</script>

<style scoped>
  .van-cell-group__title {
    background-color: #ffffff;
  }
	.container {
		background-color: #F4F5F6;
	}

	.group {
		margin-bottom: 10px;
	}

</style>
