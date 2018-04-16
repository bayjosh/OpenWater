import "./Dockwa.css";
import React, { Component } from "react";

class Dockwa extends Component {
    constructor() {
        super();
        this.state = {
            DockwaInfo: ["Dockwa stuff"]
        };
    }

    loadDockwa = event => {
        event.preventDefault();
        let lat = 41.87811360
        let lon = -87.6297982
        fetch('http://localhost:5000/dockwaScrape', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ lat, lon }),
        })
            .then(res => res.json())
            .then(res => {
                // console.log('line 26 '+res)
                this.setState({
                    DockwaInfo: res,
                })
            })
    }

    render() {
        return (
            <div className="Dockwa">
                <button onClick={this.loadDockwa}>SCRAPE</button>
                {this.state.DockwaInfo.map((el, i) => (
                    <a key = {i} target="_blank" href={el.URL}>
                        <h5>{el.name}</h5>
                        <h6>{el.price}</h6>
                    </a>
                ))} 
            </div>
        );
    }
}

export default Dockwa;