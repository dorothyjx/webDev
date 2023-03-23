import cart from "./cart.js";
import cats from "./cats.js";

const cartShow = document.querySelector("#cart");
const productCats = document.querySelector("#cats");

const webPage = {
	render() {
		webPage.getProductPage();
		webPage.getCartPage();
		handleEventListener();
	},

	getProductPage() {
		const productList = Object.keys(cats).map(index => {
			return `
				<li class="product-item">
					<img src=${cats[index].image} alt="cat" />
					<p>${cats[index].name}</p>
					<p>Price: $${cats[index].price}</p>
					<form data-id=${index} >
						<button type="submit" class="add-cart">Add to Cart</button>
					</form>
				</li>
			`
		}).join("");

		productCats.innerHTML = `
			<div>
				
				<ul class="product-list">
					${productList}
				</ul>
			</div>
		`
	},

	getCartPage() {
		const state = cart.state;
		const items = cart.items;
		let totalPrice = cart.totalPrice.toFixed(2);
		let totalCount = cart.totalCount;
		const viewCart = `<button id="view-cart-btn" class="view-cart"> View Cart (${totalCount}) </button>`;
	
		const cartInfo = Object.keys(items).map(index => {
			const price = cats[index].price.toFixed(2);
			const count = items[index].quantity;

			totalPrice += (count * price).toFixed(2);
			totalCount += count;

			// update 
			return `
				<li class="cart-item">
					<img src=${items[index].image} />
					<p>${cats[index].name}</p>
					<p>Price: $${price}</p>
					<p>Quantity: ${count}</p>
					<input type="text" name="quantity" data-id=${index} placeholder="Edit Quantity"/> 
					<button type="submit" id="update-btn" class="update"> Update </button>
				</li>
			`
		}).join("");
	
		const openCart = `
			<div class="open-cart">
				<h4> Your Cart </h4>
				${cart.totalCount > 0 ? 
					`<p class="info-display">Total Items: ${cart.totalCount}</p>
					<p class="info-display">Total Price: $${cart.totalPrice}</p>
					<ul class="cart-info">
						${cartInfo}
					</ul>
					<button type="submit" id="checkout-btn" class="checkout">Checkout</button>
					<button id="hide-cart-btn" class="view-cart">Hide Cart</button>` :
					`<p>Nothing in the cart</p>
					<button id="hide-cart-btn" class="view-cart">Hide Cart</button>`
				}
			</div>
		`;

		cartShow.innerHTML = state? openCart : viewCart;
	}	
};

function getElements() {
	const inputs = document.querySelectorAll('input');
	const viewbtn = document.querySelector('#view-cart-btn');
	const checkoutBtn = document.querySelector('#checkout-btn');
  	const hideCartBtn = document.querySelector('#hide-cart-btn');
	const updateBtns = Array.from(document.querySelectorAll('#update-btn'));

	return {
		inputs: inputs,
		viewbtn: viewbtn,
		checkoutBtn: checkoutBtn,
    	hideCartBtn: hideCartBtn,
		updateBtns: updateBtns,
	};
}

function handleEventListener() {
	const { inputs, viewbtn, checkoutBtn, hideCartBtn, updateBtns } = getElements();

	if (cart.state) {
		hideCartBtn.addEventListener('click', (e) => {
			e.preventDefault();
			cart.state = false;
			webPage.render();
		});
	} else {
		viewbtn.addEventListener('click', (e) => {
			e.preventDefault();
			cart.state = true;
			webPage.render();
		});
	}

	if (cart.totalCount > 0 && cart.state) {
		checkoutBtn.addEventListener('click', (e) => {
			e.preventDefault();
			reset();
			webPage.render();
		});
	}


	if (cart.totalCount > 0 && cart.state) {
		for(let i = 0; i < updateBtns.length; i++) {
		    updateBtns[i].addEventListener('click', (e) => {
			e.preventDefault();
			const inputValue = inputs[i].value.trim();

			const cat = cats[i];
			const previousItemQuantity = cart.items[i].quantity;
			cart.items[i].quantity = parseInt(inputValue);
			cart.totalCount += parseInt(inputValue) - previousItemQuantity;

			const previousItemPrice = cart.items[i].price;
			cart.items[i].price = parseInt(inputValue) * cat.price;
			cart.totalPrice += parseInt(inputValue) * cat.price - previousItemPrice;

			webPage.render();
			});
		}
	}
}

function reset() {
	document.location.reload(true);
}
  
export { getElements, handleEventListener };
export default webPage;