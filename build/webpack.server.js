const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

// 服务端打包 是给 node 使用的
module.exports = merge(base, {
  mode: 'development',
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2'  // 使用moduel.exports 导出，node 可以使用require 引入
  },
  target: 'node',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index-ssr.html'),
      filename: 'index-ssr.html',
      excludeChunks: ['server']   // 因为服务端的 html 需要引入的是客户端的js，所以这里不需要默认引入服务端的js
    }),
    new VueSSRServerPlugin()
  ]
})