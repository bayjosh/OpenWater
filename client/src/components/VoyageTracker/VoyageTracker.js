import React, { PureComponent } from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, PolylineProps } from "react-google-maps"

class VoyageTracker extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isMarkerShown: false,
            markerPositionLat: -32,
            markerPositionLon: 74,
            currentPosition: {},
            pathCoordinates: [{ lat: 50, lng: -85 }]
        }
    }
    componentDidUpdate(prevProps, prevState) {
        //Only load weather if user has clicked somewhere new on the map
        if (this.state.currentPosition !== prevState.currentPosition && this.state.currentPosition !== {}) {
            this.setState({ pathCoordinates: [...this.state.pathCoordinates, this.state.currentPosition] })
        }
    }
    trackVoyage = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                this.setState({ currentPosition: { lat: position.coords.latitude, lng: position.coords.longitude } })
            });
        }
    }

    //Method to capture lat and lon position of user click
    handleGoogleMapClick = (event) => {
        let lat = event.latLng.lat()
        let lon = event.latLng.lng()
        this.setState({ isMarkerShown: true, markerPositionLat: lat, markerPositionLon: lon })
        this.props.onChange(this.state.markerPositionLat, this.state.markerPositionLon);
    }

    render() {
        return (
            <MapWindow
                markerPositionLat={this.state.markerPositionLat}
                markerPositionLon={this.state.markerPositionLon}
                isMarkerShown={this.state.isMarkerShown}
                onGoogleMapClick={this.handleGoogleMapClick}
                trackVoyage={this.trackVoyage}
                position={this.state.currentPosition}
                pathCoordinates={this.state.pathCoordinates}
            />
        )
    }
}

//Custom marker
const image = require('../../images/smallanchor.png')

// let pathCoordinates = [
//     { lat: 45.8781, lng: -82.6298 },
//     { lat: props.position.coords.latitude, lng: props.position.coords.longitude },

// ]

//Create MapWindow stateless component
const MapWindow = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCw1e-uu8VD-vsFQDzMXlHkiN_XL5N8YFg&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `90%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap


)((props) =>
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 41.8781, lng: -87.6298 }} onClick={props.onGoogleMapClick}>

        <button className="btn" onClick={props.trackVoyage}>Track Voyage</button>

        <Polyline path={props.pathCoordinates}
            geodesic={true}
            options={{
                strokeColor: '#ff2527',
                strokeWeight: 2,
                icons: [{
                    icon: image,
                    offset: '0',
                    repeat: '20px'
                }],
            }} />

        {/* {props.isMarkerShown && <Marker position={{ lat: props.markerPositionLat, lng: props.markerPositionLon }} onClick={props.onMarkerClick} icon={image} />} */}

    </GoogleMap>
)

export default VoyageTracker;

