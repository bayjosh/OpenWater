import "./MarineTraffic.css";
import React, { Component } from "react";
import postscribe from "postscribe"


class MarineTraffic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount (){
        if (this.props.trafficClicked) {
            this.loadTraffic();
        }
    }

    loadTraffic = () => {
        document.querySelector('#script').innerHTML = '';
        postscribe('#script', `<script type='text/javascript'>width='100%'; height='100%'; border='1'; shownames='false'; latitude='${this.props.lat}'; longitude='${this.props.lon}'; zoom='8'; maptype='1'; trackvessel='0'; fleet=''; </script>`)
        postscribe('#script', "<script src='https://www.marinetraffic.com/js/embed.js' type='text/javascript'></script>")
    }
    render(){
        return (
            <div style={{ height: `95%` }}>
                <div style={{ textAlign: `center`, color: `black` }} id="real-title"><h3>Marine Traffic</h3></div>
                <hr />
                <div id='script' style={{height: `90%`}}></div>
            </div>
        )
    }

}

export default MarineTraffic;
