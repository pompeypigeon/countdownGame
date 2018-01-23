const 	consonants = "BBCCCDDDDDDFFGGGHHJKLLLLLMMMMNNNNNNNNPPPPQRRRRRRRRRSSSSSSSSSTTTTTTTTTVWXYZ",
		vowels = "AAAAAAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEIIIIIIIIIIIIIOOOOOOOOOOOOOUUUUU",
		lettersChosen = [];

//query selectors
const 	clock = document.querySelector('#clock'),
		letters = document.querySelector('#letters'),
		selectVowel = document.querySelector('#vowel'),
		selectConsonant = document.querySelector('#consonant');

//event listeners
selectVowel.addEventListener('click', drawVowel);
selectConsonant.addEventListener('click', drawConsonant);

function drawConsonant(){
	lettersChosen.push(consonants.charAt(Math.floor(Math.random() * consonants.length)));
}

function drawVowel(){
	lettersChosen.push(vowels.charAt(Math.floor(Math.random() * vowels.length)));
}