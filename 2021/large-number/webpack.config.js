/**
 * 需求：
 * 同时输出两个文件，一个压缩版本，一个未压缩
 */
const TerserPlugin = require("terser-webpack-plugin");

exports.default = {
  entry: {
    "large-number": "./src/index.js",
    "large-number.min": "./src/index.js",
  },
  output: {
    filename: "[name].js",
    library: "large-number-zt1", // 库的名称
    libraryTarget: "umd", // 支持引入的方式
    libraryExport: "default", // 支持默认的形式
  },
  mode: "none", // 默认都不打包，然后在插件的时候打包我们需要的文件
  optimization: {
    minimize: true, // 压缩
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js/, // 匹配规则，只对min.js开启压缩
      }),
    ],
  },
};
