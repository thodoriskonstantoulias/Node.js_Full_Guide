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
let count = 0;

io.on('connection', (socket) => {
    console.log('New Web socket connection');
    //Send from server - emit
    socket.emit('countUpdated', count);
    //Receive from client - on
    socket.on('increment', () => {
        count++;
        //socket.emit('countUpdated', count); //With this only the specific connection gets notified
        io.emit('countUpdated', count);  //With io we update every client that is connected to server
    });
});

server.listen(port, () => {
    console.log('Listening to port ' + port);
}); 