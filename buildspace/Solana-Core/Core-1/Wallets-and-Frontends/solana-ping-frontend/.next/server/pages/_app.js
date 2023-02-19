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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./styles/Home.module.css":
/*!********************************!*\
  !*** ./styles/Home.module.css ***!
  \********************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"App\": \"Home_App__2g2bl\",\n\t\"AppHeader\": \"Home_AppHeader__EWHKt\",\n\t\"AppBody\": \"Home_AppBody__v6U3u\",\n\t\"form\": \"Home_form__k2xMg\",\n\t\"input\": \"Home_input__ZarWZ\",\n\t\"formField\": \"Home_formField__WGSxd\",\n\t\"formButton\": \"Home_formButton__KVcni\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc29sYW5hLWludHJvLWZyb250ZW5kLy4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcz9iMTcwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIkFwcFwiOiBcIkhvbWVfQXBwX18yZzJibFwiLFxuXHRcIkFwcEhlYWRlclwiOiBcIkhvbWVfQXBwSGVhZGVyX19FV0hLdFwiLFxuXHRcIkFwcEJvZHlcIjogXCJIb21lX0FwcEJvZHlfX3Y2VTN1XCIsXG5cdFwiZm9ybVwiOiBcIkhvbWVfZm9ybV9fazJ4TWdcIixcblx0XCJpbnB1dFwiOiBcIkhvbWVfaW5wdXRfX1phcldaXCIsXG5cdFwiZm9ybUZpZWxkXCI6IFwiSG9tZV9mb3JtRmllbGRfX1dHU3hkXCIsXG5cdFwiZm9ybUJ1dHRvblwiOiBcIkhvbWVfZm9ybUJ1dHRvbl9fS1ZjbmlcIlxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles/Home.module.css\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @solana/wallet-adapter-base */ \"@solana/wallet-adapter-base\");\n/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @solana/wallet-adapter-react-ui */ \"@solana/wallet-adapter-react-ui\");\n/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @solana/wallet-adapter-react */ \"@solana/wallet-adapter-react\");\n/* harmony import */ var _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @solana/wallet-adapter-wallets */ \"@solana/wallet-adapter-wallets\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @solana/web3.js */ \"@solana/web3.js\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__]);\n([_solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n__webpack_require__(/*! @solana/wallet-adapter-react-ui/styles.css */ \"./node_modules/@solana/wallet-adapter-react-ui/styles.css\");\n__webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n__webpack_require__(/*! ../styles/Home.module.css */ \"./styles/Home.module.css\");\nconst App = ({ Component , pageProps  })=>{\n    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'\n    const network = _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_2__.WalletAdapterNetwork.Devnet;\n    // You can provide a custom RPC endpoint here\n    const endpoint = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_solana_web3_js__WEBPACK_IMPORTED_MODULE_6__.clusterApiUrl)(network)\n    , [\n        network\n    ]);\n    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --\n    // Only the wallets you configure here will be compiled into your application, and only the dependencies\n    // of wallets that your users connect to will be loaded\n    const wallets = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[\n            new _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__.PhantomWalletAdapter(),\n            new _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__.GlowWalletAdapter()\n        ]\n    , [\n        network\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__.ConnectionProvider, {\n        endpoint: endpoint,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__.WalletProvider, {\n            wallets: wallets,\n            autoConnect: true,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__.WalletModalProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/mnt/c/Users/gordo/Desktop/my-solana-projects/buildspace/solana-ping-frontend/pages/_app.tsx\",\n                    lineNumber: 37,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/mnt/c/Users/gordo/Desktop/my-solana-projects/buildspace/solana-ping-frontend/pages/_app.tsx\",\n                lineNumber: 36,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/mnt/c/Users/gordo/Desktop/my-solana-projects/buildspace/solana-ping-frontend/pages/_app.tsx\",\n            lineNumber: 35,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/mnt/c/Users/gordo/Desktop/my-solana-projects/buildspace/solana-ping-frontend/pages/_app.tsx\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDNEI7QUFDRztBQUNZO0FBSTFDO0FBQ1E7QUFFL0NTLG1CQUFPLENBQUMsNkdBQTRDLENBQUMsQ0FBQztBQUN0REEsbUJBQU8sQ0FBQyxtREFBdUIsQ0FBQyxDQUFDO0FBQ2pDQSxtQkFBTyxDQUFFLDJEQUEyQixDQUFDLENBQUM7QUFFdEMsS0FBSyxDQUFDQyxHQUFHLElBQUksQ0FBQyxDQUFDQyxTQUFTLEdBQUVDLFNBQVMsRUFBQyxDQUFDLEdBQUssQ0FBQztJQUN6QyxFQUF1RDtJQUN2RCxLQUFLLENBQUNDLE9BQU8sR0FBR1gsb0ZBQTJCO0lBRTNDLEVBQTZDO0lBQzdDLEtBQUssQ0FBQ2EsUUFBUSxHQUFHZCw4Q0FBTyxLQUFPTyw4REFBYSxDQUFDSyxPQUFPO01BQUcsQ0FBQ0E7UUFBQUEsT0FBTztJQUFBLENBQUM7SUFFaEUsRUFBeUc7SUFDekcsRUFBd0c7SUFDeEcsRUFBdUQ7SUFDdkQsS0FBSyxDQUFDRyxPQUFPLEdBQUdmLDhDQUFPLEtBQ2YsQ0FBQztZQUNMLEdBQUcsQ0FBQ00sZ0ZBQW9CO1lBQ3hCLEdBQUcsQ0FBQ0QsNkVBQWlCO1FBQ3ZCLENBQUM7TUFDRCxDQUFDTztRQUFBQSxPQUFPO0lBQUEsQ0FBQztJQUdYLE1BQU0sNkVBQ0hULDRFQUFrQjtRQUFDVyxRQUFRLEVBQUVBLFFBQVE7OEZBQ25DVix3RUFBYztZQUFDVyxPQUFPLEVBQUVBLE9BQU87WUFBRUMsV0FBVztrR0FDMUNkLGdGQUFtQjtzR0FDakJRLFNBQVM7dUJBQUtDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtsQyxDQUFDO0FBRUQsaUVBQWVGLEdBQUcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NvbGFuYS1pbnRyby1mcm9udGVuZC8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFdhbGxldEFkYXB0ZXJOZXR3b3JrIH0gZnJvbSBcIkBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItYmFzZVwiO1xuaW1wb3J0IHsgV2FsbGV0TW9kYWxQcm92aWRlciB9IGZyb20gXCJAc29sYW5hL3dhbGxldC1hZGFwdGVyLXJlYWN0LXVpXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uUHJvdmlkZXIsIFdhbGxldFByb3ZpZGVyIH0gZnJvbSBcIkBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItcmVhY3RcIjtcbmltcG9ydCB7XG4gIEdsb3dXYWxsZXRBZGFwdGVyLFxuICBQaGFudG9tV2FsbGV0QWRhcHRlclxufSBmcm9tIFwiQHNvbGFuYS93YWxsZXQtYWRhcHRlci13YWxsZXRzXCI7XG5pbXBvcnQgeyBjbHVzdGVyQXBpVXJsIH0gZnJvbSBcIkBzb2xhbmEvd2ViMy5qc1wiO1xuXG5yZXF1aXJlKFwiQHNvbGFuYS93YWxsZXQtYWRhcHRlci1yZWFjdC11aS9zdHlsZXMuY3NzXCIpO1xucmVxdWlyZShcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiKTtcbnJlcXVpcmUgKFwiLi4vc3R5bGVzL0hvbWUubW9kdWxlLmNzc1wiKTtcblxuY29uc3QgQXBwID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkgPT4ge1xuICAvLyBDYW4gYmUgc2V0IHRvICdkZXZuZXQnLCAndGVzdG5ldCcsIG9yICdtYWlubmV0LWJldGEnXG4gIGNvbnN0IG5ldHdvcmsgPSBXYWxsZXRBZGFwdGVyTmV0d29yay5EZXZuZXQ7XG5cbiAgLy8gWW91IGNhbiBwcm92aWRlIGEgY3VzdG9tIFJQQyBlbmRwb2ludCBoZXJlXG4gIGNvbnN0IGVuZHBvaW50ID0gdXNlTWVtbygoKSA9PiBjbHVzdGVyQXBpVXJsKG5ldHdvcmspLCBbbmV0d29ya10pO1xuXG4gIC8vIEBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItd2FsbGV0cyBpbmNsdWRlcyBhbGwgdGhlIGFkYXB0ZXJzIGJ1dCBzdXBwb3J0cyB0cmVlIHNoYWtpbmcgYW5kIGxhenkgbG9hZGluZyAtLVxuICAvLyBPbmx5IHRoZSB3YWxsZXRzIHlvdSBjb25maWd1cmUgaGVyZSB3aWxsIGJlIGNvbXBpbGVkIGludG8geW91ciBhcHBsaWNhdGlvbiwgYW5kIG9ubHkgdGhlIGRlcGVuZGVuY2llc1xuICAvLyBvZiB3YWxsZXRzIHRoYXQgeW91ciB1c2VycyBjb25uZWN0IHRvIHdpbGwgYmUgbG9hZGVkXG4gIGNvbnN0IHdhbGxldHMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIG5ldyBQaGFudG9tV2FsbGV0QWRhcHRlcigpLFxuICAgICAgbmV3IEdsb3dXYWxsZXRBZGFwdGVyKClcbiAgICBdLFxuICAgIFtuZXR3b3JrXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPENvbm5lY3Rpb25Qcm92aWRlciBlbmRwb2ludD17ZW5kcG9pbnR9PlxuICAgICAgPFdhbGxldFByb3ZpZGVyIHdhbGxldHM9e3dhbGxldHN9IGF1dG9Db25uZWN0PlxuICAgICAgICA8V2FsbGV0TW9kYWxQcm92aWRlcj5cbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvV2FsbGV0TW9kYWxQcm92aWRlcj5cbiAgICAgIDwvV2FsbGV0UHJvdmlkZXI+XG4gICAgPC9Db25uZWN0aW9uUHJvdmlkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlTWVtbyIsIldhbGxldEFkYXB0ZXJOZXR3b3JrIiwiV2FsbGV0TW9kYWxQcm92aWRlciIsIkNvbm5lY3Rpb25Qcm92aWRlciIsIldhbGxldFByb3ZpZGVyIiwiR2xvd1dhbGxldEFkYXB0ZXIiLCJQaGFudG9tV2FsbGV0QWRhcHRlciIsImNsdXN0ZXJBcGlVcmwiLCJyZXF1aXJlIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwibmV0d29yayIsIkRldm5ldCIsImVuZHBvaW50Iiwid2FsbGV0cyIsImF1dG9Db25uZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./node_modules/@solana/wallet-adapter-react-ui/styles.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@solana/wallet-adapter-react-ui/styles.css ***!
  \*****************************************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@solana/web3.js":
/*!**********************************!*\
  !*** external "@solana/web3.js" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@solana/web3.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@solana/wallet-adapter-base":
/*!**********************************************!*\
  !*** external "@solana/wallet-adapter-base" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-base");;

/***/ }),

/***/ "@solana/wallet-adapter-react":
/*!***********************************************!*\
  !*** external "@solana/wallet-adapter-react" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react");;

/***/ }),

/***/ "@solana/wallet-adapter-react-ui":
/*!**************************************************!*\
  !*** external "@solana/wallet-adapter-react-ui" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react-ui");;

/***/ }),

/***/ "@solana/wallet-adapter-wallets":
/*!*************************************************!*\
  !*** external "@solana/wallet-adapter-wallets" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-wallets");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();