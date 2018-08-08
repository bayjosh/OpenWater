import React, { Component } from "react";
import DashboardBackground from "../components/DashboardBackground";
import MapComponent from "../components/Map";
import NOAAWeather from "../components/NOAAWeather";
import Dockwa from "../components/Dockwa";
import AirWeather from "../components/AirWeather";
import API from "../utils/API";
import LoadingModal from "../components/LoadingModal";
import { Modal } from 'react-materialize';
import Nav from "../components/Nav";
import MarineTraffic from "../components/MarineTraffic";
import DepthOverlay from "../components/DepthOverlay";
import VoyageTracker from "../components/VoyageTracker";
import Foot from "../components/Foot"

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      lat: null,
      lon: null,
      zipCode: null,
      forecastTime: "",
      chartsURL: "",
      depthClicked: false,
      trafficClicked: false,
    };
  }

  componentDidMount() {
    // Allow for page scrolling
    document.querySelector('body').style.overflowY = "scroll"
  }
  //Brings user back to map from depth/traffic overlays
  backToMap = () => {
    this.setState({ depthClicked: false, trafficClicked: false })
  }
  //Opens depth overlay
  depthWasClicked = () => {
    this.setState({ depthClicked: true })
  }

  //Opens marine traffic overlay
  trafficWasClicked = () => {
    this.setState({ trafficClicked: true })
  }

  //Method to handle changes to map component (new click on the map)
  onMapChange = (lati, long) => {
    this.setState({ lat: lati, lon: long })
    //API call to retrieve zip code from lat and lon
    API.getZipCode(this.state.lat, this.state.lon)
      .then(res => {
        //Only return the colloquial zip code
        for (var i = 0; i < res.data.results[0].address_components.length; i++) {
          if (res.data.results[0].address_components[i].types[0] === "postal_code") {
            return res.data.results[0].address_components[i].long_name
          }
        }
      })
      .then(result => {
        this.setState({ zipCode: result })
        //Prepare depth charts by creating custom url and setting state
        return fetch(`/api/charts/${this.state.lat}/${this.state.lon}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(res => res.json())
          .then(res => this.setState({ chartsURL: res }));
      })
  }
  //Method to allow forecastTime to update in state from data one level below (see NOAA weather props)
  handleModalLoad = (forecastTime) => {
    this.setState({ forecastTime: forecastTime })
  }

  testFunction = () => {
    return fetch('/test', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(console.log("frontend worked!"))
      .catch(error => {
        console.error('Search failed:', error)
      })
  }


  render() {
    return (
      <div style={{ display: `flex`, flexDirection: `row`, flexWrap: `wrap` }}>
        <Nav handleLogOut={this.props.handleLogOut} userId={this.props.userId} loggedIn={this.props.loggedIn} firstName={this.props.firstName} />
        <DashboardBackground />
        <LoadingModal lat={this.state.lat} lon={this.state.lon} zipCode={this.state.zipCode} forecastTime={this.state.forecastTime} />

        {/* Flex-box styling for whole page */}
        <div className="dashboard" style={{ display: `flex`, flexDirection: `row`, alignItems: `center`, justifyContent: `space-evenly`, flexWrap: `wrap`, padding: `2.5%`, width: `100vw`, height: `100%` }}>
          <br />
          <br />
          <br />
          {/* Location/Map card */}
          <div id="map-card" className="card darken-1" style={{ width: `100%`, height: `100vh`, marginTop: "5%" }}>
            <div className="card-content" style={{ height: `90vh` }}>
              <div className="card-title">
                <h3>Location</h3>
                <hr />
              </div>
              <MapComponent isMarkerShown={false} onChange={this.onMapChange} />
              <div id="mapButtonDiv" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                <button onClick={this.depthWasClicked} className="btn button activator">Depth Overlay</button>
                <button onClick={this.trafficWasClicked} className="btn button activator">Marine Traffic</button>
                {/* Button to open depth charts in new tab*/}
                {this.state.chartsURL !== "" ?
                  <a target="_blank" href={this.state.chartsURL}>
                    <button className="btn button">NOAA Nautical Charts</button>
                  </a>
                  :
                  <Modal
                    header='NOAA Charts Currently Unavailable'
                    trigger={<button className="btn button">NOAA Nautical Charts</button>}
                    modalOptions={{ complete: () => document.querySelector('body').style.overflowY = "scroll" }}>
                  </Modal>}
              </div>
            </div>
            {/* Overlay Reveal */}
            <div className="card-reveal">
              <span onClick={this.backToMap} className="card-title"><i className="right material-icons">close</i></span>
              {/* If depth button is clicked, display depth overlay */}
              {this.state.depthClicked ?
                <DepthOverlay depthClicked={this.state.depthClicked} lat={this.state.lat} lon={this.state.lon} />
                // Otherwise, if traffic button is clicked, display traffic overlay
                : this.state.trafficClicked ?
                  <MarineTraffic trafficClicked={this.state.trafficClicked} lat={this.state.lat} lon={this.state.lon} />
                  // Otherwise, stay on map
                  : <div></div>}
            </div>
          </div>

          {/* Test Deployment Button */}
          {/* <div>
            <button className='btn' onClick={this.testFunction}>Test</button>
          </div> */}

          {/* Marine Conditions Card */}
          <div id="weather" className="card darken-1" style={{ width: `100%` }}>
            <div className="card-content" style={{ height: `95%` }}>
              <div className="card-title">
                <h3>Marine Forecast</h3>
              </div>
              <hr />
              <NOAAWeather lat={this.state.lat} lon={this.state.lon}
                handleModalLoad={this.handleModalLoad} />
            </div>
          </div>

          {/* Air Weather Forecast Card */}
          <div id="air-weather" className="card darken-1" style={{ width: `100%` }}>
            <div className="card-content" style={{ height: `95%` }}>
              <div className="card-title">
                <h3>Weather Forecast</h3>
              </div>
              <hr />
              <AirWeather zipCode={this.state.zipCode} />
            </div>
          </div>

          {/* Docking Options Card */}
          <div id="dockwa-area" className="card darken-1" style={{ width: `100%` }}>
            <div className="card-content" style={{ height: `95%` }}>
              <div className="card-title">
                <h3>Docking Options</h3>
                <hr />
                <div>
                  <Dockwa lat={this.state.lat} lon={this.state.lon} />
                </div>
              </div>
            </div>
          </div>

          {/* Voyage Tracker card */}
          {/* <div id="map-card" className="card darken-1" style={{ width: `100%`, height: `200%` }}>
            <div className="card-content" style={{ height: `95%` }}>
              <div className="card-title">
                <h3>Tracker</h3>
                <hr />
              </div>
              <VoyageTracker />
            </div>
          </div> */}
        </div>
        <div style={{
          position: `relative`, bottom: `-100%`
        }}>
          <Foot style={{ width: '100vw' }} />
        </div>

      </div>

    );
  }
}

export default Dashboard;
