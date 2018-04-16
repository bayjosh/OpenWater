import "./AirWeather.css";
import React, { Component } from "react";
import API from "../../utils/API";

class AirWeather extends Component {
  constructor() {
    super();
    this.state = {
      AirWeather: []
    };
  }

  submitWeather = event => {
    event.preventDefault();
    API.getWeather().then(res => {
      console.log(res.data.DailyForecasts);
      this.setState({ AirWeather: res.data.DailyForecasts });
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
      <div className="airWeather" style={{ width: `100%`, display: `flex`, flexWrap: `wrap`, flexDirection: `row`, justifyContent: `center` }}>
        <button
          className="waves-effect waves-light btn"
          onClick={this.submitWeather}
          style={{
            textAlign: `center`,
            backgroundColor: `white`,
            color: `black`,
            marginBottom: `25px`
          }}>Scrape Weather</button>
        <div id="air-weather-container" style={{
          display: `flex`, flexWrap: `wrap`, justifyContent: `space-evenly`, width: `100%`, flexDirection: `row`
        }}>
          {this.state.AirWeather.map((el, i) => (
            <div>
              <h5>{el.Date}</h5>
              <h5>High: {el.Temperature.Maximum.Value}</h5>
              <h5>Low: {el.Temperature.Minimum.Value}</h5>
              <h5>Day: {el.Day.IconPhrase}</h5>
              {el.Day.Icon.toString().length === 1 ?
                <img src={`https://developer.accuweather.com/sites/default/files/0${el.Day.Icon}-s.png`} />
                :
                <img src={`https://developer.accuweather.com/sites/default/files/${el.Day.Icon}-s.png`} />
              }
              <h5>Night: {el.Night.IconPhrase}</h5>
              {el.Night.Icon.toString().length === 1 ?
                <img src={`https://developer.accuweather.com/sites/default/files/0${el.Night.Icon}-s.png`} />
                :
                <img src={`https://developer.accuweather.com/sites/default/files/${el.Night.Icon}-s.png`} />
              }
            </div>
          ))}
        </div>
      </div>
    )
  }

}
export default AirWeather;
