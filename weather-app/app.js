//HOW TO MAKE HTTP REQUESTS
const request = require('request');

//REQUEST TO GET WEATHER INFO from darksky api
// const url = 'https://api.darksky.net/forecast/8ce44cf573f77471fab28f604c18e783/37.8267,-122.4233?units=si';
// request({url: url, json : true}, (error, response)=>{
//     if (error){
//         console.log("There was an error : " + error);
//     } else if (response.body.error) {
//         console.log("an error occured!!!");
//     } else {
//         console.log("It is currently " + response.body.currently.temperature + " degrees outside. There is " + response.body.currently.precipProbability + "% chance to rain");
//         console.log("Today's summary is : " + response.body.daily.data[0].summary);
//     }
// });

//REQUEST TO GET LATITUDE AND LONGITUDE OF A LOCATION from mapbox api
// const locUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1IjoidGVkYmFzZW1lbnQiLCJhIjoiY2s3dGY3dWd1MHdvYzNlb3ViY3IydTZ1MyJ9.1z28YB8RnKBORKmQ4wrqUA";
// request({url: locUrl, json : true}, (error, response2)=>{
//     if (error){
//         console.log("There was an error : " + error);
//     } else if (response2.body.features.length === 0){       
//         console.log("an error occured!!!");
//     } else {
//         console.log("The latitude is : " + response2.body.features[0].center[1] + " and longitude is " + response2.body.features[0].center[0]);
//         }
//     }
// );

//REFACTORING USING CALLBACKS
const geoLocation = require('./utils/geocode');
const forecast = require('./utils/forecast');

// geoLocation('Philadelphia',(error,data) =>{
//     console.log(data);
// });

// forecast(40.0115,-75.1327,(error,data) =>{
//     console.log(data);
// });

//CHAINING OUR CALLBACKS

// We have to take the city name from the user as input
const address = process.argv[2];
if (!address){
    console.log("Please enter an address");
} else {
    geoLocation(address, (error,data) =>{
        if (error){
            return console.log(error);
        }
    
        forecast(data.latitude,data.longitude,(error,data2) =>{
            if (error){
                return console.log(error);
            }
    
            console.log(data.location);
            console.log("The temperature is " + data2.temperature);
        });
    });
}


