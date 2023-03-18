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

	res.json({ wasLoggedIn: !!username }); 
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

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));