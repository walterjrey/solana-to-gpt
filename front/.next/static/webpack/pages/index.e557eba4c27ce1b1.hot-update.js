"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/tags-list/tags-list.tsx":
/*!************************************************!*\
  !*** ./src/components/tags-list/tags-list.tsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks */ \"./src/components/tags-list/hooks.ts\");\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\nvar TagsList = function(param) {\n    var tagSelected = param.tagSelected;\n    _s();\n    var _useTags = (0,_hooks__WEBPACK_IMPORTED_MODULE_1__.useTags)(), isLoading = _useTags.isLoading, filteredTags = _useTags.filteredTags, loaded = _useTags.loaded, loadTags = _useTags.loadTags, setIsLoading = _useTags.setIsLoading, setLoaded = _useTags.setLoaded, handleChangeText = _useTags.handleChangeText;\n    if (!loaded) {\n        setLoaded(true);\n        setIsLoading(true);\n        loadTags();\n    }\n    if (isLoading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Stack, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {\n                    height: \"20px\"\n                }, void 0, false, {\n                    fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n                    lineNumber: 57,\n                    columnNumber: 9\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {\n                    height: \"20px\"\n                }, void 0, false, {\n                    fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n                    lineNumber: 58,\n                    columnNumber: 9\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {\n                    height: \"20px\"\n                }, void 0, false, {\n                    fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n                    lineNumber: 59,\n                    columnNumber: 9\n                }, _this)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n            lineNumber: 56,\n            columnNumber: 7\n        }, _this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.VStack, {\n        direction: \"row\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {\n                as: \"h4\",\n                size: \"md\",\n                children: \"Top searchs\"\n            }, void 0, false, {\n                fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Input, {\n                onChange: handleChangeText,\n                placeholder: \"Search tags...\",\n                size: \"sm\"\n            }, void 0, false, {\n                fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n                lineNumber: 69,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.VStack, {\n                gap: 5,\n                children: filteredTags.map(function(item) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tag, {\n                        onClick: function() {\n                            return tagSelected(item.slug);\n                        },\n                        cursor: \"pointer\",\n                        size: \"md\",\n                        variant: \"solid\",\n                        colorScheme: \"telegram\",\n                        bg: \"#ff5100\",\n                        color: \"white\",\n                        fontWeight: \"bold\",\n                        children: item.tag\n                    }, item.slug, false, {\n                        fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 11\n                    }, _this);\n                })\n            }, void 0, false, {\n                fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/walter/Repositories/Solana-Finder/frontend/src/components/tags-list/tags-list.tsx\",\n        lineNumber: 65,\n        columnNumber: 5\n    }, _this);\n};\n_s(TagsList, \"KmnX3mmOaKPU35f0bpnrHL63Lro=\", false, function() {\n    return [\n        _hooks__WEBPACK_IMPORTED_MODULE_1__.useTags\n    ];\n});\n_c = TagsList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TagsList);\nvar _c;\n$RefreshReg$(_c, \"TagsList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90YWdzLWxpc3QvdGFncy1saXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWdDMEI7QUFFUTtBQUVsQyxJQUFNTyxXQUEwQjtRQUFHQyxvQkFBQUE7O0lBQ2pDLElBUUlGLFdBQUFBLCtDQUFPQSxJQVBURyxZQU9FSCxTQVBGRyxXQUNBQyxlQU1FSixTQU5GSSxjQUNBQyxTQUtFTCxTQUxGSyxRQUNBQyxXQUlFTixTQUpGTSxVQUNBQyxlQUdFUCxTQUhGTyxjQUNBQyxZQUVFUixTQUZGUSxXQUNBQyxtQkFDRVQsU0FERlM7SUFHRixJQUFJLENBQUNKLFFBQVE7UUFDWEcsVUFBVTtRQUNWRCxhQUFhO1FBQ2JEO0lBQ0Y7SUFFQSxJQUFJSCxXQUFXO1FBQ2IscUJBQ0UsOERBQUNQLG1EQUFLQTs7OEJBQ0osOERBQUNHLHNEQUFRQTtvQkFBQ1csUUFBTzs7Ozs7OzhCQUNqQiw4REFBQ1gsc0RBQVFBO29CQUFDVyxRQUFPOzs7Ozs7OEJBQ2pCLDhEQUFDWCxzREFBUUE7b0JBQUNXLFFBQU87Ozs7Ozs7Ozs7OztJQUd2QjtJQUVBLHFCQUNFLDhEQUFDZixvREFBTUE7UUFBQ2dCLFdBQVU7OzBCQUNoQiw4REFBQ2pCLHFEQUFPQTtnQkFBQ2tCLElBQUc7Z0JBQUtDLE1BQUs7MEJBQUs7Ozs7OzswQkFHM0IsOERBQUNmLG1EQUFLQTtnQkFDSmdCLFVBQVVMO2dCQUNWTSxhQUFZO2dCQUNaRixNQUFLOzs7Ozs7MEJBR1AsOERBQUNsQixvREFBTUE7Z0JBQUNxQixLQUFLOzBCQUNWWixhQUFhYSxHQUFHLENBQUMsU0FBQ0M7eUNBQ2pCLDhEQUFDckIsaURBQUdBO3dCQUNGc0IsU0FBUzttQ0FBTWpCLFlBQVlnQixLQUFLRSxJQUFJOzt3QkFDcENDLFFBQU87d0JBQ1BSLE1BQUs7d0JBRUxTLFNBQVE7d0JBQ1JDLGFBQVk7d0JBQ1pDLElBQUc7d0JBQ0hDLE9BQU07d0JBQ05DLFlBQVc7a0NBRVZSLEtBQUtTLEdBQUc7dUJBUEpULEtBQUtFLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYTFCO0dBekRNbkI7O1FBU0FELDJDQUFPQTs7O0tBVFBDO0FBMkROLCtEQUFlQSxRQUFRQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3RhZ3MtbGlzdC90YWdzLWxpc3QudHN4P2RhYjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkMsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgQm94LFxuICBIZWFkaW5nLFxuICBDYXJkRm9vdGVyLFxuICBWU3RhY2ssXG4gIFN0YWNrLFxuICBDYXJkLFxuICBCdXR0b24sXG4gIENhcmRCb2R5LFxuICBUZXh0LFxuICBDYXJkSGVhZGVyLFxuICBUYWcsXG4gIEZsZXgsXG4gIElucHV0R3JvdXAsXG4gIElucHV0LFxuICBJbnB1dFJpZ2h0RWxlbWVudCxcbiAgQXZhdGFyLFxuICBCYWRnZSxcbiAgSW1hZ2UsXG4gIFN0YXQsXG4gIFN0YXRMYWJlbCxcbiAgU3RhdE51bWJlcixcbiAgU3RhdEFycm93LFxuICBTdGF0SGVscFRleHQsXG4gIEhTdGFjayxcbiAgU2tlbGV0b24sXG4gIENpcmN1bGFyUHJvZ3Jlc3MsXG4gIFNrZWxldG9uQ2lyY2xlLFxuICBTa2VsZXRvblRleHQsXG4gIENvbGxhcHNlLFxufSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuXG5pbXBvcnQgeyB1c2VUYWdzIH0gZnJvbSBcIi4vaG9va3NcIjtcblxuY29uc3QgVGFnc0xpc3Q6IEZDPElUYWdzTGlzdD4gPSAoeyB0YWdTZWxlY3RlZCB9KSA9PiB7XG4gIGNvbnN0IHtcbiAgICBpc0xvYWRpbmcsXG4gICAgZmlsdGVyZWRUYWdzLFxuICAgIGxvYWRlZCxcbiAgICBsb2FkVGFncyxcbiAgICBzZXRJc0xvYWRpbmcsXG4gICAgc2V0TG9hZGVkLFxuICAgIGhhbmRsZUNoYW5nZVRleHQsXG4gIH0gPSB1c2VUYWdzKCk7XG5cbiAgaWYgKCFsb2FkZWQpIHtcbiAgICBzZXRMb2FkZWQodHJ1ZSk7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIGxvYWRUYWdzKCk7XG4gIH1cblxuICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdGFjaz5cbiAgICAgICAgPFNrZWxldG9uIGhlaWdodD1cIjIwcHhcIiAvPlxuICAgICAgICA8U2tlbGV0b24gaGVpZ2h0PVwiMjBweFwiIC8+XG4gICAgICAgIDxTa2VsZXRvbiBoZWlnaHQ9XCIyMHB4XCIgLz5cbiAgICAgIDwvU3RhY2s+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFZTdGFjayBkaXJlY3Rpb249XCJyb3dcIj5cbiAgICAgIDxIZWFkaW5nIGFzPVwiaDRcIiBzaXplPVwibWRcIj5cbiAgICAgICAgVG9wIHNlYXJjaHNcbiAgICAgIDwvSGVhZGluZz5cbiAgICAgIDxJbnB1dFxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlVGV4dH1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggdGFncy4uLlwiXG4gICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAvPlxuXG4gICAgICA8VlN0YWNrIGdhcD17NX0+XG4gICAgICAgIHtmaWx0ZXJlZFRhZ3MubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgPFRhZ1xuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGFnU2VsZWN0ZWQoaXRlbS5zbHVnKX1cbiAgICAgICAgICAgIGN1cnNvcj1cInBvaW50ZXJcIlxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIGtleT17aXRlbS5zbHVnfVxuICAgICAgICAgICAgdmFyaWFudD1cInNvbGlkXCJcbiAgICAgICAgICAgIGNvbG9yU2NoZW1lPVwidGVsZWdyYW1cIlxuICAgICAgICAgICAgYmc9XCIjZmY1MTAwXCJcbiAgICAgICAgICAgIGNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgZm9udFdlaWdodD1cImJvbGRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpdGVtLnRhZ31cbiAgICAgICAgICA8L1RhZz5cbiAgICAgICAgKSl9XG4gICAgICA8L1ZTdGFjaz5cbiAgICA8L1ZTdGFjaz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhZ3NMaXN0O1xuIl0sIm5hbWVzIjpbIkhlYWRpbmciLCJWU3RhY2siLCJTdGFjayIsIlRhZyIsIklucHV0IiwiU2tlbGV0b24iLCJ1c2VUYWdzIiwiVGFnc0xpc3QiLCJ0YWdTZWxlY3RlZCIsImlzTG9hZGluZyIsImZpbHRlcmVkVGFncyIsImxvYWRlZCIsImxvYWRUYWdzIiwic2V0SXNMb2FkaW5nIiwic2V0TG9hZGVkIiwiaGFuZGxlQ2hhbmdlVGV4dCIsImhlaWdodCIsImRpcmVjdGlvbiIsImFzIiwic2l6ZSIsIm9uQ2hhbmdlIiwicGxhY2Vob2xkZXIiLCJnYXAiLCJtYXAiLCJpdGVtIiwib25DbGljayIsInNsdWciLCJjdXJzb3IiLCJ2YXJpYW50IiwiY29sb3JTY2hlbWUiLCJiZyIsImNvbG9yIiwiZm9udFdlaWdodCIsInRhZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tags-list/tags-list.tsx\n"));

/***/ })

});