import React, { Component } from "react";
import LoginBackground from "../components/LoginBackground";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav"

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false
    };
  }

  //Method to handle user login
  loginSubmit = event => {
    event.preventDefault();

    let email = event.target[0].value;
    let password = event.target[1].value;

    return fetch('http://localhost:5000/checkuser', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        if (res.length > 0) {
          this.setState({ fireRedirect: true }); this.props.handleLogin(event)
        } else {
          alert("invalid login")
        }
      })
      .catch(error => console.log(error));

  }


  // return axios.get("http://localhost:5000/checkuser", {
  //   params: { email, password }
  // })
  //   .then((res) => {
  //     console.log(res)
  //     if (res.data.length > 0) {
  //       this.setState({ fireRedirect: true }); this.props.handleLogin(event)
  //     } else {
  //       alert("invalid login")
  //     }
  //   })

  render() {
    return (
      <div>
        <LoginBackground />
        <Nav />
        <div className="register container" style={{ textAlign: "center" }}>
          <div className="row">
            <div className="col m8 offset-m2">
              <div id="signinContainer">
                <form id="registerForm" onSubmit={this.loginSubmit}>
                  <p id="firstNameHeader" className="loginHeader">Login</p>
                  <div className="row">
                    <div className="col m12">
                      <div className="input-field">
                        <input placeholder="E-Mail" autoFocus="autofocus" id="loginEmailInput" type="text" className="validate" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m12">
                      <div className="input-field">
                        <input placeholder="Password" id="loginPasswordInput" type="password" className="validate" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="waves-effect waves-light btn signinButton">Login</button>
                  <br />
                  <Link to="/"><button type="button" className="waves-effect waves-light btn registerButton"> Back to Home </button></Link>
                </form>

                {this.state.fireRedirect && <Redirect to="/dashboard" />}

              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Login;

