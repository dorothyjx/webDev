"use strict"
import storage from "./storage.js";
import { fetchSession, getWord } from "./fetch.js";
import { submitHandler, webRender } from "./submit.js";

submitHandler();

fetchSession()
.then(getWord) 
.then( ({storedWord})  => {
	storage.isLoggedIn = true;
	storage.word = storedWord;
	webRender();
})
.catch(() => {
	webRender();
});