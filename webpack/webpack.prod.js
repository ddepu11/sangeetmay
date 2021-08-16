const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [new CleanWebpackPlugin()],
};
