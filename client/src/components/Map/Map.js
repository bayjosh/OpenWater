import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapWindow = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap


)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    onClick={props.onGoogleMapClick}
  // getPosition={props.getPostion}

  >
    {props.isMarkerShown && <Marker position={{ lat: props.markerPositionLat, lng: props.markerPositionLon }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class MapComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMarkerShown: false,
      markerPositionLat: -32,
      markerPositionLon: 74
    }
  }

  // componentDidMount() {
  //   this.delayedShowMarker()
  // }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 5000)
  // }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
  }

  handleGoogleMapClick = (event) => {
    let lat = event.latLng.lat()
    let lon = event.latLng.lng()
    this.setState({ isMarkerShown: true, markerPositionLat: lat, markerPositionLon: lon })
    this.props.onChange(this.state.markerPositionLat, this.state.markerPositionLon);
  }

  // onStateChange = event => {
  //   let latitude = event.getPosition().lat();
  //   let longitude = event.getPosition().lon();
  //   this.props.onChange(latitude, longitude)
  // }



  // getPosition = (lat, lon) => {
  //   this.setState({ markerPositionLat: lat, markerPositionLon: lon })

  // }


  render() {
    return (
      <MapWindow
        onStateChange={this.onStateChange}
        markerPositionLat={this.state.markerPositionLat}
        markerPositionLon={this.state.markerPositionLon}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        onGoogleMapClick={this.handleGoogleMapClick}
      // getPosition={this.getPosition()}

      />
    )
  }
}

export default MapComponent;






























// import "./Map.css";
// import React, { Component } from "react";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// class Map extends Component {
//   render() {
//     const GoogleMapExample = withGoogleMap(props => (
//       <GoogleMap
//         defaultCenter={{ lat: 41.879, lng: -87.624 }}
//         defaultZoom={13}
//       />
//     ));
//     return (
//       <div id="map-weather-container">
//         <GoogleMapExample
//           containerElement={<div style={{ width: "40vw" }} />}
//           mapElement={<div style={{ height: `50vh`, borderRadius: `25px` }} />}
//         />
//       </div>
//     );
//   }
// }
// export default Map;


"============================================================================="

// import React from "react";
// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   Polyline,
//   PolylineProps
// } from "react-google-maps";

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `600px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={11} defaultCenter={{ lat: 41.879, lng: -87.624 }}>
//     <Polyline
//       path={[{ lat: 41.879, lng: -87.624 }, { lat: 41.75, lng: -87.624 }]}
//       visible={true}
//       options={{
//         strokeColor: "blue",
//         strokeOpacity: 1.0,
//         strokeWeight: 3,
//         editable: true
//       }}
//       //   onClick={this.props.handleClick}
//     />
//   </GoogleMap>
// ));

// class MyFancyComponent extends React.PureComponent {
//   state = {
//     isMarkerShown: true
//   };

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false });
//   };

//   handleClick = () => {
//     this.setState({ isMarkerShown: true });
//   };

//   render() {
//     return (
//       <MyMapComponent
//         isMarkerShown={this.state.isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//         onClick={this.handleClick}
//       />
//     );
//   }
// }

// export default MyFancyComponent;
