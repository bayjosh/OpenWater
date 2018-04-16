import React, { Component } from "react";
import DashboardBackground from "../components/DashboardBackground";
import { Redirect } from "react-router-dom";
// import MyMapComponent from "../components/Map";
// import MyFancyMapComponent from "../components/Map";
import Map from "../components/Map";
import NOAAWeather from "../components/NOAAWeather";
import Dockwa from "../components/Dockwa";

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
        <DashboardBackground />
        <h1 style={{ margin: `0`, color: `white`, textAlign: `center`, marginBottom: `40px` }}>Dashboard</h1>
        <div className="dashboard">


          <div id="weather-map" style={{ display: `flex`, flexDirection: `row`, alignItems: `center`, justifyContent: `space-around` }}>
            <div id="map-card" style={{ width: `45vw`, alignSelf: `flex-start`, height: `66vh`, margin: `0`, borderRadius: `25px` }} class="card blue-grey darken-1" >
              <div class="card-content white-text">
                <span class="card-title" style={{ textAlign: `center` }}>Map</span>
                <div id="map-card-content" style={{ display: `flex`, justifyContent: `center`, alignItems: `center`, marginTop: `20px` }}>
                  <Map /></div>

              </div>
            </div>



            <div id="weather" style={{ width: `45vw`, alignSelf: `flex-start`, margin: `0`, borderRadius: `25px` }} class="card blue-grey darken-1" >
              <div class="card-content white-text">
                <span class="card-title" style={{ textAlign: `center`, color: `white` }}>Weather Forecast</span> <hr />
                <NOAAWeather />
              </div>
              <div class="card-action" style={{
                borderRadius: `25px`, textAlign: `center`
              }}>
                <a href="#">Captain's Log</a>
              </div>
            </div>





            <div id="Dockwa" style={{ width: `45vw`, alignSelf: `flex-start`, margin: `0`, borderRadius: `25px` }} class="card blue-grey darken-1" >
              <div class="card-content white-text">
                <span class="card-title" style={{ textAlign: `center`, color: `white` }}>Docks in Your Area</span> <hr />
                <Dockwa />
              </div>
              <div class="card-action" style={{
                borderRadius: `25px`, textAlign: `center`
              }}>
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default Dashboard;
