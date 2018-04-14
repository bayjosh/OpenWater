import "./Map.css";
import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  PolylineProps,
  InfoWindow,
  InfoWindowProps
} from "react-google-maps";

class Map extends Component {
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 41.879, lng: -87.624 }}
        defaultZoom={13}
      />
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `100vh`, width: "100vw" }} />}
          mapElement={<div style={{ height: `100vh` }} />}
        />
      </div>
    );
  }
}
export default Map;

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
