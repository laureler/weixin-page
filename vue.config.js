// vue.config.ts 配置说明

const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir)
}

const env_prod = process.env.NODE_ENV === 'production';

console.log(process.env.NODE_ENV);

module.exports = {

    publicPath: env_prod ? './' : '/',
    // 打包后输出路径
    outputDir: 'dist',
    assetsDir: 'assets',
    // 保存时是不是用esLint-loader 来lint 代码
    lintOnSave: true,

    chainWebpack: config => {
        if (env_prod) {
            config.plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

            config.module
                .rule('image-webpack-loader')
                .test(/\.(gif|png|jpe?g|svg)$/i)
                .use('file-loader')
                .loader('image-webpack-loader')
                .tap(() => ({
                    disable: !env_prod
                }))
                .end()
        }
        config.output.filename('./assets/js/[name].[hash].js').end()
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('layout', resolve('src/layout'))
            .set('base', resolve('src/base'))
            .set('static', resolve('src/static'))

    },

    configureWebpack: config => {

        if (env_prod) {
            // 为生产环境修改配置...
            plugins: [
                new MiniCssExtractPlugin({
                    filename: './assets/css/[name].[hash].css',
                    chunkFilename: './assets/css/[id].[hash].css'
                }),

                new OptimizeCSSAssetsPlugin({
                    cssProcessor: require('cssnano'),   // css 压缩优化器
                    cssProcessorOptions: { discardComments: { removeAll: true } } // 去除所有注释
                }),

                // 告诉webpack公共库文件已经编译好了
                new webpack.DllReferencePlugin({
                    context: process.cwd(),
                    manifest: require('./public/vendor/vendor-manifest.json')
                }),
                // 将 dll 注入到 生成的 html 模板中
                new AddAssetHtmlPlugin({
                    // dll文件位置
                    filepath: path.resolve(__dirname, './public/vendor/*.js'),
                    // dll 引用路径
                    publicPath: './vendor',
                    // dll最终输出的目录
                    outputPath: './vendor'
                }),

                // 压缩：去除空格注释
                new UglifyJSPlugin({
                    uglifyOptions: {
                        output: {
                            // 最紧凑的输出
                            beautify: false,
                            // 删除所有的注释
                            comments: false,
                        },
                        chunkFilter: () => true,
                        compress: {
                            // 在UglifyJs删除没有用到的代码时不输出警告
                            warnings: false,
                            // 删除所有的 `console` 语句，可以兼容ie浏览器
                            drop_console: true,
                            // 删除debugger
                            drop_debugger: true,
                            // 内嵌定义了但是只用到一次的变量
                            collapse_vars: true,
                            ie8: false,
                            // 提取出出现多次但是没有定义成变量去引用的静态值
                            reduce_vars: true,
                        },
                        cache: true,
                        parallel: true,
                    }
                }),

                // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
                /*new ParallelUglifyPlugin({
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
                }),*/

                // 开启Gzip压缩
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.(js|css|html)(\?.*)?$/i,
                    threshold: 10240,
                    minRatio: 0.8
                })
            ]
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
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 生产环境下是true,开发环境下是false
        extract: env_prod,
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
                }
            },
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
}
