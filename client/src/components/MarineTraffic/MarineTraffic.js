import "./MarineTraffic.css";
import React, { Component } from "react";
import postscribe from "postscribe"


class MarineTraffic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.lat !== 0 && prevProps.lat !== this.props.lat) {
            this.loadTraffic();
        }
    }

    loadTraffic= () => {
        document.querySelector('#script').innerHTML = '';
        postscribe('#script', "<script src='//www.marinetraffic.com/js/embed.js' type='text/javascript'></script>")
        postscribe('#script', `<script type='text/javascript'>width='100%'; height='450'; border='1' shownames='false';	latitude='${this.props.lat}'; longitude='${this.props.lon}'; zoom='10'; maptype='1'; trackvessel='0'; fleet=''; </script>`)
    }
    render(){
        return (
            <div id='script' style={{}}>
            </div>
        )
    }

}

export default MarineTraffic;
