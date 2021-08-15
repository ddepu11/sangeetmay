const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "../src/index.tsx"),

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],

  devtool: "cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    hot: true,
    port: 3000,
  },
};
