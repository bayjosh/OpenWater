import React, { Component } from "react";
import DashboardBackground from "../components/DashboardBackground";
// import { Redirect } from "react-router-dom";
import MapComponent from "../components/Map";
import NOAAWeather from "../components/NOAAWeather";
import Dockwa from "../components/Dockwa";
import AirWeather from "../components/AirWeather";
import API from "../utils/API";
import LoadingWheel from "../components/LoadingWheel";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      lat: null,
      lon: null,
      zipCode: null
    };
  }

  // componentDidUpdate() {
  //   if (this.state.lat !== 0) {
  //     this.openDepthChart()
  //   }
  // }


  onChange = (lati, long) => {
    this.setState({ lat: lati, lon: long })
    API.getZipCode(this.state.lat, this.state.lon).then(res => {
      for (var i = 0; i < res.data.results[0].address_components.length; i++) {
        if (res.data.results[0].address_components[i].types[0] === "postal_code") {
          return res.data.results[0].address_components[i].long_name
        }
      }
    })
      .then(result => {
        this.setState({ zipCode: result })
        console.log(this.state.zipCode)
        this.openDepthChart();
      })
  }

  openDepthChart = () => {
    let iframe = document.createElement('iframe')
    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', "90%")
    iframe.setAttribute('src', `http://fishing-app.gpsnauticalcharts.com/i-boating-fishing-web-app/fishing-marine-charts-navigation.html#4.35/${this.state.lat}/${this.state.lon}`)
    iframe.setAttribute('frameborder', '0')
    if (document.getElementById('iframe').children.length === 1) {
      document.getElementById('iframe').removeChild(document.getElementById('iframe').children[0]);
      document.getElementById('iframe').appendChild(iframe)
    } else {
    document.getElementById('iframe').appendChild(iframe)
    }
  }

  render() {
    return (
      <div id="blur-in-background">
        <div>
          <DashboardBackground />
          <div id="header-background"> </div>
          <h1
            style={{
              margin: `0`,
              opacity: `1`,
              textAlign: `center`,
              marginBottom: `40px`,
              padding: `10px 0 10px 0`
            }}
          >
            Dashboard
          </h1>
 
          <LoadingWheel />

          <div className="dashboard">
            <div
              id="weather-map"
              style={{
                display: `flex`,
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `space-evenly`,
                marginBottom: `45px`
              }}
            >
              <div
                id="map-card"
                style={{
                  width: `45vw`,
                  alignSelf: `flex-start`,
                  height: `100vh`,
                  margin: `0`,
                  borderRadius: `25px`,
                  backgroundColor: `rgba(145, 174, 194, 0.952)`
                }}
                className="card darken-1"
              >
                <div className="card-content white-text" style={{ height: `100%` }}>
                  <span className="card-title" style={{ textAlign: `center` }}>
                    <h3>MAP</h3>
                  </span>
                  <hr />
                  {/* <div
                    id="map-card-content"
                    style={{
                      display: `flex`,
                      justifyContent: `center`,
                      alignItems: `center`,
                      marginTop: `20px`
                    }}
                  > */}
                  <MapComponent
                    isMarkerShown={false}
                    onChange={this.onChange}
                  />
                  {/* </div> */}
                  <hr />
                  <button className="activator">Depth Chart</button>
                </div>
                <div style={{
                  backgroundColor: `rgba(145, 174, 194, 0.952)`
                }} className="card-reveal">
                  <span className="card-title"><i className="right">Back to Map</i></span>
                  <div style={{ textAlign: `center`, color: `white` }} id="real-title">Depth Chart</div>
                  <hr />
                  <div style={{ height: `100%` }} id='iframe'></div>
                </div>
              </div>
              <div
                style={{
                  display: `flex`,
                  width: `45vw`,
                  flexWrap: `wrap`
                }}
              >
                <div
                  id="weather"
                  style={{
                    width: `45vw`,
                    alignSelf: `flex-start`,
                    margin: `0`,
                    borderRadius: `25px`,
                    height: `100%`,
                    backgroundColor: `rgba(145, 174, 194, 0.952)`
                  }}
                  className="card darken-1"
                >
                  <div className="card-content white-text">
                    <span
                      className="card-title"
                      style={{ textAlign: `center`, color: `white` }}
                    >
                      <h3>MARINE FORECAST</h3>
                    </span>{" "}
                    <hr />
                    <NOAAWeather zipCode={this.state.zipCode} />
                  </div>
                </div>

                {/* <span>
                  <button
                    className="btn waves-effect waves-light"
                    style={{ width: `42vh`, margin: `0 10px 0 20px` }}
                  >
                    Make a Log
                  </button>
                </span>
                <span>
                  <button
                    style={{ width: `42vh` }}
                    className="btn waves-effect waves-light"
                  >
                    View Logs
                  </button>
                </span> */}
              </div>
            </div>

            <div
              id="air-weather"
              style={{
                width: `100%`,
                alignSelf: `flex-start`,
                margin: `10px`,
                borderRadius: `25px`,
                height: `100%`,
                backgroundColor: `rgba(145, 174, 194, 0.952)`
              }}
              className="card darken-1"
            >
              <div className="card-content white-text">
                <span
                  className="card-title"
                  style={{ textAlign: `center`, color: `white` }}
                >
                  <h3>WEATHER FORECAST</h3>
                </span>{" "}
                <hr />
                <AirWeather zipCode={this.state.zipCode} />
              </div>
            </div>

            <div id="docking-area">
              <h3 style={{ color: `white`, padding: `35px 0 20px 0` }}>
                DOCKING OPTIONS
              </h3>
              <hr />
              <div
                id="Dockwa"
                style={{
                  width: `100%`,
                  alignSelf: `flex-start`,
                  margin: `0`,
                  borderRadius: `25px`,
                  justifyContent: `center`
                }}
              >
                <Dockwa lat={this.state.lat} lon={this.state.lon} />
              </div>
              <div
                className="card-action"
                style={{
                  borderRadius: `25px`,
                  textAlign: `center`
                }}
              />
            </div>
          </div>
          <footer
            id="dashboard-footer"
            style={{
              textAlign: `center`,
              color: `black`,
              height: `125px`,
              paddingTop: `55px`
            }}
          >
            <h6>Open Water</h6>
            <p>Copyright © 2018 Coder Boiz Inc.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Dashboard;
