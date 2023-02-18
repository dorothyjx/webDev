const words = require('./words');

const users = {
	generateUser: function(username) {
		users[username] = {
			rst: getAWord(words),
			status: "",
			guessedList: {},
			score: 0,
		}
	},

	newGameUser: function(username) {
		users[username] = {
			rst: getAWord(words),
			status: "",
			guessedList: {},
			score: 0,
		}
	}
};

const getAWord = (words) => {
	return words[Math.floor(Math.random() * words.length)].toLowerCase();
}

module.exports = users;