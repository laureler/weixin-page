// vue.config.ts 配置说明

const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

console.log(process.env.NODE_ENV);

module.exports = {

    publicPath: './',
    // 打包后输出路径
    outputDir: 'dist',
    assetsDir: 'assets',
    // 保存时是不是用esLint-loader 来lint 代码
    lintOnSave: true,

    /*chainWebpack: config => {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },*/

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            // 为生产环境修改配置...
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            }
        } else {
            // 为开发环境修改配置...
        }

    },
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },

    devServer: { // 配置服务器
        host: '0.0.0.0',
        port: 3000, // 端口号
        https: false,
        compress: true,
        open: true, // 配置自动启动浏览器
        hotOnly: true
    },

    pluginOptions: {}

}
