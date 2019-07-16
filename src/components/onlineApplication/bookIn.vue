<template>
	<div class="container">
		<page-head title="不动产权利证书遗失（换证）登记"></page-head>
		<van-cell-group>
			<van-field v-model="estateType" clearable right-icon="arrow" placeholder="请输入不动产类型"
				@click-right-icon="$toast('question')" disabled clickable @click.native="estateTypeClicked()" />
		</van-cell-group>
		<van-cell-group>
			<van-field v-model="name" required clearable placeholder="请输入申请人名字" />
		</van-cell-group>
		<van-cell-group>
			<van-field v-model="num" required clearable placeholder="请输入权利证书号码" />
		</van-cell-group>
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
		}
	}

</script>

<style>

</style>
