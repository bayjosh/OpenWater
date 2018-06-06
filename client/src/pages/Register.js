import React, { Component } from "react";
import RegisterBackground from "../components/RegisterBackground";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav"
import Modal from "react-modal"
import Foot from "../components/Foot"

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

class Register extends Component {
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
    //Method to handle submit of user registration
    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }
    registerSubmit = event => {
        event.preventDefault();
        let firstName = event.target[0].value;
        let lastName = event.target[1].value;
        let email = event.target[2].value;
        let password = event.target[3].value;

        //Get method to check if user already exists
        return axios.get("/checkdup", {
            params: { email },
        }).then(res => {
            if (res.data.length > 0) {
                this.setState({ modalIsOpen: true })
                document.getElementById('registerEmailInput').value = "";
                document.getElementById('registerPasswordInput').value = "";
                document.getElementById('registerFirstNameInput').value = "";
                document.getElementById('registerLastNameInput').value = "";
            }
            else {
                return axios.post("/createUser",
                    { firstName, lastName, password, email },
                    { withCredentials: true }
                )
                    .then(res => {
                        //Update state to trigger redirect to dashboard
                        this.setState({ fireRedirect: true });
                        console.log("line 62: " + res.data._id)
                        let userId = res.data._id;
                        firstName = res.data.firstName
                        lastName = res.data.lastName
                        email = res.data.email
                        this.props.handleRegister(event, userId, firstName, lastName, email)
                    });
            }
        })
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
                                    <p id="firstNameHeader" className="registerHeader">Register</p>
                                    <div className="row">
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="first" autoFocus="autofocus" id="registerFirstNameInput" type="text" className="validate" />
                                            </div>
                                        </div>
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="last" id="registerLastNameInput" type="text" className="validate" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m6">
                                            <div className="input-field">
                                                <input placeholder="email" id="registerEmailInput" type="email" className="validate" />
                                            </div>
                                        </div>
                                        <div className="col m6">
                                            <div className="input-field" style={{ paddingBottom: "5%" }}>
                                                <input placeholder="password" id="registerPasswordInput" type="password" className="validate" />
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
                        <h3 style={{ marginTop: `0` }}>Invalid Account</h3>
                    </div>
                    <hr />
                    We already have an account for that email in our records.
                </Modal>
            </div>
        );
    }
}

export default Register;
