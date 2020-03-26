//Here we will create our real time chat app
const express = require('express');
const http = require('http');
const path = require('path');

const messageObj = require('./utils/messages');

//Load library responsible for web socket 
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

//How to serve static files 
app.use(express.static(path.join(__dirname, '../public')));

//Test socket - change in client too to work

io.on('connection', (socket) => {
    console.log('New Web socket connection');

    //Send from server - emit

    socket.emit('message', messageObj.generateMessage('Welcome'));

    //Brodcast - Send to all clients except for the current one 
    socket.broadcast.emit('message', messageObj.generateMessage('A new user has joined!'));

    //Receive from client - on

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', messageObj.generateMessage(message));
        callback();
    }); 

    //Receive location from client
    socket.on('sendLocation', (coords, callback) => {
        const location = 'https://google.com/maps?q=' + coords.latitude + ',' + coords.longitude;
        io.emit('locationMessage', location);
        callback();
    }); 

    //Send message when someone disconnects
    socket.on('disconnect', () => {
        io.emit('message', messageObj.generateMessage('A user disconnected'));
    });
});

server.listen(port, () => {
    console.log('Listening to port ' + port);
}); 