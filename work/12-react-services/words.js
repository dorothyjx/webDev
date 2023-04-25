const uuid = require('uuid').v4;

// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function makeWordList() {
	// These are hardcoded initial state when we restart the server
	const wordList = {};
	let word = {
	  // The below syntax lets you use a variable value as the key
	  // if the value of id1 is "asdf", the property is "asdf", not "id1"
	};
  
	wordList.contains = function contains(id) {
	  // This !! syntax coerces the value to a boolean
	  // First by giving us the reverse of the truthy/falsy value,
	  // then by reversing it to true/false
	  return !!word[id];
	};
  
	wordList.getWords = function getWords() {
	  return word;
	};
  
	wordList.addWord = function addWord(newword) {
	  const id = uuid();
	  if (isValidWord(newword)) {
		word = { id, newword };
		console.log("#30 in words.js", word)
		return word.id;
	  }
	  
	};

	return wordList;
};

function isValidWord(word) {
	let isValid = true;
	isValid = isValid && word.match(/^[A-Za-z]*$/);
	return isValid;
}
  
module.exports = {
	makeWordList,
};