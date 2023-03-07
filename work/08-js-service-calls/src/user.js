import storage from "./storage.js";
import { fetchSession, fetchLogin, fetchLogout, fetchUpdateWord } from "./fetch.js";

export const userLogin = () => {
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

export const userLogout = () => {
	fetchLogout()
	.then(() => {
		storage.isLoggedIn = false;
		storage.word = "";
		storage.errMsg = "";
		webRender();
	});
};