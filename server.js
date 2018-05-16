//Dependencies for setting up express server
var express = require("express");
var app = express();

// Sets up the backend server Port
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("App listening on PORT " + port);
});

//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

// Serve the public folder as a static directory
app.use(express.static("public"));

//Allow for detailed logging requests
var logger = require("morgan");
app.use(logger("dev"));

//Allow for login sessions
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({ secret: 'app', cookie: { maxAge: 6 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 } }));
app.use(cookieParser());

// Allow access to req.body
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Dependency to set up Mongoose 
var mongoose = require("mongoose");
var db = require("./models");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// If deployed, use the deployed database. Otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:/openWater_db";

//Dependencies for scraping
var request = require("request")
var cheerio = require('cheerio');
const selector = 'div.row-forecast'

//Global variable to store scraping data
let info = {}
//Post request to scrape marine conditions
app.post('/weatherScrape', function (req, res) {
    const Nightmare = require('nightmare')
    const nightmare = Nightmare({});
    let zoneId = "";
    let lat = req.body.latlon.lat
    let lon = req.body.latlon.lon
    //Convert lat and lon to a marine zone id:
    nightmare
        .goto(`http://marine.weather.gov/MapClick.php?site=LOT&lat=${lat}&lon=${lon}`)
        .click('#seven-day-forecast-body a')
        .wait('.row-forecast .forecast-label b')
        .url()
        .end()
        .then(result => {
            var el = result.split('=')[1].split('#')[0];
            zoneId = el;
            //Use zone id to access marine conditions:
            var URL = `http://www.marineweatherbybluefin.com/reverse-proxy?id=${zoneId}&pro=1&source=aws&uri=offshoreweather/forecast.php`;
            console.log('URL: ' + URL)
            request(URL, function (error, response, html) {
                if (error) throw error
                var $ = cheerio.load(html);
                //Variables to hold marine condition data:
                var warning = "";
                var forecastTime = "";
                var affectedZones = [];
                var headers = [];
                var texts = [];
                //Loop through html sections that are not blank
                $('div.section').each(function (i, element) {
                    if ($(element).find($('p.light')).text() != "") {
                        forecastTime = $(element).find($('p.light')).text()
                        //Add colon to timestamp
                        if (forecastTime.charAt(3) === ' ') {
                            forecastTime = forecastTime.substr(0, 1) + ':' + forecastTime.substr(1)
                        } else {
                            forecastTime = forecastTime.substr(0, 2) + ':' + forecastTime.substr(2)
                        }
                        affectedZones = $(element).find($('p.light')).prev().text().split(', ')
                    }
                    //????????
                    if (forecastTime != undefined) {
                        forecastTime = forecastTime
                    }
                    if (affectedZones != undefined) {
                        affectedZones = affectedZones
                    }
                    if ($(element).hasClass('warning')) {
                        warning = $(element).parent().find($('.warning')).children().text()
                    }
                    if (warning != undefined) {
                        warning = warning
                    }
                    //?????????
                    if ($(element).hasClass('even') || $(element).hasClass('odd')) {
                        var header = $(element).find($('.title')).text()
                        var text = $(element).find($('.title')).next().text()
                        headers.push(header)
                        texts.push(text)
                        if (header === '') {
                            headers.pop(header)
                        }
                        if (text === '') {
                            texts.pop(text)
                        }
                        // we can change those if we want, only to exclude the long typo ones that jen doesnt even look at
                    }
                })
                headers.splice(0, 1)
                texts.splice(0, 1)

                //Create info object with scraped data and send to front end
                info.warning = warning;
                info.affectedZones = affectedZones;
                info.forecastTime = forecastTime;
                info.headers = headers;
                info.texts = texts;
                res.json(info)

            })
        })
        //Check for errors
        .catch(error => {
            console.error('Search failed:', error)
        })
})


//Post request to scrape docking options
app.post('/dockwaScrape', function (req, res) {
    const Nightmare = require('nightmare')
    const nightmare = Nightmare({ typeInterval: 10 })
    //Use lat and lon sent from front-end
    nightmare
        .goto(`https://dockwa.com/search?lat=${req.body.lat}&lon=${req.body.lon}&zoom=8`)
        .wait('div.marina-card')
        .evaluate(() => {
            //Define array for docking cards
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
            //Return array so that result can be sent to front-end
            return marinaCards
        })
        .end()
        .then(result => { res.json(result) })

        //Check for errors
        .catch(error => {
            console.error('Search failed:', error)
        })

})

//Post request to save voyages to database
app.post("/saveVoyage", function (req, res) {
    console.log("req.body:", req.body)
    var voyage = {};
    voyage.name = req.body.name;
    voyage.date = req.body.date;
    voyage.description = req.body.description;
    voyage.fuel = req.body.fuel;
    voyage.mileageStart = req.body.mileageStart;
    voyage.mileageEnd = req.body.mileageEnd;
    voyage.voyageDistance = req.body.voyageDistance;

    //Using Mongoose model, create document within collection of voyages
    db.Voyage.create(voyage)
        .then(function (dbVoyage) {
            res.end();
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Get request to display all saved voyages
app.get("/api/voyages", function (req, res) {
    db.Voyage.find({}, function (error, response) {
        res.send(response);
    });
});

//Get request to scrape and open marine depth chart data in new tab
app.get("/api/charts/:lat/:lon", function (req, res) {
    const Nightmare = require('nightmare')
    const nightmare = Nightmare({ typeInterval: 10 });
    let lat = req.params.lat;
    let lon = req.params.lon;
    nightmare
        .goto('http://www.charts.noaa.gov/InteractiveCatalog/nrnc.shtml')
        .select('#searchDropDown1', 'latlon')
        .type('#searchText1', `${lat},${lon}`)
        .click('#searchButton1')
        .wait(2000)
        .evaluate(() => {
            var URL = document.querySelector('[title="Download/View PDF Version"]').getAttribute('href');
            return URL
        })
        .end()
        .then(result => { res.json(result) })
        .catch(error => {
            console.error('Search failed:', error)
        })
});

//Delete request to remove selected voyage from collection
app.delete("/api/voyages/delete/:id", function (req, res) {
    var _id = req.params.id;
    db.Voyage.remove(
        { _id: _id },
        function (err, removed) {
            res.json(_id);
        }
    );
});



//===========================
//OLD SCRAPE
//===========================

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




//===========================
//OLD SCRAPE
//===========================

// let zip = req.body.zip
    // nightmare
    //     .goto('https://www.wunderground.com/MAR/')
    //     .type('#marineSearch', zip)
    //     .click('[value=Go]')
    //     .wait(('div.content')[1])
    //     .evaluate(() => {
    //         if (document.querySelectorAll('div.title')[1] && document.querySelectorAll('div.title')[1].children[0].textContent == "Small Craft Advisory") {
    //             var SCAheader = "Small Craft Advisory"
    //             var SCAtext = document.querySelectorAll('div.content')[2].textContent
    //             var SCAissued = document.querySelectorAll('div.title')[1].children[1].textContent
    //         } //added small craft advisory only if there is one
    //         var selector = document.querySelectorAll('div.content')[1]
    //         var forecastTime = document.querySelector('[class=title]').textContent
    //         var headers = [];
    //         var warnings = [];
    //         var zoneNames = [];
    //         var texts = [];
    //         for (var i = 0; i < selector.childElementCount; i++) {
    //             if (selector.children[i].tagName == 'H5') {
    //                 headers.push(selector.children[i].textContent);
    //             } else if (selector.children[i].className === "marine-warning") {
    //                 for (var j = 0; j < selector.children[i].childElementCount; j++) {
    //                     warnings.push(selector.children[i].children[j].textContent);
    //                 }
    //             } else if (selector.children[i].className === 'marine-warning-location') {
    //                 zoneNames.push(selector.children[i].textContent);
    //             } else if (selector.children[i].className == "") {
    //                 texts.push(selector.children[i].textContent)
    //             }

    //         }
    //         return { headers, warnings, zoneNames, texts, forecastTime, SCAtext, SCAheader, SCAissued }
    //     })
    //     .end()
    //     .then(result => { res.json(result) })
    //     .catch(error => {
    //         console.error('Search failed:', error)
    //     })

