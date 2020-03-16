const request = require('request');

const geoLocation = (address, callback) =>{
    const locUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGVkYmFzZW1lbnQiLCJhIjoiY2s3dGY3dWd1MHdvYzNlb3ViY3IydTZ1MyJ9.1z28YB8RnKBORKmQ4wrqUA";
    request({url: locUrl, json : true}, (error, response2)=>{
        if (error){
            callback("There was an error"); //second argument will be undefined
        } else if (response2.body.features.length === 0){       
            callback("an error occured!!!");
        } else {
            callback(undefined, {
                latitude : response2.body.features[0].center[1],
                longitude : response2.body.features[0].center[0],
                location : response2.body.features[0].place_name
            });
        }
     }
)};

module.exports = geoLocation;