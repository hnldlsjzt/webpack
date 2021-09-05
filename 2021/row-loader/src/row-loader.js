// 接收一个参数
module.exports = function (resource) {
  let string = JSON.stringify(resource).replace("foo", "zee");
  return `export default ${string}`;
};
