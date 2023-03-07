/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fetch.js":
/*!**********************!*\
  !*** ./src/fetch.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchUpdateWord": () => (/* binding */ fetchUpdateWord),
/* harmony export */   "getWord": () => (/* binding */ getWord)
/* harmony export */ });
function fetchSession() {
  return fetch("/api/session")["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (res) {
    if (!res.ok) {
      return Promise.reject({
        error: "Invalid User"
      });
    }
    return res.json();
  });
}
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (res) {
    if (!res.ok) {
      return res.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return res.json();
  });
}
function fetchUpdateWord(word) {
  return fetch('/api/word/', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (res) {
    if (!res.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return res.json();
  });
}
function getWord() {
  return fetch('/api/word/')["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (res) {
    if (!res.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return res.json();
  });
}

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var storage = {
  username: "",
  word: "",
  isLoggedIn: false,
  errMsg: ""
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage);

/***/ }),

/***/ "./src/submit.js":
/*!***********************!*\
  !*** ./src/submit.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loginWeb": () => (/* binding */ loginWeb),
/* harmony export */   "submitHandler": () => (/* binding */ submitHandler),
/* harmony export */   "webRender": () => (/* binding */ webRender),
/* harmony export */   "wordWeb": () => (/* binding */ wordWeb)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch.js */ "./src/fetch.js");


function submitHandler() {
  var app = document.querySelector("#app");
  app.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("login")) {
      userLogin();
      return;
    }
    if (e.target.classList.contains("update-word")) {
      updateWord();
      return;
    }
    if (e.target.classList.contains("logout")) {
      userLogout();
      return;
    }
  });
}
var webRender = function webRender() {
  if (_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn === false) {
    loginWeb();
    return;
  }
  wordWeb();
};
function loginWeb() {
  var app = document.querySelector("#app");
  app.innerHTML = "\n\t\t<div class=\"login-card\">\n\t\t\t<form class=\"login\">\n\t\t\t\t<label>Type Your Username</label>\n\t\t\t\t<input type=\"text\" name=\"username\" placeholder=\"Username\" class=\"username\"/>\n\t\t\t\t<button type=\"submit\">Login</button>\n\t\t\t</form>\n\n\t\t\t<p class=\"error\">".concat(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].errMsg, "</p>\n\t\t</div>\n\t");
}
function wordWeb() {
  var app = document.querySelector("#app");
  app.innerHTML = "\n\t\t<div class=\"word-card\">\n\t\t\t<span>User: ".concat(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].username, "</span>\n\t\t\t<form class=\"update-word\">\n\t\t\t\t<p>You Previous Word: ").concat(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].word, "</p>\n\t\t\t\t\n\t\t\t\t<label>Type Your NEW Word</label>\n\t\t\t\t<input type=\"text\" name=\"word\" class=\"update\" /> \n\t\t\t\t<button type=\"submit\">Update</button>\n\t\t\t</form>\n\n\t\t\t<p>").concat(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].errMsg, "</p>\n\n\t\t\t<form class=\"logout\">\n\t\t\t\t<button type=\"submit\">Logout</button>\n\t\t\t</form>\n\t\t</div>\n\t");
}
var userLogin = function userLogin() {
  var username = document.querySelector(".username").value;
  (0,_fetch_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(_fetch_js__WEBPACK_IMPORTED_MODULE_1__.getWord).then(function (_ref) {
    var storedWord = _ref.storedWord;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].username = username;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn = true;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].word = storedWord;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].errMsg = "";
    webRender();
  })["catch"](function (error) {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].errMsg = "Invalid Username";
    webRender();
  });
};
var userLogout = function userLogout() {
  (0,_fetch_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn = false;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].word = "";
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].errMsg = "";
    webRender();
  });
};
var updateWord = function updateWord() {
  var word = document.querySelector(".update").value;
  (0,_fetch_js__WEBPACK_IMPORTED_MODULE_1__.fetchUpdateWord)(word).then(function (_ref2) {
    var storedWord = _ref2.storedWord;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn = true;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].word = storedWord;
    webRender();
  })["catch"](function (error) {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].errMsg = "Cannot Update Word";
    webRender();
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch.js */ "./src/fetch.js");
/* harmony import */ var _submit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./submit.js */ "./src/submit.js");





(0,_submit_js__WEBPACK_IMPORTED_MODULE_2__.submitHandler)();
(0,_fetch_js__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(_fetch_js__WEBPACK_IMPORTED_MODULE_1__.getWord).then(function (_ref) {
  var storedWord = _ref.storedWord;
  _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn = true;
  _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].word = storedWord;
  (0,_submit_js__WEBPACK_IMPORTED_MODULE_2__.webRender)();
})["catch"](function () {
  (0,_submit_js__WEBPACK_IMPORTED_MODULE_2__.webRender)();
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map