<template>
	<div>
		<page-head title="登陆验证"></page-head>
		<van-cell-group>
			<van-field label="用户名" v-model.trim="username" placeholder="请输入用户名" type="text" clearable required/></van-field>
			<van-field label="密码" v-model.trim="password" placeholder="请输入密码" type="password" center clearable required/></van-field>
			<van-field
				v-model="checkCode"
				v-if="isNeedCheckCode"
				type="text"
				label="验证码"
				placeholder="请输入验证码"
				center
				required
				clearable
			>
				<van-button slot="button" size="small" type="default" class="btn-color">{{checkCodeBtnValue}}</van-button>
			</van-field>
		</van-cell-group>
		<div style="margin-top: 20px">
			<van-button size="large" class="blueButton" @click="checkInput()">登陆</van-button>
		</div>
	</div>
</template>

<script>
	import Head from './head.vue'

	import { Toast } from 'vant'

	const sha1 = require('sha1');

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				username: 'zyk',
				password: '123456',
				checkCode: '1234',
				checkCodeBtnValue: '1234',
				isNeedCheckCode: false
			}
		},
		methods: {
			affirmLogin() {
				// 从哪里来，到哪里去
				this.$router.push({ path: this.$route.query.isTo });
			},
			// 验证用户输入
			checkInput() {
				if (this.username === '' || this.password === '') {
					Toast('请输入用户名或密码！');
					return;
				} else if (this.isNeedCheckCode && this.checkCode === '') {
					Toast('请输入验证码！');
					return;
				} else {
					const _this = this;
					// A0admina0z9356A192B7913B04C54574D18C28D46E6395428AB
					let code = 'A0' + this.username + 'a0z9' + sha1(this.password).toUpperCase();
					this.$fetch('cas/login?client_name=iboa2&code=' + code).then(response => {
						if (Number(response.code) === 0) {

						}
					});
					this.affirmLogin();
				}
			}
		},
		mounted() {
			// todo 判断需不需要显示验证码
		},
	}
</script>

<style scoped>
	.btn-color {
		color: #1989FA;
	}

</style>
