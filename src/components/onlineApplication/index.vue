<template>
	<div class="container">
		<page-head title="在线申办"></page-head>
		<div class="box-body">
			<van-cell-group class="group" :title="item.groupTitle" v-for="item in list" :key="item.groupTitle">
				<van-cell v-for="(item2, index) in item.groupCells" icon="shop-o" :value="item2.title" :key="index"
					@click.native="groupCellClicked(item2)">
					<div class="cell-content">
						<div class="cell-content-title">
							{{item2.title}}
						</div>
						<div class="cell-content-status">
							{{item2.path}}
						</div>
					</div>
					<van-icon slot="right-icon" name="arrow" class="custom-icon" />
				</van-cell>
			</van-cell-group>
		</div>
	</div>
</template>
<script>
	import Head from '../app/head.vue'
	import {
		Toast
	} from 'vant';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				list: [{
						groupTitle: "转移登记",
						groupCells: [{
							title: "建设用地使用权、宅基地使用权转移登记",
							path: "/onlineApplication/JSYDSYQZYDJ/bookIn",
							query: {
								businessDefinitionId: 'b07eb2ba-cbae-4a9f-bf94-d42be317ae99'
							}
						}, {
							title: "房地产权（独幢、层、套、间房屋）转移登记",
							path: "/onlineApplication/FDCQZYDJ/bookIn",
							query: {
								businessDefinitionId: 'F56304D5E5684EF7924E81818BDFB308'
							}
						}, {
							title: "存量房（二手房）转移登记",
							path: "/onlineApplication/CLFZYDJ/bookIn",
							query: {
								businessDefinitionId: 'CA57ECFB06B54BFBB5DFA61BAA4734DE'
							}
						}]
					},
					{
						groupTitle: "变更登记",
						groupCells: [{
							title: "建设用地使用权、宅基地使用权变更登记",
							path: "/onlineApplication/JSYDSYQBGDJ/bookIn",
							query: {
								businessDefinitionId: '8B5ED0B3A0E04DFFBED54D70451121F0'
							}
						}, {
							title: "房地产（独幢、层、套、间房屋）变更登记",
							path: "/onlineApplication/FDCQBGDJ/bookIn",
							query: {
								businessDefinitionId: '9745D08769364072820252BFE9E742F9'
							}
						}]
					},
					{
						groupTitle: "注销登记",
						groupCells: [{
							title: "不动产权利证书注销登记",
							path: "/onlineApplication/BDCQSZSZXDJ/bookIn",
							query: {
								businessDefinitionId: 'D782A0C92A4C40D1A37F36E13B4948BA'
							}
						}]
					},
					{
						groupTitle: "更正登记",
						groupCells: [{
							title: "不动产权利证书更正登记",
							path: "/onlineApplication/BDCQSZSGZDJ/bookIn",
							query: {
								businessDefinitionId: '067CBB502A974EB4ABC038AE704E0394'
							}
						}, {
							title: "不动产权利证明更正登记",
							path: ""
						}]
					},
					{
						groupTitle: "异议登记",
						groupCells: [{
							title: "异议登记",
							path: "/onlineApplication/YYDJ/bookIn",
							query: {
								businessDefinitionId: '8313104902AA48F1B685B2095A0EC2E5'
							}
						}, {
							title: "异议注销登记",
							path: "/onlineApplication/YYZXDJ/bookIn",
							query: {
								businessDefinitionId: '61C46D51F05D4703A1652A94AAF33870'
							}
						}]
					},
					{
						groupTitle: "首次登记",
						groupCells: [{
							title: "房地产权（独幢、层、套、间房屋）首次登记",
							path: "/onlineApplication/FDCQSCDJ/bookIn",
							query: {
								businessDefinitionId: '713e39bd-b268-4b16-a1a7-a3251d2f28ea'
							}
						}]
					},
					{
						groupTitle: "其他登记",
						groupCells: [{
								title: "不动产权属证书遗失（换证）登记",
								path: "/onlineApplication/BDCQSZSYSDJ/bookIn",
								query: {
									businessDefinitionId: '9ee6baf1-beef-4d08-9848-67f2d185da5a'
								}
							},
							{
								title: "不动产权属证明遗失（换证）登记",
								path: "",
								query: {}
							}
						]
					}
				]
			}
		},
		methods: {
			groupCellClicked: function (value) {
				console.log(value);
				if (value.path.length > 0) {
					this.$router.push({
						path: value.path,
						query: value.query
					});
				} else {
					Toast('功能尚未开发!');
				}
			}
		}
	}

</script>

<style scoped>
	.van-cell-group__title {
		background-color: #ffffff;
	}

	.group {
		margin-bottom: 10px;
	}

</style>
