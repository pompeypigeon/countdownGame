const 	consonants = "BBCCCDDDDDDFFGGGHHJKLLLLLMMMMNNNNNNNNPPPPQRRRRRRRRRSSSSSSSSSTTTTTTTTTVWXYZ",
		vowels = "AAAAAAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEIIIIIIIIIIIIIOOOOOOOOOOOOOUUUUU",
		lettersChosen = [];

//query selectors
const 	selectVowel = document.querySelector('#vowel'),
		selectConsonant = document.querySelector('#consonant');

//event listeners
selectVowel.addEventListener('click', drawVowel);
selectConsonant.addEventListener('click', drawConsonant);

function drawConsonant(){
	lettersChosen.push(consonants.charAt(Math.floor(Math.random() * consonants.length)));
	console.log(lettersChosen);
	
}

function drawVowel(){
	lettersChosen.push(vowels.charAt(Math.floor(Math.random() * vowels.length)));
	console.log(lettersChosen);
}