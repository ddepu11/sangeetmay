const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/_redirects'),
          to: path.resolve(__dirname, '../build'),
        },
      ],
    }),
  ],

  devtool: false,

  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
