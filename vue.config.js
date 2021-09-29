const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin') //webp loader

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  // 調整內部的 webpack 配置。
  // 查閱 https://cli.vuejs.org/zh/guide/webpack.html
  chainWebpack: () => {},
  // 配置 webpack-dev-server 行為。
  devServer: {
    port: 8888,
  },
  configureWebpack: {
    plugins: [
      new ImageminWebpWebpackPlugin({
        config: [
          {
            test: /\.(jpe?g|png)/,
            options: {
              quality: 75,
            },
          },
        ],
        overrideExtension: false,
      }),
    ],
  },
}
