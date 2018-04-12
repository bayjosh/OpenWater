import React, { Component } from "react";
import NameBackground from "../components/NameBackground";

class Name extends Component {
  tripNameSubmit = event => {
    event.preventDefault();
    let tripName = event.target[0].value;

    event.target.parentElement.parentElement.parentElement.setAttribute(
      "id",
      "trip-name-background-zoom"
    );

    console.log(tripName);
  };

  render() {
    return (
      <NameBackground>
        <div className="tripName">
          <a id="saved-trips" href="#">
            Saved Trips
          </a>

          <div className="container">
            <form id="trip-name-form" onSubmit={this.tripNameSubmit}>
              <p id="trip-name-header">Name your trip</p>
              <input
                autofocus="autofocus"
                style={{ fontSize: "50px" }}
                id="trip-name-input"
                type="text"
                required
              />
            </form>

            <img
              id="logo"
              src="https://www.shareicon.net/download/2015/09/13/100454_map_512x512.png"
            />
          </div>
        </div>
      </NameBackground>
    );
  }
}

export default Name;
