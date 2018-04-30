const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /(node_modules)/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ] 
      }
    ]
  }
});