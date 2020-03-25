//Here we will create our real time chat app
const express = require('express');
const http = require('http');
const path = require('path');

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

    socket.emit('message', 'Welcome All');

    //Receive from client - on

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    }); 
});

server.listen(port, () => {
    console.log('Listening to port ' + port);
}); 