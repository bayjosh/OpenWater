import "./Nav.css";
import React, { Component } from "react";
import { Navbar, NavItem, Modal, Dropdown } from 'react-materialize';
import { Redirect, Link } from "react-router-dom";
import LogVoyage from "../../components/LogVoyage";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginRedirect: false,
            registerRedirect: false
        };
    }

    unwantedClick = event => {
        event.preventDefault();
    }

    handleLogin = event => {
        event.preventDefault();
        this.setState({ loginRedirect: true });
    }

    handleRegister = event => {
        event.preventDefault();
        this.setState({ registerRedirect: true });
    }

    logout = event => {
        event.preventDefault();
        this.props.handleLogOut(event);
        // return fetch('http://localhost:5000/logout')
        //     .then(res => res.json())

    }
    // if you are on the /voyages page, hitting th view voyages button will refresh the page
    refresh = () => {
        if (window.location.pathname === '/voyages') {
            window.location.reload()
        }
    }



    render() {
        return (
            <Navbar id='nav' brand={<img alt='OpenWater Logo' src={require("../../images/OWlogo.png")} style={{ height: `65px`, opacity: `1 !important`, width: `100px` }} />} right>
                {this.props.loggedIn ?
                    <div>
                        {/* <NavItem>
                            <Link to="trackvoyage">
                                <button className="btn"> Track a Voyage </button>
                            </Link>
                        </NavItem> */}
                        <NavItem onClick={this.unwantedClick} className="navGreeting">  Welcome, {this.props.firstName}! </NavItem>
                        <NavItem onClick={this.unwantedClick} id="navGreeting" className="navGreeting"> //////////</NavItem>
                        <NavItem onClick={this.unwantedClick} className="captainLogButtonNav">
                            <Dropdown
                                trigger={<button className="btn button"> Captain's Log </button>} >
                                <LogVoyage userId={this.props.userId} />
                                <NavItem divider />
                                <NavItem>
                                <Link to="/voyages">
                                    <NavItem>
                                        View Voyages
                                    </NavItem>
                                </Link>
                                </NavItem>
                            </Dropdown>
                        </NavItem>
                        <NavItem onClick={this.logout}> Log Out </NavItem>


                    </div>
                    :
                    window.location.pathname === "/dashboard" ?
                        <div>
                            <NavItem onClick={this.unwantedClick} className="captainLogButtonNav">
                                <Dropdown trigger={<button className="btn button"> Captain's Log </button>} >
                                    <Modal
                                        header='You must be logged in to log a voyage'
                                        trigger={<NavItem> Log a Voyage</NavItem>}
                                        modalOptions={{ complete: () => document.querySelector('body').style.overflowY = "scroll" }} >
                                        {/* <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                        <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                        <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                    </div> */}
                                        {this.state.loginRedirect && <Redirect to="/login" />}
                                    </Modal>
                                    <NavItem divider />
                                    <Modal
                                        header='You must be logged in to view saved voyages'
                                        trigger={<NavItem>View Voyages</NavItem>}
                                        modalOptions={{ complete: () => document.querySelector('body').style.overflowY = "scroll" }} >
                                        {/* <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                        <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                        <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                    </div> */}
                                        {this.state.loginRedirect && <Redirect to="/login" />}
                                        {this.state.registerRedirect && <Redirect to="/register" />}
                                    </Modal>
                                </Dropdown>
                            </NavItem>
                            <NavItem onClick={this.handleLogin}> Log In </NavItem>
                            <NavItem onClick={this.handleRegister}> Register for Free </NavItem>

                        </div>
                        :
                        <div />}
            </Navbar>
        )
    }
}

export default Nav;