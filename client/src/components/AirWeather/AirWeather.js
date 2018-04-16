import "./AirWeather.css";
import React, { Component } from "react";
import API from "../../utils/API";

class AirWeather extends Component {
  constructor() {
    super();
    this.state = {
      AirWeather: ""
    };
  }

  submitWeather = event => {
    event.preventDefault();
    API.getWeather().then(res => {
      this.setState({ AirWeather: "hello" });
    });
  };

  //   loadDockwa = event => {
  //     event.preventDefault();
  //     let lat = 41.8781136;
  //     let lon = -87.6297982;
  //     return fetch("http://localhost:5000/dockwaScrape", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ lat, lon })
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         // console.log('line 26 '+res)
  //         this.setState({
  //           DockwaInfo: res
  //         });
  //       });
  //   };

  render() {
    return (
      <div
        className="airWeather"
        style={{
          width: `100%`,
          display: `flex`,
          flexWrap: `wrap`,
          flexDirection: `row`,
          justifyContent: `center`
        }}
      >
        <button
          className="waves-effect waves-light btn"
          onClick={this.submitWeather}
          style={{
            textAlign: `center`,
            backgroundColor: `white`,
            color: `black`,
            marginBottom: `25px`
          }}
        >
          Scrape Weather
        </button>
        <div
          id="air-weather-container"
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-evenly`,
            width: `100%`,
            flexDirection: `row`
          }}
        >
          {this.state.AirWeather}
        </div>
      </div>
    );
  }
}

export default AirWeather;
