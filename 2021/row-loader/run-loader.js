const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
  {
    resource: path.join(__dirname, "./src/demo.txt"),
    loaders: [path.join(__dirname, "./src/row-loader.js")],
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
