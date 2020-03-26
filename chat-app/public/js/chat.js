const socket = io();

//Receiving from server to client

socket.on('message', (message) => {
    console.log(message);
});

//Sending from client to server

document.querySelector('form').addEventListener('submit', (e) => {
    const message = document.querySelector('#messageText');
    socket.emit('sendMessage', message.value, () => {
        console.log('The message was delivered');
    });
    e.preventDefault(); 
});

//Retrieving location
document.querySelector('#locationBtn').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }, () => {
            console.log('Location shared!');
        });
    });
});