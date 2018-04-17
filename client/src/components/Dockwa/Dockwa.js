import "./Dockwa.css";
import React, { Component } from "react";

class Dockwa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DockwaInfo: ["Dockwa stuff"]
        };
    }

    loadDockwa = event => {
        event.preventDefault();
        let lat = this.props.lat
        let lon = this.props.lon
        return fetch('http://localhost:5000/dockwaScrape', {
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
            <div className="Dockwa" style={{
                width: `100%`,
                display: `flex`,
                flexWrap: `wrap`,
                flexDirection: `row`,
                justifyContent: `center`
            }}>
                <button className="waves-effect waves-light btn" onClick={this.loadDockwa} style={{ textAlign: `center`, backgroundColor: `white`, color: `black`, marginBottom: `25px` }}>Find Docking</button>
                <div id="dock-container" style={{ display: `flex`, flexWrap: `wrap`, justifyContent: `space-evenly`, width: `100%`, flexDirection: `row` }}>
                    {this.state.DockwaInfo.map((el, i) => (
                        <a key={i} style={{ color: `black`, width: `30%`, border: `white 1px solid`, marginBottom: `8px`, borderRadius: `25px` }} target="_blank" href={el.URL}>
                            <h5>{el.name}</h5>
                            <h6>{el.price}</h6>
                            <img className="responsive-img" style={{
                                borderRadius: `25px`
                            }} src={el.pictureStyle} />
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

export default Dockwa;