<template>
	<div style="height: 100%;width: 100%;">
		<div v-if="isShow" style="height: 100%;">
			<div id="container" class="map-container"></div>
		</div>

		<van-popup v-model="isShowInfo" v-if="realEstateInfo" position="bottom" :overlay="false">
			<div class="basic-title-div">
				<div style="display: inline-block;">
					<span class="basic-new-title">基本信息</span>
					<van-icon name="info-o" color="red" size="12px" />
					<span class="basic-hint">注意保管好个人隐私信息</span>
				</div>
				<div style="display: inline-block;float: right;">
					<van-icon name="clear" color="#D8D8D8" size="26px" @click="closeInfoWindow" />
				</div>
			</div>
			<van-cell-group class="basic-info" :border="false">
				<van-field :value="'证书编号：NO D'+realEstateInfo.ysxlh" :border="false" readonly/>
				<van-field :value="'不动产状态：'+ realEstateInfo.zt" :border="false" readonly/>
				<van-field :value="'面积：' + realEstateInfo.mj" :border="false" readonly/>
				<van-field :value="'坐落：'+realEstateInfo.zl" :border="false" readonly/>
			</van-cell-group>
			<div style="text-align: center;width: 100%">
				<div :class="newBtnClass">
					<van-button class="basic-info-btn" @click="btnClick(0)">宗地图</van-button>
				</div>
				<div v-if="isHouse" :class="newBtnClass">
					<van-button class="basic-info-btn" @click="btnClick(1)">分户图</van-button>
				</div>
			</div>
		</van-popup>
		<van-popup v-model="isShowPhoto" position="right">
			<img v-show="isShowZDT" :src="mapData.zdt"  @click="btnClick('zdt')" :class="newImgClass">
			<img v-show="isShowFHT" :src="mapData.fht"  @click="btnClick('fht')" :class="newImgClass">
		</van-popup>
	</div>
</template>

<script>

	import { request } from '../../utils/http.js'
	/*import { baiduMap } from '../../utils/map'*/
	import { Dialog } from 'vant'
	import { ImagePreview } from 'vant';

	export default {
		data () {
			return {
				showImg:false,
				realEstateInfo: {},	// 不动产位置信息
				isShow: true,
				isShowInfo: false,
				mapObject: {},	// 保存map和marker对象
				mapData: {
					zdt: '',
					fht: ''
				},	// 宗地图和分户图数据
				isShowZDT: false,
				isShowFHT: false,

				isHouse: false,
				isShowPhoto: false,	// 显示宗地图或分户图

				newBtnClass: 'basic-btn-div',	// 动态生成按钮样式
				newImgClass: 'show-img-size',	// 动态修改图片样式
			}
		},
		methods: {
			changeImgSize() {
				if (this.newImgClass === 'show-img-size') {
					this.newImgClass = 'db-img-size';
				} else {
					this.newImgClass = 'show-img-size';
				}
			},
			btnClick(value) {
				let _this=this;
			//	this.isShowPhoto = true;
				// 0表示宗地图，1表示分户图
				if (value === 0) {
					ImagePreview({
						images:[_this.mapData.zdt],
						showIndex:false
					});
					//this.newImgClass = 'show-img-size';
					//this.isShowFHT = false;
					//this.isShowZDT = true;
				} else if (value === 1) {
					//this.newImgClass = 'show-img-size';
					//this.isShowZDT = false;
					//this.isShowFHT = true;
					ImagePreview({
						images:[_this.mapData.fht],
						showIndex:false
					});
				}/* else {
					/!*wx.previewImage({
						current: ''
					});*!/
					this.changeImgSize();
				}*/
			},
			closeInfoWindow() {
				this.isShowInfo = false;
			},
			// 获取宗地图和分户图数据
			getZdtAndFhtInfo() {
				const  _this = this;
				const ysxlh = uiScript.getParam('ysxlh') || '';

				/*request({
					url: '/photoCompression',
					data: { strJson: JSON.stringify({ ysxlh: ysxlh }) },
					success(response) {
						if (Number(response.resultcode) === 1) {
							//_this.mapData.zdt = URL.createObjectURL(_this.base64ToBlob('data:image/jpg;base64,' + response.result.zdt));
							//_this.mapData.fht = URL.createObjectURL(_this.base64ToBlob('data:image/jpg;base64,' + response.result.fht));
							_this.mapData.zdt=response.result.zdt;
							_this.mapData.fht=response.result.fht;
						} else {
							console.log('获取宗地图和分户图数据失败：' + response.resultmsg);
						}
					},
					fail(error) {
						console.log(error);
					}
				})*/
				const config={ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
				const data=JSON.stringify({ ysxlh: ysxlh });
				let formData = new FormData();
				formData.append('strJson', data);
				_this.$post('/pubWeb/system/public/photoCompression', formData,config).then(response => {
					_this.mapData.zdt ='/'+response.zdtPicturePath;
					_this.mapData.fht ='/'+response.fhtPicturePath;
				}).catch(error => {
					console.log(error);
				});
			},
			// base64转blob
			base64ToBlob(base64Code) {
				let parts = base64Code.split(';base64,');
				let contentType = parts[0].split(':')[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;

				let uInt8Array = new Uint8Array(rawLength);

				for (let i = 0; i < rawLength; ++i) {
					uInt8Array[i] = raw.charCodeAt(i);
				}
				return new Blob([uInt8Array], {type: contentType});
			},
			// 初始化地图
			initMap() {
				const _this = this;
				//创建地图实例
				//let map = new BMap.Map('container', {enableMapClick: false});
				let map = new window.T.Map('container');
				//let point = new BMap.Point(_this.realEstateInfo.zb.split(',')[0], _this.realEstateInfo.zb.split(',')[1]);
				let point = new T.LngLat(_this.realEstateInfo.zb.split(',')[0], _this.realEstateInfo.zb.split(',')[1])
				//创建标注对象
				let marker = new  T.Marker(point);
				map.addOverLay(marker)
				//创建缩放平移控件
				let control = new T.Control.Zoom();
				control.setPosition(T_ANCHOR_TOP_LEFT);
				//添加缩放平移控件
				map.addControl(control);
				//地图初始化，设置中心点坐标和地图级别
				map.centerAndZoom(point, 18);
				marker.addEventListener('click', function () {
					_this.isShowInfo = !_this.isShowInfo;
				});
				/*let pointArr = [];
				pointArr.push(point);
				new BMap.Convertor().translate(pointArr, 1, 5, data => {
					//坐标转换完之后的回调函数
					if(data.status === 0) {
						let marker = new BMap.Marker(data.points[0]);
						map.addOverlay(marker);
						map.setCenter(data.points[0]);

						marker.addEventListener('click', function () {
							_this.isShowInfo = !_this.isShowInfo;
						});
					}
				});*/
			},
		},
		mounted() {
			const _this = this;

			const ysxlh = uiScript.getParam('ysxlh') || '';
			request({
				url: '/GetBdcqzhInfo',
				data: { strJson: JSON.stringify({'ysxlh': ysxlh }) },
				success(response) {
					if (Number(response.resultcode) === 1) {
						_this.realEstateInfo = response.result;

						_this.isShowInfo = true;
						_this.getZdtAndFhtInfo();
						// 不动产类型为 土地和房屋 时才显示分户图
						if (response.result.bdclx === '土地和房屋') {
							_this.isHouse = true;
							_this.newBtnClass += ' new-btn-div';
						}
						if(window.T !== undefined){
							_this.initMap();
						}else {
							Dialog.alert({
								message: '地图初始化失败，请刷新重试!'
							})
						}
						/*TDMap.init().then((T) => {
							console.log(T)
							_this.initMap()
						}).catch(error => {
							console.log(error);
							Dialog.alert({
								message: '百度地图初始化失败，请刷新重试!'
							}).then({
							});
						});*/
					} else {
						_this.isShow = false;
						Dialog.alert({
							message: response.resultmsg
						}).then({
						});
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

	.basic-info /deep/ .van-cell {
		font-size: 14px !important;
		padding: 3px 3px 3px 15px !important;
	}

	.basic-btn-div {
		display: inline-block;
		width: 97%;
	}

	.new-btn-div {
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

	.show-img-size {
		width: 100%;
	}

	.db-img-size {
		width: 200%;
	}

</style>
