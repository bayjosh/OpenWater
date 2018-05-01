import React, { Component } from "react";
import HomeBackground from "../components/NameBackground";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <HomeBackground />
        <div className="home">
          <div className="container">
            <p id="homeHeader">Start your voyage</p>
            <Link to="/dashboard"><button
              className="waves-effect waves-light btn"
              id="continueAsGuestButton"
              type="button"> Bon Voyage!</button></Link>
            <Link to="/login"><button
              className="waves-effect waves-light btn"
              id="login"> Log In</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
