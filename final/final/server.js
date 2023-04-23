const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const posts = require('./posts');
const sessions = require('./sessions');
const users = require('./users');
const {userData} = require('./userData');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  // Notice here that an existing session will just get back the username
  // So the consumer will need to make an additional service call to get the list of todos
  // But below performing a login (creating a session) will return the list of todos directly
  // I have this difference because these are the sorts of quirks you can expect when you
  // consume services, not because I advocate for this inconsistency
  //
  // Which way is best depends on your service
  // - forcing extra service calls is bad
  // - sending more data than needed is bad
  // Your service specifics decides which is "worse"
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, posts.makePostList());
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).getPosts());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

// Posts
app.get('/api/posts', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  //res.json(users.getUserData(username).getPosts());
  res.json(userData);
});

app.post('/api/posts', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	const { post } = req.body;
	if(!post) {
		res.status(400).json({ error: 'required-post' });
		return;
	}
	//##################
	const id = uuid();
	userData[id] = { 
		id, 
		username: username, 
		post, 
		likes: 0, 
		comments: [] 
	};

  	res.json(userData);
});


// ########### Comments
app.get('/api/comments', (req, res) => {
	  // Session checks for these are very repetitive - a good place to abstract out
	// I've left the repetitive sections here for ease of learning
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	res.json(userData);
})

app.post('/api/posts/:id/comments', (req, res) => {
	console.log("i'm in post comment")
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}
	const postList = users.getUserData(username);
	
	const { id } = req.params;
	const { comment } = req.body;

	if(!comment) {
		res.status(400).json({ error: 'required-comment' });
		return;
	}

	const userId = uuid();
	const preComments = userData[id].comments;

	const newComment = {
		...preComments,
		[userId]: {
			userId: userId,
			username: username,
			comment: comment,
		}
	}
	console.log("newComment,", newComment)
	userData[id] = {
		...userData[id],
		comments: newComment,
	};

	res.json({postId: id, userData});
})

app.get('/api/posts/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const postList = users.getUserData(username);
  const { id } = req.params;
  if(!postList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No post with id ${id}` });
    return;
  }
  res.json(postList.getPost(id));
});

// ####### UPDATE #######
app.patch('/api/posts/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const postList = users.getUserData(username);
    const { id } = req.params;
    const { post, votes } = req.body;
    // Full Replacement required for a PUT
    if (!post) {
        res.status(400).json({ error: 'required-post' });
        return;
    }
    if (!postList.contains(id)) {
        res.status(404).json({ error: `noSuchId`, message: `No post with id ${id}` });
        return;
    }
    postList.updatePost(id, { post, votes });
    const preComments = userData[id].comments;
    userData[id] = {
            ...userData[id],
            comments: preComments.push(comment),
            username: username
        }

    res.json(userData);

});

app.put('/api/posts/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;

  // ####################
  const { post, likes } = req.body;
  if(!userData[id]) {
    res.status(404).json({ error: `noSuchId`, message: `No post with id ${id}` });
    return;
  }

  userData[id] = {
	...userData[id],
	likes: likes,
  }
  res.json(userData[id]);
});


app.delete('/api/posts/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const postList = users.getUserData(username);
  const exists = postList.contains(id);
  if(exists) {
    postList.deletePost(id);
  }
  res.json({ message: exists ? `post ${id} deleted` : `post ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
