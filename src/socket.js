
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
    grouproom=room.substr(0,room.length - 6)
    caller.push(socket.id);
    }
    else if (room.substr(room.length - 6) == 'callee') {
    socket.join(room);
    grouproom=room.substr(0,room.length - 6)
    callee.push(socket.id);
    }
    else {
    console.log(room)
    throw new Error('Neither Caller and Callee');
    }
    console.log(socket.id, 'is', room);
});

socket.on('offer', (data) => {
    console.log('Offer', data.offer != null );
    //console.log('roomoffer',grouproom.concat('callee') );
    io.to(grouproom.concat('callee')).emit('offer', data.offer);
    io.to(grouproom.concat('caller')).emit('offer', data.offer);
});

socket.on('answer', (data) => {
    console.log('Answer', data.answer!=null);
    //console.log('roomanswer', grouproom.concat('caller'));
    io.to(grouproom.concat('caller')).emit('answer', data.answer);
    io.to(grouproom.concat('callee')).emit('answer', data.answer);
});

socket.on('candidate', (data) => {
    
    if (caller.includes(socket.id) == true) {
        console.log('Callerroom', data.candidate != null );
        //console.log('roomcacaller', grouproom.concat('callee'));
        io.to(grouproom.concat('callee')).emit('candidate', data.candidate);
    }
    else if (callee.includes(socket.id) == true) {
        console.log('Calleeeroom', data.candidate != null );
        //console.log('roomcacallee', grouproom.concat('caller'));
        io.to(grouproom.concat('caller')).emit('candidate', data.candidate);
    }
});

socket.on('disconnect', () => {
    console.log('Socket Disconnected', socket.id);
});
});

http.listen(8000, function () {
    console.log('listening on *:8000');
});
