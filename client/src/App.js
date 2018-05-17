import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Voyages from "./pages/Voyages";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";



class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: "",
      userFirstName: "",
      username: "",
      email: "",
      password: ""
    }
  }



  //Method to handle when user logs in
  handleLogin = event => {
    event.preventDefault();
    //query to get the rest of their info from mongo and set state to it
    this.setState({ loggedIn: true })

  }
  //Method to handle when new user registers
  handleRegister = event => {
    event.preventDefault();
    //post their registration info to mongo then get it and set state to it
    this.setState({ loggedIn: true })

  }

  render() {

    if (!this.state.loggedIn) {
      return (
        <div>
          <Router>
            <div>
              {/* <Nav /> */}
              <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" render={(props) => (<Home handleLogin={this.handleLogin} {...props} />)} />
              <Route exact path="/register" render={(props) => (<Register handleRegister={this.handleRegister} {...props} />)} />
              {/* <Footer /> */}
            </div>
          </Router>
        </div>
      )
    }
    else {
      return (
        <div>
          <Router>
            <div>
              {/* <Nav /> */}
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/voyages" component={Voyages} />
              {/* <Footer /> */}
            </div>
          </Router>
        </div>
      )
    }
  }
}

export default App;
