<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="预约查询"></page-head>
    <van-cell-group>
      <van-field label="预约人：" clearable required text-align="right" input-align="right" :value="form.yyr" type="text" v-model="form.yyr"/>
      <van-field label="证件号：" clearable required text-align="right" input-align="right" :value="form.zjhm" type="text" v-model="form.zjhm"/>
      <van-field label="预约ID：" clearable required text-align="right" input-align="right" :value="form.yyid" type="text" v-model="form.yyid"/>
      <van-field label="预约号：" clearable required text-align="right" input-align="right" :value="form.yyh" type="text" v-model="form.yyh"/>
    </van-cell-group>
    <div style="height: 20px"></div>
    <van-button size="large" class="blueButton" @click="query()">确认</van-button>
    <div style="height: 20px" id="bottom"></div>
	</div>
</template>

<script>
	import Head from './head.vue'

	import { request } from '../../utils/http.js'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				result: '',
				show: false,
				checked: false,
				display: true,
				form: {
					yyr: '',
					zjhm: '',
					qzhm: '',
					yyh: '',
					yyid: '',
				},
			}
		},
		methods: {
			query() {
				const that = this
				if (that.form.yyr !== '' && that.form.zjhm !== '' && that.form.yyid !== '' && that.form.yyh !== '') {
					request({
						url: '/SearchYYInfo',
						data: { strJson: JSON.stringify(this.form) },
						success(response) {
							console.log(response)
							if (response.resultcode == 1 || response.resultcode == "1") {
								that.result = response.resultmsg
								that.$router.push({
									path: '/quer',
									query: { response: JSON.stringify(response.yyinfo) },
								})
							} else {
								that.result = response.resultmsg
							}
							that.show = true
						},
						fail(error) {
						},
					})
				} else {
					this.$message('请完善所有信息！')
				}
			},
		},
	}
</script>

<style lang="css" scoped>

	.olabel b {
		color: #d7342e
	}

</style>
