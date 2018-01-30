/*const	express = 	require('express'),
			db = 				require('./db'),
			app = 			express(),
			server = 		require('http').Server(app),
			io = 				require('socket.io').listen(server),
			port = 			process.env.PORT || 8080;

server.listen(8080, function(){
	console.log("On port 8080");
});
console.log("server running");

app.use(express.static(__dirname + '/pages'));

app.get('/', function(req,res){
	res.sendFile(__dirname, "/pages/index.html");
});*/

'use strict'

var express = require('express'),
		app = express(),
    db = require('./db'),
    port = process.env.PORT || 8000,
    server = app.listen(port, function(){
      console.log("server started on " + port)
    });
