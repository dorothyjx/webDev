import storage from "./storage.js";
import { fetchLogin, fetchLogout, fetchUpdateWord, getWord } from "./fetch.js";

export function submitHandler() {
	const app = document.querySelector("#app");
	app.addEventListener("submit", e => {
		e.preventDefault();
		if(e.target.classList.contains("login")) {
			userLogin();
			return;
		}
		if(e.target.classList.contains("update-word")) {
			updateWord();
			return;
		}
		if(e.target.classList.contains("logout")) {
			userLogout();
			return;
		}
	});
}

export const webRender = () => {
	if(storage.isLoggedIn === false) {
		loginWeb();
		return;
	}
	wordWeb();
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

			<p class="error">${storage.errMsg}</p>
		</div>
	`
}

export function wordWeb() {
	const app = document.querySelector("#app");
	app.innerHTML = `
		<div class="word-card">
			<span>User: ${storage.username}</span>
			<form class="update-word">
				<p>You Previous Word: ${storage.word}</p>
				
				<label>Type Your NEW Word</label>
				<input type="text" name="word" class="update" /> 
				<button type="submit">Update</button>
			</form>

			<p>${storage.errMsg}</p>

			<form class="logout">
				<button type="submit">Logout</button>
			</form>
		</div>
	`
}

const userLogin = () => {
	const username = document.querySelector(".username").value;
	fetchLogin(username)
	.then(getWord)
	.then(({storedWord}) => {
		storage.username = username;
		storage.isLoggedIn = true;
		storage.word = storedWord;
		storage.errMsg = "";
		webRender();
	})
	.catch((error) => {
		storage.errMsg = "Invalid Username";
		webRender();
	});
};

const userLogout = () => {
	fetchLogout()
	.then(() => {
		storage.isLoggedIn = false;
		storage.word = "";
		storage.errMsg = "";
		webRender();
	});
};

const updateWord = () => {
	const word = document.querySelector(".update").value; 
	fetchUpdateWord(word) 
	.then( ({storedWord}) => {
		storage.isLoggedIn = true;
		storage.word = storedWord;
		webRender();
	})
	.catch((error) => {
		storage.errMsg = "Cannot Update Word";
		webRender();
	})
};