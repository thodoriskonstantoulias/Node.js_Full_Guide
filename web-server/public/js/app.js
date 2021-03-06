

//Manipulate DOM - call our API when user submits the form
const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit', (e)=>{
    const address = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast + data.temperature;
            }
        });
    }); 
    
    e.preventDefault();  
});