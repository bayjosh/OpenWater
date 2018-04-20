var express = require("express");
var app = express();
var path = require("path");
var request = require("request")
var cheerio = require('cheerio');
const selector = 'div.row-forecast'

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


app.post('/weatherScrape', function (req, res) {
    const Nightmare = require('nightmare')
    const nightmare = Nightmare({
        typeInterval: 10
    });
    let zip = req.body.zip
    nightmare
        .goto('https://www.wunderground.com/MAR/')
        .type('#marineSearch', zip)
        .click('[value=Go]')
        .wait(('div.content')[1])
        .evaluate(() => {
            if (document.querySelectorAll('div.title')[1] && document.querySelectorAll('div.title')[1].children[0].textContent == "Small Craft Advisory") {
                var SCAheader = "Small Craft Advisory"
                var SCAtext = document.querySelectorAll('div.content')[2].textContent
                var SCAissued = document.querySelectorAll('div.title')[1].children[1].textContent
            } //added small craft advisory only if there is one
            var selector = document.querySelectorAll('div.content')[1]
            var forecastTime = document.querySelector('[class=title]').textContent
            var headers = [];
            var warnings = [];
            var zoneNames = [];
            var texts = [];
            for (var i = 0; i < selector.childElementCount; i++) {
                if (selector.children[i].tagName == 'H5') {
                    headers.push(selector.children[i].textContent);
                } else if (selector.children[i].className === "marine-warning") {
                    for (var j = 0; j < selector.children[i].childElementCount; j++) {
                        warnings.push(selector.children[i].children[j].textContent);
                    }
                } else if (selector.children[i].className === 'marine-warning-location') {
                    zoneNames.push(selector.children[i].textContent);
                } else if (selector.children[i].className == "") {
                    texts.push(selector.children[i].textContent)
                }

            }
            return { headers, warnings, zoneNames, texts, forecastTime, SCAtext, SCAheader, SCAissued }
        })
        .end()
        .then(result => { res.json(result) })
        .catch(error => {
            console.error('Search failed:', error)
        })

})

app.post('/dockwaScrape', function (req, res) {
    const Nightmare = require('nightmare')
    const nightmare = Nightmare({
        typeInterval: 10
    })
    nightmare
        .goto(`https://dockwa.com/search?lat=${req.body.lat}&lon=${req.body.lon}&zoom=8`)
        .wait('div.marina-card')
        .evaluate(() => {
            var marinaCards = []

            for (var i = 0; i < document.querySelector("div.map-marina-list").children[1].childElementCount; i++) {
                var marinaCard = {}
                var marinaSelector = document.querySelectorAll('div.marina-card')[i].children[0]
                var URL = marinaSelector.getAttribute('href')
                var name = marinaSelector.children[0].children[0].children[0].textContent
                var pictureStyle = marinaSelector.getAttribute('style').substring(marinaSelector.getAttribute('style').indexOf('(') + 1, marinaSelector.getAttribute('style').indexOf(')'))
                var price = marinaSelector.children[1].children[0].textContent

                marinaCard.URL = URL
                marinaCard.name = name
                marinaCard.pictureStyle = pictureStyle
                marinaCard.price = price

                marinaCards.push(marinaCard)

            }
            return marinaCards
        })
        .end()
        .then(result => { res.json(result) })
        .catch(error => {
            console.error('Search failed:', error)
        })

})

//     //////////////////////////////////////FIRST DRAFT/////////////////////
//     // let lat = req.body.lat
//     // let lon = req.body.lon;
//     // console.log(lat, lon)
//     // nightmare
//     //     .goto('http://www.nws.noaa.gov/om/marine/point.htm')
//     //     .type('[name=lat]', lat)
//     //     .type('[name=lon]', lon)
//     //     .click('[name=Submit]')
//     //     .wait('#detailed-forecast-body')
//     //     .evaluate(() => {
//     //         var forecasts = [];
//     //         for (var i = 1; i < document.querySelector('#detailed-forecast-body').childElementCount - 2; i++) {
//     //             let forecast = {}
//     //             forecast.header = document.querySelector('#detailed-forecast-body').children[i - 1].children[0].textContent;
//     //             forecast.text = document.querySelector('#detailed-forecast-body').children[i - 1].children[1].textContent;
//     //             forecasts.push(forecast)
//     //         }
//     //         return forecasts
//     //     })
//     //     .end()
//     //     .then(result => res.json(result))
//     //     .catch(error => {
//     //         console.error('Search failed:', error)
//     //     })
//     ////////////////////////////////////////////////////////////////////
//




