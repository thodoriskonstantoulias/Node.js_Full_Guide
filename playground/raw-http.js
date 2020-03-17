//MAKING HTTP REQUESTS WITHOUT A LIBRARY
const https = require('https');

const url = 'https://api.darksky.net/forecast/8ce44cf573f77471fab28f604c18e783/40,-75';

const request = https.request(url, (response) =>{

    let data = '';

    response.on('data', (chunk) =>{
        data = data + chunk.toString(); // Because response returns a buffer
    });

    response.on('end', () =>{
        const body = JSON.parse(data);
        console.log(body);
    });

});

request.on('error', (error) =>{
    console.log(error);
})

request.end();