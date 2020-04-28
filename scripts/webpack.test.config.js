const path = require('path');
const defaultConfig = require('./defaultConfig');

module.exports = {
  ...defaultConfig,
  plugins: [],
  entry: path.resolve(__dirname, '../specs/index.js'),
  devtool: 'inline-source-map',
  module: {
    ...defaultConfig.module,
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        },
        enforce: 'post',
        include: path.resolve(__dirname, '../src')
      },
      ...defaultConfig.module.rules
    ]
  }
};
