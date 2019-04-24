<template>
	<div style="height: 100%;width: 100%;">
		<div v-if="isShow" style="height: 100%;">
			<div id="container" class="map-container"></div>
		</div>
		<div v-else class="error-message">
			{{ errorMessage }}
		</div>

		<van-popup v-model="isShow" v-if="realEstateInfo" position="bottom" :overlay="false">
			<div class="basic-title-div">
				<div style="display: inline-block;">
					<span class="basic-new-title">基本信息</span>
					<van-icon name="info-o" color="red" size="12px" />
					<span class="basic-hint">注意保管好个人隐私信息</span>
				</div>
				<div style="display: inline-block;float: right;">
					<van-icon name="clear" color="#999999" size="20px" @click="" />
				</div>
			</div>
			<!--<van-cell title="基本信息" value="注意保管好个人隐私信息" title-class="basic-new-title" value-class="basic-hint">
				<van-icon name="cross" color="#999999" size="18px" @click="" />
			</van-cell>-->
			<van-cell-group class="basic-info" :border="false">
				<van-field :value="'权证号码：'+realEstateInfo.ysxlh" :border="false" />
				<van-field :value="'不动产状态：'+ realEstateInfo.zt" :border="false" />
				<van-field :value="realEstateArea[0]" :border="false" />
				<van-field :value="realEstateArea[1]" :border="false"/>
				<van-field :value="'坐落：'+realEstateInfo.zl" :border="false" />
			</van-cell-group>
			<div style="text-align: center;width: 100%">
				<div class="basic-btn-div">
					<van-button class="basic-info-btn" @click="btnClick">宗地图</van-button>
				</div>
				<div v-if="isHouse" class="basic-btn-div">
					<van-button class="basic-info-btn" @click="btnClick">分户图</van-button>
				</div>
			</div>
		</van-popup>

		<van-popup v-model="isShowPhoto">
			<img id="zdt" :src="popupImage">
		</van-popup>
	</div>
</template>

<script>

	import { request } from '../../utils/http.js'
	import { baiduMap } from '../../utils/map'

	const Base64_decode = require('js-base64').Base64.decode

	export default {
		data () {
			return {
				realEstateInfo: {},	// 不动产位置信息
				isShow: true,
				errorMessage: '',	// 查询产权证书信息失败信息
				mapObject: {},	// 保存map和marker对象
				realEstateArea: [],	// 不动产面积数据
				mapData: [],	// 宗地图和分户图数据

				isHouse: false,
				isShowPhoto: false,
				popupImage: ''
			}
		},
		methods: {
			btnClick(event) {
				if (event.path[0].id === 'zdt') {
					this.popupImage = this.mapData[0];
					this.isShowPhoto = true;
				} else {
					this.popupImage = this.mapData[0];
					this.isShowPhoto = true;
				}
			},
			// 获取宗地图和分户图数据
			getZdtAndFhtInfo() {
				const  _this = this;
				const ysxlh = uiScript.getParam('ysxlh') || '';

				request({
					url: '/GetBdcMapInfo',
					data: { strJson: JSON.stringify({ ysxlh: ysxlh }) },
					success(response) {
						if (Number(response.resultcode) === 1) {
							_this.mapData = response.result;
						} else {
							console.log('获取宗地图和分户图数据失败：' + response.resultmsg);
						}
					},
					fail(error) {
						console.log(error);
					}
				})
			},
			// 初始化地图
			initMap() {
				const _this = this;
				//创建地图实例
				let map = new BMap.Map('container', {enableMapClick: false});
				//创建一个坐标
				let zb = _this.realEstateInfo.zb.split(',');
				let point =new BMap.Point(zb[0], zb[1]);
				//地图初始化，设置中心点坐标和地图级别
				map.centerAndZoom(point, 19);

				let marker = new BMap.Marker(point);        // 创建标注
				map.addOverlay(marker);                     // 将标注添加到地图中

				// 禁止拖拽
				marker.disableDragging();

			},
		},
		mounted() {
			const _this = this;

			const ysxlh = uiScript.getParam('ysxlh') || '';
			request({
				url: '/GetBdcqzhInfo',
				data: { 'ysxlh': ysxlh },
				success(response) {
					if (Number(response.resultcode) === 1) {
						_this.realEstateInfo = response.result;
						_this.realEstateArea = response.result.mj.split('/');
						_this.realEstateArea[0] = _this.realEstateArea[0].trim().replace(/ /, '：');
						_this.realEstateArea[1] = _this.realEstateArea[1].trim().replace(/ /, '：');

						baiduMap.init().then(BMap => {
							_this.initMap();
						}).catch(error => {
							console.log('百度地图初始化失败！');
							console.log(error);
						});

						_this.getZdtAndFhtInfo();
						_this.isHouse = true;
					} else {
						_this.isShow = false;
						_this.errorMessage = response.resultmsg;
					}
				},
				fail(error) {
					console.log(error);
				}
			});

		}
	}

</script>

<style scoped>
	.map-container {
		height: 100%;
	}

	.error-message {
		font-size: 16px;
		color: #999999;
		width: 100%;
		text-align: center;
		margin-top: 50px;
	}

	.basic-info /deep/ .van-cell {
		font-size: 14px !important;
		padding: 3px 3px 3px 15px !important;
	}

	.basic-info /deep/ .van-cell__title {
		max-width: 200px !important;
	}

	.basic-info /deep/ .van-cell__value {
		color: #323233;
	}

	.basic-new-cell {
		text-align: left;
	}

	.basic-btn-div {
		display: inline-block;
		width: 50%;
	}

	.basic-info-btn {
		margin: 10px;
		color: #619DE0;
		width: calc(100% - 20px);
		text-align: center;
		background-color: #E6EDF3;
	}

	.basic-title-div {
		padding: 15px;
		border-bottom: 1px solid #ebedf0;
	}

	.basic-new-title {
		font-size: 16px;
		color: #000;
		margin-right: 5px;
	}

	.basic-hint {
		font-size: 12px;
		margin-left: 5px;
	}

</style>
