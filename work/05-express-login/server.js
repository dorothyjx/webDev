const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const uid = uuidv4();
const app = express();
const PORT = 3000;
const sessions = {};

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static('./public'))

const users = {
	"Mulan": {name: "Mulan", word: "happy"},
	"Muto":  {name: "Muto",  word: "stubborn"},
}


app.get('/', (req, res) => {
	res.send(`
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
					<label>Type Your Username</label>
					<input type="text" name="username" placeholder="Username"/>
					<button type="submit">Login</button>
				</form>
          	</div>
        </body>
      </html>
	`);
});

app.get('/userinfo', (req, res) => {
	const sid = req.cookies.sid;
	const {username} = sessions[sid] || {};
	const info = users[username] || {};

	res.send(`
	<!doctype html>
      <html>
        <head>
          <title>User Info</title>
          <link rel="stylesheet" href="css/info.css">
        </head>
        <body>
			<h1>User Information</h1>	
			<div class="info-card">
				<form method="POST" action="/update" class="info">
					<label>Your Username</label>
					<span>${info.name}</span>
					<label>Your Word</label>
					<span>${info.word}</span>
					<button type="submit">Update</button>
				</form>
				
				<form method="POST" action="/logout">
					<button type="submit">Logout</button>
				</form>
			</div>
        </body>
      </html>
	`)
});


app.post('/update', (req, res) => {
	const sid = req.cookies.sid;
	const {username} = sessions[sid] || {};
	const info = users[username] || {};

	res.send(`
	<!doctype html>
		<html>
			<head>
				<title>User Info</title>
				<link rel="stylesheet" href="css/info.css">
			</head>
			<body>
				<h1>User Information</h1>	
				<div class="info-card">
					<form method="GET" action="/update" class="info">
						<label>Your Username</label>
						<span>${info.name}</span>
						<label>Type Your New Word</label>
						<input type="text" name="word">
						<span>Your Previous Word: ${info.word}</span>
						<button type="submit">Save</button>
					</form>
					
					<form method="POST" action="/logout">
						<button type="submit">Logout</button>
					</form>
				</div>
			</body>
		</html>
	`)
});

app.post('/login', (req, res) => {
	const username = req.body.username;
	const nameRegex = /^\w+$/;
	if(username === 'dog' || !username || !username.match(nameRegex)) {
		res.status(401).send(`
		<!doctype html>
		<html>
			<head>
				<title>Error</title>
				<link rel="stylesheet" href="css/error.css">
			</head>
			<body>
				<h1>Login Failed.</h1>	
				<a href="/">Return to Home</a>
			</body>
		</html>
		`)
		return;
	}

	const sid = uid;
	sessions[sid] = { username};
	res.cookie('sid', sid);
	if (!users[username]) {
		const newUser = {name: username, word: ""};
		users[username] = newUser;
	}

	res.redirect('/userinfo');
});

app.get('/update', (req, res) => {
	const newWord = req.query.word;
	const sid = req.cookies.sid;
	const {username} = sessions[sid] || {};
	const info = users[username] || {};

	if( username === 'dog' || !username) {
		res.status(401).send(`
		<!doctype html>
		<html>
			<head>
				<title>Error</title>
				<link rel="stylesheet" href="css/error.css">
			</head>
			<body>
				<h1>Login Failed.</h1>	
				<a href="/">Return to Home</a>
			</body>
		</html>`);
		return;
	}
	users[username] = {name: info.name, word: newWord};
	res.redirect('/userinfo');
});

app.post('/logout', (req, res) => {
	const {username} = req.body;
	const sid = uid;
	sessions[sid] = {username};
	console.log(sessions);
	delete sessions[sid];
	console.log(sessions);
	res.clearCookie('sid');
	res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))