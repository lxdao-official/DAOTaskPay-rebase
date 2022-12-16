"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/offer";
exports.ids = ["pages/api/offer"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "eth-sig-util":
/*!*******************************!*\
  !*** external "eth-sig-util" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("eth-sig-util");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"prisma\": () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\nif (false) {} else {\n    const g = global;\n    if (!g.prisma) g.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    prisma = g.prisma;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxJQUFJQztBQUVKLElBQUlDLEtBQXlCLEVBQWMsRUFFMUMsTUFBTTtJQUNMLE1BQU1DLElBQUlDO0lBQ1YsSUFBSSxDQUFDRCxFQUFFRixNQUFNLEVBQUVFLEVBQUVGLE1BQU0sR0FBRyxJQUFJRCx3REFBWUE7SUFDMUNDLFNBQVNFLEVBQUVGLE1BQU07QUFDbkIsQ0FBQztBQUVpQiIsInNvdXJjZXMiOlsid2VicGFjazovL29zaWduLnNoLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxubGV0IHByaXNtYTogUHJpc21hQ2xpZW50O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG59IGVsc2Uge1xuICBjb25zdCBnID0gZ2xvYmFsIGFzIGFueTtcbiAgaWYgKCFnLnByaXNtYSkgZy5wcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG4gIHByaXNtYSA9IGcucHJpc21hO1xufVxuXG5leHBvcnQgeyBwcmlzbWEgfTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJwcm9jZXNzIiwiZyIsImdsb2JhbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/offer.ts":
/*!****************************!*\
  !*** ./pages/api/offer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var eth_sig_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eth-sig-util */ \"eth-sig-util\");\n/* harmony import */ var eth_sig_util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eth_sig_util__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\n\n\nasync function handler(req, res) {\n    if (req.method == \"POST\") {\n        const body = req.body;\n        if (!body.launcher) {\n            return res.status(400).json({\n                message: \"Missing launcher\"\n            });\n        }\n        if (!body.data) {\n            return res.status(400).json({\n                message: \"Missing data\"\n            });\n        }\n        if (!body.expiresAt) {\n            return res.status(400).json({\n                message: \"Missing expiresAt\"\n            });\n        }\n        if (!body.bussiness) {\n            return res.status(400).json({\n                message: \"Missing bussiness\"\n            });\n        }\n        if (!body.signers || body.signers.length == 0) {\n            return res.status(400).json({\n                message: \"Missing signers\"\n            });\n        }\n        if (!body.signature) {\n            return res.status(400).json({\n                message: \"Missing signature\"\n            });\n        }\n        try {\n            const recoveredAddr = (0,eth_sig_util__WEBPACK_IMPORTED_MODULE_0__.recoverPersonalSignature)({\n                data: `I aggree to create offer detail: ${JSON.stringify(body.data, null, 2)} \\nWallet address:${body.launcher}.`,\n                sig: body.signature\n            });\n            if (!recoveredAddr || recoveredAddr.toLowerCase() != body.launcher.toLowerCase()) {\n                return res.status(400).json({\n                    message: \"invalid signature\"\n                });\n            }\n            const offer = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.offers.create({\n                data: {\n                    launcher: body.launcher,\n                    staticData: body.data,\n                    expiresAt: new Date(body.expiresAt),\n                    signers: body.signers,\n                    bussiness: body.bussiness\n                }\n            });\n            res.status(200).json({\n                data: offer\n            });\n        } catch (e) {\n            return res.status(400).json({\n                message: \"create offer error: \" + e.message\n            });\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvb2ZmZXIudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDZFQUE2RTtBQUNyQjtBQUVkO0FBTTNCLGVBQWVFLFFBQzVCQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDcEI7SUFDQSxJQUFJRCxJQUFJRSxNQUFNLElBQUksUUFBUTtRQUN4QixNQUFNQyxPQUFPSCxJQUFJRyxJQUFJO1FBQ3JCLElBQUksQ0FBQ0EsS0FBS0MsUUFBUSxFQUFFO1lBQ2xCLE9BQU9ILElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBbUI7UUFDNUQsQ0FBQztRQUNELElBQUksQ0FBQ0osS0FBS0ssSUFBSSxFQUFFO1lBQ2QsT0FBT1AsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFlO1FBQ3hELENBQUM7UUFDRCxJQUFJLENBQUNKLEtBQUtNLFNBQVMsRUFBRTtZQUNuQixPQUFPUixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQW9CO1FBQzdELENBQUM7UUFFRCxJQUFJLENBQUNKLEtBQUtPLFNBQVMsRUFBRTtZQUNuQixPQUFPVCxJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQW9CO1FBQzdELENBQUM7UUFDRCxJQUFJLENBQUNKLEtBQUtRLE9BQU8sSUFBSVIsS0FBS1EsT0FBTyxDQUFDQyxNQUFNLElBQUksR0FBRztZQUM3QyxPQUFPWCxJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWtCO1FBQzNELENBQUM7UUFDRCxJQUFJLENBQUNKLEtBQUtVLFNBQVMsRUFBRTtZQUNuQixPQUFPWixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQW9CO1FBQzdELENBQUM7UUFFRCxJQUFJO1lBQ0YsTUFBTU8sZ0JBQWdCakIsc0VBQXdCQSxDQUFDO2dCQUM3Q1csTUFBTSxDQUFDLGlDQUFpQyxFQUFFTyxLQUFLQyxTQUFTLENBQ3REYixLQUFLSyxJQUFJLEVBQ1QsSUFBSSxFQUNKLEdBQ0Esa0JBQWtCLEVBQUVMLEtBQUtDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDYSxLQUFLZCxLQUFLVSxTQUFTO1lBQ3JCO1lBQ0EsSUFDRSxDQUFDQyxpQkFDREEsY0FBY0ksV0FBVyxNQUFNZixLQUFLQyxRQUFRLENBQUNjLFdBQVcsSUFDeEQ7Z0JBQ0EsT0FBT2pCLElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7b0JBQUVDLFNBQVM7Z0JBQW9CO1lBQzdELENBQUM7WUFDRCxNQUFNWSxRQUFRLE1BQU1yQiw2REFBb0IsQ0FBQztnQkFDdkNVLE1BQU07b0JBQ0pKLFVBQVVELEtBQUtDLFFBQVE7b0JBQ3ZCa0IsWUFBWW5CLEtBQUtLLElBQUk7b0JBQ3JCQyxXQUFXLElBQUljLEtBQUtwQixLQUFLTSxTQUFTO29CQUNsQ0UsU0FBU1IsS0FBS1EsT0FBTztvQkFDckJELFdBQVdQLEtBQUtPLFNBQVM7Z0JBQzNCO1lBQ0Y7WUFDQVQsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFDbkJFLE1BQU1XO1lBQ1I7UUFDRixFQUFFLE9BQU9LLEdBQVE7WUFDZixPQUFPdkIsSUFDSkksTUFBTSxDQUFDLEtBQ1BDLElBQUksQ0FBQztnQkFBRUMsU0FBUyx5QkFBeUJpQixFQUFFakIsT0FBTztZQUFDO1FBQ3hEO0lBQ0YsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vc2lnbi5zaC8uL3BhZ2VzL2FwaS9vZmZlci50cz9hYzc1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5leHQuanMgQVBJIHJvdXRlIHN1cHBvcnQ6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXG5pbXBvcnQgeyByZWNvdmVyUGVyc29uYWxTaWduYXR1cmUgfSBmcm9tICdldGgtc2lnLXV0aWwnO1xuaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICcuLi8uLi9saWIvcHJpc21hJztcblxudHlwZSBEYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZSxcbikge1xuICBpZiAocmVxLm1ldGhvZCA9PSAnUE9TVCcpIHtcbiAgICBjb25zdCBib2R5ID0gcmVxLmJvZHk7XG4gICAgaWYgKCFib2R5LmxhdW5jaGVyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnTWlzc2luZyBsYXVuY2hlcicgfSk7XG4gICAgfVxuICAgIGlmICghYm9keS5kYXRhKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnTWlzc2luZyBkYXRhJyB9KTtcbiAgICB9XG4gICAgaWYgKCFib2R5LmV4cGlyZXNBdCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ01pc3NpbmcgZXhwaXJlc0F0JyB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWJvZHkuYnVzc2luZXNzKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnTWlzc2luZyBidXNzaW5lc3MnIH0pO1xuICAgIH1cbiAgICBpZiAoIWJvZHkuc2lnbmVycyB8fCBib2R5LnNpZ25lcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdNaXNzaW5nIHNpZ25lcnMnIH0pO1xuICAgIH1cbiAgICBpZiAoIWJvZHkuc2lnbmF0dXJlKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnTWlzc2luZyBzaWduYXR1cmUnIH0pO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZWNvdmVyZWRBZGRyID0gcmVjb3ZlclBlcnNvbmFsU2lnbmF0dXJlKHtcbiAgICAgICAgZGF0YTogYEkgYWdncmVlIHRvIGNyZWF0ZSBvZmZlciBkZXRhaWw6ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgYm9keS5kYXRhLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgMixcbiAgICAgICAgKX0gXFxuV2FsbGV0IGFkZHJlc3M6JHtib2R5LmxhdW5jaGVyfS5gLFxuICAgICAgICBzaWc6IGJvZHkuc2lnbmF0dXJlLFxuICAgICAgfSk7XG4gICAgICBpZiAoXG4gICAgICAgICFyZWNvdmVyZWRBZGRyIHx8XG4gICAgICAgIHJlY292ZXJlZEFkZHIudG9Mb3dlckNhc2UoKSAhPSBib2R5LmxhdW5jaGVyLnRvTG93ZXJDYXNlKClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnaW52YWxpZCBzaWduYXR1cmUnIH0pO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2ZmZXIgPSBhd2FpdCBwcmlzbWEub2ZmZXJzLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBsYXVuY2hlcjogYm9keS5sYXVuY2hlcixcbiAgICAgICAgICBzdGF0aWNEYXRhOiBib2R5LmRhdGEsXG4gICAgICAgICAgZXhwaXJlc0F0OiBuZXcgRGF0ZShib2R5LmV4cGlyZXNBdCksXG4gICAgICAgICAgc2lnbmVyczogYm9keS5zaWduZXJzLFxuICAgICAgICAgIGJ1c3NpbmVzczogYm9keS5idXNzaW5lc3MsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgZGF0YTogb2ZmZXIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyg0MDApXG4gICAgICAgIC5qc29uKHsgbWVzc2FnZTogJ2NyZWF0ZSBvZmZlciBlcnJvcjogJyArIGUubWVzc2FnZSB9KTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJyZWNvdmVyUGVyc29uYWxTaWduYXR1cmUiLCJwcmlzbWEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwiYm9keSIsImxhdW5jaGVyIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJkYXRhIiwiZXhwaXJlc0F0IiwiYnVzc2luZXNzIiwic2lnbmVycyIsImxlbmd0aCIsInNpZ25hdHVyZSIsInJlY292ZXJlZEFkZHIiLCJKU09OIiwic3RyaW5naWZ5Iiwic2lnIiwidG9Mb3dlckNhc2UiLCJvZmZlciIsIm9mZmVycyIsImNyZWF0ZSIsInN0YXRpY0RhdGEiLCJEYXRlIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/offer.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/offer.ts"));
module.exports = __webpack_exports__;

})();