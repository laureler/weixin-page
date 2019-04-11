<template>
	<!-- 个人中心 Tabbar 标签栏 -->
	<div class="personal-tab-bar">
		<van-tabbar v-model="active" active-color="#29A1F7">
			<template v-for="(column, index) in columns">
				<van-tabbar-item :icon="column.icon" @click="$emit('getNewActive', index)">{{column.name}}</van-tabbar-item>
			</template>
		</van-tabbar>
	</div>
</template>

<script>

	export default {
		data () {
			return {
				columns: [
					{
						name: '首页',
						icon: 'label'
					},
					{
						name: '业务',
						icon: 'comment'
					},
					{
						name: '个人',
						icon: 'manager'
					}
				],	// 标签栏项
				active: 0,
			}
		},
		methods: {

		},
	};

</script>

<style scoped>
	.personal-tab-bar {
		font-weight: bold;
	}
</style>
