const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const urlWeatherstack = 'http://api.weatherstack.com/current?access_key=3160d2421ac1c5a0fdd9f01d169e6326&query='+latitude+','+longitude

    request({url: urlWeatherstack, json: true}, (error, response) => {

      //  console.log(response.body)

        if(error)
            callback('Unable to connect to weather service!', undefined)
        else if(response.body.length === 0) // this condition can be improved
            callback('Unable to find location.', undefined)
        else{
            callback(undefined, {
                description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}

module.exports = forecast