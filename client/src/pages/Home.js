import React, { Component } from "react";
import HomeBackground from "../components/HomeBackground";
import { Redirect, Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loginRedirect: false,
      continueRedirect: false
    }
  }
  continue = event => {
    event.preventDefault();
    setTimeout(() => {
      this.setState({ continueRedirect: true })
    }, 500);
  }
  logIn = event => {
    event.preventDefault();
    setTimeout(() => {
      this.setState({ loginRedirect: true })
    }, 500);
  }
  render() {

    return (
      <div>
        <HomeBackground />
        <div className="home">
          <div className="container home-content">
            <div className="center-align">
              <img src={require("../images/OWlogo.png")} style={{ height: `200px`, width: `275px` }} />
            </div>
            {/* <p id="homeHeader">Start your voyage</p> */}
            <button
              onClick={this.logIn}
              className="waves-effect btn-large waves-light btn"
              id="loginButton">Log In</button>
            <button
              onClick={this.continue}
              className="waves-effect btn-large waves-light btn"
              id="continueAsGuestButton"
              type="button">Continue As Guest</button>

            <p id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>

            {this.state.loginRedirect && <Redirect to="/login" />}
            {this.state.continueRedirect && <Redirect to="/dashboard" />}

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
