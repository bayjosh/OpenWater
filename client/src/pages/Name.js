import React, { Component } from "react";

class Name extends Component {
  projectName = event => {
    event.preventDefault();
    let projectInput = event.target[0].value;

    console.log(projectInput);
  };

  render() {
    return (
      <div className="App">
        <a id="saved-trips" href="#">
          Saved Trips
        </a>

        <div className="container">
          <form id="project-form" onSubmit={this.projectName}>
            <p id="project-name-header">Name your trip</p>
            <input
              autofocus="autofocus"
              style={{ fontSize: "50px" }}
              id="project-name"
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
    );
  }
}

export default Name;
