export const baiduMap = {
	init() {
		// todo 这个ak是百度地图开发者密钥，若正式使用需要重新申请
		const ak = 'okW4mY38zWSMxao13zYpuqZ4NzokUMYr';
		const BMapURL = 'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&s=1&callback=onBMapCallback'
		return new Promise((resolve, reject) => {
			// 如果已加载直接返回
			if (typeof BMap !== 'undefined') {
				resolve(BMap)
				return true
			}
			// 百度地图异步加载回调处理
			window.onBMapCallback = function() {
				console.log('百度地图脚本初始化成功...')
				resolve(BMap)
			};
			// 插入script脚本
			let scriptNode = document.createElement('script')
			scriptNode.setAttribute('type', 'text/javascript')
			scriptNode.setAttribute('src', BMapURL)
			document.body.appendChild(scriptNode)
		})
	}
}
