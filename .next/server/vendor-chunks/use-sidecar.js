"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-sidecar";
exports.ids = ["vendor-chunks/use-sidecar"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-sidecar/dist/es2015/exports.js":
/*!*********************************************************!*\
  !*** ./node_modules/use-sidecar/dist/es2015/exports.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   exportSidecar: () => (/* binding */ exportSidecar)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ \"(ssr)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar SideCar = function(_a) {\n    var sideCar = _a.sideCar, rest = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__rest)(_a, [\n        \"sideCar\"\n    ]);\n    if (!sideCar) {\n        throw new Error(\"Sidecar: please provide `sideCar` property to import the right car\");\n    }\n    var Target = sideCar.read();\n    if (!Target) {\n        throw new Error(\"Sidecar medium not found\");\n    }\n    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Target, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, rest));\n};\nSideCar.isSideCarExport = true;\nfunction exportSidecar(medium, exported) {\n    medium.useMedium(exported);\n    return SideCar;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvZXhwb3J0cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXlDO0FBQ1Y7QUFDL0IsSUFBSUcsVUFBVSxTQUFVQyxFQUFFO0lBQ3RCLElBQUlDLFVBQVVELEdBQUdDLE9BQU8sRUFBRUMsT0FBT0wsNkNBQU1BLENBQUNHLElBQUk7UUFBQztLQUFVO0lBQ3ZELElBQUksQ0FBQ0MsU0FBUztRQUNWLE1BQU0sSUFBSUUsTUFBTTtJQUNwQjtJQUNBLElBQUlDLFNBQVNILFFBQVFJLElBQUk7SUFDekIsSUFBSSxDQUFDRCxRQUFRO1FBQ1QsTUFBTSxJQUFJRCxNQUFNO0lBQ3BCO0lBQ0EscUJBQU9MLGdEQUFtQixDQUFDTSxRQUFRUiwrQ0FBUUEsQ0FBQyxDQUFDLEdBQUdNO0FBQ3BEO0FBQ0FILFFBQVFRLGVBQWUsR0FBRztBQUNuQixTQUFTQyxjQUFjQyxNQUFNLEVBQUVDLFFBQVE7SUFDMUNELE9BQU9FLFNBQVMsQ0FBQ0Q7SUFDakIsT0FBT1g7QUFDWCIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYWRlci11aS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9leHBvcnRzLmpzPzdkMGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX19hc3NpZ24sIF9fcmVzdCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIFNpZGVDYXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc2lkZUNhciA9IF9hLnNpZGVDYXIsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInNpZGVDYXJcIl0pO1xuICAgIGlmICghc2lkZUNhcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXI6IHBsZWFzZSBwcm92aWRlIGBzaWRlQ2FyYCBwcm9wZXJ0eSB0byBpbXBvcnQgdGhlIHJpZ2h0IGNhcicpO1xuICAgIH1cbiAgICB2YXIgVGFyZ2V0ID0gc2lkZUNhci5yZWFkKCk7XG4gICAgaWYgKCFUYXJnZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyIG1lZGl1bSBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFyZ2V0LCBfX2Fzc2lnbih7fSwgcmVzdCkpO1xufTtcblNpZGVDYXIuaXNTaWRlQ2FyRXhwb3J0ID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRTaWRlY2FyKG1lZGl1bSwgZXhwb3J0ZWQpIHtcbiAgICBtZWRpdW0udXNlTWVkaXVtKGV4cG9ydGVkKTtcbiAgICByZXR1cm4gU2lkZUNhcjtcbn1cbiJdLCJuYW1lcyI6WyJfX2Fzc2lnbiIsIl9fcmVzdCIsIlJlYWN0IiwiU2lkZUNhciIsIl9hIiwic2lkZUNhciIsInJlc3QiLCJFcnJvciIsIlRhcmdldCIsInJlYWQiLCJjcmVhdGVFbGVtZW50IiwiaXNTaWRlQ2FyRXhwb3J0IiwiZXhwb3J0U2lkZWNhciIsIm1lZGl1bSIsImV4cG9ydGVkIiwidXNlTWVkaXVtIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-sidecar/dist/es2015/exports.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-sidecar/dist/es2015/medium.js":
/*!********************************************************!*\
  !*** ./node_modules/use-sidecar/dist/es2015/medium.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createMedium: () => (/* binding */ createMedium),\n/* harmony export */   createSidecarMedium: () => (/* binding */ createSidecarMedium)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"(ssr)/./node_modules/tslib/tslib.es6.mjs\");\n\nfunction ItoI(a) {\n    return a;\n}\nfunction innerCreateMedium(defaults, middleware) {\n    if (middleware === void 0) {\n        middleware = ItoI;\n    }\n    var buffer = [];\n    var assigned = false;\n    var medium = {\n        read: function() {\n            if (assigned) {\n                throw new Error(\"Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.\");\n            }\n            if (buffer.length) {\n                return buffer[buffer.length - 1];\n            }\n            return defaults;\n        },\n        useMedium: function(data) {\n            var item = middleware(data, assigned);\n            buffer.push(item);\n            return function() {\n                buffer = buffer.filter(function(x) {\n                    return x !== item;\n                });\n            };\n        },\n        assignSyncMedium: function(cb) {\n            assigned = true;\n            while(buffer.length){\n                var cbs = buffer;\n                buffer = [];\n                cbs.forEach(cb);\n            }\n            buffer = {\n                push: function(x) {\n                    return cb(x);\n                },\n                filter: function() {\n                    return buffer;\n                }\n            };\n        },\n        assignMedium: function(cb) {\n            assigned = true;\n            var pendingQueue = [];\n            if (buffer.length) {\n                var cbs = buffer;\n                buffer = [];\n                cbs.forEach(cb);\n                pendingQueue = buffer;\n            }\n            var executeQueue = function() {\n                var cbs = pendingQueue;\n                pendingQueue = [];\n                cbs.forEach(cb);\n            };\n            var cycle = function() {\n                return Promise.resolve().then(executeQueue);\n            };\n            cycle();\n            buffer = {\n                push: function(x) {\n                    pendingQueue.push(x);\n                    cycle();\n                },\n                filter: function(filter) {\n                    pendingQueue = pendingQueue.filter(filter);\n                    return buffer;\n                }\n            };\n        }\n    };\n    return medium;\n}\nfunction createMedium(defaults, middleware) {\n    if (middleware === void 0) {\n        middleware = ItoI;\n    }\n    return innerCreateMedium(defaults, middleware);\n}\n// eslint-disable-next-line @typescript-eslint/ban-types\nfunction createSidecarMedium(options) {\n    if (options === void 0) {\n        options = {};\n    }\n    var medium = innerCreateMedium(null);\n    medium.options = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({\n        async: true,\n        ssr: false\n    }, options);\n    return medium;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvbWVkaXVtLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFpQztBQUNqQyxTQUFTQyxLQUFLQyxDQUFDO0lBQ1gsT0FBT0E7QUFDWDtBQUNBLFNBQVNDLGtCQUFrQkMsUUFBUSxFQUFFQyxVQUFVO0lBQzNDLElBQUlBLGVBQWUsS0FBSyxHQUFHO1FBQUVBLGFBQWFKO0lBQU07SUFDaEQsSUFBSUssU0FBUyxFQUFFO0lBQ2YsSUFBSUMsV0FBVztJQUNmLElBQUlDLFNBQVM7UUFDVEMsTUFBTTtZQUNGLElBQUlGLFVBQVU7Z0JBQ1YsTUFBTSxJQUFJRyxNQUFNO1lBQ3BCO1lBQ0EsSUFBSUosT0FBT0ssTUFBTSxFQUFFO2dCQUNmLE9BQU9MLE1BQU0sQ0FBQ0EsT0FBT0ssTUFBTSxHQUFHLEVBQUU7WUFDcEM7WUFDQSxPQUFPUDtRQUNYO1FBQ0FRLFdBQVcsU0FBVUMsSUFBSTtZQUNyQixJQUFJQyxPQUFPVCxXQUFXUSxNQUFNTjtZQUM1QkQsT0FBT1MsSUFBSSxDQUFDRDtZQUNaLE9BQU87Z0JBQ0hSLFNBQVNBLE9BQU9VLE1BQU0sQ0FBQyxTQUFVQyxDQUFDO29CQUFJLE9BQU9BLE1BQU1IO2dCQUFNO1lBQzdEO1FBQ0o7UUFDQUksa0JBQWtCLFNBQVVDLEVBQUU7WUFDMUJaLFdBQVc7WUFDWCxNQUFPRCxPQUFPSyxNQUFNLENBQUU7Z0JBQ2xCLElBQUlTLE1BQU1kO2dCQUNWQSxTQUFTLEVBQUU7Z0JBQ1hjLElBQUlDLE9BQU8sQ0FBQ0Y7WUFDaEI7WUFDQWIsU0FBUztnQkFDTFMsTUFBTSxTQUFVRSxDQUFDO29CQUFJLE9BQU9FLEdBQUdGO2dCQUFJO2dCQUNuQ0QsUUFBUTtvQkFBYyxPQUFPVjtnQkFBUTtZQUN6QztRQUNKO1FBQ0FnQixjQUFjLFNBQVVILEVBQUU7WUFDdEJaLFdBQVc7WUFDWCxJQUFJZ0IsZUFBZSxFQUFFO1lBQ3JCLElBQUlqQixPQUFPSyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSVMsTUFBTWQ7Z0JBQ1ZBLFNBQVMsRUFBRTtnQkFDWGMsSUFBSUMsT0FBTyxDQUFDRjtnQkFDWkksZUFBZWpCO1lBQ25CO1lBQ0EsSUFBSWtCLGVBQWU7Z0JBQ2YsSUFBSUosTUFBTUc7Z0JBQ1ZBLGVBQWUsRUFBRTtnQkFDakJILElBQUlDLE9BQU8sQ0FBQ0Y7WUFDaEI7WUFDQSxJQUFJTSxRQUFRO2dCQUFjLE9BQU9DLFFBQVFDLE9BQU8sR0FBR0MsSUFBSSxDQUFDSjtZQUFlO1lBQ3ZFQztZQUNBbkIsU0FBUztnQkFDTFMsTUFBTSxTQUFVRSxDQUFDO29CQUNiTSxhQUFhUixJQUFJLENBQUNFO29CQUNsQlE7Z0JBQ0o7Z0JBQ0FULFFBQVEsU0FBVUEsTUFBTTtvQkFDcEJPLGVBQWVBLGFBQWFQLE1BQU0sQ0FBQ0E7b0JBQ25DLE9BQU9WO2dCQUNYO1lBQ0o7UUFDSjtJQUNKO0lBQ0EsT0FBT0U7QUFDWDtBQUNPLFNBQVNxQixhQUFhekIsUUFBUSxFQUFFQyxVQUFVO0lBQzdDLElBQUlBLGVBQWUsS0FBSyxHQUFHO1FBQUVBLGFBQWFKO0lBQU07SUFDaEQsT0FBT0Usa0JBQWtCQyxVQUFVQztBQUN2QztBQUNBLHdEQUF3RDtBQUNqRCxTQUFTeUIsb0JBQW9CQyxPQUFPO0lBQ3ZDLElBQUlBLFlBQVksS0FBSyxHQUFHO1FBQUVBLFVBQVUsQ0FBQztJQUFHO0lBQ3hDLElBQUl2QixTQUFTTCxrQkFBa0I7SUFDL0JLLE9BQU91QixPQUFPLEdBQUcvQiwrQ0FBUUEsQ0FBQztRQUFFZ0MsT0FBTztRQUFNQyxLQUFLO0lBQU0sR0FBR0Y7SUFDdkQsT0FBT3ZCO0FBQ1giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFkZXItdWkvLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvbWVkaXVtLmpzP2Q5ZWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmZ1bmN0aW9uIEl0b0koYSkge1xuICAgIHJldHVybiBhO1xufVxuZnVuY3Rpb24gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpIHtcbiAgICBpZiAobWlkZGxld2FyZSA9PT0gdm9pZCAwKSB7IG1pZGRsZXdhcmUgPSBJdG9JOyB9XG4gICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBhc3NpZ25lZCA9IGZhbHNlO1xuICAgIHZhciBtZWRpdW0gPSB7XG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhc3NpZ25lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhcjogY291bGQgbm90IGByZWFkYCBmcm9tIGFuIGBhc3NpZ25lZGAgbWVkaXVtLiBgcmVhZGAgY291bGQgYmUgdXNlZCBvbmx5IHdpdGggYHVzZU1lZGl1bWAuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXJbYnVmZmVyLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgICB9LFxuICAgICAgICB1c2VNZWRpdW06IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG1pZGRsZXdhcmUoZGF0YSwgYXNzaWduZWQpO1xuICAgICAgICAgICAgYnVmZmVyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggIT09IGl0ZW07IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWduU3luY01lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0ge1xuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uICh4KSB7IHJldHVybiBjYih4KTsgfSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJ1ZmZlcjsgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbk1lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGVuZGluZ1F1ZXVlID0gW107XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBleGVjdXRlUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IHBlbmRpbmdRdWV1ZTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN5Y2xlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihleGVjdXRlUXVldWUpOyB9O1xuICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBwZW5kaW5nUXVldWUuZmlsdGVyKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gbWVkaXVtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSkge1xuICAgIGlmIChtaWRkbGV3YXJlID09PSB2b2lkIDApIHsgbWlkZGxld2FyZSA9IEl0b0k7IH1cbiAgICByZXR1cm4gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaWRlY2FyTWVkaXVtKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBtZWRpdW0gPSBpbm5lckNyZWF0ZU1lZGl1bShudWxsKTtcbiAgICBtZWRpdW0ub3B0aW9ucyA9IF9fYXNzaWduKHsgYXN5bmM6IHRydWUsIHNzcjogZmFsc2UgfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG1lZGl1bTtcbn1cbiJdLCJuYW1lcyI6WyJfX2Fzc2lnbiIsIkl0b0kiLCJhIiwiaW5uZXJDcmVhdGVNZWRpdW0iLCJkZWZhdWx0cyIsIm1pZGRsZXdhcmUiLCJidWZmZXIiLCJhc3NpZ25lZCIsIm1lZGl1bSIsInJlYWQiLCJFcnJvciIsImxlbmd0aCIsInVzZU1lZGl1bSIsImRhdGEiLCJpdGVtIiwicHVzaCIsImZpbHRlciIsIngiLCJhc3NpZ25TeW5jTWVkaXVtIiwiY2IiLCJjYnMiLCJmb3JFYWNoIiwiYXNzaWduTWVkaXVtIiwicGVuZGluZ1F1ZXVlIiwiZXhlY3V0ZVF1ZXVlIiwiY3ljbGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJjcmVhdGVNZWRpdW0iLCJjcmVhdGVTaWRlY2FyTWVkaXVtIiwib3B0aW9ucyIsImFzeW5jIiwic3NyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-sidecar/dist/es2015/medium.js\n");

/***/ })

};
;