const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    app: './src/app.js',
  //  bsConfig: './bs-config.js'
  },
  output: {
    filename:'[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/fonts/',
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Demo App',
      template: 'src/demo.html',
      filename: 'demo.html'
    })
  ]
};