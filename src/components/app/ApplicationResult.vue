<template lang="html">
	<div style="display:flex;flex-direction:column;height:100%;background-color:#F0F5F8">
		<page-head title="预约成功"></page-head>
		<div class="box-content">
			<div v-if="key == 1" class="contentTip">
			    <div style="background-color:#ffffff">
			        <div class="title">
				        <div class="borderLeft"></div>
					    <div class="titlep">您已预约成功！</div>
			        </div>
			        <div>
                        <ul class="cul">
			                <li class="cli">
				                <div>办理时间：</div>
				                <div>{{ item.YYRQ  }}  {{ item.YYSD }}</div>
			                </li>
                            <li class="cli">
				                <div>办理地址：</div>
				                <div>{{ item.WDDZ }}</div>
			                </li>
			                <li class="cli">
				                <div>办理业务：</div>
				                <div>{{ item.YYSX }}</div>
			                </li>
		                </ul>
			        </div>
			    </div>
			    <div class="contain">
                     请申请人在预约时段内，凭手机取号信息到办事大厅扫描预约二维码进行确认，并等待叫号。（
					<span style="color:red">扫码确认必须到现场，请勿提前扫码，过号不办理</span>
					）
			    </div>
			</div>
			<div v-if="key == 2" class="contentTip">
			    <div style="background-color:#ffffff">
			        <div class="title">
				        <div class="borderLeft"></div>
					    <div class="titlep">您已预约成功！</div>
			        </div>
			        <div>
                        <ul class="cul">
			                <li class="cli">
				                <div>办理时间：</div>
				                <div>{{ item.YYRQ  }}  {{ item.YYSD }}</div>
			                </li>
                            <li class="cli">
				                <div>办理地址：</div>
				                <div>{{ item.WDDZ }}</div>
			                </li>
			                <li class="cli">
				                <div>办理业务：</div>
				                <div>{{ item.YYSX }}</div>
			                </li>
		                </ul>
			        </div>
			    </div>
			    <div class="contain">
					请申请人在预约时段内，凭手机预约信息或者预约纪录直接去窗口办理。
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from './head.vue'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				item: {},
				key: '',
			}
		},
		mounted() {
			this.item = JSON.parse(this.$route.query.response)[0];
			this.key = this.$route.query.key;
		},
	}
</script>

<style lang="css" scoped>

	.box-content {
		padding: 0 0 0.3rem;
		margin-top:0.25rem;
	}

	.box-card {
		width: 90%;
		margin: 0 auto;
		margin-top: 0.45rem;
	}

	.box-card .contentTip {
		font-size: 0.375rem;
		line-height: 0.645rem;
	}

	.box-card .contentTip span {
		color: red;
	}

	.titlep {
		margin-top: 0;
		margin-left: 0.225rem;
		font-size: 16px;
		line-height: 16px;
	}

	.borderLeft {
		border-left: 3px solid #f77f5a;
		float: left;
		height: 15px;
	}

	.title {
		height: 40px;
		padding: 10px 10px;
		font-weight: bold;
		color: #252525;
		letter-spacing: 1px;
		border-bottom:1px solid #e9e9e9;
	}
	.cul {
		margin-top: 0.1rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}

	.cli {
		font-size: 0.375rem;
		height:45px;
		display: flex;
		justify-content: space-between;
		padding: 0.3rem 0;
	}
	.contain{
		padding:0.25rem;
		font-size: 0.375rem;
	}
</style>
