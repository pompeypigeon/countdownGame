'use strict'

var express = require('express'),
		app = express(),
		fs = require('fs'),
    checkword = require('check-word'),
    words = checkword('en'),
    port = process.env.PORT || 8080,
    server = app.listen(port, function(){
      console.log("server started on " + port)
    });

//serve static html page
app.use(express.static(__dirname + '/pages'));

//check user submitted word against check-word
app.get('/checkword/:word', function(req,res){
	res.send(words.check(req.params.word));
});

//send either vowel or consonant to the client
app.get('/letter/:type', function(req,res){
	res.send(generateLetter(req.params.type));
});

//============================================= FUNCTIONS ============================================

//read letter frequenies from frequency.json
var obj;
fs.readFile('frequency.json', 'utf8', function(err, data) {
	if (err) throw err;
	obj = JSON.parse(data)
});

//generate a random letter
function generateLetter(type) {
	var letter;
	var randNum = Math.round(Math.random() * 1e3) / 1e3
	var vowelValues = Object.entries(obj.Vowels)
	var consonantValues = Object.entries(obj.Consonants)

	//only a Vowel or Consonant can be chosen, no user input will change this.
	if (type == "Vowel") {
		for (var i = 0; i < vowelValues.length; i++) {
			if (randNum < vowelValues[i][1]) {
				letter = vowelValues[i][0]
				return letter;
				break;
			}
		}
	}
	else {
		for (var i = 0; i < consonantValues.length; i++) {
			if (randNum < consonantValues[i][1]) {
				letter = consonantValues[i][0]
				return letter;
				break;
			}
		}
	}
}
