//HOW TO MAKE HTTP REQUESTS
const request = require('request');

const url = 'https://api.darksky.net/forecast/yourapihere/37.8267,-122.4233?units=si';
request({url: url, json : true}, (error, response)=>{
    console.log("It is currently " + response.body.currently.temperature + " degrees outside. There is " + response.body.currently.precipProbability + "% chance to rain");
    console.log("Today's summary is : " + response.body.daily.data[0].summary);
});