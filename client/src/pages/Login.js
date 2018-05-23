import React, { Component } from "react";
import LoginBackground from "../components/LoginBackground";
import { Redirect, Link } from "react-router-dom";
// import axios from "axios";
import Nav from "../components/Nav"
import Modal from "react-modal"
import axios from "axios";

const customStyles = {
  overlay: {
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    borderRadius: '25px'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      modalIsOpen: false,
    };
  }
  componentDidMount() {
    // disable page scrolling
    document.querySelector('body').style.overflow = "hidden"
  }

  //Method to handle user login
  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
  loginSubmit = event => {
    event.preventDefault();

    let email = event.target[0].value;
    let password = event.target[1].value;

    return axios.get('http://localhost:5000/checkuser', {
      params: { email, password },
      withCredentials: true
    })
      .then((res) => {
        console.log(res)
        if (res.data.length > 0) {
          this.setState({ fireRedirect: true });
          this.props.handleLogin(event);
        } else {
          this.setState({ modalIsOpen: true })
          document.getElementById('loginEmailInput').value = "";
          document.getElementById('loginPasswordInput').value = "";
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
                        <input placeholder="email" autoFocus="autofocus" id="loginEmailInput" type="text" className="validate" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m12">
                      <div className="input-field">
                        <input placeholder="password" id="loginPasswordInput" type="password" className="validate" />
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          //To appease react-modal error
          ariaHideApp={false}>
          <div className="right-align">
            <button style={{ height: `29px`, width: `29px`, padding: `1px` }} onClick={this.closeModal}><i className="material-icons" >close</i></button>
          </div>
          <div className="center-align">
            <h3 style={{ marginTop: `0` }}>Invalid Login</h3>
          </div>
          <hr />
          We do not have that email and password combination in our records.
        </Modal>
      </div >
    );
  }
}

export default Login;

