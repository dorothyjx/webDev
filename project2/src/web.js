import { fetchHistory, fetchNewMessage, fetchLogin, fetchLogout } from "./fetch";
import state from "./state";

export function submitHandler() {
	const app = document.querySelector("#app");
	app.addEventListener("submit", e => {
		e.preventDefault();
		if(e.target.classList.contains("login")) {
			userLogin();
			return;
		}

		if(e.target.classList.contains("send-msg")) {
			sendNewMsg();
			return;
		}

		if(e.target.classList.contains("logout")) {
			userLogout();
			return;
		}
	});
}

export const webRender = () => {
	if(state.isLoggedIn === false) {
		loginWeb();
		return;
	}
	chatWeb();
}

export function loginWeb() {
	const app = document.querySelector("#app");
	app.innerHTML = `
		<div class="login-card">
			<form class="login">
				<label>Type Your Username</label>
				<input type="text" name="username" placeholder="Username" class="username"/>
				<button type="submit">Login</button>
			</form>
			<p class="error">${state.errMsg}</p>
		</div>
	`
}

export function chatWeb() {
	const app = document.querySelector("#app");
	app.innerHTML = `
		<div class="msg-card">
			<form class="send-msg">
				${msgWeb()}
				<input type="text" placeholder="Type message" class="new_message" />
				<button type="submit">Send</button>
			</form>

			<p>${state.errMsg}</p>

			<form class="logout">
				<button type="submit">Logout</button>
			</form>
		</div>
	`
}

function msgWeb() {
	const app = document.querySelector("#app");
	console.log("#66")
	console.log(state.messages)
	if(state.messages) {
		return app.innerHTML = `
			<div class="list-container">
			<ul class="msg-list">` + 
			Object.values(state.messages).map(msg => `
				<li>
					<span>${msg.username} : ${msg.text}</span>
				</li>
			`).join('') + 
			`</ul> </div>`
	} else {
		return ``
	}
}

const userLogin = () => {
	const username = document.querySelector(".username").value;
	fetchLogin(username)
	.then(fetchHistory)
	.then((chatHistory) => {
		state.username = username;
		state.isLoggedIn = true;
		state.messages = chatHistory;
		console.log("#91: ", chatHistory)
		state.errMsg = "";
		webRender();
	})
	.catch((error) => {
		state.errMsg = "Invalid Username";
		webRender();
	});
};

const userLogout = () => {
	fetchLogout()
	.then(() => {
		state.isLoggedIn = false;
		state.username = "";
		state.messages = {};
		state.errMsg = "";
		webRender();
	});
};

const sendNewMsg = () => {
	const message = document.querySelector(".new_message").value;
	console.log("#113 new message: ", message);
	fetchNewMessage(message) 
	.then((chatHistory) => {
		console.log("#116: ", chatHistory)
		state.isLoggedIn = true;
		state.messages = chatHistory;
		state.errMsg = "";
		webRender();
	})
	.catch((error) => {
		state.errMsg = "Invalid Message";
		webRender();
	})
}