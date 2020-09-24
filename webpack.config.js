const path = require('path')

const DonePlugin = require('./plugins/DonePlugins')
const AsyncPlugins = require('./plugins/AsyncPlugins')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileListPlugin = require('./plugins/FileListPlugin')
// const InlineSourcePlugins = require('./plugins/InlineSourcePlugins')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //  清除控制台消息
  stats: {
    assets: false,
    builtAt: false,
    modules: false,
    entrypoints: false
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: 'banner-loader',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        // 1. 处理路径 通过file-loader处理 2.小文件生成base64
        use: {
          loader: 'url-loader',
          // options: {
          //   limit: 200 * 1024 //  // 大于200k产生文件，小200k生成base64
          // }
        },
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new DonePlugin(), // 同步插件
    new AsyncPlugins(), // 异步插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    // new InlineSourcePlugins({
    //   match: /\.(js|css)/
    // }),
    new FileListPlugin({
      filename: 'list.md'
    })
  ]
}