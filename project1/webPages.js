const words = require('./words');
const users = require('./users');

const webPages = {
	userLogin: function() {
		return (`
			<!doctype html>
			<html>
				<head>
					<title>User Login</title>
					<link rel="stylesheet" href="css/login.css">
				</head>
				<body>
					<h1>Login</h1>	
					<div class="login-card">
						<form method="POST" action="/login" class="login">
							<label>Your Username</label>
							<input type="text" name="username" placeholder="Username"/>
							
							<button type="submit">Login</button>
						</form>

					</div>
				</body>
			</html>
		`);
	},

	loginFail: function() {
		return (`
			<!doctype html>
			<html>
				<head>
					<title>Error</title>
					<link rel="stylesheet" href="css/error.css">
				</head>
				<body>
					<h1>Login Failed.</h1>	
					<a href="/">Please Retry</a>
				</body>
			</html>
		`);
	},

	game: function(username){
		return (`
			<!doctype html>
			<html>
				<head>
					<title>Guess Game</title>
					<link rel="stylesheet" href="css/game.css">
				</head>
				<body>
					<nav>
						<p class="nav-user">User: ${username}</p>
						<form method="POST" action="/logout"><button type="submit" class="nav-btn">Logout</button></form>
						<form method="POST" action="/new-game"><button type="submit" class="nav-btn">Restart Game</button></form>
					</nav>
					
					<h1>Guess a Word</h1>	
					<div class="guess-wrap">
						${webPages.getWordList(words)}

						<form action="/guess" method="POST" class="guess-card">
							<input name="userGuess" placeholder="Type your guess" required/>
							<button class="guess-submit">Submit</button>
						</form>

						<div class="score">${webPages.getUserScore(username)}</div>

						<div class="status">
							${webPages.checkGuessValid(username)}
						</div>
						
						<div>
							${webPages.getGuessWordsHistory(username)}
						</div>
					</div>
				</body>
			</html>

		`);
	},

	win: function(username) {
		return(`
			<!doctype html>
			<html>
				<head>
					<title>Win</title>
					<link rel="stylesheet" href="css/win.css">
				</head>
				<body>
					<nav>
						<p class="nav-user">User: ${username}</p>
						<form method="POST" action="/logout"><button type="submit" class="nav-btn">Logout</button></form>
						<form method="POST" action="/new-game"><button type="submit" class="nav-btn">Restart Game</button></form>
					</nav>

					<h1>Congratulation ${username}, You Win!</h1>
					<img src="css/win.jpeg" />
				</body>
			</html>
		`)
	},

	getWordList: function(words) {
		return(`
			<div class="words-list">
				<p>All Words</p>` + 
				words.map(word => (`<span>${word}</span>`)).join(', ') +
			`</div>`
		);
	},

	getGuessWordsHistory: function(username) {
		return (
			`<ul>` + 
			Object.keys(users[username].guessedList).map(word => 
				`<li>
					<span>${word} with ${users[username].guessedList[word]} matched letters</span>
				</li>`
				).join('') + 
			`</ul>`
		)
	},

	checkGuessValid: function(username) {
		if (users[username].status === "correct") {
			return(`<p>Congratulation!</p>`);
		} else if (users[username].status === "invalid") {
			return(`<p> Your guess is invalid</p>`);
		} else if (users[username].status === "seen"){
			return(`<p> This word you guessed before</p>`);
		} else if (users[username].status === "valid") {
			return(`<p>Your guess is valid, but not right</p>`);
		} else {
			return ``;
		}
	},

	getUserScore: function(username) {
		return `<p>Current count of valid guesses: ${users[username].score}</p>`
	},

	getMatchLetters: function(username, guessWord) {
		const rst = users[username].rst;
		let count = 0;
		const letters = {};
		for (let c of rst.toLowerCase()) {
			if (letters[c]){
				letters[c] += 1;
			} else {
				letters[c] = 1;
			}
		}

		for(let c of guessWord.toLowerCase()) {
			if(letters[c]) {
				letters[c] -= 1;
				count += 1
			}
		}
		console.log("### Letter Matches: " + count);
		return count;
	}
}

module.exports = webPages;