<template>
	<div class="container">
		<page-head title="存量房转移登记"></page-head>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>快递寄材料
			</div>
			<van-field id="JOB_SJDJB.FSFKDJCL" v-model="material" right-icon="arrow" placeholder="请选择快递寄材料"  clickable 
				@click.native="materialClicked()" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>快递寄证
			</div>
			<van-field id="JOB_SJDJB.FSFKDJZ" v-model="credential" right-icon="arrow" placeholder="请选择快递寄证"  clickable 
				@click.native="credentialClicked()" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>联系人
			</div>
			<van-field id="JOB_SJDJB.FDXLXR" v-model="contacts" clearable placeholder="联系人" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>联系电话
			</div>
			<van-field id="JOB_SJDJB.FDXTZDH" v-model="phone" clearable placeholder="联系电话" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				身份证号码
			</div>
			<van-field id="JOB_SJDJB.FLXRSFZHM" v-model="idNum" clearable placeholder="身份证号码" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				所在镇区
			</div>
			<van-field id="JOB_SJDJB.FZQ" v-model="township" right-icon="arrow" placeholder="请选择所在镇区" clickable @click.native="townshipClicked()" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				单位
			</div>
			<van-field id="JOB_SJDJB.FDW" v-model="company" clearable placeholder="单位" />
		</van-cell-group>
		<van-cell-group>
			<div class="cell-title">
				<span class="required-span">*</span>联系地址
			</div>
			<van-field id="JOB_SJDJB.FDZ" v-model="address" clearable placeholder="联系地址" />
		</van-cell-group>
		<div style="height: 50px;"></div>
		<van-button size="large" type="info" class="bottom-button" @click.native="nextStep()">下一步</van-button>
		<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect">
			<!-- <p v-for="(action, index) in actions">{{ action.name }}</p> -->
		</van-actionsheet>
	</div>
</template>

<script>
	import Head from '../../app/head.vue';
	import {
		SUBMIT_TASK_FORM_DATA
	} from '../../../constants/index.js'
	export default {
		components: {
			'page-head': Head
		},
		data () {
			return {
				show: false,
				type: 0,
				material: "",
				credential: "",
				township: "",
				contacts: "",
				phone: "",
				idNum: "",
				company: "",
				address: "",
				materials: [{
						name: '是'
					},
					{
						name: '否'
					}
				],
				credentials: [{
						name: '是'
					},
					{
						name: '否'
					}
				],
				townships: [
					{name: '石岐区'},
					{ name: '东区' },
					{ name: '南区' },
					{ name: '西区' },
					{ name: '东升' },
					{ name: '板芙' },
					{ name: '三角' },
					{ name: '三乡' },
					{ name: '民众' },
					{ name: '横栏' },
					{ name: '阜沙' },
					{ name: '港口' },
					{ name: '沙溪' },
					{ name: '东凤' },
					{ name: '大涌' },
					{ name: '南朗' },
					{ name: '古镇' },
					{ name: '南头' },
					{ name: '五桂山' },
					{ name: '黄圃' },
					{ name: '火炬开发区' },
					{ name: '神湾' },
					{ name: '坦洲' },
					{ name: '小榄' }
				],
				actions: [],
			}
		},
		methods: {
			onSelect: function (val) {
				this.show = false;

				switch (this.type) {
					case 0:
						this.material = val.name;
						break;
					case 1:
						this.credential = val.name;
						break;
					case 2:
						this.township = val.name;
						break;

					default:
						break;
				}
			},
			materialClicked: function () {
				this.actions = this.materials;
				this.type = 0;
				this.show = true;
			},
			credentialClicked: function () {
				this.actions = this.credentials;
				this.type = 1;
				this.show = true;
			},
			townshipClicked: function () {
				this.actions = this.townships;
				this.type = 2;
				this.show = true;
			},
			nextStep: function () {
				this.submitTaskFormData();
			},
			submitTaskFormData: function () {
				var taskId = sessionStorage.getItem('taskId');
				var formData = JSON.parse(sessionStorage.getItem('formdata'));
				formData['JOB_SJDJB.FSFKDJCL'] = this.material;
				formData['JOB_SJDJB.FSFKDJZ'] = this.credential;
				formData['JOB_SJDJB.FDXLXR'] = this.contacts;
				formData['JOB_SJDJB.FDXTZDH'] = this.phone;
				formData['JOB_SJDJB.FLXRSFZHM'] = this.idNum;
				formData['JOB_SJDJB.FZQ'] = this.township;
				formData['JOB_SJDJB.FDW'] = this.company;
				formData['JOB_SJDJB.FDZ'] = this.address;
				this.axios({
					url: SUBMIT_TASK_FORM_DATA + '?taskId=' + taskId,
					method: 'post',
					data: formData,
					transformRequest: [function (data) {
						let ret = ''
						for (let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(response => {
					console.log(response);
					if (response.status == 200) {
						this.$router.push({
							path: '/onlineApplication/CLFZYDJ/success'
						});
					}
				}).catch(error => {
					console.log(error);
				});
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

	.bottom-button {
		position: fixed;
		bottom: 0;
		border: none;
		border-radius: 0;
		background: -webkit-gradient(linear, left top, right top, from(#2db6ff), to(#2edbfd)) !important;
		background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
	}

</style>
