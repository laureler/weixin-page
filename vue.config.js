// vue.config.ts 配置说明

const path = require('path')
const env_prod = process.env.NODE_ENV === 'production';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

function resolve (dir) {
    return path.join(__dirname, dir)
}

console.log(process.env.NODE_ENV);

module.exports = {

    publicPath: env_prod ? "./" : "/",
    // 打包后输出路径
    outputDir: 'dist',
    assetsDir: 'assets',
    // 保存时是不是用esLint-loader 来lint 代码
    lintOnSave: true,

    chainWebpack: config => {
        if (env_prod) {
            config.plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);

            config.module
                .rule("image-webpack-loader")
                .test(/\.(gif|png|jpe?g|svg)$/i)
                .use("file-loader")
                .loader("image-webpack-loader")
                .tap(() => ({
                    disable: !env_prod
                }))
                .end();
        }
        config.output.filename('./assets/js/[name].[hash].js').end();
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('layout', resolve('src/layout'))
            .set('base', resolve('src/base'))
            .set('static', resolve('src/static'));

    },

    configureWebpack: config => {

        if (env_prod) {
            // 为生产环境修改配置...
            return {
                plugins: [
                    new MiniCssExtractPlugin({
                        filename: './assets/css/[name].[hash].css',
                        chunkFilename: './assets/css/[id].[hash].css'
                    }),
                    // 压缩：去除空格注释
                    new UglifyJSPlugin({
                        uglifyOptions: {
                            output: {
                                comments: false
                            },
                            compress: {
                                warnings: false,
                                drop_debugger: true,
                                drop_console: true,
                                pure_funcs: ['console.log'] // 移除console
                            }
                        }
                    }),
                    // 开启Gzip压缩
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: /\.(js|css|html)(\?.*)?$/i,
                        threshold: 10240,
                        minRatio: 0.8
                    })
                ]
            }
        } else {
            // 为开发环境修改配置...
            return {
                plugins: [
                    new MiniCssExtractPlugin({
                        filename: './assets/css/[name].css',
                        chunkFilename: './assets/css/[id].css'
                    })
                ]
            }
        }

    },
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 生产环境下是true,开发环境下是false
        extract: env_prod,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less:{
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
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
        hotOnly: true
    },

    pluginOptions: {
        splitChunks: {
            chunkGroups: {
                vendor: {
                    chunks: 'initial',
                    test: path.resolve(__dirname, 'node_modules'),
                    name: 'vendors',
                    enforce: true,
                },
            },
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
    },

}
