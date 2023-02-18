"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const uuidv4 = require('uuid').v4;
const uid = uuidv4();
const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

const sessions = {};
const webPages = require('./webPages');
const words = require('./words');
const users = require('./users');


app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!users[username]) {
            users.generateUser(username);
        }
        const rst = users[username].rst;
		console.log("Username: " + username + " the correct result is : " + rst);
        res.send(webPages.game(username, rst));
        return;
    }
    res.send(webPages.userLogin());
});

app.post('/login', (req, res) => {
	const username = req.body.username;
	const nameRegex = /^\w+$/;
	if(username === 'dog' || !username || !username.match(nameRegex)) {
		res.status(401).send(webPages.loginFail());
		return;
	}

	const sid = uid;
	sessions[sid] = {username};
	res.cookie('sid', sid);
	res.redirect('/');
});

app.post('/logout', (req, res) => {
	const sid = req.cookies.sid;
	console.log(sessions);
	delete sessions[sid];
	console.log(sessions);
	res.clearCookie('sid');
	res.redirect('/');
});

app.post('/new-game', (req, res) => {
	const sid = req.cookies.sid;
	const username = sessions[sid].username;
	if (!sessions[sid]) {
		res.send(webPages.userLogin("Login Please"));
		return
	}
	users.newGameUser(username);
	res.redirect('/');
})

app.post('/guess', (req, res) => {
	const sid = req.cookies.sid;
	const username = sessions[sid].username;
	const result = users[username].rst;
	let userGuess = req.body.userGuess;

	if(!userGuess) {
		res.redirect('/');
	} else if(!words.includes(userGuess)) {
		users[username].status = "invalid";
		res.redirect('/');
	} else if(users[username].guessedList[userGuess]){
		users[username].status = "seen";
		res.redirect('/');
	} else if(userGuess === result){
		users[username].status = "correct";
		res.redirect('/win');
	} else {
		users[username].status = "valid";
		const matchLetters = webPages.getMatchLetters(username, userGuess);
		const currentScore = Object.keys(users[username].guessedList).length + 1;
		console.log("!!! CurrentScore: " + currentScore);
		users[username].score = currentScore;
		users[username].guessedList[userGuess]= matchLetters;
		console.log("---" + users[username].guessedList)
		res.redirect('/');
	}
})

app.get('/win', (req, res) => {
	const sid = req.cookies.sid;
	const username = sessions[sid].username;
	res.send(webPages.win(username));
})

app.listen(PORT, () => {
	console.log(`Listening http://localhost:${PORT}`);
  });