<template>
	<!-- 个人中心 -->
	<div class="personal-home">

		<personal-center v-show="active==0"></personal-center>

		<personal-business v-show="active==1"></personal-business>

		<setting v-show="active==2"></setting>

		<tab-bar @getNewActive="getNewActive"></tab-bar>
	</div>
</template>

<script>

	import tabbar from './personalCenterTabbar'
	import personalCenter from './personalCenter'
	import personalBusiness from './personalBusiness'
	import personalSetting from './personalSetting'

	export default {
		components: {
			'tab-bar': tabbar,
			'personal-center': personalCenter,
			'personal-business': personalBusiness,
			'setting': personalSetting
		},
		data () {
			return {
				active: 0,
			}
		},
		mounted () {

		},
		methods: {
			open (path) {
				this.$router.push(path);
			},
			/*
				获取tab-bar下标
			 */
			getNewActive(index) {
				this.active = index;
			}
		},
	}
</script>

<style scoped>

</style>
