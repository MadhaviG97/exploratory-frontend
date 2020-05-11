
var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let caller = [];
let callee = [];
let grouproom=''

io.on('connection', (socket) => {
console.log('Socket Connected', socket.id);

socket.on('join', (room) => {
    
    if (room.substr(room.length - 6) == 'caller') {
    socket.join(room);
    grouproom=room
    caller.push(socket.id);
    }
    else if (room.substr(room.length - 6) == 'callee') {
    socket.join(room);
    grouproom=room
    callee.push(socket.id);
    }
    else {
    throw new Error('Neither Caller and Callee');
    }
    console.log(socket.id, 'is', room);
});

socket.on('offer', (offer) => {
    console.log('Offer', offer != null);
    io.sockets.emit('offer', offer);
});

socket.on('answer', (answer) => {
    console.log('Answer', answer != null);
    io.sockets.emit('answer', answer);
});

socket.on('candidate', (candidate) => {
    console.log('Candidate', candidate != null);
    if (caller.includes(socket.id) == true) {
    io.to(grouproom).emit('candidate', candidate);
    }
    else if (callee.includes(socket.id) == true) {
    io.to(grouproom).emit('candidate', candidate);
    }
});

socket.on('disconnect', () => {
    console.log('Socket Disconnected', socket.id);
});
});

http.listen(8000, function () {
    console.log('listening on *:8000');
});
