"use strict";
const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");// HTML 模板插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");// 构建时自动清除output的产物
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"); // 优化构建日志

// 单页面打包
// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",// 单文件可以写死
//     path: path.join(__dirname, "dist"),
//   },
//   mode: "production",
// };
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  entryFiles.map((item) => {
    const entryFile = item;
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match && match[1];
    entry[pageName] = item;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}/index.html`, // 输出后的文件名称
        inject: true, // 注入关联的js 和 css，默认注入
        chunks: [pageName], // 如果不指定引入的文件，那默认所有的css，js都会全部引入。在多页面打包中尤为重要。
        minify: {
          html5: true,
          collapseWhitespace: true, // 清理html中的空格、换行符。
          preserveLineBreaks: false, // 保留换行符
          minifyCSS: true, // 只会压缩当前html中的CSS
          minifyJS: true, // 只会压缩当前html中的JS
          removeComments: false, // 删除注释
        },
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

// 多页面打包
module.exports = {
  entry: entry,
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: "./dist", //  服务的基础目录
    hot: true,
    open: true,
    port: 8095,
    stats: "errors-only", // 在热更新时也打印日志
  },
  /**
   * eval：报错时看不到行、列信息，map文件使用 eval 来执行
   * source-map,inline-source-map: 能看到完整的原代码信息
   * cheap-source-map: 只能看到报错行
   *
   */
  devtool: "source-map",
  stats: "errors-only",
  mode: "development",
};
