import React, { Component } from "react";
import DashboardBackground from "../components/DashboardBackground";
import { Redirect } from "react-router-dom";
// import MyMapComponent from "../components/Map";
// import MyFancyMapComponent from "../components/Map";
import Map from "../components/Map";
import NOAAWeather from "../components/NOAAWeather"

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      fireRedirect: false
    };
  }
  render() {
    return (
      <div>
        <div>
          <DashboardBackground />
          <div id="header-background"
          > </div>
          <h1 style={{ margin: `0`, opacity: `1`, textAlign: `center`, marginBottom: `40px`, padding: `10px 0 10px 0` }}>Dashboard</h1>

          <div className="dashboard">


            <div id="weather-map" style={{ display: `flex`, flexDirection: `row`, alignItems: `center`, justifyContent: `space-around`, marginBottom: `45px` }}>
              <div id="map-card" style={{ width: `45vw`, alignSelf: `flex-start`, height: `66vh`, margin: `0`, borderRadius: `25px`, backgroundColor: `rgba(145, 174, 194, 0.952)` }} class="card darken-1" >
                <div class="card-content white-text">
                  <span class="card-title" style={{ textAlign: `center` }}>Map</span>
                  <div id="map-card-content" style={{ display: `flex`, justifyContent: `center`, alignItems: `center`, marginTop: `20px` }}>
                    <Map /></div>

                </div>
              </div>


              <div style={{
                display: `flex`, width: `45vw`, flexWrap: `wrap`
              }}>
                <div id="weather" style={{ width: `45vw`, alignSelf: `flex-start`, margin: `0`, borderRadius: `25px`, height: `60vh`, backgroundColor: `rgba(145, 174, 194, 0.952)` }} class="card darken-1" >
                  <div class="card-content white-text">
                    <span class="card-title" style={{ textAlign: `center`, color: `white` }}>Weather Forecast</span> <hr />
                    <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                    <NOAAWeather />

                  </div>

                </div>

                <span><button class="btn waves-effect waves-light" style={{ width: `42vh`, margin: `0 10px 0 20px` }}>Make a Log</button></span><span><button style={{ width: `42vh` }} class="btn waves-effect waves-light">View Logs</button></span>

              </div>
            </div>

          </div>
        </div>
        <div id="docking-area">
          <h3 style={{ color: `white`, padding: `35px 0 20px 0` }}>DOCKING AREA</h3>
          <button class="waves-effect waves-light btn" style={{ textAlign: `center`, backgroundColor: `white`, color: `black` }}>Find Docking</button>
        </div>
      </div>


    );
  }
}

export default Dashboard;
