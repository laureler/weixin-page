<template>
	<!-- 业务确认页面 -->
	<div class="service-confirm">
		<page-head title="业务确认"></page-head>
		<div class="search-div">
			<div class="Cdiv">
				<input placeholder="请输入业务登记号" v-model="searchParam" type="text" class="Cinput"/>
			</div>
		</div>
		<!--<div class="search-div">
			<van-search
				v-model="searchParam"
				placeholder="请输入业务登记号"
				show-action
				@search="search"
				background="#f0f5f8"
			>
				<div slot="action" @click="search" class="btn-color">搜索</div>
			</van-search>
		</div>-->
		<van-cell-group>
			<van-field id="phoneNumber" placeholder="请输入手机号码" v-model.trim="phoneNumber" type="number" clearable/>
			<van-field
				v-model="smsCode"
				center
				clearable
				type="number"
				placeholder="请输入验证码"
			>
				<van-button slot="button" size="small" type="default" @click="getSmsCode" class="btn-color"
							:disabled="curCount!=0">{{smsCodeBtnValue}}
				</van-button>
			</van-field>
		</van-cell-group>
		<div style="margin: 20px 0px">
			<van-button size="large" class="blueButton" @click="search">查询</van-button>
		</div>
	</div>
</template>

<script>
	import Head from './head.vue';
	import { Toast } from 'vant';

	export default {
		name: 'serviceConfirm',
		data: _ => {
			return {
				// 搜索值 默认为空
				searchParam: '',
				// 手机号码
				phoneNumber: '',
				// 发送短信的手机号码
				sendSmsNumber: '',
				// 验证码按钮值
				smsCodeBtnValue: '获取验证码',
				// 验证码
				smsCode: '',
				// 设置倒计时大小 默认90秒
				countdownSize: 90,
				// 倒计时，当前剩余秒数
				curCount: 0,
			};
		},
		methods: {
			// 发送短信获取验证码
			getSmsCode () {
				const _this = this;
				if (_this.phoneNumber === '') {
					Toast('请输入手机号码！');
					return;
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(_this.phoneNumber))) {
					Toast('手机号码格式不正确！');
					return;
				} else if (_this.searchParam === '') {
					// 需要业务号
					Toast('请输入业务登记号！');
					return;
				} else {
					// 条件满足，开始发送短信
					this.$fetch('/pubWeb/system/public/jidSmsCode?jid=' + _this.searchParam + '&number=' + _this.phoneNumber)
						.then(response => {
							if (response) {
								// 短信发送成功
								Toast('短信发送成功！');
								_this.sendSmsNumber = _this.phoneNumber;
								_this.smsCodeBtnChange();
							} else {
								Toast('手机号跟业务登记号不匹配!');
								_this.curCount = 0;
							}
						})
						.catch(error => {
							console.log(error);
						});
				}
			},
			smsCodeBtnChange() {
				// 页面倒计时和禁用按钮效果
				this.curCount = this.countdownSize;
				this.smsCodeBtnValue = '倒计时' + this.curCount + '秒';
				var TimerObj = setInterval(() => {
					if (this.curCount > 0) {
						this.curCount--;
						this.smsCodeBtnValue = '倒计时' + this.curCount + '秒';
					} else {
						// 禁用时间结束，关闭轮询，释放按钮
						clearInterval(TimerObj);
						this.smsCodeBtnValue = '获取验证码';
					}
				}, 1000);
			},
			search: function () {
				const _this = this;
				if (_this.sendSmsNumber === '') {
					Toast('请获取短信验证码！');
					return;
				}
				if (this.smsCode === '') {
					Toast('请输入验证码！');
					return;
				}
				if (_this.searchParam !== '') {
					// 开始进行业务确认，查询
					this.$fetch('/formengineWebService/public/getConfigDataByJid?jid=' + _this.searchParam +
						'&number=' + _this.phoneNumber + '&code=' + _this.smsCode
					).then(response => {
						if (response) {
							// 参数约定 以token为名称，值为业务编号
							_this.$store.commit('SET_MESSAGEDATA', response);
							_this.$router.push({ path: '/messageApprove', query: { token: _this.searchParam } });
						} else {
							Toast('请输入正确的验证码！');
						}
					}).catch(error => {
						console.log(error);
					});
				} else {
					Toast('请输入业务登记号！');
					return;
				}
			}
		},
		components: {
			'page-head': Head,
		},
		mounted () {
			//后面用到人脸识别必须在首页这里进行配置的初始化（针对ios系统）
			this.$fetch('/pubWeb/public/getWeChatConfig?url=' + window.location.href.split('#')[0]).then(res => {
				wx.config(res);
				console.log(res);
			});
		}
	};
</script>

<style scoped>
	.service-confirm{
		display:flex;
		flex-direction:column
	}
	.btn-color {
		color: #1989FA;
	}
	.search-div {
		background: #f0f5f8;
		height: 2rem;
	}

	.container {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.15rem;
		font-size: 0.375rem;
		padding-top: 0.15rem;
		padding-left: 0.45rem;
		padding-bottom: 0.3rem;
	}

	.redColor {
		color: red
	}

	.Cdiv {
		padding: 0.3rem 0rem 0.3rem 0.3rem;
		display: flex;
		font-size: 0.375rem;
		margin: 0.25rem 0.25rem 0.25rem 0.25rem;
		background-color: #ffffff;
		height: 1.5rem;
	}

	.Cinput {
		width: 100%;
		border: none;
		font-size: 14px;
		outline: none;
		height: 1rem;
		margin-right: 0.31rem;
	}
	.blueButton {
		margin-top: 20px;
	}
</style>
