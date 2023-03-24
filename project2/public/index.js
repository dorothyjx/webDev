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
/* harmony export */   "fetchAllUsers": () => (/* binding */ fetchAllUsers),
/* harmony export */   "fetchHistory": () => (/* binding */ fetchHistory),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchNewMessage": () => (/* binding */ fetchNewMessage),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession)
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
function fetchHistory() {
  return fetch('/api/chat')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
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
function fetchNewMessage(text) {
  return fetch('/api/chat', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      text: text
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
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
function fetchAllUsers() {
  console.log("81");
  console.log(fetch('/api/sessionusers'));
  return fetch('/api/sessionusers')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (res) {
    if (!res.ok) {
      console.log("error");
      return res.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    console.log(res);
    return res.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  username: '',
  isLoggedIn: false,
  messages: {},
  errMsg: '',
  availableUsers: {}
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/web.js":
/*!********************!*\
  !*** ./src/web.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chatWeb": () => (/* binding */ chatWeb),
/* harmony export */   "loginWeb": () => (/* binding */ loginWeb),
/* harmony export */   "msgWeb": () => (/* binding */ msgWeb),
/* harmony export */   "submitHandler": () => (/* binding */ submitHandler),
/* harmony export */   "webRender": () => (/* binding */ webRender)
/* harmony export */ });
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "./src/fetch.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");



//const availableUsers = [];

function submitHandler() {
  var app = document.querySelector("#app");
  app.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("login")) {
      userLogin();
      return;
    }
    if (e.target.classList.contains("send-msg")) {
      sendNewMsg();
      return;
    }
    if (e.target.classList.contains("logout")) {
      userLogout();
      return;
    }
  });
}
var webRender = function webRender() {
  if (_state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn === false) {
    loginWeb();
    return;
  }
  chatWeb();
};
function loginWeb() {
  var app = document.querySelector("#app");
  app.innerHTML = "\n\t\t<div class=\"login-card\">\n\t\t\t<form class=\"login\">\n\t\t\t\t<label>Type Your Username</label>\n\t\t\t\t<input type=\"text\" name=\"username\" placeholder=\"Username\" class=\"username\"/>\n\t\t\t\t<button type=\"submit\">Login</button>\n\t\t\t</form>\n\t\t\t<p class=\"error\">".concat(_state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg, "</p>\n\t\t</div>\n\t");
}
function chatWeb() {
  var app = document.querySelector("#app");
  app.innerHTML = "\n\t\t<div class=\"msg-card\">\n\t\t\t".concat(userList(), "\n\t\t\t<div></div>\n\t\t\t<form class=\"send-msg\">\n\t\t\t\t").concat(msgWeb(), "\n\t\t\t\t<input type=\"text\" placeholder=\"Type message\" class=\"new_message\" />\n\t\t\t\t<button type=\"submit\">Send</button>\n\t\t\t</form>\n\n\t\t\t<p>").concat(_state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg, "</p>\n\n\t\t\t<form class=\"logout\">\n\t\t\t\t<button type=\"submit\">Logout</button>\n\t\t\t</form>\n\t\t</div>\n\t");
}
function msgWeb() {
  var app = document.querySelector("#app");
  if (_state__WEBPACK_IMPORTED_MODULE_1__["default"].messages) {
    return app.innerHTML = "\n\t\t\t<div class=\"list-container\">\n\t\t\t<ul class=\"msg-list\">" + Object.values(_state__WEBPACK_IMPORTED_MODULE_1__["default"].messages).map(function (msg) {
      return "\n\t\t\t\t<li>\n\t\t\t\t\t<span>".concat(msg.username, " : ").concat(msg.text, "</span>\n\t\t\t\t</li>\n\t\t\t");
    }).join('') + "</ul> </div>";
  } else {
    return "";
  }
}
function userList() {
  var app = document.querySelector("#app");
  if (_state__WEBPACK_IMPORTED_MODULE_1__["default"].availableUsers.length < 2) {
    return "<p> Only You Online </p>";
  } else {
    return app.innerHTML = "<ul class=\"users\"> Online Users: " + Object.values(_state__WEBPACK_IMPORTED_MODULE_1__["default"].availableUsers).map(function (user) {
      return "\n\t\t\t\t<li>\n\t\t\t\t\t<span> ".concat(user.username, " </span>\n\t\t\t\t</li>\n\t\t\t");
    }).join('') + "</ul>";
  }
}
var userLogin = function userLogin() {
  var username = document.querySelector(".username").value;
  (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchHistory).then(function (chatHistory) {
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].username = username;
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn = true;
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].messages = chatHistory;
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "";
    // webRender();
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchAllUsers)().then(function (user_list) {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].availableUsers = user_list;
      webRender();
    })["catch"](function (error) {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "network wrong";
      webRender();
    });
  })["catch"](function (error) {
    console.log(error);
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "Invalid Username";
    webRender();
  });
};
var userLogout = function userLogout() {
  var username = _state__WEBPACK_IMPORTED_MODULE_1__["default"].username;
  (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn = false;
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].username = "";
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].messages = {};
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "";
    webRender();
  });
};
var sendNewMsg = function sendNewMsg() {
  var message = document.querySelector(".new_message").value;
  (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchNewMessage)(message).then(function (chatHistory) {
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn = true;
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].messages = chatHistory;
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "";
    //webRender();
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchAllUsers)().then(function (user_list) {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].availableUsers = user_list;
      webRender();
    })["catch"](function (error) {
      _state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "network wrong";
      webRender();
    });
  })["catch"](function (error) {
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "Invalid Message";
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
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "./src/fetch.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _web__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./web */ "./src/web.js");



(0,_web__WEBPACK_IMPORTED_MODULE_2__.submitHandler)();
setTimeout(function () {
  (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchHistory).then(function (chatHistory) {
    _state_js__WEBPACK_IMPORTED_MODULE_1__["default"].messages = chatHistory;
    _state_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn = true;
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchAllUsers)().then(function (user_list) {
      _state_js__WEBPACK_IMPORTED_MODULE_1__["default"].availableUsers = user_list;
      (0,_web__WEBPACK_IMPORTED_MODULE_2__.webRender)();
      initPolling();
    })["catch"](function (error) {
      _state_js__WEBPACK_IMPORTED_MODULE_1__["default"].errMsg = "network wrong";
      //webRender();
      initPolling();
    });
  })["catch"](function () {
    (0,_web__WEBPACK_IMPORTED_MODULE_2__.webRender)();
    initPolling();
  });
}, 1000);
function initPolling() {
  setInterval(function () {
    return (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchHistory).then(function (chatHistory) {
      _state_js__WEBPACK_IMPORTED_MODULE_1__["default"].messages = chatHistory;
      _state_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn = true;
      (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchAllUsers)().then(function (user_list) {
        _state_js__WEBPACK_IMPORTED_MODULE_1__["default"].availableUsers = user_list;
        (0,_web__WEBPACK_IMPORTED_MODULE_2__.webRender)();
      });
    });
  }, 3000);
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map