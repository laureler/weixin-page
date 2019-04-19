<template>
	<div class="personal-business">
		<page-head title="信息确认"></page-head>
		<div class="businessList" v-if="businessDataArray.length!==0">
			<van-collapse v-model="active" v-for="(businessItem, index) in businessDataArray" accordion>
				<van-collapse-item :name="index">
					<div slot="title">
						<p class="busyness-title">
							当前业务{{businessItem.ywh}}
						</p>
						<p class="busyness-start-time">
							开始时间：{{businessItem.startTime}}
						</p>
					</div>
					<div class="business-content">
						<p class="business-content-title">业务内容</p>
						<p>{{businessItem.ywContent}}</p>
					</div>
				</van-collapse-item>
			</van-collapse>
		</div>
		<div v-else class="no-data-note">
			<!--没有数据给予提示-->
			{{noDataNote}}
		</div>
	</div>
</template>

<script>

	import Head from '../app/head';

	import { isWx } from '../../utils/ua';
	import Cookies from 'js-cookie';

	export default {
		components: {
			'page-head': Head,
		},
		data () {
			return {
				businessDataArray: [],
				active: 0,
				noDataNote: '当前没有正在进行的业务！',
			}
		},
		methods: {},
		//在$el被替换的时候调用钩子函数
		mounted () {
			const _this = this
			const openId = isWx() ? Cookies.get('openid') : '';
			_this.$fetch('/formengineWebService/public/getBusinessDataByJid?openId=' + openId).then(response => {
				_this.businessDataArray = response
			})
		}
	}
</script>

<style scoped>

	.personal-business {
		background: #f3f3f3;
	}

	/*使用deep深入覆盖vant样式*/
	.businessList /deep/ .van-cell__title {
		max-width: none !important;
	}

	.businessList /deep/ .van-collapse-item__title--expanded {
		 color: #1989FA !important;
	 }

	.businessList /deep/ .van-collapse-item__title--expanded .busyness-start-time {
		color: #1989FA !important;
	}

	.busyness-title {
		font-size: 18px;
	}

	.busyness-start-time {
		color: #999999;
	}

	.business-content {
		padding: 10px 15px;
	}

	.business-content-title {
		font-size: 16px;
		padding-bottom: 10px !important;
		color: #000;
	}

	.no-data-note {
		font-size: 20px;
		text-align: center;
		padding-top: 50px;
		background-color: white;
	}

</style>
