const Spritesmith = require("spritesmith");
const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  const callback = this.async();
  const imgs = source.match(/url\((\S*)\?__sprite/g);
  console.log("imgs", imgs);
  const matchImgs = [];
  for (let i = 0; i < imgs.length; i++) {
    // 获取图片路径
    const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];
    console.log("img", img);
    matchImgs.push(path.join(__dirname, img));
  }
  console.log(matchImgs);
  Spritesmith.run(
    {
      src: matchImgs,
    },
    function (err, result) {
      if (err) {
        callback(err, "");
        return;
      }
      console.log("result", err, result);
      // 由于不在 webpack 环境，所以没用 this.emitFile，改用 fs.writeFileSync
      // 需要先创建 dist 目录，不然会报错
      fs.writeFileSync(
        path.join(process.cwd(), "dist/sprite.jpg"),
        result.image
      );
      source = source.replace(/url\((\S*)\?__sprite\)/g, (match) => {
        return `url("./sprite.jpg")`;
      });
      fs.writeFileSync(path.join(process.cwd(), "dist/index.css"), source);
      console.log(source, result);
    }
  );
};
