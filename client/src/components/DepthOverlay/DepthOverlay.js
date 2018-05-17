import "./DepthOverlay.css";
import React, { Component } from "react";

class DepthOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        if (this.props.depthClicked) {
            this.openDepthOverlay();
        }
    }

    //How does iframe work with render below????
    openDepthOverlay = () => {
        let iframe = document.createElement('iframe')
        iframe.setAttribute('width', '100%')
        iframe.setAttribute('height', "90%")
        iframe.setAttribute('src', `http://fishing-app.gpsnauticalcharts.com/i-boating-fishing-web-app/fishing-marine-charts-navigation.html#4.35/${this.props.lat}/${this.props.lon}`)
        iframe.setAttribute('frameborder', '0')
        if (document.getElementById('iframe').children.length === 1) {
            document.getElementById('iframe').removeChild(document.getElementById('iframe').children[0]);
            document.getElementById('iframe').appendChild(iframe)
            console.log('huh??1')
        } else {
            document.getElementById('iframe').appendChild(iframe)
            console.log('huh??2')
        }
    }
    render() {
        return(
            <div style={{ height: `95%` }}>
                <div style={{ textAlign: `center`, color: `black` }} id="real-title"><h3>Depth Overlay</h3></div>
                <hr />
                <div style={{ height: `100%` }} id='iframe'></div>
            </div>
        )
    }
}

export default DepthOverlay;