<template>
	<div style="height: 100%;width: 100%;">
		<div v-if="isShow" style="height: 100%;">
			<div id="container" class="map-container"></div>
		</div>
		<div v-else class="error-message">
			{{ errorMessage }}
		</div>

		<van-popup v-model="isShow" v-if="realEstateInfo" position="bottom" :overlay="false">
			<van-cell title="基本信息" value="注意保管好个人隐私信息" title-class="basic-new-title" value-class="basic-hint"/>
			<van-cell-group class="basic-info" :border="false">
				<van-cell :title="'权证号码：'+realEstateInfo.ysxlh" :value="'不动产状态：' +
					realEstateInfo.zt" :border="false" value-class="basic-new-cell"/>
				<van-cell :title="realEstateArea[0]" :value="realEstateArea[1]" :border="false" value-class="basic-new-cell"/>
				<van-field :value="'坐落：'+realEstateInfo.zl" />
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

	import Vue from 'vue';
	const Base64_decode = require('js-base64').Base64.decode
	Vue.component('InfoWindowBtnComponent')

	var InfoWindowBtnComponent = Vue.extend({
		template: '<div @click="btnClick" v-html="btn"></div>',
		props: ['isHouse', 'mapObject'],
		data() {
			return {
				btn: '<a id="zdtBtn" style="border: 1px solid #999999;border-radius: 5px;margin-right: 10px;padding: 5px;">宗地图</a>',
				fhtBtn: '<a id="fhtBtn" style="border: 1px solid #999999;border-radius: 5px;margin-right: 10px;padding: 5px;">分户图</a>',
				mapData: {},	// 宗地图和分户图数据
			}
		},
		methods: {
			// 生成图片窗口
			windowMap(content, id) {
				let map = this.mapObject.map;
				let opts = {
					width : 283,
					height: 155,
				}

				let infoWindow = new BMap.InfoWindow(content, opts);
				map.openInfoWindow(infoWindow);
				document.getElementById(id).onload = function (){
					infoWindow.redraw();
				}
			},
			btnClick(event) {
				// this.$emit('changeValue', 'isShowPhoto');
				// this.$parent.isShowPhoto = true;
				if (event.path[0].id === 'zdt') {
					// this.$parent.popupImage = this.mapData.zdt;
				} else {
					// this.$parent.popupImage = this.mapData.fht;

					// let content = '<img id="fht" src="' + Base64_decode(this.mapData.fht) +'" style="height: 80%; width: 80%;">';
					// this.windowMap(content, 'fht');
				}
			},
		},
		mounted() {
			const  _this = this;

			if (_this.isHouse) {
				_this.btn += _this.fhtBtn;
			}
			const ysxlh = uiScript.getParam('ysxlh') || '';
			// 获取宗地图和分户图数据
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
	})

	export default {
		data () {
			return {
				realEstateInfo: {},	// 不动产位置信息
				isShow: true,
				errorMessage: '',	// 查询产权证书信息失败信息
				mapObject: {},	// 保存map和marker对象
				realEstateArea: [],	// 不动产面积数据

				isHouse: false,
				isShowPhoto: false,
				popupImage: ''
			}
		},
		methods: {
			btnClick(event) {
				if (event.path[0].id === 'zdt') {
					this.isShowPhoto = true;
				} else {
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
			// 添加信息窗口
			addInfoWindow() {
				let title = '<p style="font-weight: bold">基本信息</p>';
				let info = this.realEstateInfo;
				let content = '<div id="infoContent">权证号码：' + info.ysxlh + '<br>' +
					'面积：' + info.mj + '<br>' +
					'不动产状态：' + info.zt + '<br>' +
					'坐落：' + info.zl + '<br>' +
					'注意保管好个人隐私信息。' + '<br><br></div>' +
					'<div id="infoContentBtn"></div>';

				var opts = {
					width : 283,
					height: 155,
					title : title
				}

				// 判断不动产是房屋还是。。
				let isHouse = true;
				let infoWindow = '',
					infoBtn = '',
					map = this.mapObject.map;

				infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
				map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
				if (document.getElementById('infoContentBtn')) {
					infoBtn = new InfoWindowBtnComponent({propsData: {isHouse: isHouse, mapObject: this.mapObject}}).$mount();
					document.getElementById('infoContentBtn').appendChild(infoBtn.$el);
				} else {
					setTimeout(() => {
						infoBtn = new InfoWindowBtnComponent({propsData: {isHouse: isHouse, mapObject: this.mapObject}}).$mount();
						document.getElementById('infoContentBtn').appendChild(infoBtn.$el);
					}, 500);
				}

				/*new Promise((resolve, reject) => {
					infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
					map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
					resolve();
				}).then(() => {
					console.log('appendChild');
					console.log(document.getElementById('infoContentBtn'));
					if (document.getElementById('infoContentBtn')) {
						infoBtn = new InfoWindowBtnComponent({propsData: {isHouse: isHouse, mapObject: this.mapObject}}).$mount();
						document.getElementById('infoContentBtn').appendChild(infoBtn.$el);
					} else {
						setTimeout(() => {
							infoBtn = new InfoWindowBtnComponent({propsData: {isHouse: isHouse, mapObject: this.mapObject}}).$mount();
							console.log(document.getElementById('infoContentBtn'));
							document.getElementById('infoContentBtn').appendChild(infoBtn.$el);
						}, 500);
					}
				}).catch((error) => {
					console.error(error);
				});*/

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

				this.mapObject = {
					map: map,
					marker: marker
				}

				marker.addEventListener('click', function () {
					_this.addInfoWindow();
				});

				_this.addInfoWindow();

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
						});
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
		padding: 10px 3px 10px 15px !important;
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

	.basic-new-title {
		color: #000;
	}

	.basic-hint {
		font-size: 12px;
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

</style>
