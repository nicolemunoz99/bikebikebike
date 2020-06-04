const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

module.exports = (env) => {

  // ENV defined in parent dir
  const basePath = `${path.join(__dirname)}/..`;
  const envPath = `${basePath}/.env.${env.ENVIRONMENT}`;

  // check if the file exists, otherwise fall back to .env
  const finalPath = fs.existsSync(envPath) ? envPath : `${basePath}/.env`;

  // define path parameter in dotenv config
  const fileEnv = dotenvExpand(dotenv.config({ path: finalPath })).parsed;
  
  // reduce to object
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: './src/index.js',
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
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ],
    devtool: 'inline-source-map',
    output: {
      path: __dirname + '/dist/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, '/dist/'),
      compress: true,
      port: 9000,
      historyApiFallback: true
    }
  };
}; 
