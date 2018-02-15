'use strict'
var		userChoice,
			gameStarted = false,
			lettersChosen = [],
			letterTypeChosen,
			socket = io();

//query selectors
const 	splashScreen = document.querySelector('#splashScreen'),
				gameScreen = document.querySelector('#gameScreen'),
				clock = document.querySelector('#clock'),
				letters = document.querySelector('#letters'),
				vowelButton = document.querySelector('#vowel'),
				consonantButton = document.querySelector('#consonant'),
				startSolo = document.querySelector('#solo'),
				startMulti = document.querySelector('#multi');

//event listeners
startSolo.addEventListener('click', startCountdown);
startMulti.addEventListener('click', startCountdown);

function startCountdown(){
	if(!gameStarted == true){
		gameStarted = true;
		console.log("Why?");
		gameStarted.style.display = 'absolute';
		splashScreen.style.display = 'none';
		vowelButton.addEventListener('click', getVowel);
		consonantButton.addEventListener('click', getConsonant);
		waitForLetters();
	}
}

//XHR to get a vowel from server
function getVowel(){
	var xml = new XMLHttpRequest();
	xml.addEventListener('load', addLetter);
	xml.open('GET', window.location.href + 'letter/Vowel');
	xml.send();
}

//XHR to get a consonant from server
function getConsonant(){
	var xml = new XMLHttpRequest();
	xml.addEventListener('load', addLetter);
	xml.open('GET', window.location.href + 'letter/Consonant');
	xml.send();
}

//add the letter to the list of letters in the game and display it.
function addLetter(){
	var newLetter = this.responseText;
	if (lettersChosen.length != 9){
		lettersChosen.push(newLetter);
		letters.childNodes[lettersChosen.length].innerText = newLetter;
		console.log(lettersChosen)
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
		socket.emit('startClock');
		socket.on('wordResponse', function(data){
			console.log(data);
		});
	}
}
