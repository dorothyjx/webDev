const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
	const sid = uuid();
	sessions[sid] = {
		username,
	};
	return sid;
}

function getSessionUser(sid) {
  	return sessions[sid]?.username;
}

function deleteSession(sid) {
  	delete sessions[sid];
}

function getAllSessionUsers() {
	console.log("gggg");
	console.log(Object.values(sessions));
	//return Object.keys(sessions).map((sid) => sessions[sid]?.username);
	return Object.values(sessions);
}

module.exports = {
	addSession,
	deleteSession,
	getSessionUser,
	getAllSessionUsers,
};