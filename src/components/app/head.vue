<template lang="html">
	<div class="head-box" :class="{ sticky: checkIOS }">
		<header class="head-box-inner" :class="{ sticky: checkIOS }">
			<div class="title-icon">
				<van-icon name="arrow-left" left-text="返回" color="#1989FA" size="20px" @click="goBack"/>
			</div>
			<div class="back-btn">
				<!--<i class="el-icon-arrow-left" @click="goBack()"></i>-->
			</div>
			<div class="title">{{ title }}</div>
		</header>
		<div v-if="!checkIOS" class="empty-block"></div>
	</div>
</template>

<script>
	import { isIOS } from '../../utils/ua'

	export default {
		props: {
			title: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				checkIOS: false,
			}
		},
		mounted() {
			this.checkIOS = isIOS()
		},
		methods: {
			goBack() {
				this.$router.back()
			},
		},
	}
</script>

<style lang="css" scoped>
	.head-box {
		position: static;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.2rem;
		z-index: 2001;
	}

	.head-box.sticky {
		position: -webkit-sticky;
		position: sticky;
	}

	.head-box-inner {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.2rem;
		background-color: #fff;
		line-height: 1.2rem;
		font-size: 0.405rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		z-index: 2001;
	}

	.head-box-inner.sticky {
		position: relative;
	}

	.head-box-inner .back-btn {
		position: absolute;
		top: 0;
		left: 0;
		padding-left: 0.225rem;
		width: 0.3rem;
		height: 0.9rem;
		font-size: 0.6rem;
		z-index: 1;
	}

	.head-box-inner .back-btn .el-icon-arrow-left {
		color: #252525;
	}

	.head-box-inner .title {
		text-align: center;
		font-size: 16px;
		color: #252525;
	}

	.empty-block {
		height: 1.2rem;
	}

	.title-icon {
		position: absolute;
		margin-top: 7px;
		margin-left: 5px;
	}

</style>
