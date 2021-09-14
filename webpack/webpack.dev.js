const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',

  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src/'),
      overrideConfigFile: path.resolve(__dirname, '../.eslintrc'),
      extensions: ['ts', 'tsx'],
    }),
    new BundleAnalyzerPlugin(),
  ],

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
};
