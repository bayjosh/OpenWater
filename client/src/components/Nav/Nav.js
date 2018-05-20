import "./Nav.css";
import React, { Component } from "react";
import { Navbar, NavItem } from 'react-materialize';
import { Link } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render (){
        return (
            <Navbar className="navbar-fixed" style={{ opacity: `.7` }} brand={<Link to={this.props.loggedIn ? "/dashboard" : '/'}><img src={require("../../images/OWlogo.png")} style={{ height: `65px`, width: `100px` }} /> </Link>} right>
                <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
                {/* <NavItem href='components.html'>Components</NavItem> */}
            </Navbar>
        )
    }
}

export default Nav;