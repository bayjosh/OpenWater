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
        postscribe('#script', `<script type='text/javascript'>width='100%'; height='450'; border='1'; shownames='false'; latitude='${this.props.lat}'; longitude='${this.props.lon}'; zoom='8'; maptype='1'; trackvessel='0'; fleet=''; </script>`)
        postscribe('#script', "<script src='https://www.marinetraffic.com/js/embed.js' type='text/javascript'></script>")
    }
    render(){
        return (
            <div id='script'>
            </div>
        )
    }

}

export default MarineTraffic;
