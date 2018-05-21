import "./NOAAWeather.css";
import React, { Component } from "react";

class NOAAWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastTime: "",
            affectedZones: [],
            headers: [],
            texts: [],
            warning: "",
        };
    }

    componentDidUpdate(prevProps, prevState) {
        //Only load weather if user has clicked somewhere new on the map
        if (this.props.lat !== 0 && prevProps.lat !== this.props.lat) {
            this.loadWeather();
        }
    }

    //Method to change all caps to more legible format
    titleCase = (str) => {
        if (str !== undefined) {
            let splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join(' ');
        } else {
            return str
        }
    }

    //Method to separate applicable marine zones with a divider
    loopMarineZones = (arg) => {
        for (var i = 0; i < this.state.affectedZones.length; i++) {
            if (i !== this.state.affectedZones.length - 1) {
                arg = arg + this.state.affectedZones[i] + " | ";
            } else {
                arg = arg + this.state.affectedZones[i]
            }
        }
        return arg

    }


    //Method to load marine conditions
    loadWeather = () => {
        let latlon = {
            lat: this.props.lat,
            lon: this.props.lon
        }
        //Post request to scrape marine conditions with lat/lon from user click
        return fetch('http://localhost:5000/weatherScrape', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ latlon }),
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    forecastTime: res.forecastTime,
                    affectedZones: res.affectedZones,
                    headers: res.headers,
                    texts: res.texts,
                    warning: res.warning,
                })
                //Set state of forecastTime on DASHBOARD (one level up) to this.state.forecastTime (this level)
                this.props.handleModalLoad(this.state.forecastTime)
            })
    }

    render() {
        let marineZone = ""
        return (
            <div className="NOAAWeather">
                {/* If user has clicked on map, render data. Otherwise display empty div #noMarineData */}
                {this.props.lat !== null ?
                    (<div>
                        <h5 style={{ textAlign: `center` }}>Applicable Marine Zones: </h5>
                        <div style={{textAlign: `center`}}>
                        {this.loopMarineZones(marineZone)}
                        </div>
                        <hr />
                        <h5>WARNINGS</h5>
                        {/* If marine conditions include a warning, display warning */}
                        {this.state.warning === '' ?
                            (<h6>Smooth Sailing! No warnings to report.</h6>) :
                            <h6>{this.state.warning}</h6>
                        }
                        <hr />
                        <p><b>Last updated: </b>{this.state.forecastTime}</p>
                        <div style={{ width: `100%`, display: `flex`, flexWrap: `wrap`, flexDirection: `row`, justifyContent: `center` }}>
                            {/* Map through marine condition headers */}
                            {this.state.headers.map((el, i) => (
                                // If header includes "night", display header along with previous header to pair night and day together
                                el.indexOf("NIGHT") !== -1 ?
                                    <div style={{ border: `black 1px solid`, borderRadius: "25px", overflowWrap: `break-word`, width: `28%`, margin: `1% 1.5%` }} key={i}>
                                        <h4 >
                                            <strong>
                                                {this.titleCase(this.state.headers[i - 1])}
                                            </strong>
                                        </h4>
                                        <p style={{ margin: `4%` }}>
                                            {this.state.texts[i - 1]}
                                        </p>
                                        <h4 >
                                            <strong>
                                                {this.titleCase(this.state.headers[i])}
                                            </strong>
                                        </h4>
                                        <p style={{ margin: `4%` }}>
                                            {this.state.texts[i]}
                                        </p>
                                    </div>
                                    // Otherwise, display empty div #?????
                                    :
                                    i === this.state.headers.length - 2 || i === this.state.headers.length - 1 ?
                                        <div style={{ border: `black 1px solid`, borderRadius: "25px", overflowWrap: `break-word`, width: `28%`, margin: `1% 1.5%` }} key={i}>
                                            <h4 >
                                                <strong>
                                                    {this.titleCase(this.state.headers[i])}
                                                </strong>
                                            </h4>
                                            <p style={{ margin: `4%` }}>
                                                {this.state.texts[i]}
                                            </p>
                                        </div>
                                        
                                        :
                                        <div />
                            ))}
                        </div>
                    </div>)

                    //Empty div #noMarineData
                    : <div id="noMarineData" />}

            </div>
        );
    }
}
export default NOAAWeather;