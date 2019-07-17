<template>
	<div class="container">
		<page-head title="不动产权利证书遗失（换证）登记"></page-head>
		<div class="box-body">
			<van-tabs>
				<van-tab title="基本信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>不动产类型
						</div>
						<van-field v-model="application" right-icon="arrow" placeholder="请选择申请事项"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="applicationClicked()" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>镇区
						</div>
						<van-field v-model="township" right-icon="arrow" placeholder="请选择镇区"
							@click-right-icon="$toast('question')" disabled clickable
							@click.native="townshipClicked()" />
					</van-cell-group>
				</van-tab>
				<van-tab title="不动产信息">
					<van-cell-group>
						<div class="cell-title">
							不动产单元号
						</div>
						<van-field v-model="estateInfo.num" placeholder="不动产单元号" disabled clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							不动产类型
						</div>
						<van-field v-model="estateInfo.type" placeholder="不动产类型" disabled clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							坐落
						</div>
						<van-field v-model="estateInfo.position" placeholder="坐落" disabled clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							面积
						</div>
						<van-field v-model="estateInfo.area" placeholder="面积" disabled clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							用途
						</div>
						<van-field v-model="estateInfo.purpose" placeholder="用途" disabled clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							原不动产权证明
						</div>
						<van-field v-model="estateInfo.oldprove" placeholder="原不动产权证明" disabled clickable />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							登记原因
						</div>
						<van-field v-model="estateInfo.reason" clearable placeholder="登记原因" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							备注
						</div>
						<van-field v-model="estateInfo.remarks" clearable placeholder="备注" />
					</van-cell-group>
				</van-tab>
				<van-tab title="申请人信息">
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>申请人
						</div>
						<van-field v-model="applicant.name" clearable placeholder="申请人" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>性别
						</div>
						<van-field v-model="applicant.sex" clearable placeholder="性别" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件种类
						</div>
						<van-field v-model="applicant.documentType" clearable placeholder="证件种类" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>证件号码
						</div>
						<van-field v-model="applicant.documentNum" clearable placeholder="证件号码" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							国家/地区
						</div>
						<van-field v-model="applicant.countryOrRegion" clearable placeholder="国家/地区" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							联系电话
						</div>
						<van-field v-model="applicant.phone" clearable placeholder="联系电话" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>共有情况
						</div>
						<van-field v-model="applicant.commonSituation" clearable placeholder="共有情况" />
					</van-cell-group>
					<van-cell-group>
						<div class="cell-title">
							<span class="required-span">*</span>权利比例
						</div>
						<van-field v-model="applicant.proportion" clearable placeholder="权利比例" />
					</van-cell-group>
					<div class="buttons">
						<van-button class="info-btn" size="small" type="info">保存</van-button>
						<van-button class="info-btn" size="small" type="default" @click.native="delApplicant()">删除申请人
						</van-button>
					</div>
					<div class="applicants">
						<div class="title">
							<div class="name">姓名</div>
							<div class="num">证件号码</div>
							<div class="handle">操作</div>
						</div>
						<div class="content">
							<van-cell-group class="applicants-group">
								<div class="name">欧阳思思</div>
								<div class="num">152722198109167320152722198109167320</div>
								<div class="handle">
									<van-button plain round type="info" size="small">编辑</van-button>
								</div>
							</van-cell-group>
							<van-cell-group class="applicants-group">
								<div class="name">欧阳思思</div>
								<div class="num">152722198109167320152722198109167320</div>
								<div class="handle">
									<van-button plain round type="info" size="small">编辑</van-button>
								</div>
							</van-cell-group>
							<van-cell-group class="applicants-group">
								<div class="name">欧阳思思</div>
								<div class="num">152722198109167320152722198109167320</div>
								<div class="handle">
									<van-button plain round type="info" size="small">编辑</van-button>
								</div>
							</van-cell-group>
						</div>
					</div>
				</van-tab>
      </van-tabs>
      <div style="height: 50px;"></div>
      <div class="bottom-box">
          <van-button size="large" plain type="default">查看申请书</van-button>
          <van-button size="large" type="info" @click.native="nextStep()">下一步</van-button>
      </div>
			<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect">
				<!-- <p v-for="(action, index) in actions">{{ action.name }}</p> -->
			</van-actionsheet>
		</div>
	</div>
</template>

<script>
	import Head from '../app/head.vue';
	export default {
		components: {
			'page-head': Head
		},
		data() {
			return {
				show: false,
				type: 0,
				application: "",
				township: "",
				estateInfo: { // 不动产信息
					num: "442000114201GB2172F00011803",
					type: "土地和房屋",
					position: "中山市三项镇平南村金凤路16号4栋1501房",
					area: "89.13",
					purpose: "住宅",
					oldprove: "粤（2019）中山市不动产权第 0195895 号",
					reason: "",
					remarks: ""
				},
				applicant: { // 申请人信息
					name: "李四",
					sex: "男",
					documentType: "身份证",
					documentNum: "152722198109167320",
					countryOrRegion: "中华人民共和国",
					phone: "12702352354",
					commonSituation: "单独所有",
					proportion: "全部"
				},
				applications: [{
						name: '不动产权利证书补证登记'
					},
					{
						name: '不动产权利证书换证登记'
					}
				],
				townships: [{
						name: '石岐区'
					},
					{
						name: '东区'
					},
					{
						name: '南区'
					},
					{
						name: '西区'
					}
				],
				actions: [],
			}
		},
		methods: {
			onSelect: function (val) {
				console.log(val)
				this.show = false;
				if (this.type == 0) {
					this.application = val.name;
				} else {
					this.township = val.name;
				}
			},
			onCancel: function () {
				this.show = false;
			},
			applicationClicked: function () {
				this.show = true;
				this.type = 0;
				this.actions = this.applications;
			},
			townshipClicked: function () {
				this.show = true;
				this.type = 1;
				this.actions = this.townships;
			},
			delApplicant: function () {
				this.$dialog.confirm({
					message: '确定要删除该申请人吗?'
				}).then(() => {
					console.log('删除');
					// on close
				}).catch(() => {
					// on cancel
					console.log('取消');
				});
      },
      nextStep: function() {
        this.$router.push({ path: '/onlineApplication/success' });
      }
		}
	}

</script>

<style scoped>
	.van-cell-group {
		padding: .3rem;
	}

	.cell-title {
		font-size: .4rem;
		padding-left: .2rem;
		line-height: 2;
	}

	.required-span {
		color: #ff0000;
		margin-right: .1rem;
	}

	.van-cell {
		padding: .2rem;
		border: 1px solid #d1d1d1;
	}



	.buttons {
		padding: .8rem;
		text-align: center;
	}

	.info-btn {
		width: 100px;
	}

	.info-btn+.info-btn {
		margin-left: 20px;
	}

	.applicants .title {
		display: flex;
    font-weight: bolder;
	}

	.applicants .title .name {
		width: 25%;
		font-size: .4rem;
		text-align: center;
		line-height: 3;
	}

	.applicants .title .num {
		width: 55%;
		font-size: .4rem;
		text-align: center;
		line-height: 3;
	}

	.applicants .title .handle {
		width: 20%;
		font-size: .4rem;
		text-align: center;
		line-height: 3;
	}

	.applicants-group {
		display: flex;
		padding: .3rem 0;
		align-items: center;
	}

	.applicants-group .name {
		width: 25%;
		font-size: .35rem;
		text-align: center;
		word-wrap: break-word;
	}

	.applicants-group .num {
		width: 55%;
		font-size: .35rem;
		text-align: center;
		word-wrap: break-word;
		padding: .2rem;
	}

	.applicants-group .handle {
		width: 20%;
		font-size: .35rem;
		text-align: center;
	}

  .bottom-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
  }
  .bottom-box .van-button+.van-button {
    border: none;
		border-radius: 0;
		background: -webkit-gradient(linear, left top, right top, from(#2db6ff), to(#2edbfd)) !important;
    background: linear-gradient(to right, #2db6ff, #2edbfd) !important;
  }

</style>
