import React, { useState } from "react";
import ReactDom from "react-dom";
// import { add } from "../common/unit";
import { a } from "./tree-shaking";
// import add from "large-number-zqt"; // 引入数字相加的包
import "./index.less";
import ReduxImg from "./img/redux.jpg";
import WebpackLogo from "./img/webpack.png";
import Texts from "./test";
const App = () => {
  const [Text, setText] = useState(null);
  // console.log("Texts", Texts);
  // console.log("this is add", add("999", "1"));
  const handleClick = () => {
    import("./test.js").then((res) => {
      // 在使用组件的时候 直接渲染 Text 而不是 <Text/>
      setText(res.default());
    });
  };
  return (
    <>
      <div className="search">我是serach --watch + devServer </div>
      <div>.hot-updata.json</div>
      <div>整体刷新 if hot</div>
      <div>增加target:'web',才能热更新</div>
      {/* <div>2+3 = {add("999", "1")}</div> */}
      <img src={ReduxImg} alt="图片" />
      <img src={WebpackLogo} onClick={handleClick} alt="图片" />
      {Text ? Text : null}
      <div>增加 friendly-errors-webpack-plugin</div>
      <div>多页面热更新12345</div>
      {/* <Texts /> */}
    </>
  );
};
// if (module.hot) {
//   module.hot.accept();
// }
ReactDom.render(<App />, document.getElementById("root"));
