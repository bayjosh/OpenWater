import "./AirWeather.css";
import Moment from "react-moment";
import React, { Component } from "react";
import API from "../../utils/API";

class AirWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AirWeather: []
    };
  }


  getWeather = () => {
    let zip = this.props.zipCode
    API.getLocation(zip).then(res => {
      return res.data[0].ParentCity.Key
    })
      .then(result => {
        API.getWeather(result).then(res => {
          this.setState({ AirWeather: res.data.DailyForecasts });
        });
      }
      )
  }

  render() {
    return (
      <div className="airWeather" style={{ width: `100%`, display: `flex`, flexWrap: `wrap`, flexDirection: `row`, justifyContent: `center` }}>
        <button
          className="waves-effect waves-light btn"
          onClick={this.getWeather}
          style={{
            textAlign: `center`,
            backgroundColor: `white`,
            color: `black`,
            marginBottom: `25px`
          }}>Scrape Weather</button>
        <div id="air-weather-container" style={{
          display: `flex`, flexWrap: `wrap`, justifyContent: `space-evenly`, width: `100%`, flexDirection: `row`
        }}>
          <div id="weather-container" style={{ display: `flex`, flexWrap: `wrap`, justifyContent: `space-evenly`, width: `100%`, flexDirection: `row` }}>
          {this.state.AirWeather.map((el, i) =>
            <div key={i} style={{ color: `black`, width: `35%`, border: `white 1px solid`, marginBottom: `8px`, borderRadius: `25px`, textAlign: `center` }}>
                {i===0 ?
                  <h4><strong>Today</strong></h4> : i === 1 ?
                    <h4><strong>Tomorrow</strong></h4> : <h4><strong><Moment format='dddd'>{el.Date}</Moment></strong></h4>} 
                <hr/>
                <h6><strong>{el.Temperature.Maximum.Value}°F</strong></h6>
                <p>{el.Temperature.Minimum.Value}°F</p>
                <h6><strong>During the day:</strong></h6> 
              {el.Day.Icon.toString().length === 1 ?
                <img src={`https://developer.accuweather.com/sites/default/files/0${el.Day.Icon}-s.png`} />
                :
                <img src={`https://developer.accuweather.com/sites/default/files/${el.Day.Icon}-s.png`} />
              }
                <p>{el.Day.IconPhrase}</p>
                <h6><strong>At night:</strong></h6> 
              {el.Night.Icon.toString().length === 1 ?
                <img src={`https://developer.accuweather.com/sites/default/files/0${el.Night.Icon}-s.png`} />
                :
                <img src={`https://developer.accuweather.com/sites/default/files/${el.Night.Icon}-s.png`} />
              }
                <p>{el.Night.IconPhrase}</p>
            </div>
            
  )}</div>
      </div>
      </div >
    )
  }

}
export default AirWeather;
