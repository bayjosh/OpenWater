import "./NOAAWeather.css";
import React, { Component } from "react";

class NOAAWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastTime: "forcastTime",
            zoneNames: ["zoneNames"],
            headers: ["headers"],
            texts: ["texts"],
            warnings: ["warnings"]
        };
    }

    loadWeather = event => {
        event.preventDefault();
        let zip = this.props.zipCode
       return fetch('http://localhost:5000/weatherScrape', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ zip }),
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                this.setState({
                    forecastTime: res.forecastTime,
                    zoneNames: res.zoneNames,
                    headers: res.headers,
                    texts: res.texts,
                    warnings: res.warnings })
            })
    }

    render() {
        return (
            <div className="NOAAWeather">
                <h4 style={{ textAlign: `center` }}>Marine Zones: </h4>{this.state.zoneNames.map((el, i) => (
                    <h4 key={i}>
                    {el}
                    </h4>    
                ))}
                {this.state.forecastTime}
                <button onClick={this.loadWeather}>SCRAPE</button>
                <div>

                    {this.state.headers.map((el, i) => (
                    <div>
                        <h5 key={i}>
                            {el}
                        </h5>
                        <p>
                            {this.state.texts[i]}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        );
    }

}
export default NOAAWeather;