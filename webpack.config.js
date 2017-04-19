var webpack = require('webpack')
var path = require('path')


module.exports = {
  entry: {
    index:  path.join(__dirname, 'src/index')
  },
  output: {
    //path: path.join(__dirname, 'dist'),
    path:path.join(__dirname, '/dist'),
    filename: '[name].js',
  }, //页面引用的文件
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
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
      jQuery: 'jquery',
      "avalon":"avalon2"
    })
  ]
}

