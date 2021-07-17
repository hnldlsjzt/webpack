

// NODE_ENV 在 pageage.json中的script指定mode 或者 webpack.config 中的 mode 指定
if (process.env.NODE_ENV === "production") {
  // 生产环境导出压缩版本
  module.exports = require("./dist/large-number.min");
} else {
  module.exports = require("./dist/large-number");
}
