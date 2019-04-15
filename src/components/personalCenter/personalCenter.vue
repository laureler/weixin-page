<template>
	<!-- 个人中心首页 -->
	<div class="personal-center">
		<head-nav-bar title="个人中心"></head-nav-bar>
		<div class="personal-center-content">
			<!-- 两端对齐 -->
			<div v-for="(column, key) in columns" class="content-tab-div" @click="open(column.path)">
				<div>
					<img src="../../../public/images/wechatstatic/personal-center.png" class="img"/>
				</div>
				<div class="content-text content-title">
					<span>
						{{column.title}}-{{key+1}}
					</span>
				</div>
				<div class="content-text content-sub-title">
					<span>
						{{column.subTitle}}-{{key+1}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import headNavBar from './headNavBar'

	export default {
		components: {
			'head-nav-bar': headNavBar,
		},
		data () {
			return {
				columns: [
					{
						title: '住房证明查询',
						subTitle: '副标题',
						path: '',
						icon: ''
					},
					{
						title: '标题',
						subTitle: '副标题',
						path: '',
						icon: ''
					},
					{
						title: '我的不动产',
						subTitle: '副标题',
						path: '',
						icon: ''
					},
					{
						title: '标题',
						subTitle: '副标题',
						path: '',
						icon: ''
					},
					{
						title: '我的业务',
						subTitle: '副标题',
						path: '/personalBusiness',
						icon: ''
					},
					{
						title: '个人设置',
						subTitle: '副标题',
						path: '/personalSetting',
						icon: ''
					},
				],
			}
		},
		methods: {
			open (path) {
				this.$router.push(path);
			},
		},
		mounted () {
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
		height: auto;
		padding: 2px 0;
		text-align: center;
	}

	.content-title {
		font-weight: bold;
	}
</style>
