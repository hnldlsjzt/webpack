"use strict";
const path = require("path");

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
  mode: "production",
};
