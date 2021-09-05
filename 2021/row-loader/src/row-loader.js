const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");
// 接收一个参数
module.exports = function (resource) {
  const { name } = loaderUtils.getOptions(this);
  console.log("name", name); // 获取到test
  let string = JSON.stringify(resource).replace("foo", "zee");

  // 返回单个与多个参数
  // return `export default ${string}`;
  // this.callback(null, string, 1, 2, 3, 4); //result: [ '"zeebar"', 1, 2, 3, 4 ],
  // 抛异常的两种方式
  // throw new Error('Error')
  // this.callback(new Error("callback Error"), string, 1, 2, 3, 4); // callback Error
  // ---- 以上都是同步的方式，以下增加异步的方式------------
  const callback = this.async(); // 异步 loader 的返回方式
  fs.readFile(path.join(__dirname, "./async.txt"), function (err, data) {
    if (err) {
      callback(err, "");
      return;
    }
    callback(null, data.toString());
  });
};
