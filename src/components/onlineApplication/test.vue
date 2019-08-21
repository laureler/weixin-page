<template>
	<div class="container">
    <page-head title="test"></page-head>
    <input type="text" id="ttt">
    <van-field id="ccc" placeholder="eee" />
		<van-button size="large" plain type="default" @click="btnClicked">点击按钮</van-button>
	</div>
</template>

<script>
	import Head from '../app/head.vue';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {}
		},
		methods: {
			btnClicked: function () {
				btnClicked2();
			}
		},
		mouthed: {}
	}

</script>

<style scope>

</style>
