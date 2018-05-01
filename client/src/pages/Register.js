import React, { Component } from "react";
import RegisterBackground from "../components/RegisterBackground";
import { Redirect } from "react-router-dom";
import axios from "axios";
class Register extends Component {
    constructor() {
        super();

        this.state = {
            fireRedirect: false
        };
    }
    registerSubmit = event => {
        event.preventDefault();

        let firstName = event.target[0].value;
        let lastName = event.target[1].value;
        let email = event.target[2].value;
        let username = event.target[3].value;
        let password = event.target[4].value;

        axios.post("http://localhost:5000/register", {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        });


        this.setState({ fireRedirect: true });


    };



    render() {
        return (
            <div>
                <RegisterBackground />
                <div className="register">

                    <div className="registerContainer">
                        <form id="registerForm" onSubmit={this.registerSubmit}>
                            <p id="firstNameHeader" className="registerHeader">First Name:</p>
                            <input
                                autoFocus="autofocus"
                                style={{ fontSize: "50px" }}
                                id="usernameInputRegister"
                                className="registerInput"
                                type="text"
                                required
                            />
                            <p id="lastNameHeader" className="registerHeader">Last Name</p>
                            <input
                                style={{ fontSize: "50px" }}
                                id="usernameInputRegister"
                                type="text"
                                className="registerInput"
                                required
                            />
                            <p id="emailHeader" className="registerHeader">Email:</p>
                            <input
                                style={{ fontSize: "50px" }}
                                id="usernameInputRegister"
                                type="text"
                                className="registerInput"
                                required
                            />
                            <p id="usernameHeaderRegister" className="registerHeader">Username:</p>
                            <input
                                style={{ fontSize: "50px" }}
                                id="usernameInputRegister"
                                type="text"
                                className="registerInput"
                                required
                            />
                            <p id="passwordHeaderRegister" className="registerHeader">Password:</p>
                            <input
                                style={{ fontSize: "50px" }}
                                id="passwordInputRegister"
                                type="text"
                                className="registerInput"
                                required
                            />
                            <button type="submit" style={{ visibility: `hidden` }}></button>
                        </form>
                        {this.state.fireRedirect && <Redirect to="/dashboard" />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
