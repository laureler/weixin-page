<template>
	<!--预约提醒-->
	<div class="app-remind">
		<div class="remind-content">
			<p class="remind-title">
				<span>温馨提示：  </span>
			</p>
			<p>
      <span>
        一、网上预约申请采用实名制，预约人可为房地产登记申请人或相关当事人。
        网上预约申请必须填写用户信息。同一房地产同一登记业务在一天内不可重复预约。
      </span>
			</p>
			<p>
      <span>
        二、预约成功后无法在预约时间前来办理的，请务必于预约日期的前一工作日17：00前取消预约。
      </span>
			</p>
			</p>
			<p>
      <span>
        三、为保证预约事项准时办理，预约人须在预约日当天携带房地产权利证明，凭预约申请号到受理大厅取号。
        取号时间为预约时间段开始前10分钟到结束时间段前10分钟，如预约时间段为10:00-11:00，取号时间为9:50-10:50，提前或逾期将无法取号。
      </span>
			</p>
			</p>
			<p>
      <span>
        一旦取号，即进入排队轮候，请留意大屏幕提示。
      </span>
			</p>
			</p>
			<p>
      <span>
        四、一个预约申请号只能办理一宗业务且抵押合同内抵押物清单的不动产不超过5宗。
      </span>
			</p>
			</p>
			<p>
      <span>
        五、同一业务类型预约成功一次后，须隔30分钟才能预约第二个。
      </span>
			</p>
			</p>
			<p>
      <span>
        六、特别说明：30天内预约人在累计取消达到3次或失约1次之后的三天内无法再进行网上预约。
      </span>
			</p>
		</div>
		<div class="remind-confirm-bt">
			<van-button size="large" class="blueButton" @click="checkConfirm()">确认</van-button>
		</div>
	</div>
</template>

<script>
	export default {
		data:function () {
			return{}
		},
		methods: {
			checkConfirm() {
				// 确认跳转到填写预约信息页面
				this.$router.push({path: '/appl'})
			}
		}
	}
</script>

<style scoped>
	.app-remind {
		height: 100%;
		width: 100%;
		padding: 10px 14px 0 14px;
		opacity: 1;
		text-align: left;
		background: transparent;
		overflow: hidden;
	}

	.app-remind p {
		line-height: 0;
		margin-bottom: 5px !important;
	}

	.app-remind p span {
		font-family: '微软雅黑';
		font-weight: 400;
		font-size: 16px;
		font-style: normal;
		letter-spacing: 0;
		line-height: 22px;
		text-decoration: none;
		color: rgb(16, 16, 16);
	}

	.remind-content {
		overflow-y: auto;
		height: calc(100% - 80px);
		margin-bottom: 15px;
	}

	.app-remind .remind-title span {
		font-size: 22px;
		line-height: 30px;
	}
</style>
