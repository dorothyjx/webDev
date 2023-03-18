import { fetchSession, fetchLogin, fetchHistory, fetchNewMessage, fetchLogout } from "./fetch";
import state from "./state.js";
import { submitHandler, webRender } from "./web";

submitHandler();

fetchSession()
.then(fetchHistory)
.then((chatHistory) => {
	state.messages = chatHistory;
	state.isLoggedIn = true;
	webRender();
})
.catch(() => {
	webRender();
});