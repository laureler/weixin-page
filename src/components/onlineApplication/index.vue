<!--
 * @Author: charls.fairy
 * @Motto: Your smile is my rainbow.
 * @Website: https://www.fairy520.top/
 * @Github: https://github.com/CharlsPrince
 * @Date: 2019-10-16 19:32:10
 * @LastEditors: charls.fairy
 * @LastEditTime: 2019-10-23 14:20:26
 * @Description: 在线申办入口
 -->
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
	import { businessList } from '../../constants/data-util';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				list: businessList,
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
		},
		created() {
			sessionStorage.clear();
		},
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
