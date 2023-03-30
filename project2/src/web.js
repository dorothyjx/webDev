import { fetchHistory, fetchNewMessage, fetchLogin, fetchLogout, fetchAllUsers, fetchSession } from "./fetch";
import state from "./state";
const app = document.querySelector("#app");
//const availableUsers = [];

export function submitHandler() {
	//const app = document.querySelector("#app");
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
	//const app = document.querySelector("#app");
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
	//const app = document.querySelector("#app");
	app.innerHTML = `
		<div class="msg-card">

			<div class="online-users"></div>
			<div class="list-container"></div>

			<form class="send-msg">
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


export function msgWeb() {
	const msgList = app.querySelector(".list-container");
	if(state.messages) {
		return msgList.innerHTML = `
			<ul class="msg-list">` + 
			Object.values(state.messages).map(msg => `
				<li>
					<span>${msg.username} : ${msg.text}</span>
				</li>
			`).join('') + 
			`</ul>`
	} else {
		return ``
	}
}

function userList() {
	//const app = document.querySelector("#app");
	const users = app.querySelector(".online-users");

	return users.innerHTML = `<ul class="users"> Online Users: ` + 
		Object.values(state.availableUsers).map(user => `
			<li>
				<span> ${user.username} </span>
			</li>
		`).join('') + 
	`</ul>`
}

const userLogin = () => {
	const username = document.querySelector(".username").value;
	fetchLogin(username)
	.then(fetchHistory)
	.then((chatHistory) => {
		state.username = username;
		state.isLoggedIn = true;
		state.messages = chatHistory;
		state.errMsg = "";
		// webRender();
		fetchAllUsers()
		.then((user_list) => {
			state.availableUsers = user_list; 
			webRender();
		})
		.catch((error) => {
			state.errMsg = "network wrong"
			webRender();
		})
	})
	.catch((error) => {
		console.log(error);
		state.errMsg = "Invalid Username";
		webRender();
	});
};

const userLogout = () => {
	const username = state.username; 
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
	fetchNewMessage(message) 
	.then((chatHistory) => {
		state.isLoggedIn = true;
		state.messages = chatHistory;
		state.errMsg = "";
		msgWeb();
	})
	.catch((error) => {
		state.errMsg = "Invalid Message";
		webRender();
	})
}


export function initPolling() {
	setInterval(() => {
		return fetchHistory()
		.then((chatHistory) => {
			state.messages = chatHistory;
			state.isLoggedIn = true;
			fetchAllUsers()
				.then((user_list) => {
					state.availableUsers = user_list; 
					msgWeb();
					userList();
					//webRender();
				})
			})
		.catch(() => console.warn("should have an error in polling #179"))
	}, 5000);
}

// function startPolling() {
// 	return new Promise((resolve, reject) => {
// 	  const intervalId = setInterval(() => {
// 		fetchHistory()
// 		  .then((chatHistory) => {
// 			state.messages = chatHistory;
// 			state.isLoggedIn = true;
// 			fetchAllUsers()
// 			  .then((user_list) => {
// 				state.availableUsers = user_list;
// 				msgWeb();
// 				userList();
// 				//webRender();
// 				resolve(); // resolve the promise when updates are complete
// 			  })
// 			  .catch((error) => {
// 				console.warn("Error fetching user list", error);
// 				reject(error);
// 			  });
// 		  })
// 		  .catch((error) => {
// 			console.warn("Error fetching chat history", error);
// 			reject(error);
// 		  });
// 	  }, 5000);
// 	});
//   }