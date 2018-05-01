import React, { Component } from "react";
import LoginBackground from "../components/LoginBackground";
import { Redirect } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  constructor() {
    super();

    this.state = {
      fireRedirect: false
    };
  }
  loginSubmit = event => {
    event.preventDefault();

    let username = event.target[0].value;
    let password = event.target[1].value;

    axios.post("http://localhost:5000/login", {
      username: username,
      password: password
    });


    this.setState({ fireRedirect: true });


  };



  render() {
    return (
      <div>
        <LoginBackground />
        <div className="login">

          <div className="loginContainer">
            <form id="loginForm" onSubmit={this.loginSubmit}>
              <span>
                <p id="usernameHeader">Username:</p>
                <input
                  autoFocus="autofocus"
                  style={{ fontSize: "50px" }}
                  id="usernameInput"
                  type="text"
                  required
                />
              </span>
              <span>
                <p id="passwordHeader">Password:</p>
                <input
                  style={{ fontSize: "50px" }}
                  id="passwordInput"
                  type="text"
                  required
                />
              </span>
              <button type="submit" style={{ visibility: `hidden` }}></button>
            </form>
            {this.state.fireRedirect && <Redirect to="/dashboard" />}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
