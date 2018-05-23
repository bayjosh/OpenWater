import "./Nav.css";
import React, { Component } from "react";
import { Navbar, NavItem, Modal, Chip, Dropdown, Button, Icon } from 'react-materialize';
import { Redirect, Link } from "react-router-dom";
import "./Nav.css";
import LogVoyage from "../../components/LogVoyage";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginRedirect: false
        };
    }

    handleLogin = event => {
        event.preventDefault();
        this.setState({ loginRedirect: true });
    }
    logout = event => {
        event.preventDefault();
        return fetch ('http://localhost:5000/logout').then(res => res.json())
    }

    render (){
        return (
            <Navbar id='nav' brand={<Link to={this.props.loggedIn ? "/dashboard" : '/'}><img alt='OpenWater Logo' src={require("../../images/OWlogo.png")} style={{ height: `65px`, opacity: `1 !important`, width: `100px` }} /> </Link>} right>
            { this.props.loggedIn ?
                <div>
                    <NavItem> <LogVoyage /> </NavItem>
                    <NavItem> <Link to="/voyages">
                        <button className="btn"> View Voyages </button>
                    </Link> </NavItem>
                    <NavItem> <button onClick={this.logout}> Log Out </button> </NavItem>
                </div>
            :
                <div>
                    <NavItem>
                        <Modal
                            header='You must be logged in to log a voyage'
                            trigger={<button className="btn">Log a Voyage</button>} 
                            modalOptions={window.location.pathname === "/dashboard" ? { complete: () => document.querySelector('body').style.overflow = "scroll" } : {}} >
                            {window.location.pathname === "/register" ?
                                <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                    <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                </div>
                            : window.location.pathname === "/login" ?
                                <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                    <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                </div>
                            :
                                <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                    <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                    <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                </div>
                            }
                                {this.state.loginRedirect && <Redirect to="/login" />}
                        </Modal>
                    </NavItem>
                    <NavItem>
                        <Modal
                            header='You must be logged in to view saved voyages'
                            trigger={<button className="btn">View Voyages</button>}
                            modalOptions={window.location.pathname === "/dashboard" ? { complete: () => document.querySelector('body').style.overflow = "scroll" } : {}} >
                            {window.location.pathname === "/register" ?
                                <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                    <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                </div>
                            : window.location.pathname === "/login" ?
                                <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                    <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                </div>
                            : 
                                <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                    <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                    <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                </div>
                            }
                                {this.state.loginRedirect && <Redirect to="/login" />}
                        </Modal>
                    </NavItem>    
                </div>
            }
            </Navbar>
        )
    }
}

export default Nav;