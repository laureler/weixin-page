<template>
	<div class="personal-business">
		<head-nav-bar title="信息确认"></head-nav-bar>
		<div class="businessList">
			<van-collapse v-model="active" v-for="(businessItem, index) in businessDataArray" accordion>
				<van-collapse-item :name="index">
					<div slot="title" class="">
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
					<!--
					<div v-if="typeof outerItem[0][Object.keys(outerItem[0])]=='string'">
						&lt;!&ndash;如果第二层是对象&ndash;&gt;
						<van-cell-group v-for="(innerItem, index) in outerItem">
							<van-cell :value="innerItem[Object.keys(innerItem)[0]]" :title="Object.keys(innerItem)[0]"/>
						</van-cell-group>
					</div>
					<div v-else>
						&lt;!&ndash;第二层是数组&ndash;&gt;
						<van-tabs>
							<van-tab v-for="(valueTab,indexTab) in outerItem[0][Object.keys(outerItem[0])[0]]"
									 :title="(Object.keys(outerItem[0])[0])+(indexTab+1)">
								<van-cell-group v-for="(innerTabItem, innerTabkey, innerTabIndex)  in valueTab">
									<van-cell :value="innerTabItem" :title="innerTabkey"/>
								</van-cell-group>
							</van-tab>
						</van-tabs>
					</div>
					-->
				</van-collapse-item>
			</van-collapse>
		</div>
	</div>
</template>

<script>

	import headNavBar from './headNavBar';
	import { isWx } from '../../utils/ua';

	export default {
		components: {
			'head-nav-bar': headNavBar,
		},
		data () {
			return {
				businessDataArray: null,
				active: 0,
			}
		},
		watch: {
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
	.businessList /deep/ .van-cell__title {
		max-width: none !important;
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
</style>
