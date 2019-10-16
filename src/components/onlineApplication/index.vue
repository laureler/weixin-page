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
						<!-- <div class="cell-content-status">
							{{item2.path}}
						</div> -->
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
						groupTitle: "首次登记",
						groupCells: [{
							title: "房地产权（独幢、层、套、间房屋）首次登记",
							path: "/onlineApplication/FDCQSCDJ/bookIn",
							query: {
								businessDefinitionId: '713e39bd-b268-4b16-a1a7-a3251d2f28ea'
							}
						}]
					}, {
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
								businessDefinitionId: '3336a632-4581-42b0-ab87-b213302101b2'
							}
						}]
					},
					{
						groupTitle: "换证与遗失补发登记",
						groupCells: [{
							title: "不动产权利证书遗失（换证）登记",
							path: "/onlineApplication/BDCQSZSYSDJ/bookIn",
							query: {
								businessDefinitionId: '9ee6baf1-beef-4d08-9848-67f2d185da5a'
							}
						}]
					},
					{
						groupTitle: "其他登记",
						groupCells: [{
							title: "权籍调查申请",
							path: "/onlineApplication/QJDCSQ/info",
							query: {
								businessDefinitionId: '4606a31d-394f-4173-b0e9-0cf0aff05f75'
							}
						}]
					}
				],
				list2: [{
						groupTitle: "首次登记",
						groupCells: [{
							title: "房地产权（独幢、层、套、间房屋）首次登记",
							path: "/onlineApplication/FDCQSCDJ/bookIn",
							query: {
								businessDefinitionId: '7ce6d5d8-84ef-43a5-a94c-9142a1475608'
							}
						}]
					}, {
						groupTitle: "转移登记",
						groupCells: [{
							title: "建设用地使用权、宅基地使用权转移登记",
							path: "/onlineApplication/JSYDSYQZYDJ/bookIn",
							query: {
								businessDefinitionId: 'c3df913c-0044-4322-a6d3-a94af6170ae0'
							}
						}, {
							title: "房地产权（独幢、层、套、间房屋）转移登记",
							path: "/onlineApplication/FDCQZYDJ/bookIn",
							query: {
								businessDefinitionId: '51daf996-f6df-4022-9eea-c13c9f9a68e7'
							}
						}, {
							title: "存量房（二手房）转移登记",
							path: "/onlineApplication/CLFZYDJ/bookIn",
							query: {
								businessDefinitionId: 'e48125d5-c00f-4d38-9952-88fdd29af31b'
							}
						}]
					},
					{
						groupTitle: "变更登记",
						groupCells: [{
							title: "建设用地使用权、宅基地使用权变更登记",
							path: "/onlineApplication/JSYDSYQBGDJ/bookIn",
							query: {
								businessDefinitionId: '3ac7cf4e-57f6-4c78-8e91-a69e1630453f'
							}
						}, {
							title: "房地产（独幢、层、套、间房屋）变更登记",
							path: "/onlineApplication/FDCQBGDJ/bookIn",
							query: {
								businessDefinitionId: 'fc1d7008-bf8f-4819-9d6a-907378ec2d82'
							}
						}]
					},
					{
						groupTitle: "注销登记",
						groupCells: [{
							title: "不动产权利证书注销登记",
							path: "/onlineApplication/BDCQSZSZXDJ/bookIn",
							query: {
								businessDefinitionId: '4039e8c1-2a5e-457b-9ce2-8a4840dcc083'
							}
						}]
					},
					{
						groupTitle: "更正登记",
						groupCells: [{
							title: "不动产权利证书更正登记",
							path: "/onlineApplication/BDCQSZSGZDJ/bookIn",
							query: {
								businessDefinitionId: 'f6cd109c-265c-4c18-86ed-0bc390102d9e'
							}
						}]
					},
					{
						groupTitle: "异议登记",
						groupCells: [{
							title: "异议登记",
							path: "/onlineApplication/YYDJ/bookIn",
							query: {
								businessDefinitionId: '2758a993-cf21-4d9b-8cbd-e4cd1a24bf2f'
							}
						}, {
							title: "异议注销登记",
							path: "/onlineApplication/YYZXDJ/bookIn",
							query: {
								businessDefinitionId: '3336a632-4581-42b0-ab87-b213302101b2'
							}
						}]
					},
					{
						groupTitle: "换证与遗失补发登记",
						groupCells: [{
							title: "不动产权利证书遗失（换证）登记",
							path: "/onlineApplication/BDCQSZSYSDJ/bookIn",
							query: {
								businessDefinitionId: 'f9d2e956-4977-45f0-8106-214195c1a763'
							}
						}]
					},
					{
						groupTitle: "其他登记",
						groupCells: [{
							title: "权籍调查申请",
							path: "/onlineApplication/QJDCSQ/info",
							query: {
								businessDefinitionId: '17e849d7-a358-4b72-82cc-41fe01d5d7f3'
							}
						}]
					}
				]
			}
		},
		methods: {
			groupCellClicked: function (value) {
				console.log(value);
				if (value.path.length > 0) {
					sessionStorage.setItem('businessDefinitionId', value.query.businessDefinitionId);
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
