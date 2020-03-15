//HOW TO MAKE HTTP REQUESTS
const request = require('request');

const url = 'https://api.darksky.net/forecast/8ce44cf573f77471fab28f604c18e783/37.8267,-122.4233';
request({url: url}, (error, response)=>{
    const data = JSON.parse(response.body);
    console.log(data.currently);
});