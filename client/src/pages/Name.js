import React, { Component } from "react";
import NameBackground from "../components/NameBackground";
import { Redirect } from "react-router-dom";

class Name extends Component {
  constructor() {
    super();

    this.state = {
      fireRedirect: false
    };
  }

  tripNameSubmit = event => {
    event.preventDefault();
    let tripName = event.target[0].value;

    event.target.parentElement.parentElement.parentElement.setAttribute(
      "id",
      "trip-name-background-zoom"
    );

    event.target.style.visibility = "hidden";

    setTimeout(() => {
      this.setState({ fireRedirect: true });
    }, 1000);

    console.log(tripName);
  };

  render() {
    return (
      <div>
      <NameBackground />
        <div className="tripName">
          <a id="saved-trips" href="#">
            Saved Trips
          </a>

          <div className="container">
            <form id="trip-name-form" onSubmit={this.tripNameSubmit}>
              <p id="trip-name-header">Name your voyage</p>
              <input
                autofocus="autofocus"
                style={{ fontSize: "50px" }}
                id="trip-name-input"
                type="text"
                required
              />
            </form>

            {this.state.fireRedirect && <Redirect to="/destination" />}

            <img
              id="logo"
              src="https://www.shareicon.net/download/2015/09/13/100454_map_512x512.png"
            />
          </div>
        </div>
        </div>
    );
  }
}

export default Name;
