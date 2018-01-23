const	express = 	require('express'),
		app = 		express(),
		server = 	require('http').Server(app),
		io = 		require('socket.io').listen(server),
		port = 		process.env.PORT || 8080;
	
server.listen(8080, function(){
	console.log("On port 8080");
});
console.log("server running");

app.use(express.static(__dirname + '/pages'));

app.get('/', function(req,res){
	res.sendFile(__dirname, "/pages/index.html");
});

io.sockets.on('connection', function(socket){
	console.log("Connected");
	socket.on('send text', function(data){
		console.log(data);
		io.sockets.emit('text', {txt: data});
	});
});
