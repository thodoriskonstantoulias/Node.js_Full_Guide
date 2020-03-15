//HOW TO MAKE HTTP REQUESTS
const request = require('request');

//REQUEST TO GET WEATHER INFO from darksky api
const url = 'https://api.darksky.net/forecast/8ce44cf573f77471fab28f604c18e783/37.8267,-122.4233?units=si';
request({url: url, json : true}, (error, response)=>{
    console.log("It is currently " + response.body.currently.temperature + " degrees outside. There is " + response.body.currently.precipProbability + "% chance to rain");
    console.log("Today's summary is : " + response.body.daily.data[0].summary);
});

//REQUEST TO GET LATITUDE AND LONGITUDE OF A LOCATION from mapbox api
const locUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGVkYmFzZW1lbnQiLCJhIjoiY2s3dGY3dWd1MHdvYzNlb3ViY3IydTZ1MyJ9.1z28YB8RnKBORKmQ4wrqUA";
request({url: locUrl, json : true}, (error, response2)=>{
    console.log("The latitude is : " + response2.body.features[0].center[1] + " and longitude is " + response2.body.features[0].center[0]);
});