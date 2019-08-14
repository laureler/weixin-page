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
				<van-icon slot="icon" :name="checkCodeImgValue" size="40px" class-prefix="van-icon img-class" @click="changeCheckCode" />
			</van-field>
		</van-cell-group>
		<div style="margin-top: 20px">
			<van-button size="large" class="blueButton" @click="checkInput()">登陆</van-button>
		</div>
	</div>
</template>

<script>
	import Head from './head.vue'

	import { Toast, Dialog } from 'vant'
	import Cookies from 'js-cookie'

	const sha1 = require('sha1');

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				username: '',
				password: '',
				checkCode: '',
				checkCodeImgValue: '',	// 获取cas验证码图片
				isNeedCheckCode: false,	// 判断是否需要验证码，可配置
			}
		},
		methods: {
			changeCheckCode() {
				let url = 'http://' + window.location.hostname + ':' + window.location.port;
				this.checkCodeImgValue = url + '/cas/captchacode?date=' + (new Date()).getTime();
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
					let captcha = '';
					if (this.isNeedCheckCode) {
						captcha = 'a0z9' + this.checkCode;
					}
					// + 'a0z9' + 'gdbdc'
					let code = 'A0' + this.username + 'a0z9' + sha1(this.password).toUpperCase();
					this.$fetch('/cas/login?client_name=iboa2&code=' + code + captcha).then(response => {
						console.log('CAS登陆成功！');
						// 从哪里来，到哪里去
						_this.$router.push({ path: this.$route.query.isTo });
					}).catch(error => {
						console.log(error);
						if (error.response.status === 500) {
							Dialog.alert({
								title: '提示',
								message: '用户名或密码错误！'
							})
						} else {
							Dialog.alert({
								title: '提示',
								message: '网络异常，请稍后重试！'
							})
						}
					});
				}
			},
		},
		mounted() {
			// todo 判断需不需要显示验证码，默认显示需要验证码 注：暂未实现码验证功能判断配置
			this.isNeedCheckCode= true;

			if (this.isNeedCheckCode) {
				this.changeCheckCode();
			}
		},
	}
</script>

<style scoped>
	.btn-color {
		color: #1989FA;
	}

	.img-class img {
		height: 50px;
	}

</style>
