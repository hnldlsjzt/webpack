(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["large-number-zt1"] = factory();
	else
		root["large-number-zt1"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ add)
/* harmony export */ });
function add(a, b) {
  // 获取传入数据的长度，并获取他们的最后一位
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0; // 位数
  let res = ""; // 结果,只能是字符串类型

  while (i >= 0 || j >= 0) {
    let x = 0,
      y = 0,
      sum = "";
    if (i >= 0) {
      // i还有长度，接着算
      x = Number(a[i]); // 根据索引，获得数字，并转为number
      i--; // 减去索引值
    }
    if (j >= 0) {
      y = Number(b[j]); // 跟 a 同理
      j--;
    }
    // 开始累加，已经获取到了当前位数的数字
    // 例如 999 + 1

    /**
     * 拿 999+ 1 做验证
     * step1：9 + 1 + 0 = 10, 有进位，需要-10，sum: 0,res = '0'
     * step2：9 + 0 + 1 = 10, 有进位，需要-10，sum: 0,res = '00'
     * step3：位数不够，while跳出。还有进位 res = 1 +'00'
     *
     */
    sum = x + y + carry;
    if (sum >= 10) {
      // 需要进位
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }
    console.log("sum:", sum, "carry:", carry);
    // 累加结果
    res += sum;
    console.log("res:", res);
  }
  // 有进位，需要+1
  if (carry) {
    res = carry + res;
  }
  return res;
}

// function add1(a, b) {
//   // 获取索引长度和索引
//   let i = a.length - 1;
//   let j = b.length - 1;
//   let carry = 0; // 是否有进位
//   let res = ""; // 定义字符串来相加

//   //让位数在里面跑完，
//   while (i >= 0 || j >= 0) {
//     let x = 0,
//       y = 0,
//       sum = 0;
//     if (i >= 0) {
//       x = Number(a[i]);
//       i--; // 获取下一个索引的值
//     }
//     if (j >= 0) {
//       y = Number(b[i]);
//       j--;
//     }
//     // 让他们相加，同时还需要加上位数（）
//     sum = x + y + carry;
//     if (sum >= 10) {
//       sum -= 10; // 大于10就只保留个位
//       carry = 1; // 标记进位
//     } else {
//       carry = 0;
//     }
//     res += sum;
//   }
//   // 最后一位是否进位，如果有就需要拼接
//   if (carry) {
//     res = carry + res;
//   }
//   return res;
// }
// 单元测试
// console.log(add1("99", "1"));
// console.log(add("1", "999"));
// console.log(add("999", "999"));
// console.log(
//   add(
//     "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
//     "1"
//   )
// );

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});