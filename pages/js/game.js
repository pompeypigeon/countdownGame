'use strict'
var		gameID = Math.floor(Math.random()*100000000), //just an unique game ID for every round played on a single session
			gameStarted = false,
			lettersChosen = [],
			lettersChosenString = "",
			socket = io(),
			time,
			totalScore = 0,
			enteredLetters = [], // letters which client has entered
			letterPool = []; //clone array of letters chosen for validation

//query selectors
const 	splashScreen = document.querySelector('#splashScreen'),
				gameScreen = document.querySelector('#gameScreen'),
				clock = document.querySelector('#clock'),
				letters = document.querySelector('#letters'),
				vowelButton = document.querySelector('#vowel'),
				consonantButton = document.querySelector('#consonant'),
				wasItRight = document.querySelector('#wasItRight'),
				playerWord = document.querySelector('#playerWord'),
				startAgainButton = document.querySelector('#startAgain');

socket.on('timeLeft', function(data){
	time = data;
	document.getElementById('timeLeft').innerHTML = data;
})

function startCountdown(){
	if(!gameStarted == true){
		startAgainButton.style.visibility = 'hidden';
		gameStarted = true;
		vowelButton.addEventListener('click', getVowel);
		consonantButton.addEventListener('click', getConsonant);
		waitForLetters();
	}
}

//socket to get a vowel from server
function getVowel(){
    socket.emit('letterRequest', 'Vowel');
}

//socket to get a consonant from server
function getConsonant(){
    socket.emit('letterRequest', 'Consonant');
}

//add the letter to the list of letters in the game and display it.
socket.on('letterResponse', function(data){
  if (lettersChosen.length != 9){
		lettersChosenString += data;
		lettersChosen.push(data);
		letterPool.push(data)
		letters.childNodes[lettersChosen.length].innerText = data;
		//console.log(lettersChosen)
	} else {
		console.log("Too many letters, game should start")
	}
})

function waitForLetters(){
	if (lettersChosen.length != 9){
		setTimeout(waitForLetters, 500);
		//console.log("Not there")
		return;
	} else {
		socket.emit('startClock');
		waitForCountdown();
	}
}

function waitForCountdown(){
	if (time!= 0){
		setTimeout(waitForCountdown, 100);
		return
	} else {
		socket.emit('wordValidity', playerWord.value)
		socket.emit('addStats', gameID, lettersChosenString, playerWord.value);
		socket.on('wordResponse', function(data){
			var validWord = 0;
			var lettersString = "";
			if (data === true){
				wasItRight.innerHTML = "Correct word, you have scored " + playerWord.value.length + " points!";
				validWord = 1;
				totalScore += playerWord.value.length;
			} else {
				wasItRight.innerHTML = "Wrong, you get nothing!"
				validWord = 0;
			}
			startAgainButton.style.visibility = 'visible';
			startAgainButton.addEventListener('click', playAgain);
			document.querySelector('#p1').innerHTML = totalScore;
			gameStarted = false;
		});
	}
}

//validate user input test function
function validAnswer(e) {
		var inputValue = document.getElementById('playerWord')
		/*loop through enteredLetters
		If a letter is in enteredLetters but not in inputValue
		add letter to letterPool
		This allows letters to be recycled
		This section has to go first to avoid losing letters from backspace
		*/
		for (var letter in enteredLetters) {
			//console.log("for loop run: " + enteredLetters )
			if (!(letter in inputValue.value.split(""))) {
				//console.log("if statement run, letter pool is: " + letterPool)
				letterPool.push(enteredLetters[letter])
				enteredLetters.splice(letter, 1)
			}
		}
		/*
		Allow characters found in the letterPool, clone of lettersChosen to be modified
		Block other characters except backspace
		*/
		if (letterPool.indexOf(String.fromCharCode(event.keyCode)) >= 0 || e.which === 8) {
			//allow backspace
			if (!(e.which === 8)) {
				//console.log("letter valid")
				//add letter to array
				enteredLetters.push(String.fromCharCode(event.keyCode))
				//console.log('entered letters: ' + enteredLetters)
				//remove letter entered from letter pool
				letterPool.splice(letterPool.indexOf(String.fromCharCode(event.keyCode)), 1)
				return true;
			}
		} else {
			//console.log("letter invalid, removing")
			return false;
		}
}

function playAgain(){
	lettersChosen = [];
	letterPool = [];
	enteredLetters = [];
	lettersChosenString = "";
	wasItRight.innerHTML = "";
	letters.childNodes[1].innerText = "";
	letters.childNodes[2].innerText = "";
	letters.childNodes[3].innerText = "";
	letters.childNodes[4].innerText = "";
	letters.childNodes[5].innerText = "";
	letters.childNodes[6].innerText = "";
	letters.childNodes[7].innerText = "";
	letters.childNodes[8].innerText = "";
	letters.childNodes[9].innerText = "";
	playerWord.value = "";
	time = 30;
	startCountdown();
}

document.querySelector('#roomID').innerHTML = gameID;
document.querySelector('#p1').innerHTML = totalScore;
startCountdown();
