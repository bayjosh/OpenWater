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


    // componentDidUpdate() {
    //     if (this.props.zipCode !== 0) {
    //         this.loadWeather()
    //     }
    // }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.lat !== 0 && prevProps.lat !== this.props.lat) {
            this.loadWeather();
        }
    }

    titleCase = (str) => {
        if (str !== undefined) {
            let splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                // You do not need to check if i is larger than splitStr length, as your for does that for you
                // Assign it back to the array
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.join(' ');
        } else {
            return str
        }
    }

    loopMarineZones = (arg) => {
        for (var i = 0; i < this.state.affectedZones.length; i++) {
            if (i !== this.state.affectedZones.length - 1) {
                arg.concat(this.state.affectedZones[i]).concat(" | ")
            }
        }
        return arg
    }



    loadWeather = () => {
        let latlon = {
            lat: this.props.lat,
            lon: this.props.lon
        }
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
                console.log(res)
                this.setState({
                    forecastTime: res.forecastTime,
                    affectedZones: res.affectedZones,
                    headers: res.headers,
                    texts: res.texts,
                    warning: res.warning,

                })
                console.log(res.forecastTime)
                this.props.handleModalLoad(this.state.forecastTime)
            })
    }

    render() {
        let marineZone = ""
        return (
            <div className="NOAAWeather">
                {this.props.lat !== null ?
                    <div>
                        <h5 style={{ textAlign: `center` }}>Applicable Marine Zones: </h5>
                        {this.loopMarineZones(marineZone)}
                        <hr />
                        <h5>WARNINGS</h5>
                        {this.state.warning === '' ?
                            <h6>Smooth Sailing! No warnings to report.</h6> :
                            <h6>{this.state.warning}</h6>
                        }
                        <hr />

                        <p><b>Last updated: </b>{this.state.forecastTime}</p>
                        <div style={{ width: `100%`, display: `flex`, flexWrap: `wrap`, flexDirection: `row`, justifyContent: `center` }}>

                            {this.state.headers.map((el, i) => (
                                el.indexOf("NIGHT") !== -1 ?
                                    <div style={{ border: `black 1px solid`, overflowWrap: `break-word`, width: `28%`, margin: `1% 1.5%` }} key={i}>
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
                                    :
                                    <div key={i}>
                                        {/* <h5 >
                                            {el}
                                        </h5>
                                        <p>
                                            {this.state.texts[i]}
                                        </p> */}
                                    </div>

                            ))}
                        </div>
                    </div>
                    : <div />}
            </div>
        );
    }

}
export default NOAAWeather;