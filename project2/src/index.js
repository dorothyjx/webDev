import { fetchSession, fetchLogin, fetchHistory, fetchNewMessage, fetchLogout, fetchAllUsers } from "./fetch";
import state from "./state.js";
import { msgWeb, submitHandler, webRender, initPolling } from "./web";

submitHandler();

setTimeout(() => {
	fetchSession()
	.then(fetchHistory)
	.then((chatHistory) => {
		state.messages = chatHistory;
		state.isLoggedIn = true;
		fetchAllUsers()
			.then((user_list) => {
				state.availableUsers = user_list; 
				webRender();
				initPolling();
				// startPolling();
			})
			.catch((error) => {
				state.errMsg = "network wrong"
				//webRender();
				initPolling();
				// startPolling();
			})
	})
	.catch(() => {
		webRender();
		initPolling();
		// startPolling();
	});
}, 500);

// function initPolling() {
// 	setInterval(() => {
// 		return fetchSession()
// 		.then(fetchHistory)
// 		.then((chatHistory) => {
// 			state.messages = chatHistory;
// 			state.isLoggedIn = true;
// 			fetchAllUsers()
// 				.then((user_list) => {
// 					state.availableUsers = user_list; 
// 					msgWeb();
// 					//webRender();
// 				})
// 			})
// 	}, 3000);
// }