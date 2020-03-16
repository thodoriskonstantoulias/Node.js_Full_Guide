const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/8ce44cf573f77471fab28f604c18e783/' + lat + ',' + long + ' ?units=si';
    request({url: url, json : true}, (error, response)=>{
        if (error){
            callback("There was an error");
        } else if (response.body.error) {
            callback("An error occured!!!");
        } else {
            callback(undefined, {
                temperature : response.body.currently.temperature,
                rainPos : response.body.currently.precipProbability,
                summary : response.body.daily.data[0].summary
            })
        }
    });
}

module.exports = forecast;