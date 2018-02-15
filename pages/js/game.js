'use strict'
var		gameStarted = false,
			lettersChosen = [],
			socket = io(),
			time,
			totalScore = 0;

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

//event listeners

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
		lettersChosen.push(data);
		letters.childNodes[lettersChosen.length].innerText = data;
		console.log(lettersChosen)
	} else {
		console.log("Too many letters, game should start")
	}

        })


function waitForLetters(){
	if (lettersChosen.length != 9){
		setTimeout(waitForLetters, 100);
		console.log("Not there")
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
		socket.emit('wordValidity', document.querySelector('#playerWord').value)
		socket.on('wordResponse', function(data){
			if (data === true){
				wasItRight.innerHTML = "Correct word, you have scored " + playerWord.value.length + " points!"
			} else {
				wasItRight.innerHTML = "Wrong"
			}
			startAgainButton.style.visibility = 'visible';
			startAgainButton.addEventListener('click', playAgain);
			gameStarted = false;
		});
	}
}

function playAgain(){
	lettersChosen = [];
	startCountdown();
	wasItRight.innerHTML = "";
	letters.childNodes[9].innerText = "";
	letters.childNodes[1].innerText = "";
	letters.childNodes[2].innerText = "";
	letters.childNodes[3].innerText = "";
	letters.childNodes[4].innerText = "";
	letters.childNodes[5].innerText = "";
	letters.childNodes[6].innerText = "";
	letters.childNodes[7].innerText = "";
	letters.childNodes[8].innerText = "";
	playerWord.value = "";
	time = 30;
}

startCountdown();
