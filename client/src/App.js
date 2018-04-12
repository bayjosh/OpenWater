import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  projectName = (event) => {
    event.preventDefault();
    let projectInput = event.target[0].value;

    console.log(projectInput);
  }



  render() {
    return (
      <div className="App container">

        <form id="project-form" onSubmit={this.projectName}>
          <p className="project-name-header">Give your trip a name...</p>
          <input style={{ fontSize: "50px" }} id="project-name" type="text" required />
        </form>



      </div>
    );
  }
}

export default App;
