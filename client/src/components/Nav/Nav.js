import "./Nav.css";
import React, { Component } from "react";
import { Navbar, NavItem } from 'react-materialize';
import { Redirect, Link } from "react-router-dom";
import "./Nav.css";
import LogVoyage from "../../components/LogVoyage";
import { Modal } from 'react-materialize';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                </div>
            :
                <div>
                    <NavItem>
                        <Modal
                            header='You must be logged in to log a voyage'
                            trigger={<button className="btn">Log a Voyage</button>}
                            modalOptions={{ complete: () => document.querySelector('body').style.overflow = "scroll" }}>
                            <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                {this.state.loginRedirect && <Redirect to="/login" />}
                            </div>
                        </Modal>
                    </NavItem>
                    <NavItem>
                        <Modal
                            header='You must be logged in to view saved voyages'
                            trigger={<button className="btn">View Voyages</button>}
                            modalOptions={{ complete: () => document.querySelector('body').style.overflow = "scroll" }}>
                            <div style={{ marginRight: `0`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `center` }}>
                                <button onClick={this.handleLogin} className="waves-effect btn-large waves-light btn" id="loginButton">Log In</button>
                                <p style={{ width: `55%`, marginLeft: `5%` }} id="registerTextContainer">Maiden voyage with Open Water? Register <Link to="/register">here</Link>!</p>
                                {this.state.loginRedirect && <Redirect to="/login" />}
                            </div>
                        </Modal>
                    </NavItem>    
                </div>
            }
            </Navbar>
        )
    }
}

export default Nav;