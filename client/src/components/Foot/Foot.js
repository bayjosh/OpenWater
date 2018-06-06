import "./Foot.css";
import React, { Component } from "react";
import { Footer } from 'react-materialize';
import { Redirect, Link } from "react-router-dom";

class Foot extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Footer id="footer" style={{ width: "100vw" }} copyrights="Copyright © 2018 CoderBoiz Inc."
                links={<ul>
                    <li><a target="_blank" className="grey-text footer-link text-lighten-3" href="https://dockwa.com/">Dockwa</a></li>
                    <li><a target="_blank" className="grey-text footer-link text-lighten-3" href="http://www.nws.noaa.gov/om/marine/home.htm">NOAA Marine Weather</a></li>
                    <li><a target="_blank" className="grey-text footer-link text-lighten-3" href="https://www.accuweather.com/">Accuweather</a></li>
                </ul>}
                className='example'>
                <h5 className="white-text">Open Water</h5>
                <p className="grey-text text-lighten-4">Sail into the 21st century.</p>
            </Footer>
        )
    }
}

export default Foot;