const 	consonants = "BBCCCDDDDDDFFGGGHHJKLLLLLMMMMNNNNNNNNPPPPQRRRRRRRRRSSSSSSSSSTTTTTTTTTVWXYZ",
				vowels = "AAAAAAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEIIIIIIIIIIIIIOOOOOOOOOOOOOUUUUU",
				lettersChosen = [];

var		gameStarted = false,
			letterTypeChosen;

//query selectors
const 	clock = document.querySelector('#clock'),
				letters = document.querySelector('#letters'),
				startGame = document.querySelector('#startGame'),
				vowelButton = document.querySelector('#vowel'),
				consonantButton = document.querySelector('#consonant');


//event listeners
startGame.addEventListener('click', startCountdown);

function addVowel(){
	var newVowel = vowels.charAt(Math.floor(Math.random() * vowels.length));
	if (lettersChosen.length < 9){
		lettersChosen.push(newVowel);
		letters.childNodes[lettersChosen.length].innerText = newVowel;
		console.log(lettersChosen)
	} else {
		console.log("Too many letters, game should start")
	}
}

function addConsonant(){
	var newConsonant = consonants.charAt(Math.floor(Math.random() * consonants.length));
	if (lettersChosen.length < 9){
		lettersChosen.push(newConsonant);
		letters.childNodes[lettersChosen.length].innerText = newConsonant;
		console.log(lettersChosen);
	} else {
		console.log("Too many letters, game should start")
	}
}

function waitForLetters(){
	if (lettersChosen.length != 9){
		setTimeout(waitForLetters, 100);
		console.log("Not there")
		return;
	} else {
		console.log("Start Clock")
	}
}
	

var userChoice;

function startCountdown(){
	if(!gameStarted == true){
		gameStarted = true;
		vowelButton.addEventListener('click', addVowel);
		consonantButton.addEventListener('click', addConsonant);
	
		waitForLetters();

		
	}
}

