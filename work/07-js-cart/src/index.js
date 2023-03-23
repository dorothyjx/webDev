import webPage, { getElements, handleEventListener } from "./webPage";
import cart from "./cart.js";
import cats from "./cats.js";

const eventListeners = {
  initEventListener() {
	
	const app = document.querySelector("#app");
    app.addEventListener("submit", (e) => {
      	e.preventDefault();
        const id = e.target.dataset.id;
        const cat = cats[id];

        cart.items[id].price += cat.price;
        cart.items[id].quantity += 1;
        cart.totalCount += 1;
        cart.totalPrice += cat.price;
        webPage.render();
    });

	handleEventListener();
  }
};

webPage.render();
eventListeners.initEventListener();