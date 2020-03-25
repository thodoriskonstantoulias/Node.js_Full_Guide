const socket = io();

//Receiving from server to client
socket.on('countUpdated', (count) => {
    console.log('The count has been updated with value ' + count);
});

//Sending from client to server
document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment');
});