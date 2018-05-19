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
//trying to get the req.session.logged_in status from the server side
  componentDidUpdate() {
    return fetch('http://localhost:5000/isLoggedIn', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then((res) => {
       console.log(res)
      })
      .catch(error => console.log(error));
  }
/////////////////////////////////////////////////////////////////////

  //Method to handle when user logs in
  handleLogin = event => {
    event.preventDefault()

    // let username = event.target[0].value;
    // let password = event.target[1].value;

    //Post request to capture user login credentials
    // axios.post("http://localhost:5000/login", {
    //   username: username,
    //   password: password
    // });
    this.setState({ loggedIn: true })
  }

  //Method to handle when new user registers
  handleRegister = event => {
    event.preventDefault();
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
              <Route exact path="/login" render={(props) => (<Login handleLogin={this.handleLogin} {...props} />)} />
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
