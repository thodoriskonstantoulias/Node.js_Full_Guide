console.log("Printing to client console for testing");

fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error){
            console.log(data.error);
        } else {
            console.log(data.location, data.forecast);
        }
    });
});