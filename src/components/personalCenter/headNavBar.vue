<template>
	<!-- 个人中心头部导航栏 -->
	<div class="head-nav-bar">
		<van-nav-bar :title="title" left-text="返回" @click-left="goBack" left-arrow/>
	</div>
</template>

<script>

	export default {
		props: {
			title: {
				type: String,
				default: '',
			},
		},
		data () {
			return {

			}
		},
		methods: {
			goBack() {
				this.$router.back()
			},
		},
		mounted () {
		}
	};

</script>

<style scoped>

</style>
