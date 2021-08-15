const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, '../src/index.tsx'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),

    new MiniCssExtractPlugin(),

    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src/'),
      overrideConfigFile: path.resolve(__dirname, '../.eslintrc'),
      extensions: ['ts', 'tsx'],
    }),
  ],

  devtool: 'cheap-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    port: 3000,
  },
};
