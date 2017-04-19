var webpack = require('webpack')
var path = require('path')


module.exports = {
  entry: [
    path.resolve(__dirname, './src/index')
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    // “path”仅仅告诉Webpack结果存储在哪里

  }, //页面引用的文件
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.html$/, loader: 'raw!html-minify'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  resolve: {
    extensions: ['.js', '']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      "avalon":"avalon2"
    })
  ]

}

