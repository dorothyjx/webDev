"use strict";

require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.keys.js");
var _cats = _interopRequireDefault(require("./cats"));
var _cart = _interopRequireDefault(require("./cart"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
var app = document.querySelector("#app");
var webPage = function webPage() {
  var productPage = getProductPage();
  var cartPage = getCartPage();
  app.innerHTML = "\n\t\t<div>\n\t\t\t<h1>Chose your cat</h1>\n\t\t\t<ul>\n\t\t\t\t".concat(productPage, "\n\t\t\t</ul>\n\t\t</div>\n\t\t<button id=\"\">View Cart</button>\n\t\t<div>").concat(viewCart, "</div>\n\t");
};
var getProductPage = function getProductPage() {
  return _cats.default.items.map(function (cat) {
    return "\n\t\t\t<li>\n\t\t\t\t<img src=".concat(cat.image, " alt=\"cat\" />\n\t\t\t\t<p>").concat(cat.name, "</p>\n\t\t\t\t<p>").concat(cat.price, "</p>\n\t\t\t\t<form id=\"add-cart\">\n\t\t\t\t\t<button type=\"submit\">Add to Cart</button>\n\t\t\t\t</form>\n\t\t\t</li>\n\t\t");
  }).join("");
};
var cartState = false;
var viewCart = ({
  if: function _if(cartState) {
    return "".concat(getCartPage);
  }
}, _readOnlyError("cartState"));
var getCartPage = function getCartPage() {
  var items = _cart.default.items;
  var totalPrice = _cart.default.totalPrice;
  var totalCount = _cart.default.totalCount;
  var cartInfo = Object.keys(items).map(function (index) {
    var price = _cats.default.items[index].price;
    var count = items[index].count;
    totalPrice += count * price;
    totalCount += count;
    return "\n\t\t\t<li>\n\t\t\t\t<img src=".concat(items[index].image, "\n\t\t\t\t<p>").concat(_cats.default.items[index].name, "</p>\n\t\t\t\t<p>").concat(price, "</p>\n\t\t\t\t<form >\n\t\t\t\t\t<p>").concat(count, "</p>\n\t\t\t\t\t<label> Edit Quantity </label>\n\t\t\t\t\t<input type=\"number\" name=\"quantity\"/> \n\t\t\t\t\t<button>Update</button>\n\t\t\t\t</form>\n\t\t\t</li>\n\t\t");
  }).join("");
  console.log("###### " + cartInfo.length);
  if (cartInfo.length) {
    return "\n\t\t\t<div>\n\t\t\t\t<h4> Your Cart </h4>\n\t\t\t\t<ul>\n\t\t\t\t\t".concat(cartInfo, "\n\t\t\t\t</ul>\n\t\t\t\t<button>Checkout</button>\n\t\t\t\t<button>Hide Cart</button>\n\t\t\t</div>\n\t\t");
  } else {
    return "\n\t\t<div>\n\t\t\t<h4> Your Cart </h4>\n\t\t\t<p> Nothing in the cart </p>\n\t\t\t<button>Checkout</button>\n\t\t\t<button>Hide Cart</button>\n\t\t</div>\n\t";
  }
};
module.exports = webPage;