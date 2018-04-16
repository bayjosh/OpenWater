import "./NOAAWeather.css";
import React, { Component } from "react";

class NOAAWeather extends Component {
    constructor() {
        super();
        this.state = {
            forecasts: [{ header: "hello", text: 'hi' }, { header: "byebye", text: 'bye' }]
        };
    }

    componentDidMount() {

    }
    loadWeather = event => {
        event.preventDefault();
        let lat = 42
        let lon = -87
        fetch('http://localhost:5000/weatherScrape', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ lat, lon }),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({ forecasts: res })
            })
    }

    render() {
        return (
            <div className="NOAAWeather">
                <button onClick={this.loadWeather}>SCRAPE</button>
                <div>

                    {this.state.forecasts.map((el, i) => (<p key={i}>
                        {el.header}: {el.text}
                    </p>))}
                </div>
            </div>
        );
    }

}
export default NOAAWeather;