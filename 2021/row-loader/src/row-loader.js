const loaderUtils = require("loader-utils");
// 接收一个参数
module.exports = function (resource) {
  const { name } = loaderUtils.getOptions(this);
  console.log('name', name);// 获取到test
  let string = JSON.stringify(resource).replace("foo", "zee");
  return `export default ${string}`;
};
