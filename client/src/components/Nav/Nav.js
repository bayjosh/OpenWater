import "./Nav.css";
import React, { Component } from "react";
import { Navbar, NavItem } from 'react-materialize'

const NavBar = props => (

    <Navbar className="black top-fixed" style={{ opacity: `.7` }} brand={<img src={require("../../images/OWlogo.png")} style={{ height: `65px`, width: `100px` }} />} right>
        <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
        {/* <NavItem href='components.html'>Components</NavItem> */}
    </Navbar>

)

export default NavBar;