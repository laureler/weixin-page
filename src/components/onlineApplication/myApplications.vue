<template>
	<div class="container">
		<div class="application-list">
			<div class="application-item">
				<div class="item-title">
					申请编号：201903060009
				</div>
				<div class="item-content">
					<div class="flex-box content-name">
						<div class="key">申办业务：</div>
						<div class="value">土地及房屋所有权转移及抵押登记</div>
					</div>
					<div class="flex-box content-address">
						<div class="key">坐落：</div>
						<div class="value">中山市东凤镇凤安路 3 号</div>
					</div>
					<div class="flex-box content-reason">
						<div class="key">原因：</div>
						<div class="value">申请人资料不全</div>
					</div>
				</div>
				<div class="flex-box buttons">
					<van-button class="custom-button" square size="large" type="default">申请证书</van-button>
					<van-button class="custom-button" square size="large" type="default">作废</van-button>
				</div>
				<div class="status status-fail">
					不通过
				</div>
			</div>
			<div class="application-item">
				<div class="item-title">
					申请编号：201903060009
				</div>
				<div class="item-content">
					<div class="flex-box content-name">
						<div class="key">申办业务：</div>
						<div class="value">土地及房屋所有权转移及抵押登记</div>
					</div>
					<div class="flex-box content-address">
						<div class="key">坐落：</div>
						<div class="value">中山市东凤镇凤安路 3 号</div>
					</div>
				</div>
				<div class="flex-box buttons">
					<van-button class="custom-button" square size="large" type="default">查看证书</van-button>
				</div>
				<div class="status status-success">
					已出证
				</div>
			</div>
			<div class="application-item">
				<div class="item-title">
					申请编号：201903060009
				</div>
				<div class="item-content">
					<div class="flex-box content-name">
						<div class="key">申办业务：</div>
						<div class="value">土地及房屋所有权转移及抵押登记</div>
					</div>
					<div class="flex-box content-address">
						<div class="key">坐落：</div>
						<div class="value">中山市东凤镇凤安路 3 号</div>
					</div>
				</div>
				<div class="flex-box buttons">
					<van-button class="custom-button" square size="large" type="default">查看类型</van-button>
				</div>
				<div class="status status-discard">
					已作废
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}

</script>

<style scoped>
	.flex-box {
		display: flex;
	}

	.application-list {
		font-size: .4rem;
    padding-bottom: 10px;
	}

	.application-item {
		border: 1px solid #ccc;
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		margin: 10px;
	}

	.item-title {
		padding: .3rem 0;
		margin: 0 10px;
		border-bottom: 1px solid #ccc;
		color: #222222;
		font-weight: bolder;
		font-size: .42rem;
	}

	.item-content {
		padding: 0 10px;
	}

	.item-content>div {
		margin: .3rem 0;
	}

	.status {
		position: absolute;
		right: 0;
		top: 0;
		font-size: .32rem;
		line-height: 2;
		padding: 0 100px;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		transform: rotate(30deg) translate(85px, -44px);
	}

	.custom-button {
		border-bottom: none;
	}

	.status-fail {
		border-color: #ff3f64;
		color: #ff3f64;
		opacity: .5;
	}

	.status-success {
		border-color: #00b957;
		color: #00b957;
		opacity: .5;
	}

	.status-discard {
		border-color: #666b6e;
		color: #666b6e;
		opacity: .5;
	}

</style>
