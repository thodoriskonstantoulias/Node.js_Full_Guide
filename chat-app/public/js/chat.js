const socket = io();

//Receiving from server to client

socket.on('message', (message) => {
    console.log(message);
});

//Sending from client to server

document.querySelector('form').addEventListener('submit', (e) => {
    const message = document.querySelector('#messageText');
    socket.emit('sendMessage', message.value);
    e.preventDefault(); 
});