const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require('uuid').v4;

const app = express();
const PORT = 3000;
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./public"));
const chatHistory = {};
const user_list = {};


// Sessions
// Check for existing session (used on page load)
app.get('/api/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !username) {
	  res.status(401).json({ error: 'auth-missing' });
	  return;
	}
	res.json({ username });
});

// Create a new session (login)
app.post('/api/session', (req, res) => {
	const { username } = req.body;
  
	if(!users.isValidUsername(username)) {
	  console.log(username);
	  res.status(400).json({ error: 'required-username' });
	  return;
	}
  
	if(username === 'dog') {
	  res.status(403).json({ error: 'auth-insufficient' });
	  return;
	}
  
	const sid = sessions.addSession(username);
	res.cookie('sid', sid);

	user_list[sid] = {username};
	console.log("#48 in server.js, User_list: ", user_list);
	//res.json({username: chatHistory, allusers});
	res.json(chatHistory);
});

app.delete('/api/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
  
	if(sid) {
	  res.clearCookie('sid');
	}
  
	if(username) {
	  sessions.deleteSession(sid);
	}
	delete user_list[sid];
	res.json({ wasLoggedIn: !!username }); 
});

app.get('/api/sessionusers', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';

	if(!sid || !username) {
	res.status(401).json({ error: 'auth-missing' });
	return;
	}
	console.log("#75 in SERVER.JS", sessions.getAllSessionUsers())
	// const activeUsers = {};
	// Object.values(sessions.getAllSessionUsers()).forEach( (user) => {
	// 	console.log("78", user.username)
	// 	activeUsers[user.username] = true;
	// })
	// console.log("#80 in server.js", Object.keys(activeUsers))
	// res.json({ users: Object.keys(activeUsers)});
	console.log("84 in serverjs", user_list);
	res.json(user_list);
	//res.json(sessions.getAllSessionUsers);
});

app.get('/api/chat', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
  
	if(!sid || !username) {
	  res.status(401).json({ error: 'auth-missing' });
	  return;
	}

	res.json(chatHistory);
});

app.post('/api/chat', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !username) {
	  res.status(401).json({ error: 'auth-missing' });
	  return;
	}
	const { text } = req.body;
	if(!text && text === '') {
	  res.status(400).json({ error: 'required-text' });
	  return;
	}
	const id = uuid();
	chatHistory[id] = {username, text};

	res.json(chatHistory);
});

// app.get('/api/user', (req, res) => {
// 	const sid = req.cookies.sid;
// 	const username = sid ? sessions.getSessionUser(sid) : '';
// 	for (const [key, value] of users) {
// 		if (value == username) {
// 		  res.json((key, value));
// 		}
// 	}

// });

// app.post('api/user', (req, res) => {
// 	const sid = req.cookies.sid;
// 	const username = sid ? sessions.getSessionUser(sid) : '';
//     users[uuid()] = username;
// });

// app.delete('api/user', (req, res) => {
// 	const sid = req.cookies.sid;
// 	const username = sid ? sessions.getSessionUser(sid) : '';

// 	for (const [key, value] of users) {
// 		if (value == username) {
// 			users.delete(key);
// 		}
// 	}
// })

// app.get('api/allusers', (req, res) => {
// 	const sid = req.cookies.sid;
// 	const username = sid ? sessions.getSessionUser(sid) : '';

// 	console.log(users);
// 	res.json(users);
// })

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));