const request = require('postman-request')

const geocode = (address, callback) => {
    const urlMapbox = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamltYzExIiwiYSI6ImNramo1NmN1ODFkcGMycm1wNzRnenIxMXgifQ.OpVj2Zw1DErMTd0y-9JVbA'
    
    request({url: urlMapbox, json: true}, (error, response) => {

        if (error)
            callback('Unable to connect to location services!', undefined) // 2nd arg is optional
        else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined) // this doesn't seem to work properly, as mapbox always returns something...
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }) // return lat, long and name
        }
    });
}

module.exports = geocode