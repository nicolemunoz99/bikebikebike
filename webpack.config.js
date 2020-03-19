const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/client/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/dist/'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
};