import React, { Component } from "react";
import DashboardBackground from "../components/DashboardBackground";
import { Redirect } from "react-router-dom";
import MapComponent from "../components/Map";
import NOAAWeather from "../components/NOAAWeather";
import Dockwa from "../components/Dockwa";
import AirWeather from "../components/AirWeather";
import API from "../utils/API"

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      lat: 0,
      lon: 0,
      zipCode: 0
    };
  }


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
      })
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
                class="card darken-1"
              >
                <div class="card-content white-text" style={{ height: `100%` }}>
                  <span class="card-title" style={{ textAlign: `center` }}>
                    Map
                  </span>
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
                  <hr/>
                  <a target="_blank" href={`http://fishing-app.gpsnauticalcharts.com/i-boating-fishing-web-app/fishing-marine-charts-navigation.html#4.35/${this.state.lat}/${this.state.lon}`}> Click here to view depths and other info</a>
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
                  class="card darken-1"
                >
                  <div class="card-content white-text">
                    <span
                      class="card-title"
                      style={{ textAlign: `center`, color: `white` }}
                    >
                      Marine Forecast
                    </span>{" "}
                    <hr />
                    <NOAAWeather zipCode={this.state.zipCode} />
                  </div>
                </div>

                {/* <span>
                  <button
                    class="btn waves-effect waves-light"
                    style={{ width: `42vh`, margin: `0 10px 0 20px` }}
                  >
                    Make a Log
                  </button>
                </span>
                <span>
                  <button
                    style={{ width: `42vh` }}
                    class="btn waves-effect waves-light"
                  >
                    View Logs
                  </button>
                </span> */}
              </div>
            </div>

            <div
              id="air-weather"
              style={{
                width: `45vw`,
                alignSelf: `flex-start`,
                margin: `0`,
                borderRadius: `25px`,
                height: `100%`,
                backgroundColor: `rgba(145, 174, 194, 0.952)`
              }}
              class="card darken-1"
            >
              <div class="card-content white-text">
                <span
                  class="card-title"
                  style={{ textAlign: `center`, color: `white` }}
                >
                  5-Day Air Forecast
                </span>{" "}
                <hr />
                <AirWeather zipCode={this.state.zipCode} />
              </div>
            </div>

            <div id="docking-area">
              <h3 style={{ color: `white`, padding: `35px 0 20px 0` }}>
                DOCKING AREA
              </h3>
              <hr/>
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
