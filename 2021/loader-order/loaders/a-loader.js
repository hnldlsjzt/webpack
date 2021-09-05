const loaderUtils = require("loader-utils");
module.exports = function (source) {
  const url = loaderUtils.interpolateName(this, "[name].[ext]", source);
  console.log("url", url, source);
  this.emitFile(url, source);
  // this.emitFile("js/index.js", source);
  console.log("loader a excuted");
  return source;
};
