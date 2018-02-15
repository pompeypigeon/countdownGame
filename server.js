'use strict'

var	fs = require('fs'),
		express = require('express'),
		app = express(),
		http = require('http').Server(app),
		io = require('socket.io')(http),
		checkword = require('check-word'),
		words = checkword('en'),
		Stopwatch = require('timer-stopwatch');

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
    socket.on('clientTest', function(data) {
        console.log(data);
        console.log(words.check(data.toLowerCase()));
        socket.emit('wordResponse', 'Your word is ' + words.check(data.toLowerCase()));
        //socket.send('Your word is ' + words.check(data.toLowerCase()));
    })
    socket.on('startClock', function(){
        var timer = new Stopwatch(30000);
        timer.start();
        timer.onTime(function(time){
            console.log(time.ms);
            io.sockets.emit('timeLeft','Time left: ' + time.ms);
        })
        timer.onDone(function(){
            console.log('Done');
            socket.emit('Time is up');
        })
    })
    
    
    socket.on('letterRequest', function(data){
        var letter = generateLetter(data);
        console.log(letter);
        
        if(data == "Vowel"){
            io.sockets.emit('letterResponse',letter);
        }
        else{
            io.sockets.emit('letterResponse2',letter);
        }
        
    })
    
    
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
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
