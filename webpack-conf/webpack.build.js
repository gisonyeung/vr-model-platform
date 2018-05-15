const webpack = require('webpack');
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(common, {

  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  mode: 'production',

  plugins: [
    // new CleanWebpackPlugin(['/dist/'], {
    //    root: path.resolve('../')
    // }),
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './index.html'
    // }),
  ]
})
