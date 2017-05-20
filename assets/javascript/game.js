// reset all letters
// Player selects letter check
	// if letter isUsed (in the word) fill in the blank check
	// if notUsed (not in the word) hang a part 
	// After those remove letter from pool, redo this inputcheck

var hangman = {
	// creation of variables
	letters: "abcdefghijklmnopqrstuvwxyz".split(""),
	usedLetters: [],
	words: ["oak", "ash", "hickory", "walnut", "aspen", "pine", "cherry", "balsa", "teak", "beech", "maple", "cedar", "mahogany", "elm"],
	usedWords: [],
	userInput: "",
	currentWord: "",
	currentGuess: [],
	counter: 0,
	totalWins: 0,

	// functions

	// reset letters upon new word
	reset: function(){
		this.usedLetters = [];
		this.counter = 0;
	},

	refresh: function(){
			document.getElementById('word').innerHTML = "<p>" + hangman.currentGuess.join("  ") + "</p>";
			document.getElementById('usedLetters').innerHTML = "<p>" + hangman.usedLetters + "</p>";
			document.getElementById('guess').innerHTML = "<p>" + hangman.counter + "</p>";
			document.getElementById('win').innerHTML = "<p>" + hangman.totalWins + "</p>";
	},

	// random whole number generators
	randomNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	// this displays blanks for the number of letters in the word
	displayWord: function() {
		this.currentGuess = [];
		for (var i=0; i < this.currentWord.length; i++) {
			this.currentGuess.push("_");
		}
	},

	//the guesses counter cant go pass 6 tries more then the length of the current word
	guessLimit: function() {
		if (this.counter == 8) {
			if (confirm("You lost!  The word was " + this.currentWord + " Play again?")) {
				this.newWord()
			}
		}
	},

	// selecting new word
	newWord: function() {
		this.reset();
		var stash = this.randomNumber(0, this.words.length);
		//The && is for making sure you dont use more words then you have
		if (this.words.length != 0 && stash > -1) {
			// reset currentWord
			this.currentWord = ""
			this.usedWords.push(this.words[stash]);
			// assign new currentWord
			this.currentWord = this.words[stash];
			// scraps word that has been used
			this.words.splice(stash, 1);
			this.displayWord();
			//display image hint
			tree.innerHTML = "<img class=\"img imgFormat\" src=\"assets/images/" + this.currentWord + "Tree.jpg\">"
			//display score
			this.refresh()

		}
		else {
			alert("Ran out of words please refresh")
		}
	},

	// move the input key to the usedLetters array and take it out of the letters array
	pushLetter: function() {
		var stash = this.usedLetters.indexOf(this.userInput);
		if (this.currentGuess.indexOf(this.userInput) != -1) {
			//play good music
		}
		else if (stash === -1) {
			this.usedLetters.push(this.userInput);
			this.counter++;
		}
		else {
			alert("You've used that letter before")
		}
	},

	// replace blanks with the correcct letter
	displayLetter: function() {
		for (var i=0; i < this.currentWord.length+1; i++) {
			if (this.userInput===this.currentWord[i]) {
				this.currentGuess[i] = this.userInput;
			}
			else {
			}
		}
		this.pushLetter();
		//guesses increase
		
	},

	// This function is kind of broken  the goal is for when you finish a word it asks if you want to do another word.  If true get new word, else nothing.
	wordDone: function() {
		if (this.currentGuess.indexOf("_") === -1){
			if (confirm("Congrats! want to play again?")) {
				this.totalWins++
				this.newWord();
				}
			}
		
		else {}
	},
};
// checks if DOM ready
document.onload
	hangman.newWord();
// when key hit do this
document.onkeyup = function(event){
	if (event.key == "Enter") {
		hangman.newWord()
		hangman.refresh()
	}
	else if (hangman.letters.indexOf(event.key) === -1){
		alert("Please use a letter key")
	}
	else{
		hangman.userInput = event.key;
		hangman.displayLetter();
		// hangman.userInput = ""; testing to ensure letters are being stored
		hangman.refresh()
		hangman.guessLimit()
		setTimeout(function() { hangman.wordDone(); }, 500);
	}
}