import React, {Component} from "react";

import {Navbar, Nav} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import "./NavigationBar.css";

export default class NavigationBar extends Component {

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" className={"navbar-custom"}>
                <div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            {/*<NavLink to="/home" className="nav-link-custom" activeStyle={{fontWeight: "1000", color: "white"}}>Home</NavLink>*/}
                            <NavLink to="/cvss-v3.1" className="nav-link-custom" activeStyle={{fontWeight: "1000", color: "white"}}
                            >CVSS <span className="badge-version"> v3.1 </span></NavLink>
                            {/*<NavLink to="/about" className="nav-link-custom" activeStyle={{fontWeight: "1000", color: "white"}}>About</NavLink>*/}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}