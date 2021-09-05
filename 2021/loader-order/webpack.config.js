const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve("./loaders/a-loader.js"),
          path.resolve("./loaders/b-loader.js"),// 它先打印出来
        ],
      },
    ],
  },
};
