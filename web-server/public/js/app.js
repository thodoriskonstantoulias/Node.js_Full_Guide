

//Manipulate DOM - call our API when user submits the form
const form = document.querySelector('form');
const search = document.querySelector('input');

form.addEventListener('submit', (e)=>{
    const address = search.value;

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error){
                console.log(data.error);
            } else {
                console.log(data.location, data.forecast);
            }
        });
    }); 
    
    e.preventDefault();
});