"use strict";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
      filename: "search.html",
      inject: true,
      // chunks: ["search"],// 如果不指定引入的文件，那默认所有的css，js都会全部引入。在多页面打包中尤为重要。
      minify: {
        html5: true,
        collapseWhitespace: true, // 清理html中的空格、换行符。
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
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
  ],
  mode: "production",
};
