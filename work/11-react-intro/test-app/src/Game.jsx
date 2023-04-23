import {useState} from 'react';

function Game({user}) {
	const word = "REACT";
	const [guess, setGuess] = useState("");
	const [count, setCount] = useState(0);
	const [msg, setMsg] = useState("");


	const handleClick = (e) => {
		e.preventDefault();
		if(guess.length !== 0) {
			if(guess.length === 5 && guess.match("^[a-zA-Z]+$")){
				
				const num = findMatch(word, guess); 
				setCount(num);

				if(num === 5 && word.toLowerCase() === guess.toLowerCase()) {
					console.log(word.toLowerCase(), guess.toLowerCase())
					setMsg("Congrats! You got the word!");
				} else {
					setMsg("Your guess matches " + num + " letters"); 
				}
			} else {
				setMsg("The word is not Valid");
			}
		} else {
			setMsg("Please enter your word");
		}

		console.log(count)
		setGuess("");
	}

	return (
		<div className='game-card'>
			<h2>User: {user}</h2>
			<h4>Enter a word with 5 letters</h4>

			<form className='game'>
				<label>Enter your word</label>
				<input type="text" value={guess} onInput={(e) => setGuess(e.target.value)}/>
				<button onClick={handleClick}>Guess</button>
			</form>

			<div className='display'>
				<p>{msg}</p>
			</div>
		</div>
	)
}

function findMatch(word, guess) {
	let matches = 0;
		const letters = {};
		for (let c of word.toLowerCase()) {
			if (letters[c]){
				letters[c] += 1;
			} else {
				letters[c] = 1;
			}
		}

		for(let c of guess.toLowerCase()) {
			if(letters[c]) {
				letters[c] -= 1;
				matches += 1
			}
		}
		console.log("### Letter Matches: " + matches);
		return matches;
}

export default Game;