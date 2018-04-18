import "./NOAAWeather.css";
import React, { Component } from "react";

class NOAAWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastTime: "",
            zoneNames: [],
            headers: [],
            texts: [],
            warnings: [],
             SCAheader: "",
            SCAtext: "",
            SCAissued: ""
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
                    warnings: res.warnings,
                    SCAheader: res.SCAheader,
                    SCAtext: res.SCAtext,
                    SCAissued: res.SCAissued
                })
            })
    }

    render() {
        return (
            <div className="NOAAWeather">
                <h5 style={{ textAlign: `center` }}>Marine Zones: </h5>{this.state.zoneNames.map((el, i) => (
                    <h4 key={i}>
                        {el}
                    </h4>
                ))}
                <hr/>
                <h5>WARNINGS</h5>
                  <h6>{this.state.SCAheader}</h6>
                     <p>{this.state.SCAissued}</p>
                   <p> {this.state.SCAtext}</p>
                    <hr/>

                <p>{this.state.forecastTime}</p>
                <button onClick={this.loadWeather}>SCRAPE</button>
                <div>

                    {this.state.headers.map((el, i) => (
                        <div>
                            <h5 key={i}>
                                {el}
                            </h5>
                            <p key={i}>
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