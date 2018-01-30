const 	consonants = "BBCCCDDDDDDFFGGGHHJKLLLLLMMMMNNNNNNNNPPPPQRRRRRRRRRSSSSSSSSSTTTTTTTTTVWXYZ",
				vowels = "AAAAAAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEIIIIIIIIIIIIIOOOOOOOOOOOOOUUUUU",
				lettersChosen = [];

var		gameStarted = false,
			letterTypeChosen = "V";

//query selectors
const 	clock = document.querySelector('#clock'),
				letters = document.querySelector('#letters'),
				startGame = document.querySelector('#startGame'),
				vowelButton = document.querySelector('#vowel'),
				consonantButton = document.querySelector('#consonant');


//event listeners
startGame.addEventListener('click', startCountdown);

function sendVowel(){
	letterTypeChosen = "V";
	vowels.charAt(Math.floor(Math.random() * vowels.length));
	console.log(letterTypeChosen);
}

function sendConsonant(){
	letterTypeChosen = "C";
	consonants.charAt(Math.floor(Math.random() * consonants.length));
	console.log(letterTypeChosen);
}

var userChoice;

function startCountdown(){
	if(!gameStarted == true){
		//make buttons available
		console.log("Game started");



		for(var i = 0; lettersChosen.length > 10; i++){
			vowelButton.addEventListener('click', sendVowel);
			consonantButton.addEventListener('click', sendConsonant);
			switch(letterTypeChosen){
				case "V":
					console.log("Ah");
					break;
				case "C":
					console.log("Be");
					break;
			}
		}
	/*	while(lettersChosen.length < 9){
			console.log("Entered while")
		}*/



		/*var chosen = 1, nextLetter;
		for(chosen = 1; chosen < 10; chosen++){
			var choice = prompt("Please choose a V for vowel or C for consonant", "").toUpperCase();
			switch (choice){
				case "V":
					nextLetter = vowels.charAt(Math.floor(Math.random() * vowels.length));
					lettersChosen.push(nextLetter);
					letters.childNodes[chosen].innerText = nextLetter;
					break;
				case "C":
					nextLetter = consonants.charAt(Math.floor(Math.random() * consonants.length));
					lettersChosen.push(nextLetter);
					letters.childNodes[chosen].innerText = nextLetter;
					break;
			}
			console.log(nextLetter, lettersChosen);
			letters.childNodes[chosen].innerText = nextLetter;
			nextLetter = "";
		}

	} else {
		alert("Game already started");
	}
	*/
}};
