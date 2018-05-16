import React, { Component } from "react";
import DashboardBackground from "../components/DashboardBackground";
import MapComponent from "../components/Map";
import NOAAWeather from "../components/NOAAWeather";
import Dockwa from "../components/Dockwa";
import AirWeather from "../components/AirWeather";
import API from "../utils/API";
import LoadingModal from "../components/LoadingModal";
import LogVoyage from "../components/LogVoyage";
import { Link } from "react-router-dom";
import { Modal } from 'react-materialize';
import Nav from "../components/Nav";
import MarineTraffic from "../components/MarineTraffic";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      lat: null,
      lon: null,
      zipCode: null,
      forecastTime: "",
      chartsURL: ""
    };
  }

  componentDidMount() {
    // Allow for page scrolling
    document.querySelector('body').style.overflow = "scroll"
<<<<<<< HEAD
=======
    // Marine traffic??????
    postscribe('#script', "<script src='//www.marinetraffic.com/js/embed.js' type='text/javascript'></script>")
    postscribe('#script', "<script type='text/javascript'>width='100%'; height='450';	 border='1';	shownames='false';	latitude='37.4460';	 longitude='24.9467';	zoom='9';	maptype='1';trackvessel='0'; fleet='';</script>")
>>>>>>> d395914dd613d5497a43325505d4c23ac721e338
  }

  //Method to handle changes to map component (new click on the map)
  onMapChange = (lati, long) => {
    this.setState({ lat: lati, lon: long })
    //API call to retrieve zip code from lat and lon
    API.getZipCode(this.state.lat, this.state.lon).then(res => {
      //Only return the colloquial zip code
      for (var i = 0; i < res.data.results[0].address_components.length; i++) {
        if (res.data.results[0].address_components[i].types[0] === "postal_code") {
          return res.data.results[0].address_components[i].long_name
        }
      }
    })
      .then(result => {
        this.setState({ zipCode: result })
        //Prepare depth overlay with new lat and lon - but doesn't trigger????
        this.openDepthOverlay();
        //Prepare depth charts with new lat and lon - but doesn't trigger????
        this.openNOAACharts();
      })
  }
  //Why are we passing forecastTime here????????
  handleModalLoad = (forecastTime) => {
    this.setState({ forecastTime: forecastTime })
  }

  openNOAACharts = () => {
    this.loadChartsURL().then(res => this.setState({ chartsURL: res }))
  }
  loadChartsURL = () => {
    return fetch(`http://localhost:5000/api/charts/${this.state.lat}/${this.state.lon}`).then(res => res.json());
  }

  //How does iframe work with render below????
  openDepthOverlay = () => {
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
<<<<<<< HEAD
=======
    //???????????:
    // let width = '100%';
    // let height = '450';
    // let border = '1';
    // let shownames = 'false';
    // let latitude = '37.4460';
    // let longitude = '24.9467';
    // let zoom = '9';
    // let maptype ='1';
    // let fleet = '';
    // let trackvessel = '0';
>>>>>>> d395914dd613d5497a43325505d4c23ac721e338
    return (
      <div>
        <Nav />
        <DashboardBackground />
        <LoadingModal lat={this.state.lat} lon={this.state.lon} zipCode={this.state.zipCode} forecastTime={this.state.forecastTime} />

        {/* Flex-box styling for whole page */}
        <div className="dashboard" style={{ display: `flex`, flexDirection: `row`, alignItems: `center`, justifyContent: `space-evenly`, flexWrap: `wrap`, padding: `2.5%`, height: `100vh`, width: `100vw` }}>

          {/* Location/Map card */}
          <div id="map-card" className="card darken-1" style={{ width: `100%`, height: `200%` }}>
            <div className="card-content" style={{ height: `95%` }}>
              <div className="card-title">
                <h3>Location</h3>
                <hr />
              </div>
              <MapComponent isMarkerShown={false} onChange={this.onMapChange} />
            </div>
            {/* Depth Overlay Reveal */}
            <button className="btn activator">Depth Overlay</button>
            <div className="card-reveal">
              <span className="card-title"><i className="right">Back to Map</i></span>
              <div style={{ textAlign: `center`, color: `black` }} id="real-title"><h3>Depth Overlay</h3></div>
              <hr />
              <div style={{ height: `95%` }} id='iframe'></div>
            </div>
          </div>

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

          {/* Button to log a voyage in the database */}
          <LogVoyage />

          {/* Link to view voyages */}
          <Link to="/voyages">
            <button className="btn"> View Voyages </button>
          </Link>

          {/* Button to open depth charts in new tab*/}
          {this.state.chartsURL !== "" ?
            <a target="_blank" href={this.state.chartsURL}>
              <button className="btn">NOAA Nautical Charts</button>
            </a> :
            <Modal
              header='NOAA Charts Currently Unavailable'
              trigger={<button className="btn">NOAA Nautical Charts</button>}
              modalOptions={{ complete: () => document.querySelector('body').style.overflow = "scroll" }}>
            </Modal>}

<<<<<<< HEAD
        <MarineTraffic lat={this.state.lat} lon={this.state.lon} />
        </div>
=======
          {/* Div to hold marine traffic iframe */}
          <div id='script' style={{}}></div>

>>>>>>> d395914dd613d5497a43325505d4c23ac721e338
        </div>
      </div>
    );
  }
}

export default Dashboard;
