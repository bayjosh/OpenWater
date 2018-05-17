import React, { Component } from "react";
import HomeBackground from "../components/HomeBackground";
import { Redirect, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRedirect: false,
      continueRedirect: false
    }
  }

  //Method to handle redirect to dashboard
  handleContinueAsGuest = event => {
    event.preventDefault();
    this.setState({ continueRedirect: true });
  }

  //Method to handle redirect to login
  handleLogin = event => {
    event.preventDefault();
    this.setState({ loginRedirect: true });
  }

  render() {
    return (
      <div>
        <HomeBackground />
        <div className="home">

          {/* Container for page content */}
          <div className="container home-content">

            {/* Logo/Header */}
            <div className="center-align">
              <img src={require("../images/OWlogo.png")} style={{ height: `200px`, width: `275px` }} />
            </div>
            {/* <p id="homeHeader">Start your voyage</p> */}

            <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
            <button onClick={this.handleContinueAsGuest} className="waves-effect btn-large waves-light btn" id="continueAsGuestButton" type="button">Continue As Guest</button>
            <p id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>

            {/* Trigger redirects to login/dashboard */}
            {this.state.loginRedirect && <Redirect to="/login" />}
            {this.state.continueRedirect && <Redirect to="/dashboard" />}

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
