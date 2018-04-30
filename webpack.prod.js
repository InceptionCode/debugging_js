const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true
              }
            }, 
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin('[name].[hash].css')
  ]
});