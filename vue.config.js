// vue.config.ts 配置说明

module.exports = {

  publicPath: '/',

  // 打包后输出路径
  outputDir: 'dist',

  // 保存时是不是用esLint-loader 来lint 代码
  lintOnSave: true,

  devServer: { // 配置服务器
    host: '0.0.0.0',
    port: 3000, // 端口号
    https: false,
    compress: true,
    open: true, // 配置自动启动浏览器
    hotOnly: true
  },

  pluginOptions: {

  }

}
