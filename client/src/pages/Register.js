import React, { Component } from "react";
import RegisterBackground from "../components/RegisterBackground";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav"
class Register extends Component {
    constructor() {
        super();

        this.state = {
            fireRedirect: false
        };
    }
    componentDidMount() {
        // disable page scrolling
        document.querySelector('body').style.overflow = "hidden"
    }
    //Method to handle submit of user registration
    registerSubmit = event => {
        event.preventDefault();
        let firstName = event.target[0].value;
        let lastName = event.target[1].value;
        let email = event.target[2].value;
        let password = event.target[3].value;

        //Post method to insert user data into database
        axios.post("http://localhost:5000/register", {
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        });

        //Update state to trigger redirect to dashboard
        this.setState({ fireRedirect: true });
    };

    render() {
        return (
            <div>
                <RegisterBackground />
                <Nav />
                <div className="register container" style={{ textAlign: "center" }}>
                    <div className="row">
                        <div className="col m8 offset-m2">
                            <div id="registerContainer">
                                <form id="registerForm" onSubmit={this.registerSubmit}>
                                    <p id="firstNameHeader" className="registerHeader">Open Water</p>
                                    <div className="row">
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="first" autoFocus="autofocus" id="registerInput" type="text" className="validate" />
                                            </div>
                                        </div>
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="last" id="registerInput" type="text" className="validate" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="email" id="registerInput" type="text" className="validate" />
                                            </div>
                                        </div>
                                        <div className="col m6">
                                            <div className="input-field" style={{ paddingBottom: "5%" }}>
                                                <input placeholder="password" id="registerInput" type="password" className="validate" />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="waves-effect waves-light btn registerButton"  >Register</button>
                                    <br />
                                    <Link to="/"><button type="button" className="waves-effect waves-light btn registerButton"> Back to Home </button></Link>
                                </form>

                                {this.state.fireRedirect && <Redirect to="/dashboard" />}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
