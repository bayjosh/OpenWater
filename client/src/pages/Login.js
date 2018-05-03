import React, { Component } from "react";
import LoginBackground from "../components/LoginBackground";
import { Redirect, Link } from "react-router-dom";
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
        <div className="register container" style={{ textAlign: "center" }}>
          <div className="row">
            <div className="col m8 offset-m2">
              <div id="signinContainer">
                <form id="registerForm" onSubmit={this.loginSubmit}>
                  <p id="firstNameHeader" className="loginHeader">Open Water</p>
                  <p id="signUp">Welcome back. Please login.</p>
                  <div class="row">
                    <div className="col m12">
                      <div className="input-field">
                        <input placeholder="E-Mail" autoFocus="autofocus" id="loginInput" type="text" class="validate" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m12">
                      <div className="input-field">
                        <input placeholder="Password" id="loginInput" type="password" class="validate" />
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




// render() {
//   return (
//     <div>
//       <LoginBackground />
//       <div className="login">

//         <div className="loginContainer">
//           <form id="loginForm" onSubmit={this.loginSubmit}>
//             <span>
//               <p id="usernameHeader">Username:</p>
//               <input
//                 autoFocus="autofocus"
//                 style={{ fontSize: "50px" }}
//                 id="usernameInput"
//                 type="text"
//                 required
//               />
//             </span>
//             <span>
//               <p id="passwordHeader">Password:</p>
//               <input
//                 style={{ fontSize: "50px" }}
//                 id="passwordInput"
//                 type="text"
//                 required
//               />
//             </span>
//             <button type="submit" style={{ visibility: `hidden` }}></button>
//           </form>
//           {this.state.fireRedirect && <Redirect to="/dashboard" />}
//         </div>
//       </div>
//     </div>
//   );
// }


export default Login;
