const socket = io();

const formEl = document.querySelector('form');
const inputEl = document.querySelector('#messageText');
const btnLocEl = document.querySelector('#locationBtn');
const btnSubEl = document.querySelector('#submitBtn');
const messages = document.querySelector('#messages');

const messagesTemp = document.querySelector('#manage-template').innerHTML;
const locationTemp = document.querySelector('#location-template').innerHTML;

//Receiving from server to client

socket.on('message', (message) => {
    console.log(message);  

    //Render messages to screen
    const html = Mustache.render(messagesTemp, {message});
    messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (location) => {
    console.log(location);  
    const html = Mustache.render(locationTemp, {location});
    messages.insertAdjacentHTML('beforeend', html);
});

//Sending from client to server

formEl.addEventListener('submit', (e) => {
    //Disabe button
    btnSubEl.setAttribute('disabled','disabled');

    const message = document.querySelector('#messageText');
    socket.emit('sendMessage', message.value, () => {
        btnSubEl.removeAttribute('disabled');
        inputEl.value = '';
        inputEl.focus();

        console.log('The message was delivered');
    });
    e.preventDefault(); 
});

//Retrieving location
btnLocEl.addEventListener('click', () => {
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