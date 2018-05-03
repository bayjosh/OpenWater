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





    loadWeather = () => {
        let latlon = {lat: this.props.lat,
            lon: this.props.lon}
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
        return (
            <div className="NOAAWeather">
                <h5 style={{ textAlign: `center` }}>Applicable Marine Zones: </h5>
                <ul>
                {this.state.affectedZones.map((el, i) => (
                    <li key={i}>
                        {el}
                    </li>
                ))}
                </ul>
                <hr />
                <h5>WARNINGS</h5>
                {this.state.warning === '' ?
                    <h6>Smooth Sailing! No warnings to report.</h6> :
                <h6>{this.state.warning}</h6>
                }
                <hr />

                <p><b>Last updated: </b>{this.state.forecastTime}</p>
                <div>

                    {this.state.headers.map((el, i) => (
                        <div key={i}>
                            <h5 >
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