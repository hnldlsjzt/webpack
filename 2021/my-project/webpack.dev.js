"use strict";
const { name } = require("file-loader");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
// 单页面打包
// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",// 单文件可以写死
//     path: path.join(__dirname, "dist"),
//   },
//   mode: "production",
// };

// 多页面打包
module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    filename: "[name].js", // 多文件需要使用占位符
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|)$/,
      //   use: [
      //     {
      //       loader: "url-loader",// url-loader 支持返回 base64 编码
      //       options: {
      //         limit: 10240,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ],
  },
  // Plugins: [new webpack.HotModuleReplacementPlugin({})],
  devServer: {
    contentBase: "../my-project/dist", //  服务的基础目录
    hot: true,
    open: true,
    port: 8095,
  },
  mode: "development",
};
