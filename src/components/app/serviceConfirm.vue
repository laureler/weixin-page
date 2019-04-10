<template>
	<!-- 模板根节点 -->
	<div style="display:flex;flex-direction:column">
		<!-- 头部标题 start -->
		<page-head :title="tyitleValue"></page-head>
		<!-- 头部标题 end -->

		<!-- 搜索栏 start-->
		<div class="search-div">
			<div class="Cdiv Cdiv-display">
				<!--<div class="reg">业务登记号：</div>-->
				<input placeholder="请输入业务登记号" v-model.trim="searchParam" type="text" class="com-input Cinput"/>
				<el-button @click="search" class="schequery" icon="el-icon-search"></el-button>
			</div>
			<div>
				<!--手机号码身份验证-->
				<div class="Cdiv">
					<input placeholder="请输入手机号码" v-model.trim="phoneNumber" type="Number" class="com-input"/>
				</div>
				<div class="Cdiv">
					<input placeholder="请输入验证码" v-model.trim="verificationCode" type="Number" class="com-input"/>
					<el-button class="check-btn" :disabled="curCount!=0" @click="getVerificationCode">
						{{verificationCodeBtn}}
					</el-button>
				</div>
			</div>
		</div>
		<!-- 搜索栏 end-->

		<!-- 查询结果 start-->
		<!--<div class="resultPanel" v-show="searchResultIsShow">
		  <div style="font-size:0.42rem;color:#252525;margin-top:0.3rem;margin-left: 0.5rem">查询结果</div>
		  <hr style="width:9.5rem;border:none;border-bottom:1px solid #e5e5e5;margin-top: 0.35rem;margin-bottom: 0.35rem"/>
		  <div style="font-size:0.42rem;color:#999999;margin-left: 0.5rem">未查询到结果</div>
		</div>-->
		<!-- 查询结果 start-->

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
				// 验证码按钮值
				verificationCodeBtn: '获取验证码',
				// 验证码
				verificationCode: '',
				// 设置倒计时大小 默认60秒
				countdownSize: 60,
				// 倒计时，当前剩余秒数
				curCount: 0,
				// 菜单标题内容
				tyitleValue: '业务确认',
				// 是否展示搜索结果内容
				// searchResultIsShow:false
			};
		},
		methods: {
			// 发送短信获取验证码
			getVerificationCode () {
				const _this = this;
				if (_this.phoneNumber == '') {
					Toast('请输入手机号码！');
					return;
				} else if (!(/^1[3|4|5|7|8]\d{9}$/.test(_this.phoneNumber))) {
					Toast('手机号码格式不正确！');
					return;
				} else if (_this.searchParam === '') {
					// 需要业务号
					Toast('请输入业务登记号！');
					return;
				} else {
					// 条件满足，开始发送短信
					this.$fetch('/pubWeb/system/public/jidsmsCode?jid=' + _this.searchParam + '&number=' + _this.phoneNumber)
						.then(response => {
							if (response) {
								// 短信发送成功
								Toast('短信发送成功！');
							} else {
								Toast('手机号跟业务登记号不匹配!');
								_this.curCount = 0;
							}
						})
						.catch(error => {
							console.log(error);
						});

					// 页面倒计时和禁用按钮效果
					_this.curCount = _this.countdownSize;
					_this.verificationCodeBtn = '倒计时 ' + _this.curCount + 'S';
					var TimerObj = setInterval(() => {
						if (_this.curCount > 0) {
							_this.curCount--;
							_this.verificationCodeBtn = '倒计时 ' + _this.curCount + 'S';
						} else {
							// 禁用时间结束，关闭轮询，释放按钮
							clearInterval(TimerObj);
							_this.verificationCodeBtn = '获取验证码';
						}
					}, 1000);
				}
			},
			search: function () {
				const _this = this;
				if (this.verificationCode === '') {
					Toast('请输入验证码！');
					return;
				}
				if (_this.searchParam !== '') {
					// 开始进行业务确认，查询
					this.$fetch('/formengineWebService/public/getConfigDataByJid?jid=' + _this.searchParam +
						'&number=' + _this.phoneNumber + '&code=' + _this.verificationCode
					).then(response => {
						if (response) {
							// 参数约定 以token为名称，值为业务编号
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
	.search-div {
		background: #f0f5f8;
		height: auto;
	}

	.schequery {
		margin: 0 auto;
		border: none;
		color: #6cccff;
		margin-top: -0.1rem;
		padding-left: 0.1rem;
		height: 1rem;
	}

	.schequery:focus {
		background: white;
	}

	.schequery:hover {
		background: white;
	}

	.Cdiv {
		padding: 0.3rem 0rem 0.3rem 0.3rem;
		font-size: 0.375rem;
		margin: 0.25rem 0.25rem 0.25rem 0.25rem;
		background-color: #ffffff;
		height: 1.5rem;
	}

	.Cdiv-display {
		display: flex;
	}

	.com-input {
		border: none;
		font-size: 0.375rem;
		outline: none;
		height: 1rem;
		margin-right: 0.31rem;
	}

	.Cinput {
		width: 85%;
		border-right: 1px solid #e5e5e5;
	}

	.check-btn {
		float: right;
		margin-right: 10px;
	}

</style>
