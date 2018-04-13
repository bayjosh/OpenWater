import React, { Component } from "react";
import DestinationBackground from "../components/DestinationBackground";
class Destination extends Component {
  destinationSubmit = event => {
    event.preventDefault();
    let originInput = event.target[0].value;
    let destinationInput = event.target[1].value;

    event.target.parentElement.parentElement.parentElement.children[0].setAttribute(
      "id",
      "destination-background-zoom"
    );

    event.target.style.visibility = "hidden";
  };

  render() {
    return (
        <DestinationBackground>
        <div className="destination">
          <a id="saved-trips" href="#">
            Saved Trips
          </a>

          <div className="destination-container">
            <form id="destination-form" onSubmit={this.destinationSubmit}>
              <span>
                <p id="origin-header">From:</p>
                <input
                  autoFocus="autofocus"
                  style={{ fontSize: "50px" }}
                  id="origin-input"
                  type="text"
                  required
                />
              </span>
              <span>
                <p id="destination-header">To:</p>
                <input
                  style={{ fontSize: "50px" }}
                  id="destination-input"
                  type="text"
                  required
                />
              </span>
              <span>
              <input type="submit" value="GO" />
              </span>
            </form>

            {/* <img
              id="logo"
              src="https://www.shareicon.net/download/2015/09/13/100454_map_512x512.png"
            /> */}
          </div>
        </div>
          </DestinationBackground>
    );
  }
}

export default Destination;
