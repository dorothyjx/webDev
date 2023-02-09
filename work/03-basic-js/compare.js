"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY
  // initialize 
  const count = [0];
  const listA = new Array(26).fill(0);
  const listB = new Array(26).fill(0);

  for (let i in word) {
    const codeWord = word[i].toLowerCase().charCodeAt(0) - 97;
    listA[codeWord] += 1; 
  }
  
  for (let i in guess) {
    const codeGuess = guess[i].toLowerCase().charCodeAt(0) - 97;
    listB[codeGuess] += 1;
  }

  for (let i = 0; i < listA.length; i++) {
    const num = Math.min(listA[i], listB[i]);
    count[0] += num;
  }

  return count[0]; 
}