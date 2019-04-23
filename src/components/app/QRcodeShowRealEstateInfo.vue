<template>
	<div id="container" class="map-container">
		<div v-if="isShow">
		</div>
		<div v-else class="error-message">
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>

	import { request } from '../../utils/http.js'

	import Vue from 'vue';
	const Base64_decode = require('js-base64').decode

	let InfoWindowBtnComponent = Vue.extend({
		template: '<div @click="btnClick" v-html="btn"></div>',
		props: ['isHouse', 'mapObject'],
		data() {
			return {
				btn: '<a id="zdt" style="border: 1px solid #999999;border-radius: 5px;margin-right: 10px;padding: 5px;">宗地图</a>',
				fhtBtn: '<a id="fht" style="border: 1px solid #999999;border-radius: 5px;margin-right: 10px;padding: 5px;">分户图</a>',
				mapData: {},	// 宗地图和分户图数据
			}
		},
		methods: {
			// 生成图片窗口
			windowMap(content) {
				let map = this.mapObject.map;
				var opts = {
					width : 283,
					height: 155,
					title : title
				}

				var infoWindow = new BMap.InfoWindow(content, opts);
				map.openInfoWindow(infoWindow);
			},
			btnClick(event) {
				if (event.path[0].id === 'zdt') {
					let content = '<img src="' + Base64_decode(this.mapData.zdt) +'" style="height: 80%; width: 80%;">';
					this.windowMap(content);
				} else {
					let content = '<img src="' + Base64_decode(this.mapData.fht) +'" style="height: 80%; width: 80%;">';
					this.windowMap(content);
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
				data: { 'ysxlh': ysxlh},
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
			}
		},
		methods: {
			// 加载API
			loadBMapScript () {
				let script = document.createElement('script');
				script.src = "http://api.map.baidu.com/api?v=3.0&ak=okW4mY38zWSMxao13zYpuqZ4NzokUMYr&callback=initialize";
				document.body.appendChild(script);
			},
			// 初始化地图
			initMap() {
				const _this = this;
				//创建地图实例
				let map = new BMap.Map('container');
				//创建一个坐标
				let point =new BMap.Point(_this.realEstateInfo.zb);
				//地图初始化，设置中心点坐标和地图级别
				map.centerAndZoom(point, 20);

				let marker = new BMap.Marker(point);        // 创建标注
				map.addOverlay(marker);                     // 将标注添加到地图中

				// 禁止拖拽
				marker.disableDragging();

				marker.addEventListener('click', function () {
					_this.addInfoWindow();
				})

				this.mapObject = {
					map: map,
					marker: marker
				}
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
				let map = this.mapObject.map;
				var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
				map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口

				// 判断不动产是房屋还是。。
				let isHouse = true;
				let infoBtn = new InfoWindowBtnComponent({propsData: {isHouse: isHouse, mapObject: this.mapObject}}).$mount();
				document.getElementById('infoContentBtn').appendChild(infoBtn.$el);

				return infoWindow;
			},
		},
		mounted() {
			const _this = this;

			_this.loadBMapScript();

			const ysxlh = uiScript.getParam('ysxlh') || '';
			request({
				url: '/GetBdcqzhInfo',
				data: { 'ysxlh': ysxlh },
				success(response) {
					if (Number(response.resultcode) === 1) {
						_this.realEstateInfo = response.result;

						let map = {};
						if (_this.mapObject) {
							map = _this.mapObject
						} else {
							map = _this.initMap();
						}
						_this.addInfoWindow();
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

</style>
