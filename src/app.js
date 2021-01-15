const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000; // 3000 on my machine or PORT on GoDaddy's server

// define paths for Express
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') // using template engine: npm i hbs 
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'James Crowley'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'James Crowley'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'Please contact me at jamesrobert.crowley@sjsu.edu if you noticed a bug in this program.',
        name: 'James Crowley'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address)
        return res.send({error: 'You must provide an address'})
   
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error)
            return res.send({error})

        forecast( latitude, longitude, (forecastError, forecastData)=> {
            if (forecastError)
                return console.log(forecastError)
            // 'You entered: '+req.query.address +'<br>'+"Weather report for " + data.location + ":" + '<br>' + forecastData.description + '. It is ' + forecastData.temperature + 'C but it feels like it is ' + forecastData.feelslike + 'C'
            res.send({
                address: req.query.address,
                location:location,
                forecast: forecastData
            })
        })
    })
})


// must be below everything
app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: '404',
        name: 'James Crowley',
        errorMessage: 'Help article not found.'
    })})
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'James Crowley',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => console.log(`App listening on port ${port}`));
