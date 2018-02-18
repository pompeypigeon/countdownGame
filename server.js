'use strict'

var	fs = require('fs'),
		mysql = require('mysql'),
		express = require('express'),
		app = express(),
		http = require('http').Server(app),
		io = require('socket.io')(http),
		checkword = require('check-word'),
		words = checkword('en'),
		Stopwatch = require('timer-stopwatch'),
		conn = mysql.createConnection({
							host: 'localhost',
							user: 'root',
							password: 'root',
							database: 'cdStats'
});

//connect to mysql db (I know its mysql, not mongo, outta time, deal wid it ;) )
conn.connect(function(err){
	if (err) throw err;
	console.log('DB Connected')
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

//socket stuff
io.on('connection', function(socket){
    console.log('A user connected');
    console.log(Object.keys(io.sockets.sockets).length);

		//ADD DATA TO DB====================================
		socket.on('addStats', function(gameID, letters, word){
			var query = 'insert into Statistic (gameID, lettersChosen, wordEntered)' +
			 'values (' + gameID + ', "' + letters + '", "' + word + '");';
			 conn.query(query, function(err){
				 if (err) throw err;
				 console.log('Data entered, thanks!');
			 })
		})

		//WORD CHECK========================================
    socket.on('wordValidity', function(data) {
        console.log(data);
        console.log(words.check(data.toLowerCase()));
        socket.emit('wordResponse', words.check(data.toLowerCase()));
        //socket.send('Your word is ' + words.check(data.toLowerCase()));
    })

		//CLOCK============================================
    socket.on('startClock', function(){
        var timer = new Stopwatch(30000);
        timer.start();
        timer.onTime(function(time){
            //console.log(time.ms);
            socket.emit('timeLeft', time.ms);
        })
        timer.onDone(function(){
            console.log('Done');
            socket.emit('Time is up');
        })
    })

		//SEND LETTER======================================
    socket.on('letterRequest', function(data){
        var letter = generateLetter(data);
        console.log(letter);
        io.sockets.emit('letterResponse',letter);
    })

		socket.om

		//DISCONNECT=======================================
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
//FUNCTIONS============================================

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
