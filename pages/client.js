const 	consonants = "BBCCCDDDDDDFFGGGHHJKLLLLLMMMMNNNNNNNNPPPPQRRRRRRRRRSSSSSSSSSTTTTTTTTTVWXYZ",
		vowels = "AAAAAAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEIIIIIIIIIIIIIOOOOOOOOOOOOOUUUUU",
		lettersChosen = [];

var		gameStarted = false;

//query selectors
const 	clock = document.querySelector('#clock'),
		letters = document.querySelector('#letters'),
		startGame = document.querySelector('#startGame');


//event listeners
startGame.addEventListener('click', startCountdown);

var userChoice;

function startCountdown(){
	if(!gameStarted == true){
		var chosen = 1, nextLetter;
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
}