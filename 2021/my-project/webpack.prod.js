"use strict";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, // 设计稿为750，如是375就是37.5
              remPrecision: 8,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
      chunkFilename: "index.css",
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcesso: require("cssnano"),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/search.html"),
      filename: "search.html", // 输出后的文件名称
      inject: true, // 注入关联的js 和 css，默认注入
      // chunks: ["search"],// 如果不指定引入的文件，那默认所有的css，js都会全部引入。在多页面打包中尤为重要。
      minify: {
        html5: true,
        collapseWhitespace: true, // 清理html中的空格、换行符。
        preserveLineBreaks: false, // 保留换行符
        minifyCSS: false, // 只会压缩当前html中的CSS
        minifyJS: false, // 只会压缩当前html中的JS
        removeComments: false, // 删除注释
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      filename: "index.html",
      inject: true,
      chunks: ["index"], // 如果不指定引入的文件，那默认所有的css，js都会全部引入
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new CleanWebpackPlugin(),
  ],
  mode: "production",
};
