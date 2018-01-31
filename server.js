'use strict'

var express = require('express'),
		app = express(),
		fs = require('fs'),
    port = process.env.PORT || 8080,

    server = app.listen(port, function(){
      console.log("server started on " + port)
    });


var obj;
fs.readFile('frequency.json', 'utf8', function(err, data) {
	if (err) throw err;
	obj = JSON.parse(data)
	console.log(obj)
	generateLetter(type) //called here so that the data is read before generating a letter - this is a dummy call
});

var type = "Consonant"; //dummy variable for testing before integration

function generateLetter(type) {
	var letter;
	var randNum = Math.round(Math.random() * 1e3) / 1e3
	var vowelValues = Object.entries(obj.Vowels)
	var consonantValues = Object.entries(obj.Consonants)

	if (type == "Vowel") {
		for (var i = 0; i < vowelValues.length; i++) {
			if (randNum < vowelValues[i][1]) {
				letter = vowelValues[i][0]
				console.log("letter is: " + letter)
				break;
			}
		}

	}
	else {
		for (var i = 0; i < consonantValues.length; i++) {
			if (randNum < consonantValues[i][1]) {
				letter = consonantValues[i][0]
				console.log("letter is: " + letter)
				break;
			}
		}
	}
}

// generateLetter(type)
