// vue.config.ts 配置说明

const path = require('path');
var openInEditor = require('launch-editor-middleware')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function resolve (dir) {
	return path.join(__dirname, dir);
}

// const env_analyz = process.env.IS_ANALYZ === 'analyz';
const env_build = process.env.NODE_ENV === 'production';

module.exports = {
	publicPath: '/pubWeb/public/weChatPublic/',
	// publicPath: '/app/',
	// 打包后输出路径
	outputDir: 'dist/pubWeb/public/weChatPublic/',
	assetsDir: 'weChatPublic',
	// 保存时是不是用esLint-loader 来lint 代码
	lintOnSave: true,

	chainWebpack: config => {
		if (process.env.IS_ANALYZ === 'analyz') {
			config.plugin('webpack-bundle-analyzer')
				.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
		}

		if (env_build) {
			config.module
				.rule("image-webpack-loader")
				.test(/\.(gif|png|jpe?g|svg)$/i)
				.use("file-loader")
				.loader("image-webpack-loader")
				.tap(() => ({
					disable: !env_build
				}))
				.end();
		}

		config.output.filename('./js/[name].[hash].js').end();
		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('public', resolve('public'))
			.set('vue$', 'vue/dist/vue.esm.js')
	},

	configureWebpack: config => {
		if (env_build) {
			// 为生产环境修改配置...
			plugins: [
				new MiniCssExtractPlugin({
					filename: './css/[name].[hash].css',
					chunkFilename: './css/[id].[hash].css'
				}),

				new OptimizeCSSAssetsPlugin(),

				// 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
				new ParallelUglifyPlugin({
					// 传递给 UglifyJS 的参数
					uglifyJS: {
						output: {
							// 最紧凑的输出
							beautify: false,
							// 删除所有的注释
							comments: false,
						},
						compress: {
							// 在UglifyJs删除没有用到的代码时不输出警告
							warnings: false,
							// 删除所有的 `console` 语句，可以兼容ie浏览器
							drop_console: true,
							// 内嵌定义了但是只用到一次的变量
							collapse_vars: true,
							// 提取出出现多次但是没有定义成变量去引用的静态值
							reduce_vars: true,
						}
					},
				}),

			];
			// 将每个依赖包打包成单独的js文件
			let optimization = {
				runtimeChunk: 'single',
				splitChunks: {
					chunks: 'all',
					maxInitialRequests: Infinity,
					minSize: 20000,
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name (module) {
								// get the name. E.g. node_modules/packageName/not/this/part.js
								// or node_modules/packageName
								const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
								// npm package names are URL-safe, but some servers don't like @ symbols
								return `npm.${packageName.replace('@', '')}`;
							}
						}
					}
				},
			};
			Object.assign(config, {
				optimization
			});
		} else {
			// 为开发环境修改配置...
			plugins: [
				new MiniCssExtractPlugin({
					filename: './css/[name].css',
					chunkFilename: './css/[id].css'
				}),
			];
		}
	},
	productionSourceMap: false,
	// css相关配置
	css: {
		// 是否使用css分离插件 生产环境下是true,开发环境下是false
		extract: env_build,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			less: {
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader',
			},
		},
		// 启用 CSS modules for all css / pre-processor files.
		modules: false
	},

	devServer: { // 配置服务器
		host: '0.0.0.0',
		port: 3000, // 端口号
		https: false,
		compress: true,
		open: true, // 配置自动启动浏览器
		hotOnly: true,
		 proxy: {
		       '/pubWeb/public/doIntranetRequest/GetTitleList' : {
				   target: 'http://localhost:8080', ws: true, followRedirects: false, hostRewrite: 'localhost:3000'
			   },

			 '/pubWeb/public/doIntranetRequest/GetWeChatPublicName' : {
				 target: 'http://bdc.qylr.gov.cn', ws: true, followRedirects: false, hostRewrite: 'localhost:3000'
			 },
			 '/pubWeb/public/doIntranetRequest/GetRuleDetail' : {
				 target: 'http://localhost:8080', ws: true, followRedirects: false, hostRewrite: 'localhost:3000'
			 },
			 '/pubWeb/public/doIntranetRequest/SearchYYInfoByOpenId': {
				 target: 'http://bdc.qylr.gov.cn', ws: true, followRedirects: false, hostRewrite: 'localhost:3000'
			 },
			// 开发模式下 代理网络请求
			// '/cas': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' },
			// '/mainWeb': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' },
			// '/gdbdcWebService': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' },
			// '/pubWeb/public/getWeChatConfig': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' }
			// '/pubWeb': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' },
			// '/public': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' },
			// '/workflowWebService': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' },
		/*	'/pubWeb/public/doIntranetRequest/GetAllNo': { target: 'http://bdc.qylr.gov.cn/pubWeb/public/doIntranetRequest/GetAllNo', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' },*/
			'/pubWeb/public/getWeChatIndexList': { target: 'http://www.aiwandoudou.com', ws: true, followRedirects: false, hostRewrite: 'localhost:3000' }
		},
		before (app) {
			app.use('/__open-in-editor', openInEditor('webstorm'))
			// app.use('/__open-in-editor', openInEditor('code'))
			// app.use('/__open-in-editor', openInEditor('idea'))
		}
	},
};
