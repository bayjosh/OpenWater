var express = require("express");
var app = express();
var path = require("path");
var request = require("request")
var cheerio = require('cheerio');
const selector = 'div.row-forecast'
const Nightmare = require('nightmare')
const nightmare = Nightmare({
    typeInterval: 10
});
// var nightmare = require('nightmare');
// var db = require("./models");

//Use morgan logger for logging requests
var logger = require("morgan");
app.use(logger("dev"));

// Use body-parser for handling form submissions
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Sets up the backend server Port
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("App listening on PORT " + port);
});

var mongoose = require("mongoose");
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:/openRoad_db";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});



// app.get('/NOAAscrape', function (req, res) {
//     //scrape request

    // var results = [];

app.post('/weatherScrape', function(req, res){
   
    let lat = req.body.lat
    let lon = req.body.lon;
    console.log(lat, lon)
    nightmare
        .goto('http://www.nws.noaa.gov/om/marine/point.htm')
        .type('[name=lat]', lat)
        .type('[name=lon]', lon)
        .click('[name=Submit]')
        .wait('#detailed-forecast-body')
        .evaluate(() => {
            var forecasts = [];
            for (var i = 1; i < document.querySelector('#detailed-forecast-body').childElementCount - 2; i++) {
                let forecast = {}
                forecast.header = document.querySelector('#detailed-forecast-body').children[i - 1].children[0].textContent;
                forecast.text = document.querySelector('#detailed-forecast-body').children[i - 1].children[1].textContent;
                forecasts.push(forecast)
            }
            return forecasts
        })
        .end()
        .then(result => res.json(result))
        .catch(error => {
            console.error('Search failed:', error)
        })
})

    


//     request('http://marine.weather.gov/MapClick.php?lat=' + lat + '&lon=' + lon, function (error, response, html) { 
//         console.log(html)

//             if (error) throw error
//             var $ = cheerio.load(html);
            
//             $('ul#seven-day-forecast-list').each(function (i, element) {
//                 var result = {};
//                 var URL = $(element).find($('a')).attr('href');
//                 console.log(URL)
                
                
//                 result.header = header;
//                 result.text = text;
        
//                 results.push(result) 
//                 console.log(results)
//                 res.send('did it work???');
//             })
           
//         })
    
// })