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
                <div className="register container" style={{ textAlign: "center" }}>
                    <div className="row">
                        <div className="col m8 offset-m2">
                            <div id="registerContainer">
                                <form id="registerForm" onSubmit={this.registerSubmit}>
                                    <p id="firstNameHeader" className="registerHeader">Open Water</p>
                                    <div class="row">
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="First Name" autoFocus="autofocus" id="registerInput" type="text" class="validate" />
                                            </div>
                                        </div>
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="Last Name" autoFocus="autofocus" id="registerInput" type="text" class="validate" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="E-Mail" autoFocus="autofocus" id="registerInput" type="text" class="validate" />
                                            </div>
                                        </div>
                                        <div className="col m6">
                                            <div className="input-field" style={{ paddingBottom: "20px" }}>
                                                <input placeholder="Password" autoFocus="autofocus" id="registerInput" type="password" class="validate" />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="waves-effect waves-light btn registerButton"  >Register</button>
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
