// Import the important stuff
var express = require('express');
// var socket = require('socket.io');

// Make it an application
var app = express();

// Listening and server
var server = app.listen(3000);
console.log("Listening...");

// Create an actual socket that is part of ^ server
// IO keeps track of inputs and outputs
// var io = socket(server);

//Host everything in that directory (public)
app.use(express.static('public'));

// Deal with a new connection event.
// io.sockets.on('connection', newConnection);

// function newConnection(socket) {
// 	// New connection gets assign a new id
// 	console.log("new connection" + socket.id);
// 	// console.log(socket);

// 	// If there's a message called mouse, trigger the function.
// 	socket.on('mouse', mouseMsg);

// 	function mouseMsg(data) {
// 		// Call broadcast when a message comes in, and send it back with that data with the same name.
// 		socket.broadcast.emit('mouse', data);

// 		// If I wanted the client that sent the message to also receive that same message. Use the global:
// 		// io.sockets.emit('mouse', data);
// 		console.log(data);
// 	}
// }
