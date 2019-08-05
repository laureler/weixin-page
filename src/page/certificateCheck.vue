<template>
	<div id="certificateCheck" style="height: 100%;width: 100%">
		<van-tabs v-model="active">
			<van-tab title="证书查验">
				<van-cell-group>
					<van-cell value="权利人" /><van-field v-model="value" placeholder="请填写权利人" />
					<van-cell value="证件类型" /><van-field v-model="value" placeholder="请填写证件类型" />
					<van-cell value="证件号码" /><van-field v-model="value" placeholder="请填写证件号码" />
					<van-cell value="证书" />
					<van-row>
						<van-col span="2"><van-cell value="粤" /></van-col>
						<van-col span="6"><van-field style="border: 1px solid;padding: -10px" v-model="value" placeholder="请输入用户名" /></van-col>
						<van-col span="12"><van-cell value="中山市不第产权第" /></van-col>
						<van-col span="4">
							<van-cell value="号" />
						</van-col>
					</van-row>
				</van-cell-group>
				<van-popup v-model="show" position="bottom">
					<van-picker show-toolbar :columns="columns" @confirm="confirmPicker" @change="onChange" @cancel="show = false"/>
				</van-popup>
			</van-tab>
			<van-tab title="证明查验">
				<van-cell-group>
					<van-cell title="单元格" value="内容" />
					<van-cell title="单元格" value="内容" label="描述信息" />
				</van-cell-group>
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	import { Toast } from 'vant';

	// 证书查验
	export default {
		name: 'certificateCheck',
		props: {},
		data: function () {
			return {
				show: true,
				columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
				cardTypes: [],
				szwd: ['肇庆市高要区不动产登记中心', '肇庆市高要区不动产登记中心'],
				value: 1,
				active: 2,
				show: false,
				actions: [
					{
						name: '选项'
					},
					{
						name: '选项',
						subname: '描述信息'
					},
					{
						loading: true
					},
					{
						name: '禁用选项',
						disabled: true
					}
				]
			}
		},
		computed: {},
		watch: {},
		methods: {
			confirmPicker (value, index) {
				Toast(`当前值：${value}, 当前索引：${index}`);
			},
			onChange (picker, value, index) {
				Toast(`当前值：${value}, 当前索引：${index}`);
			},
			onSelect (item) {
				// 点击选项时默认不会关闭菜单，可以手动关闭
				this.show = false;
				Toast(item.name);
			}
		},
		mounted: function () {

		},
	}
</script>

<style lang="less" scoped>

</style>
