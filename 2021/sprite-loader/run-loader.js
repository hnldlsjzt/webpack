const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");
runLoaders(
  {
    resource: path.join(__dirname, "./loaders/index.css"),
    // loaders: [path.join(__dirname, "./src/row-loader.js")],// 设置单个 loader
    loaders: [
      {
        loader: path.join(__dirname, "./loaders/sprite-loader.js"),
        options: {
          name: "test",
        },
      },
    ],
    context: { minimize: true },
    // processResource: (loaderContext, resourcePath, callback) => {
    //   console.log("processResource", loaderContext, resourcePath, callback);
    // },
    readResource: fs.readFile.bind(this),
  },
  function (err, res) {
    err ? console.log(err) : console.log(res);
  }
);
