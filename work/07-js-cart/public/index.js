/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var cart = {
  items: {
    0: {
      name: 'Fluffball',
      image: 'http://placekitten.com/150/150?image=1',
      price: 0,
      quantity: 0
    },
    1: {
      name: 'General Mayhem',
      image: 'http://placekitten.com/150/150?image=2',
      price: 0,
      quantity: 0
    },
    2: {
      name: 'Nyan',
      image: 'http://placekitten.com/150/150?image=3',
      price: 0,
      quantity: 0
    }
  },
  state: false,
  totalPrice: 0,
  totalCount: 0
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cart);

/***/ }),

/***/ "./src/cats.js":
/*!*********************!*\
  !*** ./src/cats.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var cats = {
  0: {
    name: 'Fluffball',
    image: 'http://placekitten.com/150/150?image=1',
    price: 0.99
  },
  1: {
    name: 'General Mayhem',
    image: 'http://placekitten.com/150/150?image=2',
    price: 3.14
  },
  2: {
    name: 'Nyan',
    image: 'http://placekitten.com/150/150?image=3',
    price: 2.73
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cats);

/***/ }),

/***/ "./src/webPage.js":
/*!************************!*\
  !*** ./src/webPage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getElements": () => (/* binding */ getElements),
/* harmony export */   "handleEventListener": () => (/* binding */ handleEventListener)
/* harmony export */ });
/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart.js */ "./src/cart.js");
/* harmony import */ var _cats_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cats.js */ "./src/cats.js");


var cartShow = document.querySelector("#cart");
var productCats = document.querySelector("#cats");
var webPage = {
  render: function render() {
    webPage.getProductPage();
    webPage.getCartPage();
    handleEventListener();
  },
  getProductPage: function getProductPage() {
    var productList = Object.keys(_cats_js__WEBPACK_IMPORTED_MODULE_1__["default"]).map(function (index) {
      return "\n\t\t\t\t<li class=\"product-item\">\n\t\t\t\t\t<img src=".concat(_cats_js__WEBPACK_IMPORTED_MODULE_1__["default"][index].image, " alt=\"cat\" />\n\t\t\t\t\t<p>").concat(_cats_js__WEBPACK_IMPORTED_MODULE_1__["default"][index].name, "</p>\n\t\t\t\t\t<p>Price: $").concat(_cats_js__WEBPACK_IMPORTED_MODULE_1__["default"][index].price, "</p>\n\t\t\t\t\t<form data-id=").concat(index, " >\n\t\t\t\t\t\t<button type=\"submit\" class=\"add-cart\">Add to Cart</button>\n\t\t\t\t\t</form>\n\t\t\t\t</li>\n\t\t\t");
    }).join("");
    productCats.innerHTML = "\n\t\t\t<div>\n\t\t\t\t\n\t\t\t\t<ul class=\"product-list\">\n\t\t\t\t\t".concat(productList, "\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t");
  },
  getCartPage: function getCartPage() {
    var state = _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].state;
    var items = _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].items;
    var totalPrice = _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalPrice.toFixed(2);
    var totalCount = _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalCount;
    var viewCart = "<button id=\"view-cart-btn\" class=\"view-cart\"> View Cart (".concat(totalCount, ") </button>");
    var cartInfo = Object.keys(items).map(function (index) {
      var price = _cats_js__WEBPACK_IMPORTED_MODULE_1__["default"][index].price.toFixed(2);
      var count = items[index].quantity;
      totalPrice += (count * price).toFixed(2);
      totalCount += count;

      // update 
      return "\n\t\t\t\t<li class=\"cart-item\">\n\t\t\t\t\t<img src=".concat(items[index].image, " />\n\t\t\t\t\t<p>").concat(_cats_js__WEBPACK_IMPORTED_MODULE_1__["default"][index].name, "</p>\n\t\t\t\t\t<p>Price: $").concat(price, "</p>\n\t\t\t\t\t<p>Quantity: ").concat(count, "</p>\n\t\t\t\t\t<input type=\"text\" name=\"quantity\" data-id=").concat(index, " placeholder=\"Edit Quantity\"/> \n\t\t\t\t\t<button type=\"submit\" id=\"update-btn\" class=\"update\"> Update </button>\n\t\t\t\t</li>\n\t\t\t");
    }).join("");
    var openCart = "\n\t\t\t<div class=\"open-cart\">\n\t\t\t\t<h4> Your Cart </h4>\n\t\t\t\t".concat(_cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalCount > 0 ? "<p class=\"info-display\">Total Items: ".concat(_cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalCount, "</p>\n\t\t\t\t\t<p class=\"info-display\">Total Price: $").concat(_cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalPrice, "</p>\n\t\t\t\t\t<ul class=\"cart-info\">\n\t\t\t\t\t\t").concat(cartInfo, "\n\t\t\t\t\t</ul>\n\t\t\t\t\t<button type=\"submit\" id=\"checkout-btn\" class=\"checkout\">Checkout</button>\n\t\t\t\t\t<button id=\"hide-cart-btn\" class=\"view-cart\">Hide Cart</button>") : "<p>Nothing in the cart</p>\n\t\t\t\t\t<button id=\"hide-cart-btn\" class=\"view-cart\">Hide Cart</button>", "\n\t\t\t</div>\n\t\t");
    cartShow.innerHTML = state ? openCart : viewCart;
  }
};
function getElements() {
  var inputs = document.querySelectorAll('input');
  var viewbtn = document.querySelector('#view-cart-btn');
  var checkoutBtn = document.querySelector('#checkout-btn');
  var hideCartBtn = document.querySelector('#hide-cart-btn');
  var updateBtns = Array.from(document.querySelectorAll('#update-btn'));
  return {
    inputs: inputs,
    viewbtn: viewbtn,
    checkoutBtn: checkoutBtn,
    hideCartBtn: hideCartBtn,
    updateBtns: updateBtns
  };
}
function handleEventListener() {
  var _getElements = getElements(),
    inputs = _getElements.inputs,
    viewbtn = _getElements.viewbtn,
    checkoutBtn = _getElements.checkoutBtn,
    hideCartBtn = _getElements.hideCartBtn,
    updateBtns = _getElements.updateBtns;
  if (_cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].state) {
    hideCartBtn.addEventListener('click', function (e) {
      e.preventDefault();
      _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].state = false;
      webPage.render();
    });
  } else {
    viewbtn.addEventListener('click', function (e) {
      e.preventDefault();
      _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].state = true;
      webPage.render();
    });
  }
  if (_cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalCount > 0 && _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].state) {
    checkoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      reset();
      webPage.render();
    });
  }
  if (_cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalCount > 0 && _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].state) {
    var _loop = function _loop(i) {
      updateBtns[i].addEventListener('click', function (e) {
        e.preventDefault();
        var inputValue = inputs[i].value.trim();
        var cat = _cats_js__WEBPACK_IMPORTED_MODULE_1__["default"][i];
        var previousItemQuantity = _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].items[i].quantity;
        _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].items[i].quantity = parseInt(inputValue);
        _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalCount += parseInt(inputValue) - previousItemQuantity;
        var previousItemPrice = _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].items[i].price;
        _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].items[i].price = parseInt(inputValue) * cat.price;
        _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"].totalPrice += parseInt(inputValue) * cat.price - previousItemPrice;
        webPage.render();
      });
    };
    for (var i = 0; i < updateBtns.length; i++) {
      _loop(i);
    }
  }
}
function reset() {
  document.location.reload(true);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (webPage);

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
/* harmony import */ var _webPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webPage */ "./src/webPage.js");
/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart.js */ "./src/cart.js");
/* harmony import */ var _cats_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cats.js */ "./src/cats.js");



var eventListeners = {
  initEventListener: function initEventListener() {
    var app = document.querySelector("#app");
    app.addEventListener("submit", function (e) {
      e.preventDefault();
      var id = e.target.dataset.id;
      var cat = _cats_js__WEBPACK_IMPORTED_MODULE_2__["default"][id];
      _cart_js__WEBPACK_IMPORTED_MODULE_1__["default"].items[id].price += cat.price;
      _cart_js__WEBPACK_IMPORTED_MODULE_1__["default"].items[id].quantity += 1;
      _cart_js__WEBPACK_IMPORTED_MODULE_1__["default"].totalCount += 1;
      _cart_js__WEBPACK_IMPORTED_MODULE_1__["default"].totalPrice += cat.price;
      _webPage__WEBPACK_IMPORTED_MODULE_0__["default"].render();
    });
    (0,_webPage__WEBPACK_IMPORTED_MODULE_0__.handleEventListener)();
  }
};
_webPage__WEBPACK_IMPORTED_MODULE_0__["default"].render();
eventListeners.initEventListener();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map