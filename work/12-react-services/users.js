const users = {};

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function getUserData(username) {
  return users[username];
}

function addUserData(username, userData) {
  users[username] = userData;
}

function isValidWord(word) {
	let isValid = true;
	isValid = isValid && word.match(/^[A-Za-z]*$/);
	return isValid;
}

module.exports = {
  isValid,
  isValidWord,
  getUserData,
  addUserData,
};