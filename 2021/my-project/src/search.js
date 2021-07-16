import React from "react";
import ReactDom from "react-dom";

import "./index.less";
import ReduxImg from "./img/redux.jpg";
import WebpackLogo from "./img/webpack.png";
const App = () => {
  return (
    <>
      <div className="search">我是serach --watch + devServer </div>
      <div>.hot-updata.json</div>
      <div>整体刷新 if</div>
      <img src={ReduxImg} alt="图片" />
      <img src={WebpackLogo} alt="图片" />
    </>
  );
};
if (module.hot) {
  module.hot.accept();
}
ReactDom.render(<App />, document.getElementById("root"));