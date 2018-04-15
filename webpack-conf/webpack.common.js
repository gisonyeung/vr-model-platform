/*
 * created by gisonyeung on 2018/02/26
 *
 * WebVR电力模型展示系统前端页面构建配置
 */

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    path.join(__dirname, '../src/scripts/app.js')
  ],

  output: {
    path: path.join(__dirname, '../__build__/'),
    filename: 'bundle.js',
    publicPath: '/__build__/'
  },

  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@scripts': path.resolve(__dirname, './src/scripts'),
    }
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.(scss|css)$/, loader: 'style-loader!css!sass' },
      { test: /\.(png|jpg|jpeg|gif|webp)$/, loader: 'file-loader' },
    ]
  },

}