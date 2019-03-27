<template lang="html">
	<div style="display:flex;flex-direction:column;background-color:#F0F5F8">
		<page-head title="查询结果"></page-head>
        <div class=box-content>
			<div slot="header" class="title">
			    <div class="borderLeft"></div>
				<p class="titlep">预约人信息</p>
			</div>
			<div>
			    <ul class="cul">
				    <li class="cli">
				        <div>预约ID：</div> <div>{{ item.id }}</div>
				    </li>
				    <li class="cli">
				        <div>预约人：</div> <div>{{ item.yyr }}</div>
				    </li>
				    <li class="cli" v-if="item.yyh">
				        <div>预约号：</div> <div>{{ item.yyh }}</div>
				    </li>
				    <li class="cli">
				        <div>证件号码：</div> <div>{{ item.zjhm }}</div>
				    </li>
				</ul>
			</div>
        </div>
		<div class=box-content>
			<div slot="header" class="title">
			    <div class="borderLeft"></div>
				<p class="titlep">预约事项及预约时间</p>
			</div>
			<div>
			    <ul class="cul">
				    <li class="cli">
				        <div>预约日期：</div> <div>{{ item.yyrq }}</div>
				    </li>
				    <li class="cli">
				        <div>预约时段：</div> <div>{{ item.yysd }}</div>
				    </li>
				    <li class="cli" v-if="item.yyh">
				        <div>预约事项：</div> <div>{{ item.yysx }}</div>
				    </li>
				    <li class="cli">
				        <div>所在网点：</div> <div>{{ item.szwd }}</div>
				    </li>
                    <li class="cli">
				        <div>网点地址：</div> <div>{{ item.wddz }}</div>
				    </li>
				    <li class="cli">
				        <div style="color:red;font-size: 0.4rem">办理状态：</div> <div style="color:red;font-size: 0.4rem">{{ item.zt }}</div>
				    </li>
				</ul>
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
			}
		},
		mounted() {
			this.item = JSON.parse(this.$route.query.response)[0]
			console.log(this.$route.query.response)
		},
	}
</script>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.box-card {
		width: 90%;
		margin: 0 auto;
		margin-top: 0.45rem;
	}

	.box-card .content .text {
		margin-bottom: 0.075rem;
		font-size: 0.375rem;
	}

	.clearfix {
		font-size: 0.45rem;
		color: #90CC4B;
	}

	.takeText {
		text-align: center;
		font-size: 0.375rem;
		color: red;
		padding: 0.3rem 0;
		font-weight: bold;
	}

	.osubmit {
		width: 90%;
		margin: 0.45rem auto;
	}

	.redColor {
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
		font-size: 0.4rem;
		height:45px;
		display: flex;
		justify-content: space-between;
		padding-top:0.25rem;
		color:#000000;
		border-bottom:1px solid #F0F5F8;
	}

	.box-content {
		margin-top:0.25rem;
		background-color:#ffffff;
	}
</style>
