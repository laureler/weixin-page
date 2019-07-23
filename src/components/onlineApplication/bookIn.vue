<template>
	<div class="container">
		<page-head title="不动产权利证书遗失（换证）登记"></page-head>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>不动产类型
			</div>
			<van-field v-model="estateType" right-icon="arrow" placeholder="请输入不动产类型"
				@click-right-icon="$toast('question')" disabled clickable @click.native="estateTypeClicked()" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>申请人名字
			</div>
			<van-field v-model="name" clearable placeholder="请输入申请人名字" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>权利证书号码
			</div>
			<van-field v-model="num" clearable placeholder="请输入权利证书号码" />
		</van-cell-group>
		<div class="tips">
			提示: 可通过公众号的“信息查询-个人产权查询”查询权利证书号码
		</div>
		<van-cell-group>
			<van-cell class="custom-cell">
				<template>
					<div class="content">
						<div class="content-left">
								<span class="custom-text">证书状态：</span>
								<span class="custom-status">已查封、已抵押</span>
						</div>
						<div class="content-right">
								<van-button class="verification-button" plain round hairline type="info">校验</van-button>
						</div>
					</div>
				</template>
				
			</van-cell>
		</van-cell-group>
		<div style="height: 50px;"></div>
		<van-button size="large" type="info" class="bottom-button" @click.native="nextStep()">下一步</van-button>
		<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect">
			<!-- <p v-for="(action, index) in actions">{{ action.name }}</p> -->
		</van-actionsheet>
	</div>
</template>

<script>
	import Head from '../app/head.vue';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				estateType: "",
				show: false,
				name: "",
				num: "",
				actions: [{
						name: '房屋'
					},
					{
						name: '土地'
					}
				],
			}
		},
		methods: {
			estateTypeClicked: function () {
				console.log("clicked estateType!!!");
				console.log(this.show);
				this.show = true;
			},
			onSelect: function (val) {
				console.log(val)
			},
			onCancel: function () {},
			nextStep: function() {
				console.log("...");
				this.$router.push({ path: "/onlineApplication/info" });
			}
		}
	}

</script>

<style scoped>
	.van-cell-group {
		padding: .3rem;
	}

	.cell-title {
		font-size: .4rem;
		padding-left: .2rem;
		line-height: 2;
	}

	.required-span {
		color: #ff0000;
		margin-right: .1rem;
	}

	.van-cell {
		padding: .2rem;
		border: 1px solid #d1d1d1;
	}
	.custom-cell {
		border: none;
		padding: 0;
	}
	.custom-cell div .content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.custom-cell div .content .content-left {
		flex: 1;
	}
	.custom-cell div .content .content-left .custom-status {
		color: #00b957;
	}

	.verification-button {
		height: 30px;
		line-height: 30px;
		padding: 0 25px;
	}

	.tips {
		font-size: 14px;
		padding: .3rem;
		color: #999999;
		background-color: #ffffff;
	}

	.bottom-button {
		position: fixed;
		bottom: 0;
		border: none;
		border-radius: 0;
		background: -webkit-gradient(linear, left top, right top, from(#2db6ff), to(#2edbfd)) !important;
    background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	}

</style>
